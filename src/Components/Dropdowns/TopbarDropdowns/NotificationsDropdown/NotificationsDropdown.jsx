import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./NotificationsDropdown.css";
import { axiosReq } from '../../../../Utils/axiosConfig';
import { notMDDOpen, notMDDClose } from '../../../../Redux/AuthSlice';
import AnswerNots from '../../../Notifications/FlareNots/AnswerNots/AnswerNots';
import BirthdayNots from '../../../Notifications/UserNots/BirthdayNots/BirthdayNots';
import CommentNots from '../../../Notifications/FlareNots/CommentNots/CommentNots';
import JourneyNots from '../../../Notifications/UserNots/JourneyNots/JourneyNots';
import LikeNots from '../../../Notifications/FlareNots/LikeNots/LikeNots';
import LoveNots from '../../../Notifications/FlareNots/LoveNots/LoveNots';
import ProfileUpdateNots from '../../../Notifications/UserNots/ProfileUpdateNots/ProfileUpdateNots';
import RelationshipNots from '../../../Notifications/UserNots/RelationshipNots/RelationshipNots';
import ReplyNots from '../../../Notifications/FlareNots/ReplyNots/ReplyNots';
import ReviewNots from '../../../Notifications/FlareNots/ReviewNots/ReviewNots';
import ShareNots from '../../../Notifications/FlareNots/ShareNots/ShareNots';
import StoryNots from '../../../Notifications/UserNots/StoryNots/StoryNots';
// import bell1 from '../../../../Assets/soundEffects/notificationSounds/bell1.wav'

