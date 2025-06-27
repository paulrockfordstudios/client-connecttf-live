import React, { useState, useEffect, memo, useMemo} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';
import "./FlameSubscribeRequest.css";
import { 
    flameSubscribing, 
    flameSubscriber, 
    flameUnrequestSubscribe,
} from "../../../../Redux/AuthSlice";
import fAvatar from "../../../../Assets/picBlanks/no-avatar.jpg";
import { checkIcon, mailIcon } from '../../../../Lib/mui/icons';


function FlameSubscribeRequest({ sr }) {

    const dispatch = useDispatch();

    const { user, folMDD } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [flame, setFlame] = useState({});
    const [ srSeen, setSrSeen ] = useState(sr.initialSeen);
    const [ srAccepted, setSrAccepted ] = useState(sr.requestAccepted);
    const [ srRejected, setSrRejected ] = useState(sr.requestRejected);
    const [ retort, setRetort ] = useState("");
    const [ retortDisplay, setRetortDisplay ] = useState("");
    const [ flameSubscribed, setFlameSubscribed ] = useState(user.flameSubscribing.includes(flame?._id));
    const [ fade, setFade ] = useState(100);
    const [ retortChange, setRetortChange ] = useState(false);
    
   
    useEffect(() => {
        const getFlame = async () => {
            try {
                const res = await axiosReq("GET", `/users?userId=${sr.flameRequesterId}`)
                setFlame(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getFlame();
    }, []);

    useEffect(() => {
        if (flame) {
            setFlameSubscribed(user.flameSubscribing.includes(flame._id)) 
        }
    }, [flame])


    useEffect(() => {
        if (folMDD && srSeen === false) {
            setSrSeen(true);
        }
    },[folMDD, srSeen]);

    // Follow/unfollow flame user
    useEffect(() => {
        setFlameSubscribed(user.flameSubscribing.includes(flame?._id));
        localStorage.setItem("user", JSON.stringify(user));
        user.unionName
            ? localStorage.setItem("union", JSON.stringify(user))
            : localStorage.setItem("flame", JSON.stringify(user))
    },[user.flameSubscribing]);

    const handleFlameSubscribeClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            user.unionName
                ? await axiosReq("PUT", `/users/${flame._id}/union-flame/subscribe`, { unionId: user._id })
                : await axiosReq("PUT", `/users/${flame._id}/flame-flame/subscribe`, { userId: user._id })
            dispatch(flameSubscribing(flame._id));
        } catch(err) {
            console.log(err);
        }
        try {
            const reqSubscribe = user.unionName
                ? { flameRequesteeId: flame._id, unionRequesterId: user._id }
                : { flameRequesterId: user._id, flameRequesteeId: flame._id }
            await axiosReq("POST", "/subscribeRequests", reqSubscribe);
        } catch(err) {
            console.log(err);
        }
        setFlameSubscribed(true); 
        setRetortChange(true);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
        user.unionName
            ? localStorage.setItem("union", JSON.stringify(user))
            : localStorage.setItem("flame", JSON.stringify(user))
    },[user.flameSuscribers]);


    const handleAcceptRequestClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
            user.unionName
                ? await axiosReq("PUT", `/unions/${user._id}/flame-union/subscribe`, { userId: flame._id })
                : await axiosReq("PUT", `/users/${user._id}/flame-flame/subscribe`, { userId: flame._id })
            dispatch(flameSubscriber(flame._id));
        } catch(err) {
            console.log(err);
        }
        try {
            user.unionName
                ? await axiosReq("PUT", `/unions/${user._id}/flame-union/unrequestSubscribe`, { userId: flame._id })
                : await axiosReq("PUT", `/users/${user._id}/flame-flame/unrequestSubscribe`, { userId: flame._id })
            dispatch(flameUnrequestSubscribe(user._id));
        } catch(err) {
            console.log(err);
        }
        try {
            await axiosReq("PUT", `/subscribeRequests/${sr._id}/requestAccepted`)
        } catch(err) {
            console.log(err);
        }
        setSrAccepted(true);
        setRetortChange(true);
    }

    useEffect(() => {
        if (flame) {
            if (user.subscribeByReq) {
                if (!srAccepted && !srRejected) {
                    setRetort("request");
                } else if (srAccepted && !srRejected && user.flameSubscribing.includes(flame._id)) {
                    setRetort("friendship");
                } else if (srAccepted && !srRejected && !user.flameSubscribing.includes(flame._id)) {
                    setRetort("befriend");
                } else if (!srAccepted && srRejected) {
                    setRetort("rejected");
                }
            } else if (!user.subscribeByReq) {
                if (user.flameSubscribing.includes(flame._id)) {
                setRetort("friendship");
                } else {
                setRetort("befriend")
                }
            }
        }
    }, [flame]);

    useEffect(() => {
        var startCnt = 0;
        var endCnt = 100;
        const getRetort = () => {
            if (user.subscribeByReq && !srAccepted && !srRejected) {
                setRetort("request");
            } else if (user.subscribeByReq && srAccepted && !srRejected && flameSubscribed) {
                setRetort("friendship");
            } else if (user.subscribeByReq && srAccepted && !srRejected && !flameSubscribed) {
                setRetort("befriend");
            } else if (user.subscribeByReq && !srAccepted && srRejected) {
                setRetort("rejected");
            } else if (!user.subscribeByReq && flameSubscribed) {
                setRetort("friendship");
            } else {
                setRetort("befriend")
            }
        }
        if (retortChange) {
            const fadeOut = setInterval(() => {
                if (endCnt === 1) {
                    clearInterval(fadeOut);
                }
                setFade(endCnt -= 1);
            }, 20);
            setTimeout(() => {
                getRetort();
                setRetortChange(false);
                const fadeIn = setInterval(() => {
                    if (startCnt === 100) {
                        clearInterval(fadeIn);
                    }
                    setFade(startCnt++);
                }, 25);
            }, 2320)
        }
    }, [retortChange]);


    useEffect(() => {
        if(retort.length > 0) {
            switch (retort) {
                case "request":
                    setRetortDisplay(
                        <>
                            <div className="flameSubRequestRetort request">
                                <button className={`flameSubRequestBtn accept ${flame.energy}`} onClick={handleAcceptRequestClick}>
                                    Accept
                                </button>
                                <button className={`flameSubRequestBtn reject ${flame.energy}`}>
                                    Not Now
                                </button>
                            </div>
                        </>
                    );
                    break;
                case "friendship":
                    setRetortDisplay(
                        <>
                            <div className="flameSubRequestRetort">
                               <div className="flameSubRequestRetortLeft friendship">
                                    <span>
                                        {`You are now subscribed to ${flame.profileName}`}
                                    </span>
                               </div>
                               <div className={`flameSubRequestRetortRight friendship ${flame.energy}`}>
                                    {/*<button className={`flameRequestBtn message ${flame.energy}`} type="submit" onClick={handleMessageClick}>
                                        Message
                                    </button>*/}
                               </div>
                            </div> 
                        </>
                    );
                    
                    break;
                case "reject":
                    setRetortDisplay(
                        <>
                           <div className="flameSubRequestRetort">{`You did not accept ${flame.profileName}'s subscribe request.`}</div> 
                        </>
                    );
                    
                    break;
                default:
                    setRetortDisplay(
                        <>
                            <div className="flameSubRequestRetort">
                                <div className="flameSubRequestRetortLeft befriend">
                                    <span>
                                        {`Subscribe to ${flame.sex ? flame.sex === "male" ? "him" : "her" : "them"} as well!`}
                                    </span>   
                                </div>
                                <div className="flameSubRequestRetortRight befriend">
                                    <button className={`flameSubRequestBtn befriend ${flame?.energy}`} onClick={handleFlameSubscribeClick}>
                                        {user.flameSubscribing.includes(flame?._id) ? <><div className="profileSubscribeIcon">{mailIcon}</div>{checkIcon}</> : "Subscribe"}
                                    </button>
                                </div>
                            </div>
                        </>
                    );   
            }
        }
    },[retort, flame]);


    return (
        <>
        {flame &&
        <Link className={`flameSubRequest`} to={flame.isAnonymous ? `/flame-profile/id/${flame?._id}` : `/flame-profile/userName/${flame.userName}`}>
            <div className={`flameSubRequestBackgroundTheme ${srSeen? "seen" : "unseen"} ${flame?.energy}`} />
            <hr className={`flameSubRequestHr top ${flame?.energy}`} />
            <div className={`flameSubRequestContainer`}>
                <div className="flameSubRequestLeft">
                    <img 
                        className={`flameSubRequestProfilePic`} 
                        src={flame?.isAnonymous 
                            ? fAvatar 
                            : flame?.profilePicture 
                                ? PS + flame.profilePicture 
                                : fAvatar
                        }
                        onError={(e) => {e.currentTarget.src = fAvatar}}
                        //alt="flame-avatar" 
                    />
                    <i
                        className={`flameSubRequestIcon PNG_ICON_ENERGY ${flame?.energy}`}
                        //alt="energy-icon" 
                    />
                </div>
                <div className={`flameSubRequestRight ${flame?.energy}`}>
                    <div className="flameSubRequestRightTop">
                        <div className="flameSubRequestTitle">
                            <div className="flameSubRequestTitleLeft">
                                <span className="flameSubRequestName">{flame?.profileName}</span> 
                                <span className="flameSubRequestAction">
                                    {`has ${retort === "request" ? "requested to subscribe" : "subscribed"} to you!`}
                                </span>
                            </div>
                            <div className={`flameSubRequestTitleRight ${flame?.energy}`}>
                                {retort !== "request" &&
                                    <>
                                        <div className="flameSubRequestRetortIcon person">{mailIcon}</div>
                                        <div className="flameSubRequestRetortIcon check">{checkIcon}</div>  
                                    </>
                                }
                            </div>
                        </div>
                    </div>                                                      
                    <div className="flameSubRequestRightBottom" style={{ opacity: `${fade}%`}}>
                            {retortDisplay}                  
                    </div>
                </div>
            </div>
            <hr className={`flameSubRequestHr bottom ${flame?.energy}`} />
    </Link>
    }
    </>
    )
}

export default memo(FlameSubscribeRequest);