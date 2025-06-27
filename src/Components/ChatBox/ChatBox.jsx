import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import "./ChatBox.css";
import ChatMessage from '../ChatMessage/ChatMessage';
import { axiosReq } from '../../Utils/axiosConfig';
import EmojiEditor from '../Editors/EmojiEditor/EmojiEditor';
import uAvatar from "../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../Assets/picBlanks/no-avatar.jpg";
import MessageTextEditor from '../Editors/QuillTextEditors/MessageTextEditor/MessageTextEditor';
import { colorTheme } from '../../Utils/styling/colorTheme';
import { userConv1, userConv2, userConv3, setNewMsg } from "../../Redux/AuthSlice";
import HashtagEditor from '../Editors/HashtagEditor/HashtagEditor';
import activelyViewingMsgrCheck from '../../Utils/misc/activelyViewingMsgrCheck';
import uploadDataFiles from '../../Utils/misc/uploadDataFiles';
import { clearFlareTextEditor } from '../../Utils/misc/clearFlareTextEditor';
import { circleProgress } from '../../Lib/mui/misc';
import { addAPhotoIcon, cancelIcon, closeIcon, expandLessIcon, expandMoreIcon, fullScreenIcon, moreHorizIcon } from '../../Lib/mui/icons';

function ChatBox({
    cBox,
    conv,
    cUp, 
    newArrivalMessage,
    handleUp,
    handleDown,
    handleClose,
}) {

    const { user, mentions, onlineFlames, onlineUnions } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const scrollRef = useRef();
    const observer= useRef();
    const chatBoxFeedRef = useRef();
    const unreadCntRef = useRef();

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
    const [ friend, setFriend ] = useState({});
    const [ emojiBox, setEmojiBox ] = useState(false);
    const [ hashtagBox, setHashtagBox ] = useState(false);
    const [ hashtagInput, setHashtagInput ] = useState(false);
    const [ emoji, setEmoji ] = useState("");
    const [ query, setQuery ] = useState("");
    const [ results, setResults ] = useState([]);
    const [ conversation, setConversation ] = useState(conv);
    const [ mentionSuggestions, setMentionSuggestions ] = useState([]);
    const [ mentionBox, setMentionBox ] = useState(false);
    const [ mentionArr, setMentionArr ] = useState([]);
    const [ mentionPic, setMentionPic ] = useState(null);
    const [ mb, setMB ] = useState(false);
    const [ ms, setMS ] = useState([]);
    const [ unreadCntWidth, setUnreadCntWidth ] = useState();
    const [ unreadMsgs, setUnreadMsgs ] = useState([]);
    const [ unreadCnt, setUnreadCnt ] = useState(0);
    const [ newMessage, setNewMessage ] = useState("");
    const [ tagValue, setTagValue ] = useState([]);
 
    const PS = process.env.PHOTO_STORAGE;

    const CT = friend ? colorTheme(friend) : colorTheme(user);

    const flameReceiverId = conversation?.flameMembers?.find((fMember) => fMember !== user._id)
    const unionReceiverId = conversation?.unionMembers?.find((uMember) => uMember !== user._id);

    const message = {
        conversationId: conversation?._id,
        receiverType: flameReceiverId ? "flame" : "union",
        receiverId: flameReceiverId ? flameReceiverId : unionReceiverId,
        text: newMessage,
        photos: fileNames.map((fn) => {return `messages/${conversation?._id}/${user._id}` + "/" + fn}),
        mentions: mentionArr,
        hashtags: tagValue,
        liked: false,
        loved: false,
    };

    useEffect(() => {
        if (conv) {
            setConversation(conv)
        }
    }, [conv]);

    useEffect(() => {
        setMB(mentionBox)
    }, [mentionBox]);

    useEffect(() => {
        setMS(mentionSuggestions)
    }, [mentionSuggestions]);

    useEffect(() => {
        if (mentionPic) {
            setMentionArr([...mentionArr, mentionPic])
            setMentionPic(null)
        }
    }, [mentionPic]);

    useEffect(() => {
        if (newArrivalMessage) {
            setMessages((prev) => [newArrivalMessage, ...prev])
        }
    }, [newArrivalMessage]);

    useEffect(() => {
        if (newArrivalMessage && !cUp) {
            if (!newArrivalMessage.read) {
                setUnreadMsgs((prev) => [newArrivalMessage, ...prev]);
                setUnreadCnt(unreadCnt + 1);
            }
        }
    }, [newArrivalMessage]);

    useEffect(() => {
        if(cUp && unreadMsgs.length > 0) {
            setUnreadMsgs([]);
            const putRead = async () => {
                try {
                    await Promise.all(
                        unreadMsgs.map((msg) => {
                            axiosReq("PUT", `/messages/${msg._id}/read`)
                        })
                    )
                } catch(err) {
                    console.log(err)
                }    
            }
            putRead();
            setTimeout(() => {
                setUnreadCnt(0);
            }, 4325)
        }
    }, [cUp]);

    useEffect(() => {
        if (convertFiles) {
            files.map((file) => {
                const fileName = Date.now() + file.name;
                const folder = `messages/${conversation._id}/${user._id}`;
                const data = new FormData();
                data.append("name", fileName);
                data.append("folder", folder);
                data.append("file", file, fileName);
                dataFiles.push(data);
                fileNames.push(fileName);  
            });
        setFiles([]);
        setConvertFiles(false);
        }
    }, [convertFiles]);
    
    useEffect(() => {
        const getFriend = async () => {
            const res = flameReceiverId
                ? await axiosReq("GET", `/users?userId=${flameReceiverId}`)
                : await axiosReq("GET", `/unions?unionId=${unionReceiverId}`)
            setFriend(res.data);
        }
        getFriend();    
    }, [conversation]);

    useEffect(() => {
        if (conversation) {
            setCBLogo(false);
            const getMessages = async () => {
                const res = await axiosReq("GET", `/messages/${conversation._id}/${pageNum}`)
                setMessages(prevMessages => {return [...new Set([...prevMessages, ...res?.data.messageArr])]});
                setHasMore(res?.data.messageCnt > pageNum + 20)
                setLoading(false);
            }
            getMessages();
        } else {
            setLoading(false);
        }
    }, [pageNum, conversation?._id]);

    useEffect(() => {
        if (!cUp) {
            const getUnreadMessageCnt = async () => {
                const res = await axiosReq("GET", `/messages/${conversation._id}/${user._id}/unread`);
                if (res.data) {
                    setUnreadMsgs(res.data)
                    setUnreadCnt(res.data.length);
                }  
            }
            getUnreadMessageCnt();  
        }
    }, [cUp]);

    useEffect(() => {
        if (unreadCnt) {
            const getUCWidth = () => {
                const uCWidth = unreadCntRef.current.clientWidth;
                setUnreadCntWidth(uCWidth + 12);
            }
            getUCWidth();
        }
    }, [unreadCnt]);

    const lastMessageRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect(); 
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {  
                console.log("visible") 
                setPageNum(prev => prev + 20); 
            }
        })
        if (node) observer.current.observe(node)
    });

    useEffect(() => {
        setTimeout(() => {
            setCBLogo(true);
        }, 5000)    
    }, [pageNum]);

    useEffect(() => {
        if (pageNum !== 0) return;
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    useEffect(() => {
        if (query.length > 0) {
            const fnMentions = mentions.filter((m) => m.profileName[0].toLowerCase() === query[0].toLowerCase());
            setResults(fnMentions.filter((m) => m.profileName.toLowerCase().includes(query.toLowerCase())));
        } else {
            setResults([]);
        }
    }, [query]);

    

    const picHandler = (pick) => {
        setMentionBox(false);
        setMentionPic(pick);
    };

    const imgBtnHandler = (event) => {
        setEDFiles(edFiles.concat(Array.from(event.target.files)));
        setFiles(files.concat(Array.from(event.target.files)));
        setConvertFiles(true);
    };

    const removeFiles = (idx2Rmv) => {
        setEDFiles(edFiles.filter((_, index) => index !== idx2Rmv));
        setDataFiles(dataFiles.filter((_, index) => index !== idx2Rmv));
        setFileNames(fileNames.filter((_, index) => index !== idx2Rmv));
    };

    const emojiClickHandler = () => {
        if (!conversation) return;
        if (hashtagBox && hashtagInput) {htClickHandler()};
        if (mentionBox) {setMentionBox(false)}
        setEmojiBox(!emojiBox);  
    };

    const htClickHandler = () => {
        if (!conversation) return
        if (emojiBox) {emojiClickHandler()};
        if (mentionBox) {setMentionBox(false)}
        if (hashtagInput === true) {
            setHashtagInput(false);
            setTimeout(() => {
                setHashtagBox(false); 
            }, 325)
        } else {
            setHashtagBox(true);
            setTimeout(() => {
                setHashtagInput(true); 
            }, 325)
        }
    };

    const newConversationSelectionHandler = async (receiver) => {
        let uMems = [];
        let fMems = [];
        let existConv = user.unionName? {unionId: user._id} : {userId: user._id};
        const senderStatus = user.unionName? "union" : "flame";
        const receiverStatus = receiver.unionName? "union" : "flame";
        const senderId = user._id;
        const receiverId = receiver.id.substring(8, receiver.id.length);
        const res = await axiosReq("GET", `/conversations/findOne/${senderStatus}/${receiverStatus}/${senderId}/${receiverId}`);
        const result = res.data; 
        if (result) {
            setConversation(result)
            const resCnt = await axiosReq("GET", `/messages/count/${result._id}`)
            if (resCnt > 0) {
                if (cBox === "cb1") {
                    const conversation1 = {convo: result, openActive: true,}
                    Object.assign(existConv, conversation1);
                    dispatch(userConv1(conversation1))
                } else if (cBox === "cb2") {
                    const conversation2 = {convo: result, openActive: true,}
                    Object.assign(existConv, conversation2);
                    dispatch(userConv2(conversation2))
                } else if (cBox === "cb3") {
                    const conversation3 = {convo: result, openActive: true,}
                    Object.assign(existConv, conversation3);
                    dispatch(userConv3(conversation3))
                } else {
                    null
                }
                await axiosReq("PUT", `/${senderStatus}s/${senderId}`, existConv);
            }        
        } else {
            user.unionName? uMems.push(user._id) : fMems.push(user._id) 
            receiver.unionName? uMems.push(receiverId) : fMems.push(receiverId)
            const newConv = {unionMembers: uMems, flameMembers: fMems}
            const res = await axiosReq("POST", "/conversations/", newConv)
            setConversation(res.data)
        }
    };

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
            clearFlareTextEditor(`cb-fte-${friend._id}`);
            setFiles([]);
            setEDFiles([]);
            setFileNames([]);
        } catch(err) {
                console.log(err);
        }
    };

    
    return (
        <div className={`convBarConvContainer-container ${cUp ? "up" : "down"}`}>
            {CT === "rainbow" ||
             CT === "silver" ||
             CT === "gold" ||
             CT === "platinum" ||
             CT === "diamond" 
                ? <div 
                    className={`
                        convBarConvContainerBackgroundTheme 
                        HIGHER_BACKGROUND
                        ${cUp ? "up" : "down"}
                        ${CT}
                    `} 
                />
                : null
            }
            <div 
                className={
                    `convBarConvContainer 
                    ${cBox}
                    ${friend?.unionName? "union" : "flame"} 
                    ${cUp ? "up" : "down"} 
                    ${CT}`
                }
            >
                <div className="convBarContainerTop">
                    <div className={`convControlPanel ${CT}`}>
                        {cUp ?
                            (
                                <>
                                    <div className="convBarContainerTopLeft">
                                        <span className="convBarConvName">{friend.profileName}</span>
                                        {unreadCnt > 0 &&
                                            <span 
                                                className={`
                                                    cbUnreadCntBadge
                                                    ${CT === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                                                    ${CT}
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
                                                <span ref={unreadCntRef}>{unreadCnt}</span>
                                            </span>
                                        }
                                    </div>
                                    <div className="convBarContainerTopRight">
                                        <div className="convBarOptionBtns">
                                            <div style={{opacity: "0.3"}}>{moreHorizIcon}</div>
                                            <div className="convExpandBtn" onClick={() => handleDown()}>{expandMoreIcon}</div>
                                            <Link to="/messenger" state={conv}>
                                                {fullScreenIcon}
                                            </Link>
                                            <div className="convCloseBtn" onClick={() => handleClose()}>{closeIcon}</div>
                                        </div>   
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="convBarContainerTopLeft">
                                        <span className="convBarConvName">{friend.profileName}</span>
                                        {unreadCnt > 0 &&
                                            <span 
                                                className={`
                                                    cbUnreadCntBadge
                                                    ${CT === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                                                    ${CT}
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
                                                <span ref={unreadCntRef}>{unreadCnt}</span>
                                            </span>
                                        }
                                    </div>
                                    <div className="convBarContainerTopRight">
                                        <div className="convBarOptionBtns">
                                            <div className="convExpandBtn" onClick={() => handleUp()}>{expandLessIcon}</div>
                                            <div className="convCloseBtn" onClick={() => handleClose()}>{closeIcon}</div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
                <hr 
                    className={`
                        convBarHr 
                        ${CT === "diamond" ? "HIGHER_BACKGROUND" : ""}
                        ${CT}
                        mb
                    `} 
                />
                <div className="convBarContainerCenter" >
                    {messages ?
                        (
                            <>
                                {conversation ?
                                    (
                                        <div className="cbChatBoxTop conversation" id={`cb${conversation?._id}`} ref={chatBoxFeedRef}>
                                            <div className="cbChatBoxFeed" >
                                                {messages.map((message, index) => {
                                                    if (index === 0) {
                                                        return (
                                                            <div key={"cb-" + message._id} ref={scrollRef}>
                                                                <ChatMessage 
                                                                    message={message}
                                                                    conversation={conversation} 
                                                                    own={
                                                                    message.flameSenderId 
                                                                        ? message.flameSenderId === user._id 
                                                                        : message.unionSenderId === user._id
                                                                    }
                                                                    currentUser={user}
                                                                    user={friend}
                                                                    cb={true}
                                                                />
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <div key={"cb-" + message._id} >
                                                                <ChatMessage
                                                                    message={message} 
                                                                    conversation={conversation}
                                                                    own={
                                                                    message.flameSenderId 
                                                                        ? message.flameSenderId === user._id 
                                                                        : message.unionSenderId === user._id
                                                                    }
                                                                    currentUser={user}
                                                                    user={friend}
                                                                    cb={true}
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                })}
                                            </div>
                                            {loading 
                                                ? <div color="#aeb4b7" size="30px">{circleProgress}</div>
                                                : <>{cbLogo && <img className="cbFeedConnectTFLogo" src="/logo/ConnectTF-logo-icon.png" alt="" ref={lastMessageRef} />}</>
                                            }
                                            {mb &&
                                              
                                                    
                                                    <div 
                                                        className="cbMentionsContainer"
                                                        style={ms.length > 0 ? {height: "363px"} : {height: "0px"}}
                                                    >   
                                                    <div 
                                                        className={`
                                                            cbMentionsContainerBackgroundTheme
                                                            ${CT === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                                                            ${CT}
                                                        `}
                                                    />
                                                        <div className={`cbMentionsListContainer BOX_SHADOW ${CT}`} >
                                                        <ul className="mentionsPopupList">
                                                            {ms.map((m, index) => (
                                                                <div className={`mentionsPopupItem ${m.color}`} key={m.id} id={m.id} onClick={() => picHandler(m)}>
                                                                    <img 
                                                                        className="mentionsPopupAvatar" 
                                                                        src={m.unionName ? m.avatar ? PS + m.avatar : uAvatar : m.avatar ? PS + m.avatar : fAvatar}
                                                                        //onLoad={(e) => {e.currentTarget.src = PS + m.avatar}}
                                                                        onError={(e) => {e.currentTarget.src = m.unionName ? uAvatar : fAvatar}} 
                                                                        //alt="mention-avatar"
                                                                    />
                                                                    <i 
                                                                        className={`
                                                                            mentionsPopupIcon
                                                                            ${m.unionName ? "union" : "flame"} 
                                                                            PNG_ICON_${m.unionName ? "SPECTRUM" : "ENERGY"}
                                                                            ${m.color}
                                                                        `} 
                                                                    />
                                                                    <div className="mentionsPopupName">{m.profileName}</div>
                                                                </div>      
                                                            ))}
                                                        </ul>
                                                        </div>
                                                    </div>
                                                
                                            }
                                        </div>
                                    ) : (
                                        <div className="cbChatBoxTop">
                                            <input 
                                                type="text"
                                                className="chatBoxSearch" 
                                                placeholder='Sending to?' 
                                                onChange={(e) => setQuery(e.target.value)}
                                            />
                                            <hr 
                                                className={`
                                                    convBarHr 
                                                    ${CT === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                                    ${CT}
                                                `} 
                                            />
                                            <div className="chatBoxSearchResultsContainer">
                                                {query.length > 0 && results.map((m, index) => (
                                                    <div className={`mentionsPopupItem ${m.color}`} key={m.id} id={m.id} onClick={() => newConversationSelectionHandler(m)}>
                                                        <img 
                                                            className="mentionsPopupAvatar" 
                                                            src={m.unionName ? m.avatar ? PS + m.avatar : uAvatar : m.avatar ? PS + m.avatar : fAvatar}
                                                            //onLoad={(e) => {e.currentTarget.src = PS + m.avatar}}
                                                            onError={(e) => {e.currentTarget.src = m.unionName ? uAvatar : fAvatar}} 
                                                            //alt="mention-avatar"
                                                        />
                                                        <i 
                                                            className={`
                                                                mentionsPopupIcon
                                                                ${m.unionName ? "union" : "flame"} 
                                                                PNG_ICON_${m.unionName ? "SPECTRUM" : "ENERGY"}
                                                                ${m.color}
                                                            `} 
                                                        />
                                                        <div className="mentionsPopupName">{m.profileName}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )
                                }
                               <hr 
                                    className={`
                                        convBarHr 
                                        ${CT === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                        ${CT}
                                    `} 
                                />
                                <div className="convChatBoxBottom">
                                    <div 
                                        id={`cb-fte-${friend._id}`}
                                        className={`
                                            convChatTextEditor 
                                            ${conversation ? "" : "disabled"}
                                            ${emojiBox ? "ebOpen" : "ebClose"}
                                        `} 
                                    >
                                        <MessageTextEditor
                                            editorId={`cb-fte-${friend._id}`}
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
                                            disabled={conversation ? false : true}
                                        />
                                        {edFiles.length > 0 ? (
                                            <div className="createPostImages-container">
                                                {edFiles.map((file, index) => (
                                                    <div className={`createPostImageContainer ${index === 0 ? "top" : ""}`} key={index}>
                                                        <img className="createPostImg" src={URL.createObjectURL(file)} alt="" />
                                                        {CT === "rainbow" ||
                                                         CT === "silver" ||
                                                         CT === "gold" ||
                                                         CT === "platinum" ||
                                                         CT === "diamond" 
                                                            ? <img 
                                                                className={`createPostCancelImgPNGBtn ${CT}`}  
                                                                src={`/icons/cancel/cancel-${CT}.png`} 
                                                                alt="" 
                                                                onClick={() => removeFiles(index)}
                                                            />
                                                            : <div className={`createPostCancelImgSVGBtn ${CT}`} onClick={() => removeFiles(index)}>
                                                                {cancelIcon}
                                                            </div>
                                                        }
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}         
                                    </div>
                                    <div className="convChatControlPanel">
                                        <div className="convChatControlPanelLeft">
                                            <label htmlFor={`file${cBox}`} className="convChatOption" style={{maxHeight: "20px"}}>
                                                <div
                                                    className={`
                                                        convChatIcon
                                                        ${conversation ? "" : "disabled"}
                                                    `} 
                                                >
                                                    {addAPhotoIcon}
                                                </div>
                                                <input 
                                                    style={{display: "none"}} 
                                                    type="file" 
                                                    id={`file${cBox}`} 
                                                    multiple="multiple"
                                                    accept="image/*" 
                                                    disabled={conversation ? false : true}
                                                    onChange={(event) => imgBtnHandler(event)} 
                                                />
                                            </label>
                                            <i
                                                className={`
                                                    chatBoxPNGIcon 
                                                    PNG_ICON_EMOJI
                                                    ${conversation ? "" : "disabled"}
                                                `}
                                                //alt="emoji-picker-icon" 
                                                onClick={emojiClickHandler}
                                            />
                                            <i
                                                className={`
                                                    chatBoxPNGIcon 
                                                    PNG_ICON_HASHTAG
                                                    ${conversation ? "" : "disabled"}
                                                    ${CT}
                                                `}
                                                //alt="emoji-picker-icon" 
                                                onClick={htClickHandler}
                                            />
                                        </div>
                                        <button 
                                            className={`
                                                convChatSubmitBtn
                                                ${CT === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                                                ${conversation ? "" : "disabled"}
                                                ${CT}
                                            `} 
                                            onClick={(event) => handleSubmit(event)}
                                        >
                                            {CT === "diamond" 
                                                ? <span className="convChatBtnDiamondText">Send</span> 
                                                : "Send"
                                            }
                                        </button>
                                    </div>
                                </div> 
                            </>
                        ) : (
                            <span className="noConversationText">Open a coversation to start a chat</span>
                        )
                    }
                </div>            
                <div className="chatBoxHashtagEditor" style={hashtagBox ? {height: "358px", overflow: "visible"} : {height: "0px", overflow: "hidden"}}>
                    <HashtagEditor 
                        setTagValue={setTagValue}
                        colorTheme={CT}
                        type={"cb"} 
                        hashtagBox={hashtagBox}
                        hashtagInput={hashtagInput}
                    />
                </div>
                {!loading && conversation && friend && CT &&
                    <div 
                        id={`cb-ee-${cBox}`} 
                        className="chatBoxEmojiPickerContainer" 
                        style={emojiBox ? {height: "358px"} : {height: "0px"}}
                    >
                        <EmojiEditor 
                            editorId={`cb-ee-${cBox}`} 
                            color={CT}
                            setEmojiBox={setEmojiBox} 
                            setEmoji={setEmoji} 
                        />
                    </div>
                }
                <hr 
                    className={`
                        convBarHr 
                        ${CT === "diamond" ? "HIGHER_BACKGROUND" : ""}
                        ${CT}
                    `} 
                />
                <div className="convBarContainerBottom">                
                </div>
            </div>
        </div>                
    )
}

export default ChatBox;