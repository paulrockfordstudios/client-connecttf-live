import React from 'react';
import { useSelector } from 'react-redux';
import { colorTheme } from '../../../Utils/styling/colorTheme';
import "./MenuBars.css";


function CTFWikiMenuBar() {

    const { user } = useSelector((state) => state.auth);

    return (
        <>
        {user &&
        <div className="menuBars">
            <div className="menuBars-container">
                <div className={`menuBarsMenuTitle ${colorTheme(user)}`}>Menu</div>
                <ul className="menuBarsList">
                    <div className="menuBarsTopicListContainer">
                        <div className={`menuBarsTopicTitle ${colorTheme(user)}`}>Charge</div>
                        {/*<hr className={`menuBarsTopicHr current ${user.unionName? user.spectrum : user.energy}`} />*/}
                        <ul className="menuBarsTopicList">
                            <li className="menuBarsListItem">
                                <span className="menuBarsListItemText">OverView</span>
                            </li>
                            <li className="menuBarsListItem">
                                <span className="menuBarsListItemText">Yin</span>
                            </li>
                            <li className="menuBarsListItem">
                                <span className="menuBarsListItemText">Yang</span>
                            </li>
                        </ul>
                    </div>
                    <div className="menuBarsTopicListContainer">
                        <div className={`menuBarsTopicTitle ${colorTheme(user)}`} >Energy</div>
                        {/*<hr className={`menuBarsTopicHr current ${user.unionName? user.spectrum : user.energy}`} />*/}
                        <ul className="menuBarsTopicList">
                            <li className="menuBarsListItem" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                <Link className="menuBarsListItemLink" to="/connect">
                                    <i 
                                        className={`
                                            menuBarsImgIcon
                                            PNG_ICON_CONNECT
                                        `} 
                                        alt="connect-icon"
                                    />
                                    <div
                                        className={`
                                            menuBarsImgText
                                            CONNECT_LINK
                                            ${hover ? "drk" : ""}
                                        `}  
                                        alt="connect-link"
                                    />
                                </Link>
                            </li>
                            <li className="menuBarsListItem">
                                <Link className="menuBarsListItemLink" to="/groups">
                                    <i 
                                        className={`
                                            menuBarsImgIcon
                                            PNG_ICON_GROUPS
                                        `} 
                                        alt="groups-icon"
                                    />
                                    <span className="menuBarsListItemText">Groups</span>
                                </Link>
                            </li>
                            <li className="menuBarsListItem">
                                <Link className="menuBarsListItemLink" to="/events">
                                    <i 
                                        className={`
                                            menuBarsImgIcon
                                            PNG_ICON_EVENTS
                                            ${colorTheme(user)}
                                        `} 
                                        alt="events-icon"
                                    />
                                    <span className="menuBarsListItemText">Events</span>
                                </Link>
                            </li>
                            <li className="menuBarsListItem">
                                <Link className="menuBarsListItemLink" to="/messenger">
                                    <i 
                                        className={`
                                            menuBarsImgIcon
                                            PNG_ICON_CHAT
                                            ${colorTheme(user)}
                                        `} 
                                        alt="chat-icon"
                                    />
                                    <span className="menuBarsListItemText">Chat</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="menuBarsTopicListContainer">
                        <div className={`menuBarsTopicTitle ${colorTheme(user)}`}>Seek Guidance</div>
                        {/*<hr className={`menuBarsTopicHr current ${user.unionName? user.spectrum : user.energy}`} />*/}
                        <ul className="menuBarsTopicList">
                            <li className="menuBarsListItem">
                                <Link className="menuBarsListItemLink" to="/coaches">
                                    <i 
                                        className={`
                                            menuBarsImgIcon
                                            PNG_ICON_COACH
                                            ${colorTheme(user)}
                                        `} 
                                        alt="coach-icon"
                                    />
                                    <span className="menuBarsListItemText">Coaches</span>
                                </Link>
                            </li>
                            <li className="menuBarsListItem">
                                <Link className="menuBarsListItemLink" to="/healers">
                                    <i 
                                        className={`
                                            menuBarsImgIcon
                                            PNG_ICON_HEALTH
                                            ${colorTheme(user)}
                                        `} 
                                        alt="tarot-icon"
                                    />
                                    <span className="menuBarsListItemText">Healers</span>
                                </Link>
                            </li>
                            <li className="menuBarsListItem">
                                <Link className="menuBarsListItemLink" to="/mediums">
                                    <i 
                                        className={`
                                            menuBarsImgIcon
                                            PNG_ICON_TAROT
                                        `} 
                                        alt="tarot-icon"
                                    />
                                    <span className="menuBarsListItemText">Mediums</span>
                                </Link>
                            </li>
                            <li className="menuBarsListItem">
                                <Link className="menuBarsListItemLink" to="/channels">
                                    <i 
                                        className={`
                                            menuBarsImgIcon
                                            PNG_ICON_YOUTUBE
                                        `} 
                                        alt="youtube-icon"
                                    />
                                    <span className="menuBarsListItemText">YouTube</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="menuBarsTopicListContainer">
                        <div className={`menuBarsTopicTitle ${colorTheme(user)}`}>Gain Perspective</div>
                        {/*<hr className={`menuBarsTopicHr current ${user.unionName? user.spectrum : user.energy}`} />*/}
                        <ul className="menuBarsTopicList">
                            <li className="menuBarsListItem">
                                <Link className="menuBarsListItemLink" to="/blogs">
                                    <i 
                                        className={`
                                            menuBarsImgIcon
                                            PNG_ICON_BLOG
                                            ${flame?.energy}
                                            ${user.unionName ? user.spectrum : ""}
                                        `} 
                                        alt="blog-icon"
                                    />
                                    <span className="menuBarsListItemText">Blogs</span>
                                </Link>
                            </li>
                            <li className="menuBarsListItem">
                                <Link className="menuBarsListItemLink" to="/posts">
                                    <i 
                                        className={`
                                            menuBarsImgIcon
                                            PNG_ICON_AIRPLANE
                                            ${colorTheme(user)}
                                        `} 
                                        alt="airplane-icon"
                                    />
                                    <span className="menuBarsListItemText">Posts</span>
                                </Link>
                            </li>
                            <li className="menuBarsListItem">
                                <Link className="menuBarsListItemLink" to="/questions">
                                    <i 
                                        className={`
                                            menuBarsImgIcon
                                            PNG_ICON_QMARK
                                            ${colorTheme(user)}
                                        `} 
                                        alt="qmark-icon"
                                    />
                                    <span className="menuBarsListItemText">Questions</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                </ul>
                <hr 
                    className={`
                        menuBarsHr
                        HIGHER_BACKGROUND 
                        ${colorTheme(user)}
                    `}
                />
            </div>
        </div>
        }
        </>
    )
};

export default CTFWikiMenuBar;