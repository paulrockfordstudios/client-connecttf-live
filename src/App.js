import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { axiosReq  } from "./Utils/axiosConfig";
import { syncDate } from "./Utils/misc/syncDate";
import { useScrollLock } from './Utils/crHooks/useScrollLock';
import cookies from "js-cookie";
import { languages } from "./Assets/localization/languages";
import Directory from "./Directory";

import "./Assets/styling/colorPalette/cp-bg-cs.css";
import "./Assets/styling/colorPalette/cp-bg-gi-ho.css";
import "./Assets/styling/colorPalette/cp-bg-gi-misc.css";
import "./Assets/styling/colorPalette/cp-fg-cs.css";
import "./Assets/styling/colorPalette/cp-bs.css";
import "./Assets/styling/colorPalette/cp-c.css";
import "./Assets/styling/general.css";
import "./Assets/styling/icons.css";

import { 
    mentionList,
    birthdayList,
    setWinOrientation,
    setWinWidth,
    setWinHeight,
    userMessenger,
    setCv1, 
    cv1Up,
    cv1Down, 
    cv1Open,
    cv1Close, 
    setCv2, 
    cv2Up,
    cv2Down,  
    cv2Open,
    cv2Close, 
    setCv3, 
    cv3Up,
    cv3Down,  
    cv3Open,
    cv3Close,
    setOnlineFlames,
    setOnlineUnions,
    setNewArrFlameMsg,
    setNewArrUnionMsg,
    setArrLikeMsg, 
    setArrLoveMsg,
    setArrFlareNot,
    setArrAddFNUser,
    setArrUserNot,
    setArrAddUNUser,
    setArrMessageNot,
    setArrAddMessage,
    setArrMsgDoteNot,
    ctfdOpen,
    setLngObj,
    setFontSize,
    setBsrDrkMode,

} from './Redux/AuthSlice';
import useWindowSize from "./Utils/crHooks/useWindowSize";
import { calculateAngle } from "./Utils/calculateAngle";
import useOrientation from "./Utils/crHooks/useOrientation";


function App() {

    const { 
        user, 
        newMsg, 

        newLikeMsg,
        newLoveMsg,

        newFlareNot,
        newAddFNUser,

        newUserNot,
        newAddUNUser,

        newMessageNot,
        newAddMessage,

        newMsgDoteNot,

        cPost,
        cQN,
        cComment,
        cAnswer,
        cReply,
        cReview,
        cShare,

        pAEditor, 
        pBEditor, 
        cdpAvatar, 
        cdpBackground, 
        fBOptions, 
        tfcPos, 
        fiiEdit,

        flagFlare,
        editFlare,
        deleteFlare,
        cReport,

        ctfdpp,

        lngObj

    } = useSelector((state) => state.auth);

    const socket = useRef();
    
    const location = useLocation();

    const dispatch = useDispatch();

    const orientation = useOrientation();

    const { lockScroll, unlockScroll } = useScrollLock();
    const { width, height } = useWindowSize();

    const protocol = window.location.protocol;
    
    const winBody = document.getElementById("body");

    const [ fValues, setFValues ] = useState([]);
    const [ uValues, setUValues ] = useState([]);
    const [ mentions, setMentions ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [newMessage, setNewMessage] = useState({});
    const [arrivalFlameMessage, setArrivalFlameMessage] = useState(null);
    const [arrivalUnionMessage, setArrivalUnionMessage] = useState(null);
    const [ blockingFlames, setBlockingFlames ] = useState([]);
    const [ blockingUnions, setBlockingUnions ] = useState([]);
    const [ bodyHeight, setBodyHeight ] = useState(null);
    const [ bodyWidth, setBodyWidth ] = useState(null);
    const [ testing, setTesting ] = useState({});
    const [ angleDegree, setAngleDegree ] = useState(0);
    //const [ liberty, setLiberty ] = useState(false);
    //const [ date, setDate ] = useState();
    //const [ birthdays, setBirthdays ] = useState([]);

    const currentLanguageCode = cookies.get('i18next') || "en-US";
    const currentLanguage = languages.find((lng) => lng.code === currentLanguageCode);
    /*
    useEffect(() => {
        if (user && !user.blacklist && !user.suspended) {
            setLiberty(true);
        }
    }, [user])
    */

    useEffect(() => {
        dispatch(setLngObj(currentLanguage));
    }, [currentLanguageCode])

    useEffect(() => {
        if (width <= 600) {
            screen.orientation.lock("portrait"); 
        }
    }, [width]);

    useEffect(() => {
        setAngleDegree(calculateAngle(width, height))
    }, [width, height]);

    useEffect(() => {
        const rootElement = document.documentElement;
        const computedStyle = window.getComputedStyle(rootElement);
        const fontSizeValue = computedStyle.getPropertyValue('font-size');
        dispatch(setFontSize(fontSizeValue));
    }, []);


    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        dispatch(setBsrDrkMode(darkModeMediaQuery.matches));
        const handleChange = (event) => {
            dispatch(setBsrDrkMode(event.matches));
        };
        darkModeMediaQuery.addEventListener('change', handleChange);
        return () => {
          darkModeMediaQuery.removeEventListener('change', handleChange);
        };
      }, []);

