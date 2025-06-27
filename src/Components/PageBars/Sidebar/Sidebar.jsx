import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { colorTheme } from '../../../Utils/styling/colorTheme';
import "./Sidebar.css";
import { axiosReq } from '../../../Utils/axiosConfig';
import { userConv1 } from '../../../Redux/AuthSlice';

function Sidebar() {

    const { user, flame, onlineFlames, onlineUnions } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [flameFriends, setFlameFriends] = useState([]);
    const [unionFriends, setUnionFriends] = useState([]);
    const [onlineFlameFriends, setOnlineFlameFriends] = useState([]);
    const [onlineUnionFriends, setOnlineUnionFriends] = useState([]);
    const [ hover, setHover ] = useState(false);
    const [ splice, setSplice ] = useState(3);

    
    useEffect(() => {
        if (user) {
            const getFriends = async () => {
                const flameRes = await axiosReq("GET", `/${user.unionName ? "unions" : "users"}/flame-following/${user._id}`);
                setFlameFriends(flameRes.data);
                const unionRes = await axiosReq("GET", `/${user.unionName ? "unions" : "users"}/union-following/${user._id}`);
                setUnionFriends(unionRes.data);
            }
            getFriends();
        }
    }, [user?.flameFollowing, user?.unionFollowing]);

    

    useEffect(() => {
        //if(onlineFlames.length === 0 || onlineUnions.length === 0) return;
        setOnlineFlameFriends(flameFriends.filter((fFriend) => onlineFlames.includes(fFriend._id)));
        setOnlineUnionFriends(unionFriends.filter((uFriend) => onlineUnions.includes(uFriend._id)));
    }, [flameFriends, unionFriends, onlineFlames, onlineUnions]);
    

    return (
        <>
        {user &&
        <div className="sidebar">
            <div className="sidebar-container">
                <div className={`sidebarMenuTitle ${colorTheme(user)}`}>Menu</div>
                <ul className="sidebarList">
                    <div className="sidebarTopicListContainer">
                        <div className={`sidebarTopicTitle ${colorTheme(user)}`}>Stay Current</div>
                        {/*<hr className={`sidebarTopicHr current ${user.unionName? user.spectrum : user.energy}`} />*/}
                        <ul className="sidebarTopicList">
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/">
                                    <i 
                                        className={`
                                            sidebarImgIcon
                                            PNG_ICON_HOME
                                            ${flame?.energy}
                                            ${user.unionName ? user.spectrum : ""}
                                        `} 
                                        alt="home-icon"
                                    />
                                    <span className="sidebarListItemText">Home</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/news">
                                    <i 
                                        className={`
                                            sidebarImgIcon
                                            PNG_ICON_NEW
                                            ${colorTheme(user)}
                                        `} 
                                        alt="new-icon"
                                    />
                                    <span className="sidebarListItemText">What's New</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/popular">
                                    <i 
                                        className={`
                                            sidebarImgIcon
                                            PNG_ICON_POPULAR
                                            ${colorTheme(user)}
                                        `} 
                                        alt="popular-icon"
                                    />
                                    <span className="sidebarListItemText">What's Popular</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebarTopicListContainer">
                        <div className={`sidebarTopicTitle ${colorTheme(user)}`} >Make Connections</div>
                        {/*<hr className={`sidebarTopicHr current ${user.unionName? user.spectrum : user.energy}`} />*/}
                        <ul className="sidebarTopicList">
                            <li className="sidebarListItem" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                <Link className="sidebarListItemLink" to="/connect">
                                    <i 
                                        className={`
                                            sidebarImgIcon
                                            PNG_ICON_CONNECT
                                        `} 
                                        alt="connect-icon"
                                    />
                                    <div
                                        className={`
                                            sidebarImgText
                                            CONNECT_LINK
                                            ${hover ? "drk" : ""}
                                        `}  
                                        alt="connect-link"
                                    />
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/groups">
                                    <i 
                                        className={`
                                            sidebarImgIcon
                                            PNG_ICON_GROUPS
                                        `} 
                                        alt="groups-icon"
                                    />
                                    <span className="sidebarListItemText">Groups</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/events">
                                    <i 
                                        className={`
                                            sidebarImgIcon
                                            PNG_ICON_EVENTS
                                            ${colorTheme(user)}
                                        `} 
                                        alt="events-icon"
                                    />
                                    <span className="sidebarListItemText">Events</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/messenger">
                                    <i 
                                        className={`
                                            sidebarImgIcon
                                            PNG_ICON_CHAT
                                            ${colorTheme(user)}
                                        `} 
                                        alt="chat-icon"
                                    />
                                    <span className="sidebarListItemText">Chat</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebarTopicListContainer">
                        <div className={`sidebarTopicTitle ${colorTheme(user)}`}>Seek Guidance</div>
                        {/*<hr className={`sidebarTopicHr current ${user.unionName? user.spectrum : user.energy}`} />*/}
                        <ul className="sidebarTopicList">
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/coaches">
                                    <i 
                                        className={`
                                            sidebarImgIcon
                                            PNG_ICON_COACH
                                            ${colorTheme(user)}
                                        `} 
                                        alt="coach-icon"
                                    />
                                    <span className="sidebarListItemText">Coaches</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/healers">
                                    <i 
                                        className={`
                                            sidebarImgIcon
                                            PNG_ICON_HEALTH
                                            ${colorTheme(user)}
                                        `} 
                                        alt="tarot-icon"
                                    />
                                    <span className="sidebarListItemText">Healers</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/mediums">
                                    <i 
                                        className={`
                                            sidebarImgIcon
                                            PNG_ICON_TAROT
                                        `} 
                                        alt="tarot-icon"
                                    />
                                    <span className="sidebarListItemText">Mediums</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/channels">
                                    <i 
                                        className={`
                                            sidebarImgIcon
                                            PNG_ICON_YOUTUBE
                                        `} 
                                        alt="youtube-icon"
                                    />
                                    <span className="sidebarListItemText">YouTube</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebarTopicListContainer">
                        <div className={`sidebarTopicTitle ${colorTheme(user)}`}>Gain Perspective</div>
                        {/*<hr className={`sidebarTopicHr current ${user.unionName? user.spectrum : user.energy}`} />*/}
                        <ul className="sidebarTopicList">
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/blogs">
                                    <i 
                                        className={`
                                            sidebarImgIcon
                                            PNG_ICON_BLOG
                                            ${flame?.energy}
                                            ${user.unionName ? user.spectrum : ""}
                                        `} 
                                        alt="blog-icon"
                                    />
                                    <span className="sidebarListItemText">Blogs</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/posts">
                                    <i 
                                        className={`
                                            sidebarImgIcon
                                            PNG_ICON_AIRPLANE
                                            ${colorTheme(user)}
                                        `} 
                                        alt="airplane-icon"
                                    />
                                    <span className="sidebarListItemText">Posts</span>
                                </Link>
                            </li>
                            <li className="sidebarListItem">
                                <Link className="sidebarListItemLink" to="/questions">
                                    <i 
                                        className={`
                                            sidebarImgIcon
                                            PNG_ICON_QMARK
                                            ${colorTheme(user)}
                                        `} 
                                        alt="qmark-icon"
                                    />
                                    <span className="sidebarListItemText">Questions</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                </ul>
                <hr 
                    className={`
                        sidebarHr
                        HIGHER_BACKGROUND 
                        ${colorTheme(user)}
                    `}
                />
                <div className={`sidebarMenuTitle ${colorTheme(user)}`}>Online Friends</div>
                <div className="sidebarOnline">
                    <div className="sidebarOnlineContainer union">
                        <span className={`sidebarTopicTitle ${colorTheme(user)}`}>Unions</span>
                        {/*<hr className={`sidebarOnlineContainerHr ${user.unionName ? user.spectrum : user.energy}`} />*/}
                        {onlineUnionFriends.length > 0 ?
                            (
                                <>
                                    {onlineUnionFriends.map((ouf) => (
                                        <div className="chatOnlineFriend" key={ouf._id}>
                                            <div className="chatOnlineImg-container">
                                                <img className={`chatOnlineImg ${ouf.spectrum}`} src={ouf.unionProfilePicture? PS + ouf.unionProfilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                                                <div className="chatOnlineBadge"></div>
                                            </div>
                                            <span className="chatOnlineProfileName">{ouf.profileName}</span>
                                        </div>
                                    )).splice(0, splice)}
                                    {onlineUnionFriends.length > 3 ?
                                        (
                                            <>
                                                {onlineUnionFriends.length > 10 ?
                                                    (
                                                        <div className="" onClick={() => setSplice(10)}>Show More</div>
                                                    ) : (
                                                        <div className="" onClick={() => setSplice(onlineUnionFriends.length)}>Show All</div>
                                                    )
                                                }
                                            </>
                                        ) : ( <></> )
                                    }
                                </>
                            ) : (
                                <>
                                    <div className="sidebarOnlineNoneText">None of your Union friends are online at the moment.</div>
                                </>
                            )
                        }
                </div>
                <div className="sidebarOnlineContainer flame">
                        <span className={`sidebarTopicTitle ${colorTheme(user)}`}>Flames</span>
                        {/*<hr className={`sidebarOnlineContainerHr ${user.unionName ? user.spectrum : user.energy}`} />*/}
                        {onlineFlameFriends.length > 0 ?
                            (
                                <>
                                    {onlineFlameFriends.map((off) => (
                                        <div className="chatOnlineFriend" key={off._id}>
                                            <div className="chatOnlineImg-container">
                                                <img className={`chatOnlineImg ${off.energy}`} src={off.profilePicture? PS + off.profilePicture : "/picBlanks/no-avatar.jpg"} alt="" />
                                                <div className="chatOnlineBadge"></div>
                                            </div>
                                            <span className="chatOnlineProfileName">{off.profileName}</span>
                                        </div>
                                    )).splice(0, splice)}
                                    {onlineFlameFriends.length > 3 ?
                                        (
                                            <>
                                                {onlineFlameFriends.length > 10 ?
                                                    (
                                                        <div className="" onClick={() => setSplice(10)}>Show More</div>
                                                    ) : (
                                                        <div className="" onClick={() => setSplice(onlineFlameFriends.length)}>Show All</div>
                                                    )
                                                }
                                            </>
                                        ) : ( <></> )
                                    }
                                </>
                            ) : (
                                <>
                                    <div className="sidebarOnlineNoneText">None of your Flame friends are online at the moment.</div>
                                </>
                            )
                        }
                    </div>
                </div> 

            </div>
        </div>
        }
        </>
    )
};

export default Sidebar;