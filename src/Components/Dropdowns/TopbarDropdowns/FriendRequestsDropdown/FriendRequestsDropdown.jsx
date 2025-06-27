import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';
import "./FriendRequestsDropdown.css";
import FlameRequest from '../../../FollowRequests/FriendRequests/FlameFriendRequest/FlameFriendRequest';
import  UnionRequest from '../../../FollowRequests/FriendRequests/UnionFriendRequest/UnionFriendRequest';
import  AcceptedRequest from '../../../FollowRequests/FriendRequests/AcceptedFriendRequest/AcceptedFriendRequest';
import AcceptedSubscribeRequest from '../../../FollowRequests/SubscribeRequests/AcceptedSubscribeRequest/AcceptedSubscribeRequest';
import FlameSubscribeRequest from '../../../FollowRequests/SubscribeRequests/FlameSubscribeRequest/FlameSubscribeRequest';
import UnionSubscribeRequest from '../../../FollowRequests/SubscribeRequests/UnionSubscribeRequest/UnionSubscribeRequest';

function FriendRequestsDropdown() {

    const { user, flame } = useSelector((state) => state.auth);

    const folMDomNode = useRef(null);
    const folMDDRef = useRef(null);
    const folCntRef = useRef(null);

    const [ folMDD, setFolMDD ] = useState(false);
    const [ folHover, setFolHover ] = useState(false);
    const [ folActive, setFolActive ] = useState(false);
    const [ folCntWidth, setFolCntWidth ] = useState();

    const [ initialFriendRequests, setInitialFriendRequests ] = useState([]);
    const [ friendReqsInitialUnseen, setFriendReqsInitialUnseen ] = useState([]);
    const [ acceptedFriendRequests, setAcceptedFriendRequests ] = useState([]);
    const [ friendReqsAcceptedUnseen, setFriendReqsAcceptedUnseen ] = useState([]);

    const [ initialSubscribeRequests, setInitialSubscribeRequests ] = useState([]);
    const [ subReqsInitialUnseen, setSubReqsInitialUnseen ] = useState([]);
    const [ acceptedSubscribeRequests, setAcceptedSubscribeRequests ] = useState([]);
    const [ subReqsAcceptedUnseen, setSubReqsAcceptedUnseen ] = useState([]);

    const [ friendRequests, setFriendRequests ] = useState([]);
    const [ subscribeRequests, setSubscribeRequests ] = useState([]);
    const [ followRequests, setFollowRequests ] = useState([]);
    const [ reqsUnseen, setReqsUnseen ] = useState([]);
    const [ reqsUnseenCnt, setReqsUnseenCnt ] = useState(0);
    const [ folsDisplay, setFolsDisplay ] = useState([]);

    const colorTheme = user.unionName ? user.spectrum : user.energy;
    const userType = user.unionName ? "union" : "flame";

    useEffect(() => {
        const fetchInitialFriendRequests = async () => {
            const res = await axiosReq("GET", `/friendRequests/${userType}/${user._id}/befriend`);
            setInitialFriendRequests(res.data.sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
        fetchInitialFriendRequests();
    }, [user._id]);

    useEffect(() => {
        const fetchAcceptedFriendRequests = async () => {
            const res = await axiosReq("GET", `/friendRequests/${userType}/${user._id}/accepted`);
            setAcceptedFriendRequests(res.data.sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
        fetchAcceptedFriendRequests();
    }, [user._id]);

    useEffect(() => {
        const fetchInitialSubscribeRequests = async () => {
            const res = await axiosReq("GET", `/subscribeRequests/${userType}/${user._id}/subscribe`);
            setInitialSubscribeRequests(res.data.sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
        fetchInitialSubscribeRequests();
    }, [user._id]);


    useEffect(() => {
        const fetchAcceptedSubscribeRequests = async () => {
            const res = await axiosReq("GET", `/subscribeRequests/${userType}/${user._id}/accepted`);
            setAcceptedSubscribeRequests(res.data.sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
        fetchAcceptedSubscribeRequests();
    }, [user._id]);

    useEffect(() => {
        if(initialFriendRequests) {
            const getFriendReqsInitialUnseen = () => {
                const unseenArr = initialFriendRequests.filter((fr) => fr.initialSeen === false);
                setFriendReqsInitialUnseen(unseenArr);
                //setFriendReqsInitialUnseenCnt(unseenArr.length);
            }
            getFriendReqsInitialUnseen();
        }
    }, [initialFriendRequests]);

    useEffect(() => {
        if(acceptedFriendRequests) {
            const getFriendReqsAcceptedUnseen = () => {
                const unseenArr = acceptedFriendRequests.filter((fr) => fr.acceptSeen === false);
                setFriendReqsAcceptedUnseen(unseenArr);
                //setFriendReqsAcceptedUnseenCnt(unseenArr.length);
            }
            getFriendReqsAcceptedUnseen();
        }
    }, [acceptedFriendRequests]);

    useEffect(() => {
        if(initialSubscribeRequests) {
            const getSubReqsInitialUnseen = () => {
                const unseenArr = initialSubscribeRequests.filter((sr) => sr.initialSeen === false);
                setSubReqsInitialUnseen(unseenArr);
                //setSubReqsInitialUnseenCnt(unseenArr.length);
            }
            getSubReqsInitialUnseen();
        }
    }, [initialSubscribeRequests]);

    useEffect(() => {
        if(acceptedSubscribeRequests) {
            const getSubReqsAcceptedUnseen = () => {
                const unseenArr = acceptedSubscribeRequests.filter((sr) => sr.acceptSeen === false);
                setSubReqsAcceptedUnseen(unseenArr);
                //setSubReqsAcceptedUnseenCnt(unseenArr.length);
            }
            getSubReqsAcceptedUnseen();
        }
    }, [acceptedSubscribeRequests]);

    useEffect(() => {
        if (initialFriendRequests || acceptedFriendRequests) { 
            setFriendRequests(initialFriendRequests.concat(acceptedFriendRequests).sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
    }, [initialFriendRequests, acceptedFriendRequests]);

    useEffect(() => {
        if (initialSubscribeRequests || acceptedSubscribeRequests) { 
            setSubscribeRequests(initialSubscribeRequests.concat(acceptedSubscribeRequests).sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
        }
    }, [initialSubscribeRequests, acceptedSubscribeRequests]);

    useEffect(() => {
        if (subscribeRequests || friendRequests) { 
            setFollowRequests(subscribeRequests.concat(friendRequests).sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                }).splice(0,5)
            );
        }
    }, [subscribeRequests, friendRequests]);

    useEffect(() => {
        if (friendReqsInitialUnseen || friendReqsAcceptedUnseen || subReqsInitialUnseen || subReqsAcceptedUnseen) { 
            setReqsUnseen(friendReqsInitialUnseen.concat(friendReqsAcceptedUnseen).concat(subReqsInitialUnseen).concat(subReqsAcceptedUnseen).sort((a1, a2) => {
                return new Date(a2.createdAt) - new Date(a1.createdAt);
                })
            );
            setReqsUnseenCnt(reqsUnseen.length)
        }
    }, [friendReqsInitialUnseen, friendReqsAcceptedUnseen, subReqsInitialUnseen, subReqsAcceptedUnseen]);


    useEffect(() => {
        setFolsDisplay(followRequests.map((fol) => (
            fol.requestType === "friend"
                ? fol.requestAccepted
                    ? <AcceptedRequest key={fol._id} fr={fol}/>
                    : fol.flameRequesterId  
                        ? <FlameRequest key={fol._id} fr={fol}/>
                        : <UnionRequest key={fol._id} fr={fol}/>
                : fol.requestAccepted
                    ? <AcceptedSubscribeRequest key={fol._id} sr={fol}/>
                    : fol.flameRequesterId  
                        ? <FlameSubscribeRequest key={fol._id} sr={fol}/>
                        : <UnionSubscribeRequest key={fol._id} sr={fol}/>
        )).splice(0,5))
    }, [followRequests.length]);

    useEffect(() => {
        if(folMDD) {  
            const putFolsSeen = async () => {
                const unseenFolDisplays = folsDisplay.map((fol) = fol.seen === false)
                if (unseenFolDisplays.length > 0) {
                    try {
                        await Promise.all(
                            unseenFolDisplays.forEach((fol) => {
                                if(!fol.initialSeen) {
                                    axiosInstance.put(`/${fol.requestType}Requests/${fol._id}/initialSeen`)
                                } else if (fol.initialSeen && fol.requestAccepted && !fol.acceptSeen) {
                                    axiosInstance.put(`/${fol.requestType}Requests/${fol._id}/acceptSeen`)
                                }
                                setReqsUnseen(reqsUnseen.filter((r) =>r._id !== fol._id))
                            })
                        )
                    } catch(err) {
                        console.log(err)
                    }
                }
            }       
            putFolsSeen();
        }
    }, [folMDD]);

    useEffect(() => {
        if (reqsUnseenCnt) {
            const getFCWidth = () => {
                const fCWidth = folCntRef.current.clientWidth;
                setFolCntWidth(fCWidth + 12);
            }
            getFCWidth();
        }
    }, [reqsUnseenCnt]);

    useEffect(() => {
        let folMDDHandler = (event) => {
            //if (event.path[0] !== folMDDRef || !folMDomNode.current.contains(event.target)) {
            var path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                setFolMDD(false);
            }
        };
        if (folMDD) {
            document.body.addEventListener("click", folMDDHandler);
            return () => {
                document.body.removeEventListener("click", folMDDHandler);
            };
        }
      }, [folMDD]);
    


    return (

        <div className="topbarIconItemcontainer follow" ref={folMDDRef}>
            {user.unionName ?
                (
                    <>
                        {folMDD ?
                            (
                                <>
                                    <div 
                                        className={`
                                            friendRequestsDropdownHigherSpectrumBackground
                                            ${user.unionName && colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                                            ${colorTheme}
                                        `} 
                                        
                                    />
                                    <div className="friendRequestsDropdownWhiteBackground open" />
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
                                            folHover 
                                                ? folActive
                                                    ? 'HIGHER_BACKGROUND diamond drk lgt'
                                                    : 'HIGHER_BACKGROUND diamond lgt'
                                                : null
                                        }
                                        ${folMDD ? "open" : "close"}
                                    `}
                                    onMouseEnter={() => setFolHover(true)} 
                                    onMouseLeave={() => setFolHover(false)}
                                    onMouseDown={() => setFolActive(true)} 
                                    onMouseUp={() => setFolActive(false)}
                                    onClick={() => setFolMDD(!folMDD)}
                                >
                                    <i
                                        className={`
                                            topbarPNGIcon
                                            PNG_ICON_FRIENDS${folActive ? "_DRK" : ""}
                                            ${flame.energy}
                                            ${user.spectrum}
                                        `} 
                                        alt={`friends-${flame.energy}-${user.spectrum}`} 
                                    />
                                    <span 
                                        className={`topbarIconBadge ${flame.energy}`}
                                        style={reqsUnseen.length > 0 
                                            ? {
                                                opacity: "100%",
                                                width: `${folCntWidth}px`,
                                                right: `-${folCntWidth - 13}px`
                                            } : {
                                                opacity: "0%", 
                                                width: `${folCntWidth}px`,
                                                right: `-${folCntWidth - 13}px`,
                                                transitionDelay: "325ms", 
                                                transition: "opacity 4000ms ease-in-out"
                                            }
                                        }
                                    >
                                        <span ref={folCntRef}>{reqsUnseenCnt}</span>
                                    </span>
                                </div>
                            ) : (
                                <div 
                                    className={`topbarIconItem ${folMDD ? "INNER_BOX_SHADOW open" : "BOX_SHADOW close"} ${user.spectrum ? user.spectrum : "gray"}`}
                                    onMouseEnter={() => setFolHover(true)} 
                                    onMouseLeave={() => setFolHover(false)}
                                    onMouseDown={() => setFolActive(true)} 
                                    onMouseUp={() => setFolActive(false)}
                                    onClick={() => setFolMDD(!folMDD)}
                                >
                                    <i
                                        className={`
                                            topbarPNGIcon
                                            PNG_ICON_FRIENDS${folActive ? "_DRK" : ""}
                                            ${flame.energy}
                                            ${user.spectrum}
                                        `} 
                                        alt={`friends-${flame.energy}-${user.spectrum}`} 
                                    />
                                    <span 
                                        className={`topbarIconBadge ${flame.energy}`}
                                        style={reqsUnseen.length > 0 
                                            ? {
                                                opacity: "100%",
                                                width: `${folCntWidth}px`,
                                                right: `-${folCntWidth - 13}px`
                                            } : {
                                                opacity: "0%", 
                                                width: `${folCntWidth}px`,
                                                right: `-${folCntWidth - 13}px`,
                                                transitionDelay: "325ms", 
                                                transition: "opacity 4000ms ease-in-out"
                                            }
                                        }
                                    >
                                        <span ref={folCntRef}>{reqsUnseenCnt}</span>
                                    </span>
                                </div>
                            )
                        }
                    </>
                ) : (
                    <>
                        <div 
                            className={`topbarIconItem ${folMDD ? "INNER_BOX_SHADOW" : "BOX_SHADOW"} ${user.energy ? user.energy : "gray"}`}
                            onMouseEnter={() => setFolHover(true)} 
                            onMouseLeave={() => setFolHover(false)}
                            onMouseDown={() => setFolActive(true)} 
                            onMouseUp={() => setFolActive(false)}
                            onClick={() => setFolMDD(!folMDD)}
                        >
                            <i
                                className={`
                                    topbarPNGIcon
                                    PNG_ICON_FRIENDS${folActive ? "_DRK" : ""}
                                    ${user.energy}
                                `} 
                                alt={`friends-${flame?.energy}-${user.spectrum}`} 
                            />
                            <span 
                                className={`topbarIconBadge ${flame?.energy}`}
                                style={reqsUnseen.length > 0 
                                    ? {
                                        opacity: "100%",
                                        width: `${folCntWidth}px`,
                                        right: `-${folCntWidth - 13}px`
                                    } : {
                                        opacity: "0%", 
                                        width: `${folCntWidth}px`,
                                        right: `-${folCntWidth - 13}px`,
                                        transitionDelay: "325ms", 
                                        transition: "opacity 4000ms ease-in-out"
                                    }
                                }
                            >
                                <span ref={folCntRef}>{reqsUnseenCnt}</span>
                            </span>
                        </div>
                    </>
                )
            }
            <div className={`tbFMDropDown chat flame ${folMDD ? "open" : ""}`} ref={folMDomNode}>  
                <div className="friendRequestsDropdown flame">
                    <div className="friendRequestsDropdownContainer">
                        <div 
                            className={`
                                friendRequestsDropdownBackgroundTheme 
                                HIGHER_BACKGROUND
                                ${colorTheme}
                            `}  
                        />
                        <div className={`friendRequestsDropdown-container BOX_SHADOW ${user.unionName ? user.spectrum : user.energy}`}>
                            <div className="friendRequestDropdownList">
                                {folsDisplay}
                            </div>
                            <div className="friendRequestDropdownLinkContainer">
                                <hr 
                                    className={`
                                        friendRequestDropdownHr 
                                        ${colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                        ${colorTheme}
                                    `}
                                />
                                <div className="friendRequestDropdownLinkContainerBottom">
                                    <Link 
                                        className={`friendRequestDropdownLink ${followRequests.length < 5 ? "unlink" : "link"}`} 
                                        to="/friendRequests"
                                    >
                                        <span className={`friendRequestDropdownLinkText ${user.unionName ? user.spectrum : user.energy}`}>
                                            See All Friend Requests
                                        </span>
                                    </Link>

                                    <span 
                                        className={`
                                            friendRequestDropdownLinkBadge 
                                            ${colorTheme === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                            ${colorTheme}
                                        `}
                                        style={folMDD && reqsUnseen.length > 0 
                                            ? {
                                                opacity: "100%",
                                                width: `${folCntWidth}px`,
                                                right: `-${folCntWidth - 13}px`
                                            } : {
                                                opacity: "0%", 
                                                width: `${folCntWidth}px`,
                                                right: `-${folCntWidth - 13}px`,
                                                transitionDelay: "325ms", 
                                                transition: "opacity 4000ms ease-in-out"
                                            }
                                        }
                                    >
                                        <span ref={folCntRef}>{reqsUnseenCnt}</span>
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

export default FriendRequestsDropdown;