/*
    useEffect(() => {
        const altFicLngCnt = languages.filter((lng) => lng.region === "Alternative-Fictional")
        const altNFLngCnt = languages.filter((lng) => lng.region === "Alternative-nonFictional")
        console.log(languages.length)
        console.log(altFicLngCnt)
        console.log(altNFLngCnt.length)
    }, []);
*/

    window.matchMedia("(orientation: landscape)").addEventListener("change", e => {
        //const portrait = e.matches;
        //winBody.style.height = `${bodyHeight}px`;
       // winBody.style.width = `${bodyWidth}px`;
       //window.location.reload();
    });

    /*
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])
    */

    useEffect(() => {
        return pAEditor || pBEditor || 
               cdpAvatar || cdpBackground || 
               fBOptions || tfcPos || fiiEdit ||
               cPost || cQN ||
               cAnswer || cComment ||
               cReply || cReport ||cShare ||
               flagFlare || editFlare || deleteFlare
                
                    ? lockScroll() : unlockScroll();
    }, 
    [
        pAEditor, pBEditor, 
        cdpAvatar, cdpBackground, 
        fBOptions, tfcPos, fiiEdit,
        cPost, cQN, cAnswer, cComment,
        cReply, cReport, cShare, 
        flagFlare, editFlare, deleteFlare,
       
    ]);

    useEffect(() => {
        socket.current = io(
            protocol === "https:"
            ? "https://socket-connecttf-live.herokuapp.com" 
            : "http://localhost:9800"
        );
    }, []);


    useEffect(() => {
        if (user) {
            if (user.unionName) {
                socket?.current.emit("addUnionUser", user._id)
                socket?.current.on("getFlameUsers", flameUsers => {
                    dispatch(setOnlineFlames(user.flameFollowing.filter((fFollowing) => flameUsers.some((fUser) => fUser.userId === fFollowing))));
                })
                socket?.current.on("getUnionUsers", unionUsers => {
                    dispatch(setOnlineUnions(user.unionFollowing.filter((uFollowing) => unionUsers.some((uUser) => uUser.userId === uFollowing))));
                })
            } else if (!user.unionName) {
                socket?.current.emit("addFlameUser", user._id)
                socket?.current.on("getFlameUsers", flameUsers => {
                    dispatch(setOnlineFlames(user.flameFollowing.filter((fFollowing) => flameUsers.some((fUser) => fUser.userId === fFollowing))));
                })
                socket?.current.on("getUnionUsers", unionUsers => {
                    dispatch(setOnlineUnions(user.unionFollowing.filter((uFollowing) => unionUsers.some((uUser) => uUser.userId === uFollowing))));
                })
            }
        }  
    }, [user]);

    
    useEffect( () => {
        if (!user?.messenger) return;
        if (window.location.pathname === "/messenger") return;
        const putNoConv = async () => {
            let noConv = {};
            user.unionName 
            ? noConv = {
                unionId: user._id,
                messenger: {
                    convo: {},
                }
            }
            : noConv = {
                userId: user._id,
                messenger: {
                    convo: {},
                }
            }
            dispatch(userMessenger(noConv.messenger))
            try {
                user.unionName
                    ? await axiosReq("PUT", `/unions/${user._id}`, noConv)
                    : await axiosReq("PUT", `/users/${user._id}`, noConv)
            } catch (err) {
                console.log(err);
            }
        }
        putNoConv();
    }, [user, location.pathname]);

    useEffect(() => {    
        if (user?.conversation1?.convo) {
            dispatch(setCv1(user.conversation1.convo))
            dispatch(cv1Open())
            user?.conversation1?.openActive ? dispatch(cv1Up()) : dispatch(cv1Down())
            localStorage.setItem("conv1", JSON.stringify(user?.conversation1?.convo))
            localStorage.setItem("c1Open", JSON.stringify(true)) 
            localStorage.setItem("c1Up", JSON.stringify(user?.conversation1?.openActive))
        } else {
            dispatch(setCv1(null))
            dispatch(cv1Close())
            localStorage.removeItem("conv1")
            localStorage.removeItem("c1Open")
            localStorage.removeItem("c1Up")
        }     
    }, [user?.conversation1?.convo])

   

    useEffect(() => {    
        if (user?.conversation2?.convo) {
            dispatch(setCv2(user.conversation2.convo))
            dispatch(cv2Open())
            user?.conversation2?.openActive ? dispatch(cv2Up()) : dispatch(cv2Down())
            localStorage.setItem("conv2", JSON.stringify(user?.conversation2?.convo))
            localStorage.setItem("c2Open", JSON.stringify(true)) 
            localStorage.setItem("c2Up", JSON.stringify(user?.conversation2?.openActive))
        } else {
            dispatch(setCv2(null))
            dispatch(cv2Close())
            localStorage.removeItem("conv2")
            localStorage.removeItem("c2Open")
            localStorage.removeItem("c2Up")
        }     
    }, [user?.conversation2?.convo])

    useEffect(() => {    
        if (user?.conversation3?.convo) {
            dispatch(setCv3(user.conversation3.convo))
            dispatch(cv3Open())
            user?.conversation3?.openActive ? dispatch(cv3Up()) : dispatch(cv3Down())
            localStorage.setItem("conv3", JSON.stringify(user?.conversation3?.convo))
            localStorage.setItem("c3Open", JSON.stringify(true)) 
            localStorage.setItem("c3Up", JSON.stringify(user?.conversation3?.openActive))
        } else {
            dispatch(setCv3(null))
            dispatch(cv3Close())
            localStorage.removeItem("conv3")
            localStorage.removeItem("c3Open")
            localStorage.removeItem("c3Up")
        }     
    }, [user?.conversation3?.convo])


    // Get user's flame following
    useEffect(() => {
        const getFlameFollowing = async () => {
            try {
                const res = user?.unionName
                    ? await axiosReq("GET", `/unions/flame-following/${user._id}`)
                    : await axiosReq("GET", `/users/flame-following/${user._id}`)
                setFValues(res.data.map((f) => {
                    return {
                        id: "mention_" + f._id,
                        userName: f.userName,
                        value: f.profileName,
                        profileName: f.profileName,
                        color: f.energy,
                        avatar: f.profilePicture,
                        link: `/flame-profile/userName/${f.userName}`,
                        icon: f.energy,
                        energy: f.energy,
                        dob: f.dob
                    }
                }))
            } catch(err) {
                console.log(err);
            }
        }
        getFlameFollowing();
    }, [user?.flameFollowing.length]);
    
    // Get user's union following
    useEffect(() => {
        const getUnionFollowing = async () => {
            try {
                const res = user?.unionName
                    ? await axiosReq("GET", `/unions/union-following/${user._id}`)
                    : await axiosReq("GET", `/users/union-following/${user._id}`)
                setUValues(res.data.map((u) => {
                    return {
                        id: "mention_" + u._id,
                        unionName: u.unionName,
                        value: u.profileName,
                        profileName: u.profileName,
                        color: u.spectrum,
                        avatar: u.unionProfilePicture,
                        link: `/union-profile/unionName/${u.unionName}`,
                        icon: u.spectrum
                    }
                }));
            } catch(err) {
                console.log(err);
            }
        }
        getUnionFollowing();
    }, [user?.unionFollowing.length]);

    useEffect(() => {
        if (fValues) {
            setMentions(mentions.concat(fValues));
        }
    }, [fValues]);

    useEffect(() => {
        if (uValues) {
            setMentions(mentions.concat(uValues));
        }
    }, [uValues]);

    

    useEffect(() => {
        if (mentions) {
            dispatch(mentionList(mentions))
            localStorage.setItem("mentions", JSON.stringify(mentions));
            setIsLoaded(true) 
        }
    }, [mentions]);

    
    useEffect(() => {
        socket.current.on("getFlameMessage", data => {
            dispatch(setNewArrFlameMsg({
                _id: data._id,
                conversationId: data.conversationId,
                flameSenderId: data.flameSenderId,
                text: data.text,
                mentions: data.mentions,
                photos: data.photos,
                hashtags: data.hashtags,
                seen: data.seen,
                read: data.read,
                liked: data.liked,
                loved: data.loved,
                createdAt: Date.now(),
            }))
        })
        socket.current.on("getUnionMessage", data => {
            dispatch(setNewArrUnionMsg({
                _id: data._id,
                conversationId: data.conversationId,
                unionSenderId: data.unionSenderId,
                text: data.text,
                mentions: data.mentions,
                photos: data.photos,
                hashtags: data.hashtags,
                seen: data.seen,
                read: data.read,
                liked: data.liked,
                loved: data.loved,
                createdAt: Date.now(),
            }))
        })
        socket.current.on("getFlareNot", data => {
            dispatch(setArrFlareNot({
                _id: data._id,
                notType: data.notType,
                flareType: data.flareType,
                flareId: data.flareId,
                flareStarterId: data.flareStarterId,
                union: data.union,
                seen: data.seen,
                users: data.users,
                createdAt: Date.now(),
            }))
        })
        socket.current.on("getAddFNUser", data => {
            dispatch(setArrAddFNUser({
                flareId: data.flareId,
                flareType: data.flareType,
                flareStarterId: data.flareStarterId,
                notificationId: data.notificationId,
                userId: data.userId,
                profileName: data.profileName,
                avatar: data.avatar,
                color: data.color,
            }))
        })
        socket.current.on("getUserNot", data => {
            dispatch(setArrUserNot({
                _id: data._id,
                notType: data.notType,
                currentUserType: data.currentUserType,
                currentUserId: data.currentUserId,
                union: data.union,
                seen: data.seen,
                users: data.users,
                createdAt: Date.now(),
            }))
        })
        socket.current.on("getAddUNUser", data => {
            dispatch(setArrAddUNUser({
                notificationId: data.notificationId,
                currentUserType: data.currentUserType,
                currentUserId: data.currentUserId,
                userId: data.userId,
                profileName: data.profileName,
                avatar: data.avatar,
                color: data.color,
            }))
        })
        socket.current.on("getMessageNot", data => {
            dispatch(setArrMessageNot({
                _id: data._id,
                receiverType: data.receiverType,
                receiverId: data.receiverId,
                senderType: data.senderType,
                senderId: data.senderId,
                messages: data.messages,
                seen: data.seen,
                read: data.read,
                createdAt: Date.now(),
            }))
        })
        socket.current.on("getAddMessage", data => {
            dispatch(setArrAddMessage({
                notificationId: data.notificationId,
                receiverId: data.receiverId,
                receiverType: data.receiverType,
                messageId: data.messageId,
                text: data.text,
                photos: data.photos,
                mentions: data.mentions,
                hashtags: data.hashtags,
            }))
        })
        socket.current.on("getMsgDoteNot", data => {
            dispatch(setArrMsgDoteNot({
                _id: data._id,
                receiverType: data.receiverType,
                receiverId: data.receiverId,
                senderType: data.senderType,
                senderId: data.senderId,
                doteType: data.doteType,
                seen: data.seen,
                createdAt: Date.now(),
            }))
        })
        socket.current.on("getLikedMessage", data => {
            dispatch(setArrLikeMsg({
                messageId: data.messageId,
                liked: data.liked,
                createdAt: Date.now(),
            }))
        })
        socket.current.on("getLovedMessage", data => {
            dispatch(setArrLoveMsg({
                messageId: data.messageId,
                loved: data.loved,
                createdAt: Date.now(),
            }))
        })
    }, [socket]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = user?.unionName 
                    ? await axiosReq("GET", `/conversations/union/${user._id}`)
                    : await axiosReq("GET", `/conversations/flame/${user._id}`)
                setConversations(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getConversations();
    }, [user?._id]);

    useEffect(() => {
        if (newMsg) {
            user.unionName
                ? socket.current.emit("sendUnionMessage", newMsg)
                : socket.current.emit("sendFlameMessage", newMsg)
        }
    }, [newMsg]);

    useEffect(() => {
        if (newLikeMsg) {
            socket.current.emit("sendLikeMessage", newLikeMsg)
        }
    }, [newLikeMsg]);

    useEffect(() => {
        if (newLoveMsg) {
            socket.current.emit("sendLoveMessage", newLoveMsg)
        }
    }, [newLoveMsg]);

    // Send Flare Notifications

    useEffect(() => {
        if (newFlareNot) {
            socket.current.emit("sendFlareNot", newFlareNot)
        }
    }, [newFlareNot]);

    useEffect(() => {
        if (newAddFNUser) {
            socket.current.emit("sendAddFNUser", newAddFNUser)
        }
    }, [newAddFNUser]);

    // Send User Notifications

    useEffect(() => {
        if (newUserNot) {
            socket.current.emit("sendUserNot", newUserNot)
        }
    }, [newUserNot]);

    useEffect(() => {
        if (newAddUNUser) {
            socket.current.emit("sendAddUNUser", newAddUNUser)
        }
    }, [newAddUNUser]);

    // Send Message Notifications

    useEffect(() => {
        if (newMessageNot) {
            socket.current.emit("sendMessageNot", newMessageNot)
        }
    }, [newMessageNot]);

    useEffect(() => {
        if (newAddMessage) {
            socket.current.emit("sendAddMessage", newAddMessage)
        }
    }, [newAddMessage]);

    useEffect(() => {
        if (newMsgDoteNot) {
            socket.current.emit("sendMsgDoteNot", newMsgDoteNot)
        }
    }, [newMsgDoteNot]);

    return (
        <Directory fValues={fValues} uValues={uValues}/>      
    );
};

export default App;