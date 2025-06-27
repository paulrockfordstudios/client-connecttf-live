import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { newSentMessage, userMessenger, setNewMsg } from '../../Redux/AuthSlice';
import ChatMessage from '../../Components/ChatMessage/ChatMessage';
import ChatOnline from '../../Components/ChatOnline/ChatOnline';
import Conversation from '../../Components/Conversation/Conversation';
import "./Messenger.css";
import { axiosReq } from '../../Utils/axiosConfig';
import activelyViewingMsgrCheck from '../../Utils/misc/activelyViewingMsgrCheck';
import uploadDataFiles from '../../Utils/misc/uploadDataFiles';
import { clearFlareTextEditor } from '../../Utils/misc/clearFlareTextEditor';
import MessageTextEditor from '../../Components/Editors/QuillTextEditors/MessageTextEditor/MessageTextEditor';
import { circleProgress } from '../../Lib/mui/misc';



function Messenger({ conversations }) {

    const { user, onlineFlames, onlineUnions, newArrFlameMsg, newArrUnionMsg } = useSelector((state) => state.auth);

    const location = useLocation();
    let { conv } = {}
    if (location) { 
    conv = location.state;
    }

    const dispatch = useDispatch();

    const scrollRef = useRef();
    const observer= useRef();
    const chatBoxFeedRef = useRef();


    const [ files, setFiles ] = useState([]);
    const [ edFiles, setEDFiles ] = useState([]);
    const [ dataFiles, setDataFiles ] = useState([]);
    const [ fileNames, setFileNames ] = useState([]);
    const [ convertFiles, setConvertFiles ] = useState(false);
    const [ cbLogo, setCBLogo ] = useState(false);
    const [ messages, setMessages ] = useState([]);
    const [ pageNum, setPageNum ] = useState(0); 
    const [ hasMore, setHasMore ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ currentChat, setCurrentChat ] = useState(conv ? conv : null);
    const [ emoji, setEmoji ] = useState("");
    const [ value, setValue ] = useState("");
    const [ friend, setFriend ] = useState({});
    const [ mentionSuggestions, setMentionSuggestions ] = useState([]);
    const [ mentionBox, setMentionBox ] = useState(false);
    const [ mentionArr, setMentionArr ] = useState([]);
    const [ mentionPic, setMentionPic ] = useState(null);
    const [ newMessage, setNewMessage ] = useState("");
    const [ tagValue, setTagValue ] = useState([]);

    const message = {
        conversationId: currentChat?._id,
        receiverType: friend.unionName ? "flame" : "union",
        receiverId: friend._id,
        text: newMessage,
        photos: fileNames.map((fn) => {return `messages/${currentChat?._id}/${user._id}` + "/" + fn}),
        mentions: mentionArr,
        hashtags: tagValue,
        liked: false,
        loved: false,

    }
    

    useEffect(() => {
        setCBLogo(false);
        const getMessages = async () => {
            try {
                const res = await axiosReq("GET", `/messages/${currentChat?._id}/${pageNum}`)
                setMessages(prevMessages => {
                    return [...new Set([...prevMessages, ...res.data.messageArr])]
                });
                setHasMore(res.data.messageCnt > pageNum + 30);
                setLoading(false);
            } catch(err) {console.log(err)} 
        }
        getMessages();
    }, [currentChat, pageNum]);

    useEffect(() => {
        if (currentChat) {
            const flameFriend = currentChat.flameMembers?.find((fMember) => fMember !== user._id)
            const unionFriend = currentChat.unionMembers?.find((uMember) => uMember !== user._id);
            const getFriend = async () => {
                const res = flameFriend
                ? await axiosReq("GET", `/users?userId=${flameFriend}`)
                : await axiosReq("GET", `/unions?unionId=${unionFriend}`) 
                setFriend(res.data);
            }
            getFriend();
        }
    }, [currentChat]);


    useEffect(() => {
        newArrFlameMsg && currentChat?.flameMembers.includes(newArrFlameMsg.flameSenderId) &&
        setMessages((prev) => [newArrFlameMsg, ...prev]);
        newArrUnionMsg && currentChat?.unionMembers.includes(newArrUnionMsg.unionSenderId) &&
        setMessages((prev) => [newArrUnionMsg, ...prev]);
    }, [newArrFlameMsg, newArrUnionMsg, currentChat]);

    const lastMessageRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect(); 
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNum(prev => prev + 30); 
            }
        })
        if (node) observer.current.observe(node)
    })

    useEffect(() => {
        if (pageNum === 0) {
            scrollRef.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    useEffect(() => {
        setTimeout(() => {
            setCBLogo(true);
        }, 5000)    
    }, [pageNum])

    const convClickHandler = async (e, conv) => {
        e.preventDefault;
        let newConv = {};
        setCurrentChat(conv);
        user.unionName 
            ? newConv = {
                unionId: user._id,
                messenger: {
                    convo: conv,
                }
            }
            : newConv = {
                userId: user._id,
                messenger: {
                    convo: conv,
                }
            }
        dispatch(userMessenger(newConv.messenger))
        try {
            user.unionName
                ? await axiosReq("PUT", `/unions/${user._id}`, newConv)
                : await axiosReq("PUT", `/users/${user._id}`, newConv)
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        Object.assign(message, user.unionName ? {unionSenderId: user._id} : {flameSenderId: user._id});
        const viewing = await activelyViewingMsgrCheck(user, friend, onlineFlames, onlineUnions);
        Object.assign(message, viewing ? {seen: true, read: true} : {seen: false, read: false});
        const uploadDfs = uploadDataFiles(dataFiles);
        if (uploadDfs) setDataFiles([]);
        try {
            const res = await axiosReq("POST", "/messages", message);
            Object.assign(message, {_id: res.data._id});
            dispatch(setNewMsg(message));
            setMessages([res.data, ...messages]);
            clearFlareTextEditor(`msgr-fte-${friend._id}`);
            setFiles([]);
            setEDFiles([]);
            setFileNames([]);
        } catch(err) {
                console.log(err);
        }
    };


    return (
        <>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenu-container">
                        <input className="chatMenuInput" placeHolder="Search for friends" />
                        <div className="chatMenuContainer union">
                            <span className={`chatMenuContainerText ${user.unionName ? user.spectrum : user.energy}`}>Union Conversations</span>
                            {user.unionName ?
                                (
                                    <>
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <img className="chatMenuHrDiamond" src="/misc/diamond-sparkle.jpg"/>
                                                </>
                                            ) : (
                                                <>
                                                    <hr className={`chatMenuHr ${user.spectrum}`} />
                                                </>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        <hr className={`chatMenuHr ${user.energy}`} />
                                    </>
                                )
                            }
                            {conversations.map((conv) => user.unionName ?
                                (
                                    conv.unionMembers.length === 2 &&
                                        <div key={`msgr-${conv._id}`} onClick={(e) => convClickHandler(e, conv)}>
                                            <Conversation 
                                                conversation={conv} 
                                                currentUser={user} 
                                                cn={"mb"}
                                            />
                                        </div>
                                ) : (
                                    conv.unionMembers.length === 1 &&
                                        <div key={`msgr-${conv._id}`} onClick={(e) => convClickHandler(e, conv)}>
                                            <Conversation 
                                                conversation={conv} 
                                                currentUser={user} 
                                                cn={"mb"}
                                            />
                                        </div>
                                )
                            )} 
                        </div>
                        <div className="chatMenuContainer flame">
                            <span className={`chatMenuContainerText ${user.unionName ? user.spectrum : user.energy}`}>Flame Conversations</span>
                            <hr className={`chatMenuHr ${user.unionName? user.spectrum : user.energy}`} />
                            {conversations.map((conv) => user.unionName ?
                                (
                                    conv.flameMembers.length === 1 &&
                                        <div key={`msgr-${conv._id}`} onClick={(e) => convClickHandler(e, conv)}>
                                            <Conversation 
                                                conversation={conv} 
                                                currentUser={user} 
                                                cn={"mb"}
                                            />
                                        </div>
                                ) : (
                                    conv.flameMembers.length === 2 &&
                                        <div key={`msgr-${conv._id}`} onClick={(e) => convClickHandler(e, conv)}>
                                            <Conversation 
                                                conversation={conv} 
                                                currentUser={user} 
                                                cn={"mb"}
                                            />
                                        </div>
                                )
                            )} 
                        </div>
                    </div>
                </div> 
                <div className="chatBox">
                    <div className="chatBox-container">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                
                                    <div className="chatBoxFeed" ref={chatBoxFeedRef}>
                                    {messages.map((message, index) => {
                                        if (index === 0) {
                                            return (
                                                <div key={message._id} ref={scrollRef}>
                                                    <ChatMessage 
                                                        message={message}
                                                        index={index} 
                                                        own={
                                                        message.flameSenderId 
                                                            ? message.flameSenderId === user._id 
                                                            : message.unionSenderId === user._id
                                                        }
                                                        currentUser={user}
                                                        user={friend}
                                                    />
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={message._id} >
                                                    <ChatMessage 
                                                        message={message} 
                                                        index={index}
                                                        own={
                                                        message.flameSenderId 
                                                            ? message.flameSenderId === user._id 
                                                            : message.unionSenderId === user._id
                                                        }
                                                        currentUser={user}
                                                        user={friend}
                                                    />
                                                </div>
                                            )
                                        }
                                    })}
                                    </div>
                                    {loading 
                                        ? <div color="#aeb4b7" size="30px" >{circleProgress}</div>
                                        : <>{cbLogo && <img className="postFeedConnectTFLogo" src="/logo/ConnectTF-logo-icon.png" alt="" ref={lastMessageRef} />}</>
                                    }
                                </div>
                                <div className="chatBoxBottom">
                                    <div className="chatMessageInput">
                                        <MessageTextEditor
                                            editorId={`msgr-fte-${friend._id}`}
                                            setValue={setNewMessage} 
                                            ph=" Write a description... "
                                            emoji={emoji}
                                            setEmoji={setEmoji}
                                            mentionBox={mentionBox}
                                            setMentionBox={setMentionBox}
                                            mentionSuggestions={mentionSuggestions}
                                            setMentionSuggestions={setMentionSuggestions}
                                            mentionPic={mentionPic}
                                            setMentionPic={setMentionPic}
                                            disabled={currentChat ? false : true}
                                        />
                                    </div>
                                    <button className="chatSubmitBtn" onClick={(event) => handleSubmit(event)}>Send</button>
                                </div> 
                            </>
                        ) : (
                             <span className="noConversationText">Open a coversation to start a chat</span>
                        )}
                    </div>  
                </div> 
                <div className="chatOnline">
                    <div className="chatOnline-container">
                        <ChatOnline 
                            setCurrentChat={setCurrentChat} 
                        />
                    </div>
                </div>                    
            </div>
        </>
    )
};

export default Messenger;