function NotificationsDropdown() {

    const { user, flame, screenMode, notMDD, arrFlareNot, arrUserNot } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const notMDomNode = useRef(null);
    const notMDDRef = useRef(null);
    const notCntRef = useRef(null);

    const [ notHover, setNotHover ] = useState(false);
    const [ notActive, setNotActive ] = useState(false);
    const [ notCntWidth, setNotCntWidth ] = useState();
    const [ notUnseen, setNotUnseen ] = useState([]);
    const [ notUnseenCnt, setNotUnseenCnt ] = useState(0);
    const [ flareNots, setFlareNots ] = useState([]);
    const [ flareNotsUnseen, setFlareNotsUnseen ] = useState([]);
    const [ flareNotsUnseenCnt, setFlareNotsUnseenCnt ] = useState(0);
    const [ userNots, setUserNots ] = useState([]);
    const [ userNotsUnseen, setUserNotsUnseen ] = useState([]);
    const [ userNotsUnseenCnt, setUserNotsUnseenCnt ] = useState(0);
    const [ notifications, setNotifications ] = useState([]);
    const [ notDisplays, setNotDisplays ] = useState([]);
    const [ notsDisplayed, setNotsDisplayed ] = useState([]);
    const [ notDisplayCnt, setNotDisplayCnt ] = useState(0);

    const colorTheme = user.unionName ? user.spectrum : user.energy;

    const notificationBell = () => {
        new Audio(bell1).play()
    }

    useEffect(() => {
        const fetchFlareNots = async () => {
            const res = await axiosReq("GET", `/flareNots/${user._id}`)   
            setFlareNots(res.data.sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
        fetchFlareNots();
    }, [user._id]);

    useEffect(() => {
        const fetchUserNots = async () => {
            const res = await axiosReq("GET", `/userNots/${user._id}`)   
            setUserNots(res.data.sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
        fetchUserNots();
    }, [user._id]);

    useEffect(() => {
        if(flareNots) {
            const getFlareNotsUnseen = () => {
                const unseenArr = flareNots.filter((not) => not.seen === false);
                setFlareNotsUnseen(unseenArr);
                setFlareNotsUnseenCnt(unseenArr.length);
            }
            getFlareNotsUnseen();
        }
    }, [flareNots]);

    useEffect(() => {
        if(userNots) {
            const getUserNotsUnseen = () => {
                const unseenArr = userNots.filter((not) => not.seen === false);
                setUserNotsUnseen(unseenArr);
                setUserNotsUnseenCnt(unseenArr.length);
            }
            getUserNotsUnseen();
        }
    }, [userNots]);

    useEffect(() => {
        if (flareNots || userNots) {
            setNotifications(flareNots.concat(userNots).sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
    }, [flareNots, userNots])

    useEffect(() => {
        if (arrFlareNot) {
            const arrFlareNotHandler = () => {
                setNotifications([arrFlareNot, ...notifications])
                setNotUnseen([arrFlareNot, ...notUnseen])
                setNotUnseenCnt(notUnseenCnt + 1)
                //notificationBell()
                setFlareNotsUnseen([arrFlareNot, ...flareNotsUnseen]);
                //setFlareNotsUnseenCnt(flareNotsUnseenCnt + 1);

            }
            arrFlareNotHandler();
        }
    }, [arrFlareNot]);

    useEffect(() => {
        if (arrUserNot) {
            const arrUserNotHandler = () => {
                setNotifications([arrUserNot, ...notifications])
                setNotUnseen([arrUserNot, ...notUnseen])
                setNotUnseenCnt(notUnseenCnt + 1)
                //notificationBell()
                setUserNotsUnseen([arrUserNot, ...userNotsUnseen]);
                //setUserNotsUnseenCnt(userNotsUnseenCnt + 1);
            }
            arrUserNotHandler();
        }
    }, [arrUserNot]);

    useEffect(() => {
        if (flareNotsUnseen || userNotsUnseen) { 
            setNotUnseen(flareNotsUnseen.concat(userNotsUnseen).sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
            }));
            setNotUnseenCnt(notUnseen.length)
        }
    }, [flareNotsUnseen, userNotsUnseen]);

    useEffect(() => {
        setNotUnseenCnt(notUnseen.length)
    }, [notUnseen.length])

    useEffect(() => {
        if (notUnseenCnt) {
            const getNCWidth = () => {
                const nCWidth = notCntRef.current.clientWidth;
                setNotCntWidth(nCWidth + 12);
            }
            getNCWidth();
        }
    }, [notUnseenCnt]);

    useEffect(() => {
        let notMDDHandler = (event) => {
            //if (event.path[0] !== notMDDRef || !notMDomNode.current.contains(event.target)) {
            var path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                //setNotMDD(false);
                dispatch(notMDDClose())
            }
        };
        if (notMDD) {
            document.body.addEventListener("click", notMDDHandler);
            return () => {
                document.body.removeEventListener("click", notMDDHandler);
            };
        }
    }, [notMDD]);

    useEffect(() => {
        setNotsDisplayed(notifications.slice(0,5));
    }, [notifications.length])

    useEffect(() => {
        setNotDisplays(notifications.map((not) => {
            let notRender = null;
            switch (not.notType) {
                case "answer":
                    notRender = <AnswerNots key={not._id} not={not}/>
                    break;
                case "Birthday":
                    notRender = <BirthdayNots key={not._id} not={not}/>
                    break;
                case "comment":
                    notRender = <CommentNots key={not._id} not={not}/>
                    break;
                case "journey":
                    notRender = <JourneyNots key={not._id} not={not}/>
                    break;
                case "like":
                    notRender = <LikeNots key={not._id} not={not}/>
                    break;
                case "love":
                    notRender = <LoveNots key={not._id} not={not}/>
                    break;
                case "profileUpdate":
                    notRender = <ProfileUpdateNots key={not._id} not={not}/>
                    break;
                case "relationship":
                    notRender = <RelationshipNots key={not._id} not={not}/>
                    break;
                case "reply":
                    notRender = <ReplyNots key={not._id} not={not}/>
                    break;
                case "review":
                    notRender = <ReviewNots key={not._id} not={not}/>
                    break;
                case "share":
                    notRender = <ShareNots key={not._id} not={not}/>
                    break;
                case "story":
                    notRender = <StoryNots key={not._id} not={not}/>
                    break;
                default:
                    notRender = "";
            }
            return notRender;
        }).slice(0,5));  
    }, [notifications.length]);

    

    
    useEffect(() => {
        if(notMDD) {  
            const putNotsSeen = async () => {
                const unseenNotsDisplayed = notsDisplayed.filter((not) => not.seen === false)
                if (unseenNotsDisplayed.length > 0) {
                    try {
                        await Promise.all(
                            unseenNotsDisplayed.forEach((not) => {
                                not.flareType
                                    ? axiosReq("PUT", `/flareNots/${not._id}/seen`)
                                    : axiosReq("PUT", `/userNots/${not._id}/seen`)
                                setNotUnseen(notUnseen.filter((n) => n._id !== not._id))
                            })
                        )
                    } catch(err) {
                        console.log(err)
                    }
                }
            }       
            putNotsSeen();
        }
    }, [notMDD]);
    

    
    return (

        <div className="topbarIconItemcontainer not" ref={notMDDRef}>
            {user.unionName ?
                (
                    <>
                        {notMDD ?
                            (
                                <>
                                    <div 
                                        className={`
                                            notificationsDropdownHigherSpectrumBackground 
                                            ${user.unionName && colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                            ${colorTheme}
                                        `} 
                                    />
                                    <div className="notificationsDropdownWhiteBackground open" />
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
                                        BACKGROUND_SCREEN ${screenMode ? "dark" : "light"}
                                        ${
                                            notHover 
                                                ? notActive
                                                    ? 'HIGHER_BACKGROUND diamond drk lgt'
                                                    : 'HIGHER_BACKGROUND diamond lgt'
                                                : null
                                        }
                                        ${notMDD ? "open" : "close"}
                                    `}
                                    onMouseEnter={() => setNotHover(true)} 
                                    onMouseLeave={() => setNotHover(false)}
                                    onMouseDown={() => setNotActive(true)} 
                                    onMouseUp={() => setNotActive(false)}
                                    onClick={() => notMDD ? dispatch(notMDDClose()) : dispatch(notMDDOpen())}
                                >
                                <i
                                    className={`
                                        notPNGIcon
                                        PNG_ICON_LB_${notHover ? notActive ? "DRK" : "WHT" : ""}
                                        ${colorTheme}
                                    `} 
                                    alt={`notifications-${colorTheme}`} 
                                />
                                    {notUnseenCnt > 0 &&
                                        <span 
                                            className={`topbarIconBadge ${flame.energy}`}
                                            style={notUnseen.length > 0 
                                                ? {
                                                    opacity: "100%",
                                                    width: `${notCntWidth}px`,
                                                    right: `-${notCntWidth - 13}px`
                                                } : {
                                                    opacity: "0%", 
                                                    width: `${notCntWidth}px`,
                                                    right: `-${notCntWidth - 13}px`,
                                                    transitionDelay: "325ms", 
                                                    transition: "opacity 4000ms ease-in-out"
                                                }
                                            }
                                        >
                                            <span ref={notCntRef}>{notUnseenCnt}</span>
                                        </span>
                                    }
                                </div>
                            ) : (
                                <div 
                                    className={`
                                        topbarIconItem
                                        BACKGROUND_SCREEN ${screenMode ? "dark" : "light"}
                                        ${notMDD ? "INNER_BOX_SHADOW open" : "BOX_SHADOW close"} 
                                        ${user.spectrum ? user.spectrum : "gray"}
                                    `}
                                    onMouseEnter={() => setNotHover(true)} 
                                    onMouseLeave={() => setNotHover(false)}
                                    onMouseDown={() => setNotActive(true)} 
                                    onMouseUp={() => setNotActive(false)}
                                    onClick={() => notMDD ? dispatch(notMDDClose()) : dispatch(notMDDOpen())}
                                >
                                    <i
                                        className={`
                                            notPNGIcon
                                            PNG_ICON_LB_${notHover ? notActive ? "DRK" : "WHT" : ""}
                                            ${colorTheme}
                                        `} 
                                        alt={`notifications-${colorTheme}`} 
                                    />
                                    <span 
                                        className={`topbarIconBadge ${flame.energy}`}
                                        style={notUnseen.length > 0 
                                            ? {
                                                opacity: "100%",
                                                width: `${notCntWidth}px`,
                                                right: `-${notCntWidth - 13}px`
                                            } : {
                                                opacity: "0%", 
                                                width: `${notCntWidth}px`,
                                                right: `-${notCntWidth - 13}px`,
                                                transitionDelay: "325ms", 
                                                transition: "opacity 4000ms ease-in-out"
                                            }
                                        }
                                    >
                                        <span ref={notCntRef}>{notUnseenCnt}</span>
                                    </span>
                                </div>
                            )
                        }
                    </>
                ) : (
                    <>
                        <div 
                            className={`topbarIconItem ${notMDD ? "INNER_BOX_SHADOW" : "BOX_SHADOW"} ${user.energy ? user.energy : "gray"}`}
                            onMouseEnter={() => setNotHover(true)} 
                            onMouseLeave={() => setNotHover(false)}
                            onMouseDown={() => setNotActive(true)} 
                            onMouseUp={() => setNotActive(false)}
                            onClick={() => notMDD ? dispatch(notMDDClose()) : dispatch(notMDDOpen())}
                        >
                            <i
                                className={`
                                    notPNGIcon
                                    PNG_ICON_LB_${notHover ? notActive ? "DRK" : "WHT" : ""}
                                    ${colorTheme}
                                `} 
                                alt={`notifications-${colorTheme}`} 
                            />
                            <span 
                                className={`topbarIconBadge ${flame?.energy}`}
                                style={notUnseen.length > 0  
                                    ? {
                                        opacity: "100%",
                                        width: `${notCntWidth}px`,
                                        right: `-${notCntWidth - 13}px`
                                    } : {
                                        opacity: "0%", 
                                        width: `${notCntWidth}px`,
                                        right: `-${notCntWidth - 13}px`,
                                        transitionDelay: "325ms", 
                                        transition: "opacity 4000ms ease-in-out"
                                    }
                                }
                            >
                                <span ref={notCntRef}>{notUnseenCnt}</span>
                            </span>
                        </div>
                    </>
                )
            }
            <div className={`tbNMDropDown not flame ${notMDD ? "open" : ""}`} ref={notMDomNode}>  
                <div className="notDropdown flame">
                    <div className="notDropdownContainer">
                        <div 
                            className={`
                                notDropdownBackgroundTheme 
                                HIGHER_BACKGROUND
                                ${colorTheme}
                            `}  
                        />
                        <div className={`notDropdown-container BOX_SHADOW ${user.unionName ? user.spectrum : user.energy}`}>
                            <div className="notDropdownList">
                                {notDisplays}
                            </div>
                            <div className="notDropdownLinkContainer">
                                <hr 
                                    className={`
                                        notDropdownHr 
                                        ${colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                        ${colorTheme}
                                    `}
                                />
                                <div className="notDropdownLinkContainerBottom">
                                    <Link 
                                        className={`notDropdownLink ${notifications.length < 5 ? "unlink" : "link"}`}
                                        to="/notifications"
                                    >
                                        <span className={`notDropdownLinkText ${user.unionName ? user.spectrum : user.energy}`}>
                                            See All Notifications
                                        </span>
                                    </Link>
                                    <span 
                                        className={`
                                            notDropdownLinkBadge 
                                            ${colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                            ${colorTheme}
                                        `}
                                        style={notMDD && notUnseen > 0 
                                            ? {
                                                opacity: "100%",
                                                width: `${notCntWidth}px`,
                                                right: `-${notCntWidth - 13}px`
                                            } : {
                                                opacity: "0%", 
                                                width: `${notCntWidth}px`,
                                                right: `-${notCntWidth - 13}px`,
                                                transitionDelay: "325ms", 
                                                transition: "opacity 4000ms ease-in-out"
                                            }
                                        }
                                    >
                                        <span ref={notCntRef}>{notUnseenCnt}</span>
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

export default NotificationsDropdown;