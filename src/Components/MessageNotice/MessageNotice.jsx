import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dateFormat, { masks } from "dateformat";
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify';
import { axiosReq } from '../../Utils/axiosConfig';
import uAvatar from "../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../Assets/picBlanks/no-avatar.jpg";
import "./MessageNotice.css";
import Conversation from '../Conversation/Conversation';


function MessageNotice({ 
    conversation, 
    latestSeen, 
    chatMDD, 
    newMessage, 
    latestConv, 
    setLatestConv }) {

    const { user: currentUser, newArrFlameMsg, newArrUnionMsg } = useSelector((state) => state.auth);

    const [user, setUser] = useState({});
    const [ messages, setMessages ] = useState([]);
    const [ messageCnt, setMessageCnt ] = useState(0);
    const [ latestMessage, setLatestMessage ] = useState({});
    const [ mDisplay1, setMDisplay1 ] = useState(true);
    const [ mDisplay2, setMDisplay2 ] = useState(true);
    const [ chatSeen, setChatSeen ] = useState(true);
    const [ unseenMsgs, setUnseenMsgs ] = useState([]);
    const [ unreadMsgs, setUnreadMsgs ] = useState([]);
    

    const colorTheme = user.unionName ? user.spectrum : user.energy;

    const PS = process.env.PHOTO_STORAGE;

    useEffect(() => {
        const flameFriendId = conversation?.flameMembers?.find((fMember) => fMember !== currentUser._id);
        const unionFriendId = conversation?.unionMembers?.find((uMember) => uMember !== currentUser._id);
        const getUser = async () => {
            try {
                const res = flameFriendId
                    ? await axiosReq("GET", `/users?userId=${flameFriendId}`)
                    : await axiosReq("GET", `/unions?unionId=${unionFriendId}`)
                setUser(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getUser();
    }, [currentUser, conversation]);

    

   
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axiosReq("GET", `/messages/${conversation?._id}`); 
                setMessages(res.data);
            } catch(err) {
                console.log(err);
            } 
        }
        getMessages();
    }, [conversation]);

    useEffect(() => {
        const getUnseenMessages = async () => {
            try {
                const res = await axiosReq("GET", `/messages/${conversation._id}/unseen`); 
                setUnseenMsgs(res.data);
                setChatSeen(unseenMsgs.length > 0 ? false : true)
            } catch(err) {
                console.log(err);
            } 
        }
        getUnseenMessages();
    }, [newArrFlameMsg, newArrUnionMsg]);

    useEffect(() => {
        if (newArrFlameMsg?.conversationId === conversation._id &&
            newArrFlameMsg?.flameSenderId !== currentUser._id) {
                if (chatSeen) {
                    setChatSeen(newArrFlameMsg.seen)
                }
        }
    }, [newArrFlameMsg]);

    useEffect(() => {
        if (newArrUnionMsg?.conversationId === conversation._id &&
            newArrUnionMsg?.flameSenderId !== currentUser._id) {
                if (chatSeen) {
                    setChatSeen(newArrUnionMsg.seen)
                }
        }
    }, [newArrUnionMsg]);
    
    useEffect(() => {
        const getUnreadMessages = async () => {
            try {
                const res = await axiosReq("GET", `/messages/${conversation._id}/unread`); 
                setUnreadMsgs(res.data);
            } catch(err) {
                console.log(err);
            } 
        }
        getUnreadMessages();
    }, [conversation]);

    useEffect(() => {
        if (messages.length > 0) {
            setLatestMessage(messages[messages.length - 1]);
        }
    }, [messages]);

    useEffect(() => {
        if (chatMDD) {
            setChatSeen(true);
        }
    },[chatMDD]);


    useEffect(() => {
        if (newArrFlameMsg?.conversationId === conversation?._id) {
            messages[messages.length - 1]?.flameSenderId === newArrFlameMsg?.flameSenderId 
                ? setMDisplay2(false)  
                : setMDisplay1(false)
            setTimeout(() => {
                setLatestMessage(newArrFlameMsg);
                messages[messages.length - 1]?.flameSenderId === newArrFlameMsg?.flameSenderId 
                    ? setMDisplay2(true)
                    : setMDisplay1(true)
                setMessages((prev) => [...prev, newArrFlameMsg]);
            }, 3000);
        }
    }, [newArrFlameMsg]);

    useEffect(() => {
        if (newArrUnionMsg?.conversationId === conversation?._id) {
            messages[messages.length - 1]?.unionsSenderId === newArrUnionMsg?.unionSenderId 
                ? setMDisplay2(false)  
                : setMDisplay1(false)
            setTimeout(() => {
                setLatestMessage(newArrUnionMsg);
                messages[messages.length - 1]?.unionSenderId === newArrUnionMsg?.unionSenderId 
                    ? setMDisplay2(true)
                    : setMDisplay1(true)
                setMessages((prev) => [...prev, newArrUnionMsg]);
            }, 3000);
        }
    }, [newArrUnionMsg]);




    return (
        <>
        {messages.length > 0 &&

        <Link className={`messageNotice`} to="/messenger" state={conversation}>
            <div className={`messageNoticeBackgroundTheme ${chatSeen ? "seen" : "unseen"} ${colorTheme}`} />
            <hr 
                className={`
                    messageNoticeHr 
                    top 
                    ${colorTheme === "diamond" ? "HIGHER_BACKGROUND" : "COLOR_HR"} 
                    ${colorTheme}
                `} 
            />
            <div className={`messageNoticeContainer`}>
                <div className="messageNoticeLeft">
                    <img 
                        className={`messageNoticeProfilePic`} 
                        src={user?.unionName 
                            ? user?.isAnonymous 
                                ? uAvatar 
                                : user?.unionProfilePicture 
                                    ? PS + user.unionProfilePicture 
                                    : uAvatar
                            : user?.isAnonymous 
                                ? fAvatar 
                                : user?.profilePicture 
                                    ? PS + user.profilePicture 
                                    : fAvatar
                        } 
                        onError={(e) => {e.currentTarget.src = uAvatar}}
                        //alt="union-avatar" 
                    />
                    <i
                        className={`
                            messageNoticeIcon 
                            PNG_ICON_${user.unionName ? "SPECTRUM" : "ENERGY"} 
                            ${colorTheme}
                        `}
                        //alt="avatar-icon" 
                    />
                </div>
                <div className={`messageNoticeRight ${colorTheme}`}>
                    <div className="messageNoticeRightTop"> 
                        <div className="messageNoticeTitle">
                            <div className="messageNoticeTitleLeft">
                                <span className="messageNoticeName">{user.profileName}</span> 
                                <span className="messageNoticeAction">
                                    {`${user.unionName ? "have" : "has"} ${messageCnt > 1 ? `sent you ${messageCnt} messages!` : "sent you a message"}`}
                                </span>
                            </div>
                            <div className="messageNoticeTitleRight">
                                <span className="convLatestDateTime">{dateFormat(latestMessage?.createdAt, "mmmm dS")}</span>
                            </div>
                        </div>
                    </div>                                                      
                    <div className="messageNoticeRightBottom"  /*style={{ opacity: `${fade}%`}}*/>
                        <span className ="convSenderName">
                            {`${latestMessage?.flameSenderId === currentUser._id ? "you" : user?.profileName }:`}
                        </span>                                                
                        {latestMessage?.text?.length > 0 &&
                            <span 
                                className="conversationLatestMessage" 
                                style={mDisplay2 ? {opacity: "1"} : {opacity: "0"}}
                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(latestMessage.text)}} 
                            /> 
                        }
                        {latestMessage?.photos?.length > 0 &&
                            <span 
                                className="conversationLatestMessage" 
                                style={mDisplay2 ? {opacity: "1"} : {opacity: "0"}}
                            >
                                {`photo${latestMessage?.photos?.length > 1 ? "s" : ""}`}
                            </span>
                        }                        
                    </div>
                </div>
            </div>
            <hr 
                className={`
                    messageNoticeHr 
                    bottom 
                    ${colorTheme === "diamond" ? "HIGHER_BACKGROUND" : "COLOR_HR"} 
                    ${colorTheme}
                `} 
            />
      
       </Link>
}
</>
    )
}


export default MessageNotice