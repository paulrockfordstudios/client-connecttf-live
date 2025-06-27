import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { axiosReq } from '../../../Utils/axiosConfig';
import "./ConnectListFollowBtns.css";
import { 
    flameFollowing,
    flameUnfollowing,
    unionFollowing,
    unionUnfollowing,
    flameRequestFollow,
    flameUnrequestFollow,
    unionRequestFollow,
    unionUnrequestFollow,
    flameSubscribing,
    flameUnsubscribing,
    unionSubscribing,
    unionUnsubscribing, 
    flameRequestSubscribe,
    flameUnrequestSubscribe,
    unionRequestSubscribe,
    unionUnrequestSubscribe,
    userConv1, userConv2, userConv3,
    setCv1, cv1Up, cv1Open, 
    setCv2, cv2Up, cv2Open, 
    setCv3, cv3Up,  cv3Open,
    fBOOpen
} from "../../../Redux/AuthSlice";
import { checkIcon, mailIcon, moreHorizIcon, peopleIcon, personIcon } from '../../../Lib/mui/icons';


function ConnectListFollowBtns({ union, flame }) {

    const dispatch = useDispatch();
    const { user: currentUser, c1Open, c2Open, c3Open, fBOptions } = useSelector((state) => state.auth);
   
    const [ flameFollowed, setFlameFollowed ] = useState(currentUser.flameFollowing.includes(flame?._id));
    const [ unionFollowed, setUnionFollowed ] = useState(currentUser.unionFollowing.includes(union?._id));
    const [ flameFollowRequested, setFlameFollowRequested ] = useState(currentUser.flameFollowRequesting?.includes(flame?._id));
    const [ unionFollowRequested, setUnionFollowRequested ] = useState(currentUser.unionFollowRequesting?.includes(union?._id));
    const [ flameSubscribed, setFlameSubscribed ] = useState(currentUser.flameSubscribing.includes(flame?._id));
    const [ unionSubscribed, setUnionSubscribed ] = useState(currentUser.unionSubscribing.includes(union?._id));
    const [ flameSubscribeRequested, setFlameSubscribeRequested ] = useState(currentUser.flameSubscribeRequesting?.includes(flame?._id));
    const [ unionSubscribeRequested, setUnionSubscribeRequested ] = useState(currentUser.unionSubscribeRequesting?.includes(union?._id));
    const [ conversation, setConversation ] = useState(null);
    const [ newConversation, setNewConversation ] = useState(false);
    
  
    // Follow/unfollow flame user
    useEffect(() => {
        setFlameFollowed(currentUser.flameFollowing.includes(flame?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.flameFollowing]);

    useEffect(() => {
        setFlameFollowRequested(currentUser.flameFollowRequesting?.includes(flame?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.flameFollowRequesting]);

    const handleFlameFollowClick = async (event) => {
        if (flameFollowed) {
            try {
                currentUser.unionName
                    ? await axiosReq("PUT", `/users/${flame._id}/union-flame/unfollow`, { unionId: currentUser._id })
                    : await axiosReq("PUT", `/users/${flame._id}/flame-flame/unfollow`, { userId: currentUser._id })
                dispatch(flameUnfollowing(flame._id));
            } catch(err) {console.log(err)}
            setFlameFollowed(false);
        } else if (flame?.friendByReq) {
            if (flameFollowRequested) {
                try {
                    currentUser.unionName
                        ? await axiosReq("PUT", `/users/${flame._id}/union-flame/unrequestFollow`, { unionId: currentUser._id })
                        : await axiosReq("PUT", `/users/${flame._id}/flame-flame/unrequestFollow`, { userId: currentUser._id })
                    dispatch(flameUnrequestFollow(flame._id));
                } catch(err) {console.log(err)}
            } else {
                try {
                    currentUser.unionName
                        ? await axiosReq("PUT", `/users/${flame._id}/union-flame/requestFollow`, { unionId: currentUser._id })
                        : await axiosReq("PUT", `/users/${flame._id}/flame-flame/requestFollow`, { userId: currentUser._id })
                    dispatch(flameRequestFollow(flame._id));
                } catch(err) {console.log(err)}
                event.preventDefault();
                try {
                    const reqBefriend = currentUser.unionName
                        ? { flameRequesteeId: flame._id, unionRequesterId: currentUser._id, byRequest: true }
                        : { flameRequesterId: currentUser._id, flameRequesteeId: flame._id, byRequest: true }
                    await axiosReq("POST", "/friendRequests", reqBefriend);
                } catch(err) {console.log(err)}
            } 
            setFlameFollowRequested(!flameFollowRequested);
        } else {
            try {
                currentUser.unionName
                    ? await axiosReq("PUT", `/users/${flame._id}/union-flame/follow`, { unionId: currentUser._id })
                    : await axiosReq("PUT", `/users/${flame._id}/flame-flame/follow`, { userId: currentUser._id })
                dispatch(flameFollowing(flame._id));
            } catch(err) {console.log(err)}
            event.preventDefault();
            try {
                const reqBefriend = currentUser.unionName
                    ? { flameRequesteeId: flame._id, unionRequesterId: currentUser._id }
                    : { flameRequesterId: currentUser._id, flameRequesteeId: flame._id }
                await axiosReq("POST", "/friendRequests", reqBefriend);
            } catch(err) {console.log(err)}
            setFlameFollowed(true); 
        }
    };

    // Follow/unfollow union user
    useEffect(() => {
        setUnionFollowed(currentUser.unionFollowing.includes(union?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.unionFollowing]);

    useEffect(() => {
        setUnionFollowRequested(currentUser.unionFollowRequesting?.includes(union?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.unionFollowRequesting]);

    const handleUnionFollowClick = async (event) => {
        if(unionFollowed) {
            try {
                currentUser.unionName
                    ? await axiosReq("PUT", `/unions/${union._id}/union-union/unfollow`, { unionId: currentUser._id })
                    : await axiosReq("PUT", `/unions/${union._id}/flame-union/unfollow`, { userId: currentUser._id })
                dispatch(unionUnfollowing(union?._id));
            } catch(err) {console.log(err)}
            setUnionFollowed(false); 
        } else if (union?.friendByReq) {
            if (unionFollowRequested) {
                try {
                    currentUser.unionName
                        ? await axiosReq("PUT", `/unions/${union._id}/union-union/unrequestFollow`, { unionId: currentUser._id })
                        : await axiosReq("PUT", `/unions/${union._id}/flame-union/unrequestFollow`, { userId: currentUser._id })
                    dispatch(unionUnrequestFollow(union?._id));
                } catch(err) {console.log(err)}
            } else {
                try {
                    currentUser.unionName
                        ? await axiosReq("PUT", `/unions/${union._id}/union-union/requestFollow`, { unionId: currentUser._id })
                        : await axiosReq("PUT", `/unions/${union._id}/flame-union/requestFollow`, { userId: currentUser._id })
                    dispatch(unionRequestFollow(union?._id));
                } catch(err) {console.log(err)}
                event.preventDefault();
                try {
                    const reqBefriend = currentUser.unionName
                        ? { unionRequesterId: currentUser._id, unionRequesteeId: union._id, byRequest: true }
                        : { flameRequesterId: currentUser._id, unionRequesteeId: union._id, byRequest: true }
                    await axiosReq("POST", "/friendRequests", reqBefriend);
                } catch(err) {console.log(err)}
            }
            setUnionFollowRequested(!unionFollowRequested);
        } else {
            try {
                currentUser.unionName
                    ? await axiosReq("PUT", `/unions/${union._id}/union-union/Follow`, { unionId: currentUser._id })
                    : await axiosReq("PUT", `/unions/${union._id}/flame-union/Follow`, { userId: currentUser._id })
                dispatch(unionFollowing(union?._id));
            } catch(err) {console.log(err)}
            event.preventDefault();
            try {
                const reqBefriend = currentUser.unionName
                    ? { unionRequesterId: currentUser._id, unionRequesteeId: union._id }
                    : { flameRequesterId: currentUser._id, unionRequesteeId: union._id }
                await axiosReq("POST", "/friendRequests", reqBefriend);
            } catch(err) {console.log(err)}
            setUnionFollowed(true);
        }   
    };

    // Subscribe/unsubscribe to flame user
    useEffect(() => {
        setFlameSubscribed(currentUser.flameSubscribing.includes(flame?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.flameSubscribing]);

    useEffect(() => {
        setFlameSubscribeRequested(currentUser.flameSubscribeRequesting.includes(flame?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.flameSubscribeRequesting]);

    const handleFlameSubscribeClick = async (event) => {
        if(flameSubscribed) {
            try {
                currentUser.unionName
                    ? await axiosReq("PUT", `/users/${flame._id}/union-flame/unsubscribe`, { unionId: currentUser._id })
                    : await axiosReq("PUT", `/users/${flame._id}/flame-flame/unsubscribe`, { userId: currentUser._id })
                dispatch(flameUnsubscribing(flame?._id));
            } catch(err) {console.log(err)}
            setFlameSubscribed(false);
        } else if (flame?.subscribeByReq) {
            if (flameSubscribeRequested) {
                try {
                    currentUser.unionName
                        ? await axiosReq("PUT", `/users/${flame._id}/union-flame/unrequestSubscribe`, { unionId: currentUser._id })
                        : await axiosReq("PUT", `/users/${flame._id}/flame-flame/unrequestSubscribe`, { userId: currentUser._id })
                    dispatch(flameUnrequestSubscribe(flame?._id));
                } catch(err) {console.log(err)}
            } else {
                try {
                    currentUser.unionName
                        ? await axiosReq("PUT", `/users/${flame._id}/union-flame/requestSubscribe`, { unionId: currentUser._id })
                        : await axiosReq("PUT", `/users/${flame._id}/flame-flame/requestSubscribe`, { userId: currentUser._id })
                    dispatch(flameRequestSubscribe(flame?._id));
                } catch(err) {console.log(err)}
                event.preventDefault();
                try {
                    const reqSubscribe = currentUser.unionName
                        ? { flameRequesteeId: flame._id, unionRequesterId: currentUser._id, byRequest: true }
                        : { flameRequesterId: currentUser._id, flameRequesteeId: flame._id, byRequest: true }
                    await axiosReq("POST", "/subscribeRequests", reqSubscribe);
                } catch(err) {console.log(err)}
            }
            setFlameSubscribeRequested(!flameSubscribeRequested);
        } else {
            try {
                currentUser.unionName
                    ? await axiosReq("PUT", `/users/${flame._id}/union-flame/subscribe`, { unionId: currentUser._id })
                    : await axiosReq("PUT", `/users/${flame._id}/flame-flame/subscribe`, { userId: currentUser._id })
                dispatch(flameSubscribing(flame?._id));
            } catch(err) {console.log(err)}
            event.preventDefault();
            try {
                const reqSubscribe = currentUser.unionName
                    ? { flameRequesteeId: flame._id, unionRequesterId: currentUser._id }
                    : { flameRequesterId: currentUser._id, flameRequesteeId: flame._id }
                await axiosReq("POST", "/subscribeRequests", reqSubscribe);
            } catch(err) {console.log(err)}
        }
        setFlameSubscribed(true);
    };

    // Subscribe/unsubscribe to union user
    useEffect(() => {
        setUnionSubscribed(currentUser.unionSubscribing.includes(union?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.unionSubscribing]);

    useEffect(() => {
        setUnionSubscribeRequested(currentUser.unionSubscribeRequesting.includes(union?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.unionSubscribeRequesting]);

    const handleUnionSubscribeClick = async (event) => {
        if(unionSubscribed) {
            try {
                currentUser.unionName
                    ? await axiosReq("PUT", `/unions/${union._id}/union-union/unsubscribe`, { unionId: currentUser._id })
                    : await axiosReq("PUT", `/unions/${union._id}/flame-union/unsubscribe`, { userId: currentUser._id })
                dispatch(unionUnsubscribing(union?._id));
            } catch(err) {console.log(err)}
            setUnionSubscribed(false);
        } else if (union?.friendByReq) {
            if (unionSubscribeRequested) {
                try {
                    currentUser.unionName
                        ? await axiosReq("PUT", `/unions/${union._id}/union-union/unrequestSubscribe`, { unionId: currentUser._id })
                        : await axiosReq("PUT", `/unions/${union._id}/flame-union/unrequestSubscribe`, { userId: currentUser._id })
                    dispatch(unionUnrequestSubscribe(union?._id));
                } catch(err) {console.log(err)}
            } else {
                try {
                    currentUser.unionName
                        ? await axiosReq("PUT", `/unions/${union._id}/union-union/requestSubscribe`, { unionId: currentUser._id })
                        : await axiosReq("PUT", `/unions/${union._id}/flame-union/requestSubscribe`, { userId: currentUser._id })
                    dispatch(unionRequestSubscribe(union?._id));
                } catch(err) {console.log(err)}
                event.preventDefault();
                try {
                    const reqSubscribe = currentUser.unionName
                        ? { unionRequesterId: currentUser._id, unionRequesteeId: union._id, byRequest: true }
                        : { flameRequesterId: currentUser._id, unionRequesteeId: union._id, byRequest: true }
                    await axiosReq("POST", "/subscribeRequests", reqSubscribe);
                } catch(err) {console.log(err)}
            }
            setUnionSubscribeRequested(!unionSubscribeRequested);
        } else {
            try {
                currentUser.unionName
                    ? await axiosReq("PUT", `/unions/${union._id}/union-union/subscribe`, { unionId: currentUser._id })
                    : await axiosReq("PUT", `/unions/${union._id}/flame-union/subscribe`, { userId: currentUser._id })
                dispatch(unionSubscribing(union?._id));
            } catch(err) {console.log(err)}
            event.preventDefault();
            try {
                const reqSubscribe = currentUser.unionName
                    ? { unionRequesterId: currentUser._id, unionRequesteeId: union._id }
                    : { flameRequesterId: currentUser._id, unionRequesteeId: union._id }
                await axiosReq("POST", "/subscribeRequests", reqSubscribe);
            } catch(err) {console.log(err)}
        }
        setUnionSubscribed(true);
    };

    const newConversationHandler = async (receiver) => {
        let uMems = [];
        let fMems = [];
        const senderStatus = currentUser.unionName? "union" : "flame";
        const receiverStatus = receiver.unionName? "union" : "flame";
        const senderId = currentUser._id;
        const receiverId = receiver.id.substring(8, receiver.id.length);
        const res = await axiosReq("GET", `/conversations/findOne/${senderStatus}/${receiverStatus}/${senderId}/${receiverId}`);
        const result = res.data; 
        if (result) {
            setConversation(result)
            const resCnt = await axiosReq("GET", `/messages/count/${result._id}`);
            if (resCnt === 0) {
                setNewConversation(true);
                setConversation(result);
            } else {
                setNewConversation(false);
                setConversation(result);
            }
        } else {
            currentUser.unionName? uMems.push(senderId) : fMems.push(senderId); 
            receiver.unionName? uMems.push(receiverId) : fMems.push(receiverId);
            const newConv = {unionMembers: uMems, flameMembers: fMems};
            const res = await axiosReq("POST", "/conversations/", newConv);
            setConversation(res.data);
        }
    };

    useEffect(() => {
        if (conversation) {
            const newConv = currentUser.unionName ? {unionId: currentUser._id} : {userId: currentUser._id};
            const openConv = {convo: conversation, openActive: true, prevMessages: !newConversation};
            const userType = currentUser.unionName ? "union" : "flame";
            const openConvo = async () => {
                if (c1Open && !c2Open) {
                    try {
                        Object.assign(newConv, {conversation2: openConv});
                        dispatch(userConv2(newConv.conversation2));
                        dispatch(setCv2(conversation));
                        dispatch(cv2Open());
                        dispatch(cv2Up());
                        if (newConversation) return;
                        await axiosReq("PUT", `/${userType}/${currentUser._id}`, newConv);
                        localStorage.setItem("conv2", JSON.stringify(conversation));
                        localStorage.setItem("c2Open", JSON.stringify(true));
                        localStorage.setItem("c2Up", JSON.stringify(false));
                    } catch (err) {console.log(err)}
                } else if (c1Open && c2Open && !c3Open) {
                    try {
                        Object.assign(newConv, {conversation3: openConv});
                        dispatch(userConv3(newConv.conversation3));
                        dispatch(setCv3(conversation));
                        dispatch(cv3Open());
                        dispatch(cv3Up());
                        if (newConversation) return;
                        await axiosReq("PUT", `/${userType}/${currentUser._id}`, newConv);
                        localStorage.setItem("conv3", JSON.stringify(conversation));
                        localStorage.setItem("c3Open", JSON.stringify(true));
                        localStorage.setItem("c3Up", JSON.stringify(false));
                    } catch (err) {console.log(err)}
                } else {
                    try {
                        Object.assign(newConv, {conversation1: openConv});
                        dispatch(userConv1(newConv.conversation1));
                        dispatch(setCv1(conversation));
                        dispatch(cv1Open());
                        dispatch(cv1Up());
                        if (newConversation) return;
                        await axiosReq("PUT", `/${userType}/${currentUser._id}`, newConv);
                        localStorage.setItem("conv1", JSON.stringify(conversation));
                        localStorage.setItem("c1Open", JSON.stringify(true));
                        localStorage.setItem("c1Up", JSON.stringify(false));
                    } catch (err) {console.log(err)}
                }
            }
            openConvo();
        }
    }, [conversation]);



    return (
        <>
            {union ? 
                (
                    <>
                        {union.unionName !== currentUser.userName && (
                            <div className="connectListConnectBtns-container">
                                <div className="connectListConnectBtns">
                                    {union.spectrum === "rainbow" ?
                                        (
                                            <>
                                                <button className="connectListDisconnectBtnRainbow" onClick={() => dispatch(fBOOpen())}>{moreHorizIcon}</button>
                                                <button className="connectListFollowBtnRainbow" onClick={handleUnionFollowClick}>
                                                    {// Follow button status
                                                        currentUser.unionFollowing.includes(union?._id) 
                                                            ? <div className="connectListfollowIcon">{peopleIcon}{checkIcon}</div> 
                                                            : currentUser.unionFollowRequesting.includes(union?._id)
                                                                ? "Requested" 
                                                                : "Befriend us!"
                                                    }
                                                </button>
                                                <button 
                                                    className="connectListMessageBtnRainbow"
                                                    onClick={() => newConversationHandler(union)}
                                                >
                                                    Message
                                                </button>
                                                <button className="connectListSubscribeBtnRainbow" onClick={handleUnionSubscribeClick}>
                                                    {// Subscribe button status
                                                        currentUser.unionSubscribing.includes(union?._id) 
                                                            ? <div className="connectListSubscribeIcon">{mailIcon}{checkIcon}</div> 
                                                            : currentUser.unionSubscribeRequesting.includes(union?._id)
                                                                ? "Requested" 
                                                                : "Subscribe"
                                                    }
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                {union.spectrum === "diamond" ?
                                                    (
                                                        <>
                                                            <button className="connectListDisconnectBtn DIAMOND_BTN1" onClick={() => dispatch(fBOOpen())}>
                                                                <svg width="0em" height="0em">
                                                                    <linearGradient id="gold1-gradient">
                                                                        <stop stopColor="#ab781d" offset="0%" />
                                                                        <stop stopColor="#eed264" offset="50%" />
                                                                        <stop stopColor="#ab781d" offset="100%" />
                                                                    </linearGradient>
                                                                </svg>
                                                                <div style={{ fill: "url(#gold1-gradient)"}}>{moreHorizIcon}</div>
                                                            </button>
                                                            <button className="connectListFollowBtn DIAMOND_BTN2" onClick={handleUnionFollowClick}>
                                                                {// Follow button status
                                                                    currentUser.unionFollowing.includes(union?._id) ? 
                                                                        (
                                                                            <>
                                                                                <svg width="0em" height="0em">
                                                                                    <linearGradient id="gold2-gradient">
                                                                                        <stop stopColor="#ab781d" offset="0%" />
                                                                                        <stop stopColor="#eed264" offset="100%" />
                                                                                    </linearGradient>
                                                                                </svg>
                                                                                <div className="connectListFollowIcon" style={{ fill: "url(#gold2-gradient)"}}>{personIcon}</div>
                                                                                <svg width="0em" height="0em">
                                                                                    <linearGradient id="gold3-gradient">
                                                                                        <stop stopColor="#eed264" offset="0%" />
                                                                                        <stop stopColor="#ab781d" offset="100%" />
                                                                                    </linearGradient>
                                                                                </svg>
                                                                                <div className="connectListCheckIcon" style={{ fill: "url(#gold3-gradient)"}}>{checkIcon}</div>
                                                                            </> 
                                                                        ) : (
                                                                            <span className="clfbDiamondText">
                                                                                {
                                                                                    currentUser.unionFollowRequesting.includes(union?._id)
                                                                                        ? "Requested" 
                                                                                        : "Befriend us!"
                                                                                }
                                                                            </span>
                                                                        )
                                                                }
                                                            </button>
                                                            <button 
                                                                className="connectListMessageBtn DIAMOND_BTN3"
                                                                onClick={() => newConversationHandler(union)}
                                                            >
                                                                    <span className="clfbDiamondText">Message</span>
                                                            </button>
                                                            <button className="connectListSubscribeBtn DIAMOND_BTN4" onClick={handleUnionSubscribeClick}>
                                                                {// Subscribe button status
                                                                    currentUser.unionSubscribing.includes(union?._id) ? 
                                                                        (
                                                                            <>
                                                                                <svg width="0em" height="0em">
                                                                                    <linearGradient id="gold2-gradient">
                                                                                        <stop stopColor="#ab781d" offset="0%" />
                                                                                        <stop stopColor="#eed264" offset="100%" />
                                                                                    </linearGradient>
                                                                                </svg>
                                                                                <div className="connectListSubscribeIcon" style={{ fill: "url(#gold2-gradient)"}}>{mailIcon}</div>
                                                                                <svg width="0em" height="0em">
                                                                                    <linearGradient id="gold3-gradient">
                                                                                        <stop stopColor="#eed264" offset="0%" />
                                                                                        <stop stopColor="#ab781d" offset="100%" />
                                                                                    </linearGradient>
                                                                                </svg>
                                                                                <div className="connectListCheckIcon" style={{ fill: "url(#gold3-gradient)"}}>{checkIcon}</div>
                                                                            </> 
                                                                        ) : (
                                                                            <span className="clfbDiamondText">
                                                                                {
                                                                                    currentUser.unionSubscribeRequesting.includes(union?._id)
                                                                                        ? "Requested" 
                                                                                        : "Subscribe"
                                                                                }
                                                                            </span>
                                                                        )
                                                                }
                                                            </button> 
                                                        </>
                                                    ) : (
                                                        <div className={`connectListBtns ${union.spectrum}`}>
                                                            <button className="connectListDisconnectBtn" onClick={() => dispatch(fBOOpen())}>{moreHorizIcon}</button>
                                                            <button className="connectListFollowBtn" onClick={handleUnionFollowClick}>
                                                                {// Follow button status
                                                                        currentUser.unionFollowing.includes(union?._id) 
                                                                        ? <div className="connectListfollowIcon">{peopleIcon}{checkIcon}</div>  
                                                                        : currentUser.unionFollowRequesting.includes(union?._id)
                                                                            ? "Requested" 
                                                                            : "Befriend us!"
                                                                }
                                                            </button>
                                                            <button 
                                                                className="connectListMessageBtn"
                                                                onClick={() => newConversationHandler(union)}
                                                            >
                                                                Message
                                                            </button>
                                                            <button className="connectListSubscribeBtn" onClick={handleUnionSubscribeClick}>
                                                                {// Subscribe button status
                                                                        currentUser.unionSubscribing.includes(union?._id) 
                                                                        ? <div className="connectListSubscribeIcon">{mailIcon}{checkIcon}</div> 
                                                                        : currentUser.unionSubscribeRequesting.includes(union?._id)
                                                                            ? "Requested" 
                                                                            : "Subscribe"
                                                                }
                                                            </button>    
                                                        </div>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                   
                    <>
                        {flame.userName !== currentUser.userName && (
                            <div className="connectListConnectBtns-container">
                                <div className="connectListConnectBtns">
                                    <div className={`connectListBtns ${flame.isAnonymous ? "gray" : flame.energy}`}>
                                        <button className="connectListDisconnectBtn" onClick={() => dispatch(fBOOpen())}>{moreHorizIcon}</button>
                                        <button className="connectListFollowBtn" onClick={handleFlameFollowClick}>
                                            {// Follow Button Status
                                                currentUser.flameFollowing.includes(flame?._id) 
                                                    ? <div className="connectListfollowIcon">{personIcon}{checkIcon}</div> 
                                                    : currentUser.flameFollowRequesting.includes(flame?._id)
                                                        ? "Requested" 
                                                        : "Befriend me!"
                                            }
                                        </button>
                                        <button 
                                            className="connectListMessageBtn"
                                            onClick={() => newConversationHandler(flame)}
                                        >
                                            Message
                                        </button>
                                        <button className="connectListSubscribeBtn" onClick={handleFlameSubscribeClick}>
                                            {
                                                currentUser.flameSubscribing.includes(flame?._id) 
                                                    ? <div className="connectListSubscribeIcon">{mailIcon}{checkIcon}</div> 
                                                    : currentUser.flameSubscribeRequesting.includes(flame?._id) 
                                                        ? "Requested" 
                                                        : "Subscribe"
                                            }
                                        </button>    
                                    </div>
                                </div>
                            </div>
                        )}                     
                    </>
                )
            }
            {fBOptions && <FollowButtonsPopup user={union ? union : flame}/>}
        </>
    )
};

export default ConnectListFollowBtns;