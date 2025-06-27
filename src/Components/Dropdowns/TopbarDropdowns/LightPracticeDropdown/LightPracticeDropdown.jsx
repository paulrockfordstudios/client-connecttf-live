import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';

import "./LightPracticeDropdown.css";
import MessageNotice from '../../../MessageNotice/MessageNotice';
import { lpMDDOpen, lpMDDClose } from '../../../../Redux/AuthSlice';

function LightPracticeDropdown() {

    const { user, flame, lpMDD, arrMessageNot, arrMsgDoteNot } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const lpMDomNode = useRef(null);
    const lpMDDRef = useRef(null);
    const lpCntRef = useRef(null);

    //const [ lpMDD, setlpMDD ] = useState(false);
    const [ lpHover, setlpHover ] = useState(false);
    const [ lpActive, setlpActive ] = useState(false);
    const [ lpCntWidth, setlpCntWidth ] = useState();
    const [ lpsUnseen, setlpsUnseen ] = useState([]);
    const [ lpsUnseenCnt, setlpsUnseenCnt ] = useState(0);
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
    const [ messageNots, setMessageNots ] = useState([]);
    const [ messageNotsUnseen, setMessageNotsUnseen ] = useState([]);
    const [ messageNotsUnseenCnt, setMessageNotsUnseenCnt ] = useState([]);
    const [ msgDoteNots, setMsgDoteNots ] = useState([]);
    const [ msgDoteNotsUnseen, setMsgDoteNotsUnseen ] = useState([]);
    const [ msgDoteNotsUnseenCnt, setMsgDoteNotsUnseenCnt ] = useState([]);
    const [ notifications, setNotifications ] = useState([]);
    const [ notsUnseen, setNotsUnseen ] = useState([]);
    const [ notsUnseenCnt, setNotsUnseenCnt ] = useState([]);

    const colorTheme = user.unionName ? user.spectrum : user.energy;

    useEffect(() => {
        let lpMDDHandler = (event) => {
            var path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                dispatch(lpMDDClose())
            }
        };
        if (lpMDD) {
            document.body.addEventListener("click", lpMDDHandler);
            return () => {
                document.body.removeEventListener("click", lpMDDHandler);
            };
        }
      }, [lpMDD]);

      useEffect(() => {
        const fetchMessageNots = async () => {
            const res = await axiosReq("GET", `/messageNots/${user._id}`)   
            setMessageNots(res.data.sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
        fetchMessageNots();
    }, [user._id]);

    useEffect(() => {
        if (arrMsgDoteNot) {
            setMsgDoteNots([arrMsgDoteNot,...msgDoteNots]);
        }
    }, [arrMsgDoteNot]);
    
    console.log(msgDoteNots)

    useEffect(() => {
        const fetchMsgDoteNots = async () => {
            const res = await axiosReq("GET", `/msgDoteNots/${user._id}`)   
            setMsgDoteNots(res.data.sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
        fetchMsgDoteNots();
    }, [user._id]);

    useEffect(() => {
        if(messageNots) {
            const getmessageNotsUnseen = () => {
                const unseenArr = messageNots.filter((not) => not.seen === false);
                setMessageNotsUnseen(unseenArr);
                setMessageNotsUnseenCnt(unseenArr.length);
            }
            getmessageNotsUnseen();
        }
    }, [messageNots]);

    useEffect(() => {
        if(msgDoteNots) {
            const getMsgDoteNotsUnseen = () => {
                const unseenArr = msgDoteNots.filter((not) => not.seen === false);
                setMsgDoteNotsUnseen(unseenArr);
                setMsgDoteNotsUnseenCnt(unseenArr.length);
            }
            getMsgDoteNotsUnseen();
        }
    }, [msgDoteNots]);

    useEffect(() => {
        if (messageNots || msgDoteNots) {
            setNotifications(messageNots.concat(msgDoteNots).sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
    }, [messageNots, msgDoteNots])

    useEffect(() => {
        if (arrMessageNot) {
            const arrMessageNotHandler = () => {
                setNotifications([arrMessageNot, ...notifications])
                setNotsUnseen([arrMessageNot, ...notsUnseen])
                setNotsUnseenCnt(notsUnseenCnt + 1)
                setMessageNotsUnseen([arrMessageNot, ...messageNotsUnseen]);
                //setMessageNotsUnseenCnt(messageNotsUnseenCnt + 1);
            }
            arrMessageNotHandler();
        }
    }, [arrMessageNot]);

    useEffect(() => {
        if (arrMsgDoteNot) {
            const arrMsgDoteNotHandler = () => {
                setNotifications([arrMsgDoteNot, ...notifications])
                setNotsUnseen([arrMsgDoteNot, ...notsUnseen])
                setNotsUnseenCnt(notsUnseenCnt + 1)
                //notificationBell()
                setMsgDoteNotsUnseen([arrMsgDoteNot, ...msgDoteNotsUnseen]);
                //setUserNotsUnseenCnt(userNotsUnseenCnt + 1);
            }
            arrMsgDoteNotHandler();
        }
    }, [arrMsgDoteNot]);

    useEffect(() => {
        if (messageNotsUnseen || msgDoteNotsUnseen) { 
            setNotsUnseen(messageNotsUnseen.concat(msgDoteNotsUnseen).sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
            }));
            setNotsUnseenCnt(notsUnseen.length)
        }
    }, [messageNotsUnseen, msgDoteNotsUnseen]);

    useEffect(() => {
        setNotsUnseenCnt(notsUnseen.length)
    }, [notsUnseen.length])

    useEffect(() => {
        if (notsUnseenCnt) {
            const getCCWidth = () => {
                const cCWidth = lpCntRef.current.clientWidth;
                setlpCntWidth(cCWidth + 12);
            }
            getCCWidth();
        }
    }, [notsUnseenCnt]);


    /*
    useEffect(() => {
        setNotsDisplayed(notifications.slice(0,5));
    }, [notifications.length])
    */

    /*
    useEffect(() => {
        setNotDisplays(notifications.map((not) => {
            if () {
                
            }
        }))
    }, [notifications.length]);
    /*
    useEffect(() => {
        setLatestList([...latestList, arrivalFlameMessage])
        setEffect2(true)
    }, [arrivalFlameMessage]);
    */

    /*
    useEffect(() => {
        setLatestList([...latestList, newArrFlameMsg])
        setEffect2(true)
    }, [newArrFlameMsg]);

    /*
    useEffect(() => {
        setLatestList([...latestList, arrivalUnionMessage])
        setEffect2(true)
    }, [arrivalUnionMessage]);
    */

    /*
    useEffect(() => {
        setLatestList([...latestList, newArrUnionMsg])
        setEffect2(true)
    }, [newArrUnionMsg]);
    */


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
        if (lpsUnseenCnt) {
            const getCCWidth = () => {
                const cCWidth = lpCntRef.current.clientWidth;
                setlpCntWidth(cCWidth + 12);
            }
            getCCWidth();
        }
    }, [lpsUnseenCnt]);

    useEffect(() => {
        if(convsList.length > 0) {
            const getSeen = async () => {
                try {
                    await Promise.all(
                        convsList.map(async (conv) => {
                            try {
                                const msUnseen = await axiosReq("GET", `/messages/${conv.conv._id}/${user._id}/unseen`)   
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
            let myUnseenlps = [];
            user.unionName
                ? myUnseenlps = unseenList.filter((ulp) => ulp.unionSenderId !== user._id)
                : myUnseenlps = unseenList.filter((flp) => flp.flameSenderId !== user._id)
            setlpsUnseen(myUnseenlps)
            setUnseenList([]);
        }
    }, [unseenList.length])

    useEffect(() => {
        if(lpMDD && lpsUnseen.length > 0) {
            const putSeen = async () => {
                try {
                    await Promise.all(
                        lpsUnseen.map((msg) => {
                            axiosReq("PUT", `/messages/${msg._id}/seen`)
                        })
                    )
                } catch(err) {
                    console.log(err)
                }
                setlpsUnseen([]);
                setTimeout(() => {
                    setlpsUnseenCnt(0);
                }, 4325)     
            }
            putSeen();
        }
    }, [lpMDD]);

    useEffect(() => {
        if (lpsUnseen.length > 0) {
            setlpsUnseenCnt(lpsUnseen.length)
        }
    }, [lpsUnseen.length])

    useEffect(() => { 
        if (effect4){
            setSortedConvs(convsList.sort((a, b) => new Date(a.lm.createdAt) < new Date(b.lm.createdAt) ? 1:-1))
            setEffect4(false)
        }
    }, [effect4]);
    
    return (

        <div className="topbarIconItemcontainer lp" ref={lpMDDRef}>
            {user.unionName ?
                (
                    <>
                        {lpMDD ?
                            (
                                <>
                                    <div 
                                        className={`
                                            lpDropdownHigherSpectrumBackground 
                                            ${user.unionName && colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                            ${colorTheme}
                                        `} 
                                    />
                                    <div className="lpDropdownWhiteBackground open" />
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
                                            lpHover 
                                                ? lpActive
                                                    ? 'HIGHER_BACKGROUND diamond drk lgt'
                                                    : 'HIGHER_BACKGROUND diamond lgt'
                                                : null
                                        }
                                        ${lpMDD ? "open" : "close"}
                                    `}
                                    onMouseEnter={() => setlpHover(true)} 
                                    onMouseLeave={() => setlpHover(false)}
                                    onMouseDown={() => setlpActive(true)} 
                                    onMouseUp={() => setlpActive(false)}
                                    onClick={() => lpMDD ? dispatch(lpMDDClose()) : dispatch(lpMDDOpen())}
                                >
                                    <i
                                        className={`
                                            topbarPNGIcon
                                            PNG_ICON_TORCH
                                            lp
                                            ${colorTheme}
                                        `} 
                                        alt={`lp-${colorTheme}`} 
                                    />
                                    {lpsUnseenCnt > 0 &&
                                        <span 
                                            className={`topbarIconBadge ${flame.energy}`}
                                            style={lpsUnseen.length > 0 
                                                ? {
                                                    opacity: "100%",
                                                    width: `${lpCntWidth}px`,
                                                    right: `-${lpCntWidth - 13}px`
                                                } : {
                                                    opacity: "0%", 
                                                    width: `${lpCntWidth}px`,
                                                    right: `-${lpCntWidth - 13}px`,
                                                    transitionDelay: "325ms", 
                                                    transition: "opacity 4000ms ease-in-out"
                                                }
                                            }
                                        >
                                            <span ref={lpCntRef}>{lpsUnseenCnt}</span>
                                        </span>
                                    }
                                </div>
                            ) : (
                                <div 
                                    className={`topbarIconItem ${lpMDD ? "INNER_BOX_SHADOW open" : "BOX_SHADOW close"} ${user.spectrum ? user.spectrum : "gray"}`}
                                    onMouseEnter={() => setlpHover(true)} 
                                    onMouseLeave={() => setlpHover(false)}
                                    onMouseDown={() => setlpActive(true)} 
                                    onMouseUp={() => setlpActive(false)}
                                    onClick={() => lpMDD ? dispatch(lpMDDClose()) : dispatch(lpMDDOpen())}
                                >
                                    <i
                                        className={`
                                            topbarPNGIcon
                                            PNG_ICON_TORCH
                                            lp
                                            ${colorTheme}
                                        `} 
                                        alt={`lp-${colorTheme}`} 
                                    />
                                    {lpsUnseenCnt > 0 &&
                                        <span 
                                            className={`topbarIconBadge ${flame.energy}`}
                                            style={lpsUnseen.length > 0 
                                                ? {
                                                    opacity: "100%",
                                                    width: `${lpCntWidth}px`,
                                                    right: `-${lpCntWidth - 13}px`
                                                } : {
                                                    opacity: "0%", 
                                                    width: `${lpCntWidth}px`,
                                                    right: `-${lpCntWidth - 13}px`,
                                                    transitionDelay: "325ms", 
                                                    transition: "opacity 4000ms ease-in-out"
                                                }
                                            }
                                        >
                                            <span ref={lpCntRef}>{lpsUnseenCnt}</span>
                                        </span>
                                    }
                                </div>
                            )
                        }
                    </>
                ) : (
                    <>
                        <div 
                            className={`topbarIconItem ${lpMDD ? "INNER_BOX_SHADOW" : "BOX_SHADOW"} ${user.energy ? user.energy : "gray"}`}
                            onMouseEnter={() => setlpHover(true)} 
                            onMouseLeave={() => setlpHover(false)}
                            onMouseDown={() => setlpActive(true)} 
                            onMouseUp={() => setlpActive(false)}
                            onClick={() => lpMDD ? dispatch(lpMDDClose()) : dispatch(lpMDDOpen())}
                        >
                                
                                    <i
                                        className={`
                                            topbarPNGIcon
                                            PNG_ICON_TORCH
                                            lp
                                            ${colorTheme}
                                        `} 
                                        alt={`lp-${colorTheme}`} 
                                    />
                        
                            {lpsUnseenCnt > 0 &&
                                <span 
                                    className={`topbarIconBadge ${flame?.energy}`}
                                    style={lpsUnseen.length > 0  
                                        ? {
                                            opacity: "100%",
                                            width: `${lpCntWidth}px`,
                                            right: `-${lpCntWidth - 13}px`
                                        } : {
                                            opacity: "0%", 
                                            width: `${lpCntWidth}px`,
                                            right: `-${lpCntWidth - 13}px`,
                                            transitionDelay: "325ms", 
                                            transition: "opacity 4000ms ease-in-out"
                                        }
                                    }
                                >
                                    <span ref={lpCntRef}>{lpsUnseenCnt}</span>
                                </span>
                            }
                        </div>
                    </>
                )
            }
            <div className={`tbCMDropDown lp flame ${lpMDD ? "open" : ""}`} ref={lpMDomNode}>  
                <div className="lpDropdown flame">
                    <div className="lpDropdownContainer">
                        <div 
                            className={`
                                friendRequestsDropdownBackgroundTheme 
                                HIGHER_BACKGROUND
                                ${colorTheme}
                            `}  
                        />
                        <div className={`lpDropdown-container BOX_SHADOW ${user.unionName ? user.spectrum : user.energy}`}>
                            <div className="lpDropdownList">
                                {sortedConvs && sortedConvs.map((conv) =>  (
                                    <div 
                                        key={conv.conv?._id} 
                                        //onClick={() => handleClick(conv)}
                                    >
                                        <MessageNotice 
                                            conversation={conv.conv}
                                            latestSeen={conv.lm.seen} 
                                            lpMDD={lpMDD}
                                            currentUser={user} 
                                            cn={"mn"}
                                            //arrivalFlameMessage={arrivalFlameMessage}
                                            //arrivalUnionMessage={arrivalUnionMessage}
                                            //newMessage={newMessage}
                                        />
                                    </div>
                                )).splice(0,5)}
                            </div>
                            <div className="lpDropdownLinkContainer">
                                <hr 
                                    className={`
                                        friendRequestDropdownHr 
                                        ${colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                        ${colorTheme}
                                    `}
                                />
                                <div className="lpDropdownLinkContainerBottom">
                                    <Link className="lpDropdownLink" to="/messenger">
                                        <span className={`lpDropdownLinkText ${colorTheme}`}>
                                            See All Conversations
                                        </span>
                                    </Link>
                                    <span 
                                        className={`
                                            lpDropdownLinkBadge 
                                            ${colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                            ${colorTheme}
                                        `}
                                        style={lpMDD && lpsUnseen > 0 
                                            ? {
                                                opacity: "100%",
                                                width: `${lpCntWidth}px`,
                                                right: `-${lpCntWidth - 13}px`
                                            } : {
                                                opacity: "0%", 
                                                width: `${lpCntWidth}px`,
                                                right: `-${lpCntWidth - 13}px`,
                                                transitionDelay: "325ms", 
                                                transition: "opacity 4000ms ease-in-out"
                                            }
                                        }
                                    >
                                        <span ref={lpCntRef}>{lpsUnseenCnt}</span>
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

export default LightPracticeDropdown;