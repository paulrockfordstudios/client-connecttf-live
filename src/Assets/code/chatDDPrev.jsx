
import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosInstance } from '../../../../Utils/axiosConfig';
import "./ChatDropdown.css";
import MessageNotice from '../../../MessageNotice/MessageNotice';

function ChatDropdown({ //arrivalFlameMessage, arrivalUnionMessage, newMessage 
}) {

    const { user, flame, newMsg, newArrFlameMsg, newArrUnionMsg } = useSelector((state) => state.auth);

    const chatMDomNode = useRef(null);
    const chatMDDRef = useRef(null);
    const chatCntRef = useRef(null);

    const [ chatMDD, setChatMDD ] = useState(false);
    const [ chatHover, setChatHover ] = useState(false);
    const [ chatActive, setChatActive ] = useState(false);
    const [ chatCntWidth, setChatCntWidth ] = useState();
    const [ chatsUnseen, setChatsUnseen ] = useState([]);
    const [ chatsUnseenCnt, setChatsUnseenCnt ] = useState(0);
    const [ convs, setConvs ] = useState([]);
    const [ latestList, setLatestList ] = useState([]);
    const [ latestArr, setLatestArr ] = useState([]);
    const [convsList, setConvsList] = useState([]);
    const [convsArr, setConvsArr] = useState([]);
    const [ sortedConvs, setSortedConvs ] = useState([]);
    const [ unseenList, setUnseenList ] = useState([]);
    const [ effect1, setEffect1 ] = useState(false)
    const [ effect2, setEffect2 ] = useState(false)
    const [ effect3, setEffect3 ] = useState(false)
    const [ effect4, setEffect4 ] = useState(false)

    const colorTheme = user.unionName ? user.spectrum : user.energy;

    useEffect(() => {
        let chatMDDHandler = (event) => {
            var path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                setChatMDD(false);
            }
        };
        if (chatMDD) {
            document.body.addEventListener("click", chatMDDHandler);
            return () => {
                document.body.removeEventListener("click", chatMDDHandler);
            };
        }
      }, [chatMDD]);

      useEffect(() => {
            const getConversations = async () => {
                try {
                    const res = user.unionName 
                        ? await axiosInstance.get(`/conversations/union/${user._id}`)
                        : await axiosInstance.get(`/conversations/flame/${user._id}`)
                    setConvs(res.data);
                    setEffect1(true)
                } catch(err) {
                    console.log(err);
                }

            }
            getConversations();
    }, []);


    useEffect(() => {
        if (effect1) {
            const getMessages = async () => {
                await Promise.all(
                    convs.map(async (conv) => {
                        try {  
                            const res = await axiosInstance.get(`/messages/latest/${conv._id}`);
                            if (res.data) {
                                latestList.push(res.data);  
                            }
                            
                        } catch(err) {
                            console.log(err);
                        }        
                    })    
                )
                setEffect2(true)
                setEffect1(false)
            }
            getMessages();
        }
    }, [effect1]);

   
    
    //useEffect(() => {
    //    setLatestList([...latestList, arrivalFlameMessage])
    //    setEffect2(true)
    //}, [arrivalFlameMessage]);
    

    useEffect(() => {
        setLatestList([...latestList, newArrFlameMsg])
        setEffect2(true)
    }, [newArrFlameMsg]);

    
    //useEffect(() => {
    //    setLatestList([...latestList, arrivalUnionMessage])
    //    setEffect2(true)
    //}, [arrivalUnionMessage]);
    

    useEffect(() => {
        setLatestList([...latestList, newArrUnionMsg])
        setEffect2(true)
    }, [newArrUnionMsg]);


    useEffect(() => {
        if (effect2) {
            const jsonObject = latestList.map(JSON.stringify);      
            const uniqueSet = new Set(jsonObject);
            const newArr = Array.from(uniqueSet).map(JSON.parse);
            for (let i = 0; i < convs.length; i++) {
                for (let j = 0; j < newArr.length; j++) {
                    if (convs[i]._id === newArr[j].conversationId) {
                        const lateConv = {conv: convs[i], lm: newArr[j]}
                        latestArr.push(lateConv)   
                    }
                }
            }
            setEffect3(true)
            setEffect2(false)
        }
         setLatestList([]);
    },[effect2]);



    useEffect(() => {
        if (effect3) {
            if (convsList.length > 0) {
                for (let i = 0; i < convsList.length; i++) {
                    for (let j = 0; j < latestArr.length; j++) {
                        if (convsList[i].conv._id === latestArr[j].conv._id) {
                            Object.assign(convsList[i], latestArr[j])
                        } else {
                            convsArr.push(latestArr[j])
                        }
                    }   
                }
                convsList.concat(convsArr)
                setEffect4(true)
                setEffect3(false)
            } else {
                setConvsList(latestArr)
                setEffect4(true)
                setEffect3(false)
            }
            setLatestArr([]);
        }
    }, [effect3]);


    useEffect(() => {
        if (chatsUnseenCnt) {
            const getCCWidth = () => {
                const cCWidth = chatCntRef.current.clientWidth;
                setChatCntWidth(cCWidth + 12);
            }
            getCCWidth();
        }
    }, [chatsUnseenCnt]);

    useEffect(() => {
        if(convsList.length > 0) {
            const getSeen = async () => {
                try {
                    await Promise.all(
                        convsList.map(async (conv) => {
                            try {
                                const msUnseen = await axiosInstance.get(`/messages/${conv.conv._id}/${user._id}/unseen`)   
                                setUnseenList([...unseenList, ...msUnseen.data])
                            } catch(err) {
                                console.log(err)
                            }  
                        })
                    )
                } catch(err) {
                    console.log(err)
                }
            }
            getSeen();
        }
    }, [effect2, effect3]);


    useEffect(() => {
        if (unseenList.length > 0) {
            let myUnseenChats = [];
            user.unionName
                ? myUnseenChats = unseenList.filter((uChat) => uChat.unionSenderId !== user._id)
                : myUnseenChats = unseenList.filter((fChat) => fChat.flameSenderId !== user._id)
            setChatsUnseen(myUnseenChats)
            setUnseenList([]);
        }
    }, [unseenList.length])

    useEffect(() => {
        if(chatMDD && chatsUnseen.length > 0) {
            const putSeen = async () => {
                try {
                    await Promise.all(
                        chatsUnseen.map((msg) => {
                            axiosInstance.put(`/messages/${msg._id}/seen`)
                        })
                    )
                } catch(err) {
                    console.log(err)
                }
                setChatsUnseen([]);
                setTimeout(() => {
                    setChatsUnseenCnt(0);
                }, 4325)     
            }
            putSeen();
        }
    }, [chatMDD]);

    useEffect(() => {
        if (chatsUnseen.length > 0) {
            setChatsUnseenCnt(chatsUnseen.length)
        }
    }, [chatsUnseen.length])

    useEffect(() => { 
        if (effect4){
            setSortedConvs(convsList.sort((a, b) => new Date(a.lm.createdAt) < new Date(b.lm.createdAt) ? 1:-1))
            setEffect4(false)
        }
    }, [effect4]);
    
    return (

        <div className="topbarIconItemcontainer chat" ref={chatMDDRef}>
            {user.unionName ?
                (
                    <>
                        {chatMDD ?
                            (
                                <>
                                    <div 
                                        className={`
                                            chatDropdownHigherSpectrumBackground 
                                            ${user.unionName && colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                            ${colorTheme}
                                        `} 
                                    />
                                    <div className="chatDropdownWhiteBackground open" />
                                </>
                            ) : (
                                <>
                                    <div 
                                        className={`
                                            topbarIconItemBackgroundTheme 
                                            HIGHER_BACKGROUND
                                            ${user.spectrum}
                                        `}        
                                    />
                                </>
                            )
                        }                      
                        {user.spectrum === "diamond" ?
                            (
                                <div 
                                    className={`
                                        topbarIconItem
                                        ${
                                            chatHover 
                                                ? chatActive
                                                    ? 'HIGHER_BACKGROUND diamond drk lgt'
                                                    : 'HIGHER_BACKGROUND diamond lgt'
                                                : null
                                        }
                                        ${chatMDD ? "open" : "close"}
                                    `}
                                    onMouseEnter={() => setChatHover(true)} 
                                    onMouseLeave={() => setChatHover(false)}
                                    onMouseDown={() => setChatActive(true)} 
                                    onMouseUp={() => setChatActive(false)}
                                    onClick={() => setChatMDD(!chatMDD)}
                                >
                                    <i
                                        className={`
                                            topbarPNGIcon
                                            PNG_ICON_CHAT${chatActive ? "_DRK" : ""}
                                            ${colorTheme}
                                        `} 
                                        alt={`chat-${colorTheme}`} 
                                    />
                                    {chatsUnseenCnt > 0 &&
                                        <span 
                                            className={`topbarIconBadge ${flame.energy}`}
                                            style={chatsUnseen.length > 0 
                                                ? {
                                                    opacity: "100%",
                                                    width: `${chatCntWidth}px`,
                                                    right: `-${chatCntWidth - 13}px`
                                                } : {
                                                    opacity: "0%", 
                                                    width: `${chatCntWidth}px`,
                                                    right: `-${chatCntWidth - 13}px`,
                                                    transitionDelay: "325ms", 
                                                    transition: "opacity 4000ms ease-in-out"
                                                }
                                            }
                                        >
                                            <span ref={chatCntRef}>{chatsUnseenCnt}</span>
                                        </span>
                                    }
                                </div>
                            ) : (
                                <div 
                                    className={`topbarIconItem ${chatMDD ? "INNER_BOX_SHADOW open" : "BOX_SHADOW close"} ${user.spectrum ? user.spectrum : "gray"}`}
                                    onMouseEnter={() => setChatHover(true)} 
                                    onMouseLeave={() => setChatHover(false)}
                                    onMouseDown={() => setChatActive(true)} 
                                    onMouseUp={() => setChatActive(false)}
                                    onClick={() => setChatMDD(!chatMDD)}
                                >
                                    <i
                                        className={`
                                            topbarPNGIcon
                                            PNG_ICON_CHAT${chatActive ? "_DRK" : ""}
                                            ${colorTheme}
                                        `} 
                                        alt={`chat-${colorTheme}`} 
                                    />
                                    {chatsUnseenCnt > 0 &&
                                        <span 
                                            className={`topbarIconBadge ${flame.energy}`}
                                            style={chatsUnseen.length > 0 
                                                ? {
                                                    opacity: "100%",
                                                    width: `${chatCntWidth}px`,
                                                    right: `-${chatCntWidth - 13}px`
                                                } : {
                                                    opacity: "0%", 
                                                    width: `${chatCntWidth}px`,
                                                    right: `-${chatCntWidth - 13}px`,
                                                    transitionDelay: "325ms", 
                                                    transition: "opacity 4000ms ease-in-out"
                                                }
                                            }
                                        >
                                            <span ref={chatCntRef}>{chatsUnseenCnt}</span>
                                        </span>
                                    }
                                </div>
                            )
                        }
                    </>
                ) : (
                    <>
                        <div 
                            className={`topbarIconItem ${chatMDD ? "INNER_BOX_SHADOW" : "BOX_SHADOW"} ${user.energy ? user.energy : "gray"}`}
                            onMouseEnter={() => setChatHover(true)} 
                            onMouseLeave={() => setChatHover(false)}
                            onMouseDown={() => setChatActive(true)} 
                            onMouseUp={() => setChatActive(false)}
                            onClick={() => setChatMDD(!chatMDD)}
                        >
                            <i
                                className={`
                                    topbarPNGIcon
                                    PNG_ICON_CHAT${chatActive ? "_DRK" : ""}
                                    ${colorTheme}
                                `} 
                                alt={`chat-${colorTheme}`} 
                            />
                            {chatsUnseenCnt > 0 &&
                                <span 
                                    className={`topbarIconBadge ${flame?.energy}`}
                                    style={chatsUnseen.length > 0  
                                        ? {
                                            opacity: "100%",
                                            width: `${chatCntWidth}px`,
                                            right: `-${chatCntWidth - 13}px`
                                        } : {
                                            opacity: "0%", 
                                            width: `${chatCntWidth}px`,
                                            right: `-${chatCntWidth - 13}px`,
                                            transitionDelay: "325ms", 
                                            transition: "opacity 4000ms ease-in-out"
                                        }
                                    }
                                >
                                    <span ref={chatCntRef}>{chatsUnseenCnt}</span>
                                </span>
                            }
                        </div>
                    </>
                )
            }
            <div className={`tbCMDropDown chat flame ${chatMDD ? "open" : ""}`} ref={chatMDomNode}>  
                <div className="chatDropdown flame">
                    <div className="chatDropdownContainer">
                        <div 
                            className={`
                                friendRequestsDropdownBackgroundTheme 
                                HIGHER_BACKGROUND
                                ${colorTheme}
                            `}  
                        />
                        <div className={`chatDropdown-container BOX_SHADOW ${user.unionName ? user.spectrum : user.energy}`}>
                            <div className="chatDropdownList">
                                {sortedConvs && sortedConvs.map((conv) =>  (
                                    <div 
                                        key={conv.conv?._id} 
                                        //onClick={() => handleClick(conv)}
                                    >
                                        <MessageNotice 
                                            conversation={conv.conv}
                                            latestSeen={conv.lm.seen} 
                                            chatMDD={chatMDD}
                                            currentUser={user} 
                                            cn={"mn"}
                                            //arrivalFlameMessage={arrivalFlameMessage}
                                            //arrivalUnionMessage={arrivalUnionMessage}
                                            //newMessage={newMessage}
                                        />
                                    </div>
                                )).splice(0,5)}
                            </div>
                            <div className="chatDropdownLinkContainer">
                                <hr 
                                    className={`
                                        friendRequestDropdownHr 
                                        ${colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                        ${colorTheme}
                                    `}
                                />
                                <div className="chatDropdownLinkContainerBottom">
                                    <Link className="chatDropdownLink" to="/messenger">
                                        <span className={`chatDropdownLinkText ${colorTheme}`}>
                                            See All Conversations
                                        </span>
                                    </Link>
                                    <span 
                                        className={`
                                            chatDropdownLinkBadge 
                                            ${colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                            ${colorTheme}
                                        `}
                                        style={chatMDD && chatsUnseen > 0 
                                            ? {
                                                opacity: "100%",
                                                width: `${chatCntWidth}px`,
                                                right: `-${chatCntWidth - 13}px`
                                            } : {
                                                opacity: "0%", 
                                                width: `${chatCntWidth}px`,
                                                right: `-${chatCntWidth - 13}px`,
                                                transitionDelay: "325ms", 
                                                transition: "opacity 4000ms ease-in-out"
                                            }
                                        }
                                    >
                                        <span ref={chatCntRef}>{chatsUnseenCnt}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatDropdown;