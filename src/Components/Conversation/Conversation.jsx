import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import dateFormat, { masks } from "dateformat";
import { axiosReq } from '../../Utils/axiosConfig';
import DOMPurify from 'dompurify';
import "./Conversation.css";
import uAvatar from "../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../Assets/picBlanks/no-avatar.jpg";
import noBanner from "../../Assets/picBlanks/no-banner.jpg";

function Conversation({
    conversation, 
    currentUser, 
    cn, 
}) {

    const convUnreadCntRef = useRef();

    const { 
        sentMessage, 
        conv1, c1Up, 
        conv2, c2Up, 
        conv3, c3Up,
        newMsg,
        newArrFlameMsg,
        newArrUnionMsg,
    } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [user, setUser] = useState({});
    const [ messages, setMessages ] = useState([]);
    const [ latestMessage, setLatestMessage ] = useState({});
    const [ mDisplay1, setMDisplay1 ] = useState(true);
    const [ mDisplay2, setMDisplay2 ] = useState(true);
    const [ unreadCntWidth, setUnreadCntWidth ] = useState();
    const [ unsortedMsgs, setUnsortedMsgs ] = useState([])
    const [ unreadMsgs, setUnreadMsgs ] = useState([]);
    const [ unreadCnt, setUnreadCnt ] = useState(0);

    const colorTheme = user.unionName ? user.spectrum : user.energy
    
    useEffect(() => {
        const flameFriendId = conversation.flameMembers.find((fMember) => fMember !== currentUser._id);
        const unionFriendId = conversation.unionMembers.find((uMember) => uMember !== currentUser._id);
        const getUser = async () => {
            const res = flameFriendId
                ? await axiosReq("GET", `/users?userId=${flameFriendId}`)
                : await axiosReq("GET", `/unions?unionId=${unionFriendId}`)
            setUser(res.data);
        }
        getUser();
    }, [currentUser, conversation]);
   

    useEffect(() => {
        const getMessages = async () => {
            const res = await axiosReq("GET", `/messages/${conversation._id}`); 
            setMessages(res.data); 
        }
        getMessages();
    }, [conversation]);

    useEffect(() => {
        if (messages.length > 0) {
            setLatestMessage(messages[messages.length - 1]);
        }
    }, [messages]);

    useEffect(() => {
        if (user._id) {
            const getUnreadMessageCnt = async () => {
                const res = await axiosReq("GET", `/messages/${conversation._id}/${currentUser._id}/unread`); 
                if (res.data) {
                    setUnreadMsgs(res.data)
                    setUnreadCnt(res.data.length);
                }
            }
            getUnreadMessageCnt();
        }  
    }, [user._id]);

    useEffect(() => {
        if (unreadCnt > 0) {
            const getUCWidth = () => {
                const uCWidth = convUnreadCntRef?.current?.clientWidth;
                setUnreadCntWidth(uCWidth + 12);
            }
            getUCWidth();
        }
    }, [unreadCnt]);

    useEffect(() => {
        if (unreadMsgs.length === 0) {
            setTimeout(() => {
                setUnreadCnt(0);
            }, 4325)
        }
    }, [unreadMsgs.length]);

    //console.log(unreadMsgs.length)
    //console.log(unreadCnt)

    /*
    useEffect(() => {
        if (arrivalFlameMessage && arrivalFlameMessage.conversationId === conversation._id) {
            if (!arrivalFlameMessage.read) {
                setUnreadMsgs((prev) => [arrivalFlameMessage, ...prev]);
                setUnreadCnt(unreadCnt + 1);
            }
        }
    }, [arrivalFlameMessage]);
    */

    useEffect(() => {
        if (newArrFlameMsg && newArrFlameMsg.conversationId === conversation._id) {
            if (!newArrFlameMsg.read) {
                setUnreadMsgs((prev) => [newArrFlameMsg, ...prev]);
                setUnreadCnt(unreadCnt + 1);
            }
        }
    }, [newArrFlameMsg]);

    /*
    useEffect(() => {
        if (arrivalUnionMessage && arrivalUnionMessage.conversationId === conversation._id) {
            if (!arrivalUnionMessage.read) {
                setUnreadMsgs((prev) => [arrivalUnionMessage, ...prev]);
                setUnreadCnt(unreadCnt + 1);
            }
        }
    }, [arrivalUnionMessage]);
    */

    useEffect(() => {
        if (newArrUnionMsg && newArrUnionMsg.conversationId === conversation._id) {
            if (!newArrUnionMsg.read) {
                setUnreadMsgs((prev) => [newArrUnionMsg, ...prev]);
                setUnreadCnt(unreadCnt + 1);
            }
        }
    }, [newArrUnionMsg]);

    /*
    useEffect(() => {
        if (arrivalFlameMessage?.conversationId === conversation._id) {
            messages[messages.length - 1]?.flameSenderId === arrivalFlameMessage.flameSenderId 
                ? setMDisplay2(false)
                : setMDisplay1(false)
            setTimeout(() => {
                setLatestMessage(arrivalFlameMessage);
                messages[messages.length - 1]?.flameSenderId === arrivalFlameMessage.flameSenderId 
                    ? setMDisplay2(true)
                    : setMDisplay1(true)
                setMessages((prev) => [...prev, arrivalFlameMessage]);
            }, 3000);
        }
    }, [arrivalFlameMessage]);
    */

    useEffect(() => {
        if (newArrFlameMsg?.conversationId === conversation._id) {
            messages[messages.length - 1]?.flameSenderId === newArrFlameMsg.flameSenderId 
                ? setMDisplay2(false)
                : setMDisplay1(false)
            setTimeout(() => {
                setLatestMessage(newArrFlameMsg);
                messages[messages.length - 1]?.flameSenderId === newArrFlameMsg.flameSenderId 
                    ? setMDisplay2(true)
                    : setMDisplay1(true)
                setMessages((prev) => [...prev, newArrFlameMsg]);
            }, 3000);
        }
    }, [newArrFlameMsg]);

    /*
    useEffect(() => {
        if (arrivalUnionMessage?.conversationId === conversation._id) {
            messages[messages.length - 1]?.unionSenderId === arrivalUnionMessage.unionSenderId 
                ? setMDisplay2(false)
                : setMDisplay1(false)
            setTimeout(() => {
                setLatestMessage(arrivalUnionMessage);
                messages[messages.length - 1]?.unionSenderId === arrivalUnionMessage.unionSenderId 
                    ? setMDisplay2(true)
                    : setMDisplay1(true)
                setMessages((prev) => [...prev, arrivalUnionMessage]);
            }, 3000);
        }
    }, [arrivalUnionMessage]);
    */

    useEffect(() => {
        if (newArrUnionMsg?.conversationId === conversation._id) {
            messages[messages.length - 1]?.unionSenderId === newArrUnionMsg.unionSenderId 
                ? setMDisplay2(false)
                : setMDisplay1(false)
            setTimeout(() => {
                setLatestMessage(newArrUnionMsg);
                messages[messages.length - 1]?.unionSenderId === newArrUnionMsg.unionSenderId 
                    ? setMDisplay2(true)
                    : setMDisplay1(true)
                setMessages((prev) => [...prev, newArrUnionMsg]);
            }, 3000);
        }
    }, [newArrUnionMsg]);

    useEffect(() => {
        if (sentMessage?.conversationId === conversation._id) {
            if (messages[messages.length - 1]?.flameSenderId === sentMessage.flameSenderId) { 
                setMDisplay2(false)
                    setTimeout(() => {
                        //setLatestMessage(newMessage);
                        setLatestMessage(newMsg);
                        setMDisplay2(true);
                        setMessages((prev) => [...prev, sentMessage]);
                }, 3000);
            } else if (messages[messages.length - 1]?.flameSenderId === sentMessage.flameSenderId) { 
                setMDisplay2(false)
                    setTimeout(() => {
                        //setLatestMessage(newMessage);
                        setLatestMessage(newMsg);
                        setMDisplay2(true);
                        setMessages((prev) => [...prev, sentMessage]);
                }, 3000);
            } else {
                setMDisplay1(false)
                    setTimeout(() => {
                        //setLatestMessage(newMessage);
                        setLatestMessage(newMsg);
                        setMDisplay1(true);
                        setMessages((prev) => [...prev, sentMessage]);
                }, 3000);
            }
        }
    }, [sentMessage]);

    useEffect(() => {
        if (c1Up) {
            for (let i = 0; i < unreadMsgs.length; i++) {
                if (unreadMsgs[i].conversationId === conv1._id) {
                    setUnreadMsgs([]);
                    setUnreadCnt(0);
                }
            }
        }
    }, [c1Up])

    useEffect(() => {
        if (c2Up) {
            for (let i = 0; i < unreadMsgs.length; i++) {
                if (unreadMsgs[i].conversationId === conv2._id) {
                    setUnreadMsgs([]);
                    setUnreadCnt(0);
                }
            }
        }
    }, [c2Up])

    useEffect(() => {
        if (c3Up) {
            for (let i = 0; i < unreadMsgs.length; i++) {
                if (unreadMsgs[i].conversationId === conv3._id) {
                    setUnreadMsgs([]);
                    setUnreadCnt(0);
                }
            }
        }
    }, [c3Up])

    return (
        <>
            {messages.length > 0 ?
                (
                    <>
                        {user?.unionName ?
                            (
                                <>
                                    {user?.spectrum === "diamond" ?
                                        (
                                            <>
                                                <div className={`conversation ${cn}`} style={{backgroundImage: "url(/misc/diamond-sparkle-light.jpg)"}}>
                                                    <img 
                                                        className={`conversationProfilePic ${cn}`} 
                                                        src={user?.unionProfilePicture ? PS + user?.unionProfilePicture : uAvatar} 
                                                        onError={(e) => {e.currentTarget.src = uAvatar}}
                                                        //alt="union-avatar" 
                                                    />
                                                    <span className="conversationUserEnergy"></span>
                                                    <span className="conversationUserName">{user?.profileName}</span>
                                                    <span className="conversationLatestMessage"dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(latestMessage.text)}} />
                                                </div> 
                                            </>
                                        ) : (
                                            <>
                                                <div className={`conversation ${cn} ${user?.spectrum}`}>
                                                    <div className={`conversationLeft ${cn}`}>
                                                        <img 
                                                            className={`conversationProfilePic ${cn}`} 
                                                            src={user?.unionProfilePicture ? PS + user?.unionProfilePicture : uAvatar} 
                                                        onError={(e) => {e.currentTarget.src = uAvatar}}
                                                        //alt="union-avatar" 
                                                        />
                                                    </div>
                                                    <div className={`conversationRight ${cn} ${user?.energy}`}>
                                                        <div className="convRightTop">
                                                            <span className="conversationUserName">{user?.profileName}</span>
                                                            
                                                                <span 
                                                                    className={`
                                                                        convUnreadCntBadge
                                                                        ${colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                                                                        ${colorTheme}
                                                                    `}
                                                                    style={unreadMsgs.length > 0 
                                                                        ? {
                                                                            opacity: "100%",
                                                                            width: `${unreadCntWidth}px`,
                                                                            right: `-${unreadCntWidth - 13}px`
                                                                        } : {
                                                                            opacity: "0%", 
                                                                            width: `${unreadCntWidth}px`,
                                                                            right: `-${unreadCntWidth - 13}px`,
                                                                            transitionDelay: "325ms", 
                                                                            transition: "opacity 4000ms ease-in-out"
                                                                        }
                                                                    }
                                                                >
                                                                    <span ref={convUnreadCntRef}>{`${unreadCnt} unread`}</span>
                                                                </span>
                                                           
                                                            <span className="convLatestDateTime">{dateFormat(latestMessage.createdAt, "mmmm dS")}</span>
                                                        </div>
                                                        <div 
                                                            className="convRightBottom" 
                                                            style={mDisplay1 ? {opacity: "1"} : {opacity: "0"}}
                                                        >
                                                            <span className ="convSenderName">{`${latestMessage.flameSenderId === currentUser._id ? "you" : user?.profileName }:`}</span>
                                                        
                                                            {latestMessage.text?.length > 0 &&
                                                                <span 
                                                                    className="conversationLatestMessage" 
                                                                    style={mDisplay2 ? {opacity: "1"} : {opacity: "0"}}
                                                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(latestMessage.text)}} 
                                                                /> 
                                                            }
                                                            {latestMessage.photos?.length > 0 &&
                                                                <span 
                                                                    className="conversationLatestMessage" 
                                                                    style={mDisplay2 ? {opacity: "1"} : {opacity: "0"}}
                                                                >
                                                                    {`photo${latestMessage.photos?.length > 1 ? "s" : ""}`}
                                                                </span>
                                                            }       
                                                        </div>
                                                        <hr className={`conversationHr ${user?.spectrum}`} />
                                                    </div>
                                                </div> 
                                            </>
                                        )
                                    }
                                </>
                            ) : (
                                <>
                                    <div className={`conversation ${cn} ${user?.energy}`}>
                                        <div className={`conversationLeft ${cn}`}>
                                            <img 
                                                className={`conversationProfilePic ${cn}`} 
                                                src={user?.isAnonymous 
                                                    ? fAvatar 
                                                    : user?.profilePicture 
                                                        ? PS + user?.profilePicture 
                                                        : fAvatar
                                                } 
                                                onError={(e) => {e.currentTarget.src = fAvatar}}
                                                //alt="flame-avatar" 
                                            />
                                        </div>
                                        <div className={`conversationRight ${cn} ${user?.energy}`}>
                                            <div className="convRightTop">
                                                <div className="convRightTopLeft">
                                                    <span className="conversationUserName">{user?.isAnonymous ? "Anonymous User" : user?.profileName}</span>
                                                    {unreadCnt > 0 &&
                                                        <span 
                                                            className={`
                                                                convUnreadCntBadge
                                                                ${colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                                                                ${colorTheme}
                                                            `}
                                                            style={unreadMsgs.length > 0 
                                                                ? {
                                                                    opacity: "100%",
                                                                    width: `${unreadCntWidth}px`,
                                                                    right: `-${unreadCntWidth - 13}px`
                                                                } : {
                                                                    opacity: "0%", 
                                                                    width: `${unreadCntWidth}px`,
                                                                    right: `-${unreadCntWidth - 13}px`,
                                                                    transitionDelay: "325ms", 
                                                                    transition: "opacity 4000ms ease-in-out"
                                                                }
                                                            }
                                                        >
                                                            <span ref={convUnreadCntRef}>{`${unreadCnt} unread`}</span>
                                                        </span>
                                                    }
                                                </div>
                                                <span className="convLatestDateTime">{dateFormat(latestMessage.createdAt, "mmmm dS")}</span>
                                            </div>
                                            <div 
                                                className="convRightBottom" 
                                                style={mDisplay1 ? {opacity: "1"} : {opacity: "0"}}
                                            >
                                                <span className ="convSenderName">{`${latestMessage.flameSenderId === currentUser._id ? "you" : user?.profileName }:`}</span>
                                                {latestMessage.text?.length > 0 &&
                                                    <span 
                                                        className="conversationLatestMessage" 
                                                        style={mDisplay2 ? {opacity: "1"} : {opacity: "0"}}
                                                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(latestMessage.text)}} 
                                                    /> 
                                                }
                                                {latestMessage.photos?.length > 0 &&
                                                    <span 
                                                        className="conversationLatestMessage" 
                                                        style={mDisplay2 ? {opacity: "1"} : {opacity: "0"}}
                                                    >
                                                        {`photo${latestMessage.photos?.length > 1 ? "s" : ""}`}
                                                    </span>
                                                }
                                            </div>
                                            <hr className={`conversationHr ${user?.energy}`} />
                                        </div>    
                                        
                                    </div> 
                                </>
                            )
                        }    
                    </>
                ) : (null) 
            }
        </>  
    )
};

export default Conversation;