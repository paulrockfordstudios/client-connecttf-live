import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import DOMPurify from 'dompurify';
import "./ChatMessage.css";
import { axiosReq } from '../../Utils/axiosConfig';
import uAvatar from "../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../Assets/picBlanks/no-avatar.jpg";
import noBanner from "../../Assets/picBlanks/no-banner.jpg";
import { colorTheme } from '../../Utils/styling/colorTheme';
import { setNewLikeMsg, setNewUnlikeMsg, setNewLoveMsg, setNewUnloveMsg, setNewMsgDoteNot } from '../../Redux/AuthSlice';
import activelyViewingMsgrCheck from '../../Utils/misc/activelyViewingMsgrCheck';

function ChatMessage({
    message,
    conversation, 
    index, 
    mSender, 
    own, 
    currentUser,
    user, 
    cb, 
}) {

    const { sender, arrLikeMsg, arrUnlikeMsg, arrLoveMsg, arrUnloveMsg, onlineFlames, onlineUnions } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [ photoLoad, setPhotoLoad ] = useState(true);
    const [ lklvHov, setLKLVHov ] = useState(false);
    const [ isLiked, setIsLiked ] = useState(message.liked);
    const [ isUnliked, setIsUnliked ] = useState(message.unliked);
    const [ isLoved, setIsLoved ] = useState(message.loved);
    const [ isUnloved, setIsUnloved ] = useState(message.unloved);
    const [ actView, setActView ] = useState(false)

    const flameFriendId = message.flameSenderId;
    const unionFriendId = message.unionSenderId;

    const PS = process.env.PHOTO_STORAGE;

    const mTextDiv = document.getElementById(`cmt-${message._id}`);
    const linkElems = mTextDiv?.getElementsByTagName('a');

    const msgDote = {
            messageId: message._id,
            conversationId: message.conversationId,
            receiverId: flameFriendId ? flameFriendId : unionFriendId,
            receiverType: flameFriendId ? "flame" : "union",
    }

    const msgDoteNot = {
        messageId: message._id,
        senderType: currentUser.unionName ? "union" : "flame",
        sender: sender,
        receiverType: flameFriendId ? "flame" : "union",
        receiverId: flameFriendId ? flameFriendId : unionFriendId,
    }

    useEffect(() => {
        if (arrLikeMsg) {
            if (arrLikeMsg.messageId === message._id) {
                setIsLiked(arrLikeMsg.liked)
            }
        }
    }, [arrLikeMsg])

    useEffect(() => {
        if (arrUnlikeMsg) {
            if (arrUnlikeMsg.messageId === message._id) {
                setIsLiked(arrUnlikeMsg.liked)
                setIsUnliked(arrUnlikeMsg.unliked)
            }
        }
    }, [arrUnlikeMsg])

    useEffect(() => {
        if (arrLoveMsg) {
            if (arrLoveMsg.messageId === message._id) {
                setIsLoved(arrLoveMsg.loved)
            }
        }
    }, [arrLoveMsg])

    useEffect(() => {
        if (arrUnloveMsg) {
            if (arrUnloveMsg.messageId === message._id) {
                setIsLoved(arrUnloveMsg.loved)
                setIsUnloved(arrUnloveMsg.unloved)
            }
        }
    }, [arrUnloveMsg])

    useEffect(() => {
        if (linkElems) {
            let linkElem = null;
            let mElem = null;
            if (message.mentions?.length > 0) {
                for (let i = 0; i < linkElems?.length; i++) {linkElem = linkElems.item(i)};
                for (let m = 0; m < message.mentions.length; m++) {mElem = message.mentions[m]};
                if (mElem?.link === linkElem?.getAttribute('href')) {
                    linkElem.classList.remove(...linkElem.classList)
                    linkElem?.classList.add('mentionLink');
                    linkElem?.classList.add(`${mElem.color}`);
                }
            }
        }
    }, [linkElems, message.mentions]);

    // Dote choice button click handler.
    const doteHandler = async (e, type) => {
        e.preventDefault();
        // Converts true/false statement into either/or dote type.
        const dote = type === "like";
        // Adds dote type to dote notification state.
        Object.assign(msgDoteNot, dote ? {doteType: "like"} : {doteType: "love"});
        // If message is liked or loved prior to click event,
        if (dote ? isLiked : isLoved) {
            // Messege dote is reverted and an
            // unliked/unloved key:value is added to message dote update
            Object.assign(msgDote, dote ? {liked: false} : {loved: false});
            Object.assign(msgDote, dote ? {unliked: true} : {unloved: true});
            // Message is updated that message dote has been recanted.
            try {
                axiosReq("PUT", `/messages/${message._id}/${type}`);
                dispatch(dote ? setNewUnlikeMsg(msgDote) : setNewUnloveMsg(msgDote));
                dote ? setIsLiked(false) : setIsLoved(false);
            } catch(err) {console.log(err)} 
        // Else if message is NOT liked or loved prior to click event, 
        } else {
            // A message dote is added to message dote update state
            Object.assign(msgDote, dote ? {liked: true} : {loved: true});
            // Message is updated with message dote.
            try {
                axiosReq("PUT", `/messages/${message._id}/${type}`);
                dispatch(dote ? setNewLikeMsg(msgDote) : setNewLoveMsg(msgDote));
                dote ? setIsLiked(true) : setIsLoved(true);
            } catch(err) {console.log(err)} 
            // If message is NOT unliked or unloved once already yet, 
            if (dote ? isUnliked : isUnloved) return;
            // Function checks to see if the user is viewing the currentUser's messages.
            const viewing = await activelyViewingMsgrCheck(currentUser, user, onlineFlames, onlineUnions);
            // If the user is NOT viewing the currentUser's messages,
            if (viewing) return;
            // A message dote notification is sent to the user.
            try {
                axiosReq("POST", '/msgDoteNots', msgDoteNot);
                dispatch(setNewMsgDoteNot(msgDoteNot)); 
            } catch(err) {console.log(err)}    
        }          
    };

    
    return (
        <div 
            className={own ? `chatMessage own ` : `chatMessage them`}
        >
            <div className="chatMessageTop">
                {own ? (
                    <>
                        <div 
                            className={`
                                chatMessageContainer 
                                own 
                                ${colorTheme(currentUser)}
                            `}
                        >
                            <div 
                                id={`cmt-${message._id}`}
                                className="chatMessageText"  
                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(message.text)}} 
                            />
                            {message?.photos?.length > 0 &&
                                <div className="photoFullDisplay-container">
                                    <ul className="cbPhotoList">      
                                        {message?.photos?.map((photo, index) => (
                                            <li className="photos" key={index}>
                                                <div 
                                                    className={`cbPostImgBackground BCKGRND_LGT ${colorTheme(currentUser)}`}
                                                    style={photoLoad ? {opacity: "0"} : {opacit: "1"}}
                                                />
                                                <img 
                                                    className="cbPostImg" 
                                                    src={photo ? PS + photo : noBanner}
                                                    style={photoLoad ? {opacity: "1"} : {opacity: "0"}}
                                                    onLoad={(e) => {
                                                        e.target.src === PS + photo
                                                            ? setPhotoLoad(true)
                                                            : setPhotoLoad(false)
                                                    }} 
                                                    onError={(e) => {
                                                        e.currentTarget.src = noBanner
                                                        setPhotoLoad(false)
                                                    }}
                                                    //alt="photo-img"  
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }
                            {message.hashtags.length > 0 &&
                                <div className="chatMessageHashtagList">
                                    {message.hashtags.map((hashtag, index) => (
                                        <Link to={`/hashtag/${hashtag.substring(1)}`}>
                                            <span 
                                                key={index}
                                                className={`chatMessageHashtags own ${colorTheme(currentUser)}`}
                                            >
                                                {hashtag}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            }
                            {isLiked &&
                                <div className="cmAppreciatedPNGIconContainer cmRight">
                                    <i className="cmAppreciatedPNGIcon PNG_ICON_LIKED_LGT"/>
                                </div>
                            }
                            {isLoved &&
                                <div className="cmAppreciatedPNGIconContainer cmRight">
                                    <i className="cmAppreciatedPNGIcon PNG_ICON_LOVED_LGT" />
                                </div>
                            }
                        </div>
                        {cb ?
                            (<></>)
                            :
                            (
                                <>
                                    {currentUser?.unionName
                                        ? <img 
                                            className="chatMessageProfilePic" 
                                            src={currentUser.unionProfilePicture? PS + currentUser.unionProfilePicture : uAvatar} 
                                            onError={(e) => {e.currentTarget.src = uAvatar}}
                                            alt="" 
                                        />
                                        : <img 
                                            className="chatMessageProfilePic" 
                                            src={user.isAnonymous ? fAvatar : currentUser.profilePicture? PS + currentUser.profilePicture : fAvatar}
                                            onError={(e) => {e.currentTarget.src = fAvatar}}
                                            alt="" 
                                        />
                                    } 
                                </>
                            ) 
                        }
                    </>
                ) : (
                    <>
                        {cb ?
                            (<></>)
                            :
                            (
                                <>
                                    {user.unionName
                                        ? <img 
                                            className="chatMessageProfilePic" 
                                            src={user.unionProfilePicture? PS + user.unionProfilePicture : uAvatar} 
                                            onError={(e) => {e.currentTarget.src = uAvatar}}
                                            alt="" 
                                        />
                                        : <img 
                                            className="chatMessageProfilePic" 
                                            src={user.isAnonymous ? fAvatar : user.profilePicture? PS + user.profilePicture : fAvatar}
                                            onError={(e) => {e.currentTarget.src = fAvatar}}
                                            alt="" 
                                        />
                                    } 
                                </>
                            ) 
                        }
                        <div 
                            className={`
                                chatMessageContainer 
                                them 
                                ${user.unionName ? user.spectrum : user.energy}
                            `}
                            onMouseEnter={() => setLKLVHov(true)}
                            onMouseLeave={() => setLKLVHov(false)}
                        >
                            <div 
                                id={`cmt-${message._id}`}
                                className="chatMessageText"  
                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(message.text)}} 
                            />
                            {message?.photos?.length > 0 &&
                                <div className="photoFullDisplay-container">
                                    <ul className="cbPhotoList">      
                                        {message?.photos?.map((photo, index) => (
                                            <li className="photos" key={index}>
                                                <div 
                                                    className={`cbPostImgBackground BCKGND_LGT ${colorTheme(user)}`}
                                                    style={photoLoad ? {opacity: "0"} : {opacit: "1"}}
                                                />
                                                <img 
                                                    className="cbPostImg" 
                                                    src={photo ? PS + photo : noBanner}
                                                    style={photoLoad ? {opacity: "1"} : {opacit: "0"}}
                                                    onLoad={(e) => {
                                                        e.target.src === PS + photo
                                                            ? setPhotoLoad(true)
                                                            : setPhotoLoad(false)
                                                    }} 
                                                    onError={(e) => {
                                                        e.currentTarget.src = noBanner
                                                        setPhotoLoad(false)
                                                    }}
                                                    //alt="photo-img" 
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }
                            {message.hashtags.length > 0 &&
                                <div className="chatMessageHashtagList">
                                    {message.hashtags.map((hashtag, index) => (
                                        <Link to={`/hashtag/${hashtag.substring(1)}`}>
                                            <span 
                                                key={index}
                                                className={`chatMessageHashtags them ${colorTheme(user)}`}
                                            >
                                                {hashtag}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            }
                            {lklvHov && isLiked === false && isLoved === false &&
                                <div 
                                    className={`chatMessageAppreciationPopup ${colorTheme(user)}`}
                                    onMouseEnter={() => setLKLVHov(true)}
                                    //onMouseLeave={() => setLKLVHov(false)}
                                >
                                    <div className="cmPNGIconContainer">
                                        <i 
                                            className="chatMessagePNGIcon PNG_ICON_LIKE"
                                            onClick={(e) => doteHandler(e, "like")} 
                                        />
                                        <i 
                                            className="chatMessagePNGIcon PNG_ICON_LOVE" 
                                            onClick={(e) => doteHandler(e, "love")} 
                                        />
                                    </div>
                                </div>
                            }
                            {isLiked &&
                                <div className="cmAppreciatedPNGIconContainer">
                                    <i 
                                        className="cmAppreciatedPNGIcon PNG_ICON_LIKED_LGT"
                                        onClick={(e) => doteHandler(e,"like")} 
                                    />
                                </div>
                            }
                            {isLoved &&
                                <div className="cmAppreciatedPNGIconContainer">
                                    <i 
                                        className="cmAppreciatedPNGIcon PNG_ICON_LOVED_LGT"
                                        onClick={(e) => doteHandler(e,"love")} 
                                    />
                                </div>
                            }
                        </div>
                    </>
                )}
            </div>
            <div className="chatMessageBottom">{format(message.createdAt)}</div> 
        </div> 
    )
};

export default ChatMessage;