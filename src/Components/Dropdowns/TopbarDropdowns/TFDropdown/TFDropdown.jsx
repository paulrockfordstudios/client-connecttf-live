import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';

import "./TFDropdown.css";
import MessageNotice from '../../../MessageNotice/MessageNotice';
import { tfMDDOpen, tfMDDClose } from '../../../../Redux/AuthSlice';

function TFDropdown() {

    const { user, flame, tfMDD, arrMessageNot, arrMsgDoteNot } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const tfMDomNode = useRef(null);
    const tfMDDRef = useRef(null);
    const tfCntRef = useRef(null);

    //const [ tfMDD, settfMDD ] = useState(false);
    const [ tfHover, settfHover ] = useState(false);
    const [ tfActive, settfActive ] = useState(false);
    const [ tfCntWidth, settfCntWidth ] = useState();
    const [ tfsUnseen, settfsUnseen ] = useState([]);
    const [ tfsUnseenCnt, settfsUnseenCnt ] = useState(0);
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
        let tfMDDHandler = (event) => {
            var path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                dispatch(tfMDDClose())
            }
        };
        if (tfMDD) {
            document.body.addEventListener("click", tfMDDHandler);
            return () => {
                document.body.removeEventListener("click", tfMDDHandler);
            };
        }
      }, [tfMDD]);

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
                const cCWidth = tfCntRef.current.clientWidth;
                settfCntWidth(cCWidth + 12);
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
        if (tfsUnseenCnt) {
            const getCCWidth = () => {
                const cCWidth = tfCntRef.current.clientWidth;
                settfCntWidth(cCWidth + 12);
            }
            getCCWidth();
        }
    }, [tfsUnseenCnt]);

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
            let myUnseentfs = [];
            user.unionName
                ? myUnseentfs = unseenList.filter((utf) => utf.unionSenderId !== user._id)
                : myUnseentfs = unseenList.filter((ftf) => ftf.flameSenderId !== user._id)
            settfsUnseen(myUnseentfs)
            setUnseenList([]);
        }
    }, [unseenList.length])

    useEffect(() => {
        if(tfMDD && tfsUnseen.length > 0) {
            const putSeen = async () => {
                try {
                    await Promise.all(
                        tfsUnseen.map((msg) => {
                            axiosReq("PUT", `/messages/${msg._id}/seen`)
                        })
                    )
                } catch(err) {
                    console.log(err)
                }
                settfsUnseen([]);
                setTimeout(() => {
                    settfsUnseenCnt(0);
                }, 4325)     
            }
            putSeen();
        }
    }, [tfMDD]);

    useEffect(() => {
        if (tfsUnseen.length > 0) {
            settfsUnseenCnt(tfsUnseen.length)
        }
    }, [tfsUnseen.length])

    useEffect(() => { 
        if (effect4){
            setSortedConvs(convsList.sort((a, b) => new Date(a.lm.createdAt) < new Date(b.lm.createdAt) ? 1:-1))
            setEffect4(false)
        }
    }, [effect4]);
    
    return (

        <div className="topbarIconItemcontainer tf" ref={tfMDDRef}>
            {user.unionName ?
                (
                    <>
                        {tfMDD ?
                            (
                                <>
                                    <div 
                                        className={`
                                            tfDropdownHigherSpectrumBackground 
                                            ${user.unionName && colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                            ${colorTheme}
                                        `} 
                                    />
                                    <div className="tfDropdownWhiteBackground open" />
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
                                            tfHover 
                                                ? tfActive
                                                    ? 'HIGHER_BACKGROUND diamond drk lgt'
                                                    : 'HIGHER_BACKGROUND diamond lgt'
                                                : null
                                        }
                                        ${tfMDD ? "open" : "close"}
                                    `}
                                    onMouseEnter={() => settfHover(true)} 
                                    onMouseLeave={() => settfHover(false)}
                                    onMouseDown={() => settfActive(true)} 
                                    onMouseUp={() => settfActive(false)}
                                    onClick={() => tfMDD ? dispatch(tfMDDClose()) : dispatch(tfMDDOpen())}
                                >
                                    <img className="topbarPNGIcon" src="/logo/ConnectTF-logo-icon.png" alt="" />
                                    {/*
                                    <i
                                        className={`
                                            topbarPNGIcon
                                            PNG_ICON_tf${tfActive ? "_DRK" : ""}
                                            ${colorTheme}
                                        `} 
                                        alt={`tf-${colorTheme}`} 
                                    />
                                    */}
                                    {tfsUnseenCnt > 0 &&
                                        <span 
                                            className={`topbarIconBadge ${flame.energy}`}
                                            style={tfsUnseen.length > 0 
                                                ? {
                                                    opacity: "100%",
                                                    width: `${tfCntWidth}px`,
                                                    right: `-${tfCntWidth - 13}px`
                                                } : {
                                                    opacity: "0%", 
                                                    width: `${tfCntWidth}px`,
                                                    right: `-${tfCntWidth - 13}px`,
                                                    transitionDelay: "325ms", 
                                                    transition: "opacity 4000ms ease-in-out"
                                                }
                                            }
                                        >
                                            <span ref={tfCntRef}>{tfsUnseenCnt}</span>
                                        </span>
                                    }
                                </div>
                            ) : (
                                <div 
                                    className={`topbarIconItem ${tfMDD ? "INNER_BOX_SHADOW open" : "BOX_SHADOW close"} ${user.spectrum ? user.spectrum : "gray"}`}
                                    onMouseEnter={() => settfHover(true)} 
                                    onMouseLeave={() => settfHover(false)}
                                    onMouseDown={() => settfActive(true)} 
                                    onMouseUp={() => settfActive(false)}
                                    onClick={() => tfMDD ? dispatch(tfMDDClose()) : dispatch(tfMDDOpen())}
                                >
                                    <img className="topbarPNGIcon" src="/logo/ConnectTF-logo-icon.png" alt="" />
                                    {/*}
                                    <i
                                        className={`
                                            topbarPNGIcon
                                            PNG_ICON_tf${tfActive ? "_DRK" : ""}
                                            ${colorTheme}
                                        `} 
                                        alt={`tf-${colorTheme}`} 
                                    />
                                    */}
                                    {tfsUnseenCnt > 0 &&
                                        <span 
                                            className={`topbarIconBadge ${flame.energy}`}
                                            style={tfsUnseen.length > 0 
                                                ? {
                                                    opacity: "100%",
                                                    width: `${tfCntWidth}px`,
                                                    right: `-${tfCntWidth - 13}px`
                                                } : {
                                                    opacity: "0%", 
                                                    width: `${tfCntWidth}px`,
                                                    right: `-${tfCntWidth - 13}px`,
                                                    transitionDelay: "325ms", 
                                                    transition: "opacity 4000ms ease-in-out"
                                                }
                                            }
                                        >
                                            <span ref={tfCntRef}>{tfsUnseenCnt}</span>
                                        </span>
                                    }
                                </div>
                            )
                        }
                    </>
                ) : (
                    <>
                        <div 
                            className={`topbarIconItem ${tfMDD ? "INNER_BOX_SHADOW" : "BOX_SHADOW"} ${user.energy ? user.energy : "gray"}`}
                            onMouseEnter={() => settfHover(true)} 
                            onMouseLeave={() => settfHover(false)}
                            onMouseDown={() => settfActive(true)} 
                            onMouseUp={() => settfActive(false)}
                            onClick={() => tfMDD ? dispatch(tfMDDClose()) : dispatch(tfMDDOpen())}
                        >
                            <img className="topbarPNGIcon" src="/logo/ConnectTF-logo-icon.png" alt="" />
                                    {/*}
                                    <i
                                        className={`
                                            topbarPNGIcon
                                            PNG_ICON_tf${tfActive ? "_DRK" : ""}
                                            ${colorTheme}
                                        `} 
                                        alt={`tf-${colorTheme}`} 
                                    />
                                    */}
                            {tfsUnseenCnt > 0 &&
                                <span 
                                    className={`topbarIconBadge ${flame?.energy}`}
                                    style={tfsUnseen.length > 0  
                                        ? {
                                            opacity: "100%",
                                            width: `${tfCntWidth}px`,
                                            right: `-${tfCntWidth - 13}px`
                                        } : {
                                            opacity: "0%", 
                                            width: `${tfCntWidth}px`,
                                            right: `-${tfCntWidth - 13}px`,
                                            transitionDelay: "325ms", 
                                            transition: "opacity 4000ms ease-in-out"
                                        }
                                    }
                                >
                                    <span ref={tfCntRef}>{tfsUnseenCnt}</span>
                                </span>
                            }
                        </div>
                    </>
                )
            }
            <div className={`tbCMDropDown tf flame ${tfMDD ? "open" : ""}`} ref={tfMDomNode}>  
                <div className="tfDropdown flame">
                    <div className="tfDropdownContainer">
                        <div 
                            className={`
                                friendRequestsDropdownBackgroundTheme 
                                HIGHER_BACKGROUND
                                ${colorTheme}
                            `}  
                        />
                        <div className={`tfDropdown-container BOX_SHADOW ${user.unionName ? user.spectrum : user.energy}`}>
                            <div className="tfDropdownList">
                                {sortedConvs && sortedConvs.map((conv) =>  (
                                    <div 
                                        key={conv.conv?._id} 
                                        //onClick={() => handleClick(conv)}
                                    >
                                        <MessageNotice 
                                            conversation={conv.conv}
                                            latestSeen={conv.lm.seen} 
                                            tfMDD={tfMDD}
                                            currentUser={user} 
                                            cn={"mn"}
                                            //arrivalFlameMessage={arrivalFlameMessage}
                                            //arrivalUnionMessage={arrivalUnionMessage}
                                            //newMessage={newMessage}
                                        />
                                    </div>
                                )).splice(0,5)}
                            </div>
                            <div className="tfDropdownLinkContainer">
                                <hr 
                                    className={`
                                        friendRequestDropdownHr 
                                        ${colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                        ${colorTheme}
                                    `}
                                />
                                <div className="tfDropdownLinkContainerBottom">
                                    <Link className="tfDropdownLink" to="/messenger">
                                        <span className={`tfDropdownLinkText ${colorTheme}`}>
                                            See All Conversations
                                        </span>
                                    </Link>
                                    <span 
                                        className={`
                                            tfDropdownLinkBadge 
                                            ${colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                            ${colorTheme}
                                        `}
                                        style={tfMDD && tfsUnseen > 0 
                                            ? {
                                                opacity: "100%",
                                                width: `${tfCntWidth}px`,
                                                right: `-${tfCntWidth - 13}px`
                                            } : {
                                                opacity: "0%", 
                                                width: `${tfCntWidth}px`,
                                                right: `-${tfCntWidth - 13}px`,
                                                transitionDelay: "325ms", 
                                                transition: "opacity 4000ms ease-in-out"
                                            }
                                        }
                                    >
                                        <span ref={tfCntRef}>{tfsUnseenCnt}</span>
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

export default TFDropdown;