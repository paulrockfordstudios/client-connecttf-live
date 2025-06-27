import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { pAEOpen, pBEOpen, cdpAvatarOpen, cdpBackgroundOpen } from "../../../Redux/AuthSlice";
import { useParams } from "react-router";
import { axiosReq } from '../../../Utils/axiosConfig';
import { useScrollLock } from '../../../Utils/crHooks/useScrollLock';
import PostFeed from '../../../Components/Posts/PostFeed/PostFeed';
import "./GroupProfile.css";


function GroupProfile() {

    const { unionName } = useParams();
    const { pathName } = useLocation();

    const dispatch = useDispatch();
    
    const { 
        user: currentUser, 
        flame: currentFlame, 
        PS,
        cPost, 
        cQN, 
        pAEditor, 
        pBEditor, 
        cdpAvatar, 
        cdpBackground 
    } = useSelector((state) => state.auth);

    const [ union, setUnion ] = useState({});
    const [ masculineUser, setMasculineUser ] = useState({});
    const [ feminineUser, setFeminineUser ] = useState({});
    const [active, setActive] = useState("story");
    const [followers, setFollowers] =useState();
    const [following, setFollowing] =useState();
    const [subscribers, setSubscribers] =useState();
    const [subscribing, setSubscribing] =useState();
    const [ height, setHeight ] = useState();
    const [profileDisplay, setProfileDisplay] = useState(<Story />);
    const [ createPost, setCreatePost ] = useState(false);
    const [ createQN, setCreateQN ] = useState(false);
    const [ editAvatar, setEditAvatar ] = useState(false);
    const [ avatarCDP, setAvatarCDP ] = useState(false);
    const [ backgroundCDP, setBackgroundCDP ] = useState(false);
    const [ editBackgroundPic, setEditBackgroundPic ] = useState(false);
    const [ editPPHover, setEditPPHover ] = useState(false);
    const [ editPPActive, setEditPPActive ] = useState(false);
    const [ editBPHover, setEditBPHover ] = useState(false);
    const [ editBPActive, setEditBPActive ] = useState(false);
    const [ bckgrndImgLoad, setBckgrndImgLoad ] = useState(true);



    return (
        <>
        <div className="unionProfile">
            <div className="unionProfile-container">
                <div className="unionProfileRight">
                    <div className="unionProfileRightTop">
                        <div className="unionProfileContainer" >
                            <div 
                                className={`
                                    unionProfileBackgroundTheme
                                    HIGHER_BACKGROUND 
                                    ${union.spectrum}
                                `} 
                                style={{height: `${height}px`}}
                            />
                            <div 
                                className={`unionProfileDisplay-container union BOX_SHADOW ${union.spectrum}`} 
                                ref={el => {
                                    if (!el) return;
                                    let prevValue = JSON.stringify(el.getBoundingClientRect());
                                    const handle = setInterval(() => {
                                        let nextValue = JSON.stringify(el.getBoundingClientRect());
                                        if (nextValue === prevValue) {
                                            clearInterval(handle);
                                            setHeight(el.getBoundingClientRect().height)
                                        } else {
                                            prevValue = nextValue;
                                        }
                                    }, 1000);
                                }}             
                            >
                                {union.unionName === currentUser.unionName ?
                                (
                                    <> 
                                        <>
                                            <div 
                                                className={`
                                                    profileBackgroundImg
                                                    HIGHER_BACKGROUND
                                                    ${union.spectrum}
                                                    lgt
                                                `} 
                                                style={!bckgrndImgLoad ? editBPHover || editBPActive ? {opacity: "0.3"} : {opacity: "1"} : {opacity: "1"}}
                                            />
                                     
                                                <img 
                                                    className={`
                                                        profileBackgroundImg
                                                        ${editBPHover || editBPActive ? "edit" : ""}
                                                        HIGHER_BACKGROUND
                                                        ${union.spectrum}
                                                        lgt
                                                    `} 
                                                    style={bckgrndImgLoad ? editBPHover || editBPActive ? {opacity: "0.3"} : {opacity: "1"} : {opacity: "0"}}
                                                    src={PS + union.backgroundPicture} 
                                                    onLoad={(e) => {
                                                        e.target.src === PS + union.backgroundPicture
                                                            ? setBckgrndImgLoad(true)
                                                            : setBckgrndImgLoad(false)
                                                        }}
                                                    //onError={(e) => setBckgrndImgLoad(false)} 
                                                    onError={(e) => {
                                                        setBckgrndImgLoad(false)
                                                        e.currentTarget.src = noBanner
                                                        
                                                    }}
                                                    //alt="profile-bckgrnd"
                                                />     
                                            </>
                                        {editBPHover || editBPActive 
                                            ? <WallpaperOutlined 
                                                className={`profileFlameBackgroundImgEdit ${currentUser.spectrum}`} 
                                                onClick={backgroundPicEditorHandler}
                                            /> 
                                            : null 
                                        }
                                        <div 
                                            className="profilePhotoEditorBtn background" 
                                            onMouseEnter={editPPActive ? null : () => setEditBPHover(true)} 
                                            onMouseLeave={() => setEditBPHover(false)}
                                            onClick={editPPActive ? null : () => setEditBPActive(!editBPActive)}
                                        >
                                            <AddAPhoto className="profilePhotoEditorIcon"/>                        
                                        </div>
                                        {editBPActive &&
                                            <div className="profileBackgroundEditorDropdown">
                                                <BackgroundEditorDropdown setEditBPActive={setEditBPActive}/>
                                            </div>
                                        }
                                        {editPPHover || editPPActive ?
                                            (
                                                <>
                                                    <div className="profileWhiteBackgroundLayer"/>  
                                                    {union.spectrum === "diamond" && <div 
                                                        className={`profileImgBackgroundLayer primary HIGHER_BACKGROUND ${union.spectrum}`}
                                                        //style={{backgroundImage: "url(/misc/diamond-background.jpg)", opacity: "30%"}}
                                                    />}
                                                </>
                                            ) : null}
                                        <img 
                                            className={editPPHover || editPPActive ? "profileImg edit primary" : "profileImg primary"} 
                                            src={union.isAnonymous 
                                                ? uAvatar 
                                                : union.unionProfilePicture 
                                                    ? PS + union.unionProfilePicture 
                                                    : uAvatar
                                            } 
                                            onError={e => {e.currentTarget.src = uAvatar}}
                                            //alt="union-avatar" 
                                        />
                                        {editPPHover || editPPActive ? <AccountBoxOutlined className={`profileImgEdit ${currentUser.spectrum}`} /> : null}
                                        <div 
                                            className="profilePhotoEditorBtn avatar" 
                                            onMouseEnter={editBPActive ? null : () => setEditPPHover(true)} 
                                            onMouseLeave={() => setEditPPHover(false)}
                                            onClick={editBPActive ? null : () => setEditPPActive(!editPPActive)}
                                        >
                                            <AddAPhoto className="profilePhotoEditorIcon"/>            
                                        </div>
                                        
                                    </>
                                ) : (
                                    <>
                                        <div 
                                                    className={`
                                                        profileBackgroundImg
                                                        ${union.sepctrum === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                                        ${union.spectrum}
                                                        lgt
                                                    `} 
                                                    style={!bckgrndImgLoad ? editBPHover || editBPActive ? {opacity: "0.3"} : {opacity: "1"} : {opacity: "0"}}
                                                />
                                                <img 
                                                    className={`
                                                        profileBackgroundImg
                                                        ${union.sepctrum === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                                        ${union.spectrum}
                                                        lgt
                                                    `} 
                                                    style={bckgrndImgLoad ? editBPHover || editBPActive ? {opacity: "0.3"} : {opacity: "1"} : {opacity: "0"}}
                                                    src={PS + union.backgroundPicture} 
                                                    onLoad={(e) => {
                                                        e.target.src === PS + union.backgroundPicture
                                                            ? setBckgrndImgLoad(true)
                                                            : setBckgrndImgLoad(false)
                                                        }}
                                                    //onLoad={() => setBckgrndImgLoad(true)}
                                                    //onError={() => setBckgrndImgLoad(false)} 
                                                    onError={(e) => {
                                                        setBckgrndImgLoad(false)
                                                        e.currentTarget.src = noBanner
                                                        
                                                    }}
                                                    //alt="profile-bckgrnd" 
                                                /> 
                                      
                                        <img 
                                            className="profileImg primary" 
                                            src={union.isAnonymous
                                                ? uAvatar 
                                                : union.unionProfilePicture 
                                                    ? PS + union.unionProfilePicture 
                                                    : uAvatar
                                            } 
                                            onError={e => {e.currentTarget.src = uAvatar}}
                                            //alt="union-avatar"
                                        />
                                    </>
                                )
                            }
                                            <div className="masculineProfileImg">
                                                <i 
                                                    className={`
                                                        sidebarImgIcon
                                                        PNG_ICON_GROUPS
                                                    `} 
                                                    alt="groups-icon"
                                                />
                                            </div>
                                            {editPPActive &&
                                                <div className="profileAvatarEditorDropdown">
                                                    <AvatarEditorDropdown setEditPPActive={setEditPPActive}/>
                                                </div>    
                                            }
                                        {currentUser?.flameFollowing.includes(union?._id) || currentUser?.unionFollowing.includes(union?._id) ?
                                            (
                                                <div className="profileNavigation union">
                                                    <div className="profileNavLeft">
                                                        <button 
                                                            className={active === "about" 
                                                                ? `userProfileBtn-active about ${union.spectrum}` 
                                                                : `userProfileBtn about ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN2" :  ""}`
                                                            } 
                                                            onClick={() => setActive("about")}
                                                        >
                                                            {union.spectrum === "diamond" 
                                                                ? <span className="upDiamondText">About</span>
                                                                : "About"
                                                            }
                                                        </button>
                                                        <button 
                                                            className={active === "posts" 
                                                                ? `userProfileBtn-active posts ${union.spectrum}` 
                                                                : `userProfileBtn posts ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN3" :  ""}`
                                                            } 
                                                            onClick={() => setActive("posts")}
                                                        >
                                                            {union.spectrum === "diamond" 
                                                                ? <span className="upDiamondText">Posts</span>
                                                                : "Posts"
                                                            }
                                                        </button>
                                                    </div>
                                                    <div className="profileNavRight">
                                                        <button 
                                                            className={active === "questions" 
                                                                ? `userProfileBtn-active questions ${union.spectrum}` 
                                                                : `userProfileBtn questions ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN4" :  ""}`
                                                            } 
                                                            onClick={() => setActive("questions")}
                                                        >
                                                            {union.spectrum === "diamond" 
                                                                ? <span className="upDiamondText">Questions</span>
                                                                : "Questions"
                                                            }
                                                        </button>
                                                        <button 
                                                            className={active === "events" 
                                                                ? `userProfileBtn-active events ${union.spectrum}` 
                                                                : `userProfileBtn answers ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN5" :  ""}`
                                                            } 
                                                            onClick={() => setActive("events")}
                                                        >
                                                            {union.spectrum === "diamond" 
                                                                ? <span className="upDiamondText">Events</span>
                                                                : "Events"
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                            {union.isPrivate || editPPActive || editBPActive ?
                                                (
                                                    <>
                                                        <div className="profileNavigation union">
                                                            <div className="profileNavLeft">
                                                                <button 
                                                                    className={`userProfileBtn private story ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN1" :  ""} `}
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">Story</span>
                                                                        : "Story"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={`userProfileBtn private about ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN2" :  ""}`} 
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">About</span>
                                                                        : "About"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={`userProfileBtn private posts ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN3" :  ""}`} 
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">Posts</span>
                                                                        : "Posts"
                                                                    }
                                                                </button>
                                                            </div>
                                                            <div className="profileNavRight">
                                                                <button 
                                                                    className={`userProfileBtn private questions ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN4" :  ""}`} 
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">Questions</span>
                                                                        : "Questions"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={`userProfileBtn private answers ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN5" :  ""}`} 
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">Answers</span>
                                                                        : "Answers"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={`userProfileBtn private blogs ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN6" :  ""}`} 
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">blogs</span>
                                                                        : "blogs"
                                                                    }
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="profileNavigation union">
                                                            <div className="profileNavLeft">
                                                                <button 
                                                                    className={active === "story" 
                                                                        ? `userProfileBtn-active story ${union.spectrum}` 
                                                                        : `userProfileBtn story ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN1" :  ""}`
                                                                    } 
                                                                    onClick={() => setActive("story")}
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">Story</span>
                                                                        : "Story"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={active === "about" 
                                                                        ? `userProfileBtn-active about ${union.spectrum}` 
                                                                        : `userProfileBtn about ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN2" :  ""}`
                                                                    } 
                                                                    onClick={() => setActive("about")}
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">About</span>
                                                                        : "About"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={active === "posts" 
                                                                    ? `userProfileBtn-active posts ${union.spectrum}` 
                                                                    : `userProfileBtn posts ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN3" :  ""}`
                                                                    } 
                                                                    onClick={() => setActive("posts")}
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">Posts</span>
                                                                        : "Posts"
                                                                    }
                                                                </button>
                                                            </div>
                                                            <div className="profileNavRight">
                                                                <button 
                                                                    className={active === "questions" 
                                                                        ? `userProfileBtn-active questions ${union.spectrum}` 
                                                                        : `userProfileBtn questions ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN4" :  ""}`
                                                                    } 
                                                                    onClick={() => setActive("questions")}
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">Questions</span>
                                                                        : "Questions"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={active === "answers" 
                                                                        ? `userProfileBtn-active answers ${union.spectrum}` 
                                                                        : `userProfileBtn answers ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN5" :  ""}`
                                                                    } 
                                                                    onClick={() => setActive("answers")}
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">Answers</span>
                                                                        : "Answers"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={active === "blogs" 
                                                                        ? `userProfileBtn-active blogs ${union.spectrum}` 
                                                                        : `userProfileBtn blogs ${union.spectrum} ${union.spectrum === "diamond" ? "DIAMOND_BTN6" :  ""}`
                                                                    } 
                                                                    onClick={() => setActive("blogs")}
                                                                >
                                                                    {union.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">Blogs</span>
                                                                        : "Blogs"
                                                                    }
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }
                    
                                <div className={`profileInfo ${union.spectrum}`}>
                                    <h4 className="profileName">{union.profileName}</h4>
                                    <span className="profileAbout">{union.about}</span>
                                    <div className="unionProfileDP-container">
                                        <div className="unionProfileTF">
                                            <span 
                                                className={
                                                    `unionProfileTFKey 
                                                    ${currentFlame.energy 
                                                        ? currentFlame.energy === "masculine" 
                                                            ? "masculine" 
                                                            : "feminine" 
                                                        : "masculine"
                                                    }`
                                                }
                                            >
                                                {currentFlame.energy ? currentFlame.energy === "masculine" ? "DM:" : "DF:" : "DM:"}
                                            </span>
                                            <div className="unionProfileTFValue">
                                                <Link 
                                                    className="unionProfileTFLink" 
                                                    to={`/flame-profile/userName/${currentFlame.energy ? currentFlame.energy === "masculine" ? masculineUser.userName : feminineUser.userName : masculineUser.userName}`} 
                                                    onClick={() => setActive("story")}
                                                >   
                                                    {currentFlame.energy ? currentFlame.energy === "masculine"
                                                        ?
                                                            (
                                                                <>
                                                                    <img 
                                                                        className="unionProfileTFPic" 
                                                                        src={masculineUser.isAnonymous
                                                                            ? fAvatar 
                                                                            : masculineUser.profilePicture
                                                                                ? PS + masculineUser.profilePicture
                                                                                : fAvatar
                                                                        } 
                                                                        onError={e => {e.currentTarget.src = fAvatar}} 
                                                                        alt="" 
                                                                    />
                                                                    <i 
                                                                        className={`
                                                                            unionProfileTFEnergy
                                                                            PNG_ICON_ENERGY 
                                                                            ${masculineUser.energy}
                                                                        `} 
                                                                        alt="profile-link-icon" 
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <img 
                                                                        className="unionProfileTFPic" 
                                                                        src={feminineUser.isAnonymous
                                                                            ? fAvatar 
                                                                            : feminineUser.profilePicture
                                                                                ? PS + feminineUser.profilePicture
                                                                                : fAvatar
                                                                        } 
                                                                        onError={e => {e.currentTarget.src = fAvatar}} 
                                                                        alt="" 
                                                                    />
                                                                    <i 
                                                                        className={`
                                                                            unionProfileTFEnergy
                                                                            PNG_ICON_ENERGY 
                                                                            ${feminineUser.energy}
                                                                        `} 
                                                                        alt="profile-link-icon" 
                                                                    />
                                                                </>
                                                            ) 
                                                        :
                                                            (
                                                                <>
                                                                    <img 
                                                                        className="unionProfileTFPic" 
                                                                        src={masculineUser.isAnonymous
                                                                            ? fAvatar 
                                                                            : masculineUser.profilePicture
                                                                                ? PS + masculineUser.profilePicture
                                                                                : fAvatar
                                                                        } 
                                                                        onError={e => {e.currentTarget.src = fAvatar}} 
                                                                        alt="" 
                                                                    />
                                                                    <i 
                                                                        className={`
                                                                            unionProfileTFEnergy
                                                                            PNG_ICON_ENERGY 
                                                                            ${masculineUser.energy}
                                                                        `} 
                                                                        alt="profile-link-icon" 
                                                                    />
                                                                </>
                                                            )
                                                    }
                                                    <span className="unionProfileTFName">{currentFlame.energy ? currentFlame.energy === "masculine" ? masculineUser.profileName : feminineUser.profileName : masculineUser.profileName}</span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="unionProfileTF">
                                        <span 
                                                className={
                                                    `unionProfileTFKey 
                                                    ${currentFlame.energy 
                                                        ? currentFlame.energy === "masculine" 
                                                            ? "feminine" 
                                                            : "masculine" 
                                                        : "feminine"
                                                    }`
                                                }
                                            >
                                                {currentFlame.energy ? currentFlame.energy === "masculine" ? "DF:" : "DM:" : "DF:"}
                                            </span>
                                            <div className="unionProfileTFValue">
                                                <Link 
                                                    className="unionProfileTFLink" 
                                                    to={`/flame-profile/userName/${currentFlame.energy ? currentFlame.energy === "masculine" ? feminineUser.userName : masculineUser.userName : feminineUser.userName}`} 
                                                    onClick={() => setActive("story")}
                                                >
                                                    {currentFlame.energy ? currentFlame.energy === "masculine"
                                                        ?
                                                            (
                                                                <>
                                                                    <img 
                                                                        className="unionProfileTFPic" 
                                                                        src={feminineUser.isAnonymous
                                                                            ? fAvatar 
                                                                            : feminineUser.profilePicture
                                                                                ? PS + feminineUser.profilePicture
                                                                                : fAvatar
                                                                        } 
                                                                        onError={e => {e.currentTarget.src = fAvatar}} 
                                                                        alt="" 
                                                                    />
                                                                    <i 
                                                                        className={`
                                                                            unionProfileTFEnergy
                                                                            PNG_ICON_ENERGY 
                                                                            ${feminineUser.energy}
                                                                        `} 
                                                                        alt="profile-link-icon" 
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <img 
                                                                        className="unionProfileTFPic" 
                                                                        src={masculineUser.isAnonymous
                                                                            ? fAvatar 
                                                                            : masculineUser.profilePicture
                                                                                ? PS + masculineUser.profilePicture
                                                                                : fAvatar
                                                                        } 
                                                                        onError={e => {e.currentTarget.src = fAvatar}} 
                                                                        alt="" 
                                                                    />
                                                                    <i 
                                                                        className={`
                                                                            unionProfileTFEnergy
                                                                            PNG_ICON_ENERGY 
                                                                            ${masculineUser.energy}
                                                                        `} 
                                                                        alt="profile-link-icon" 
                                                                    />
                                                                </>
                                                            ) 
                                                        :
                                                            (
                                                                <>
                                                                    <img 
                                                                        className="unionProfileTFPic" 
                                                                        src={feminineUser.isAnonymous
                                                                            ? fAvatar 
                                                                            : feminineUser.profilePicture
                                                                                ? PS + feminineUser.profilePicture
                                                                                : fAvatar
                                                                        } 
                                                                        onError={e => {e.currentTarget.src = fAvatar}} 
                                                                        alt="" 
                                                                    />
                                                                    <i 
                                                                        className={`
                                                                            unionProfileTFEnergy
                                                                            PNG_ICON_ENERGY 
                                                                            ${feminineUser.energy}
                                                                        `} 
                                                                        alt="profile-link-icon" 
                                                                    />
                                                                </>
                                                            )
                                                    }
                                                    <span className="unionProfileTFName">{currentFlame.energy ? currentFlame.energy === "masculine" ? feminineUser.profileName : masculineUser.profileName : feminineUser.profileName}</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profileInfoHereFor">
                                        <span className="profileInfoHereForKey">Here For:</span>
                                        <span className="profileInfoHereForValue">{stringHereFor(union.hereFor)}</span>
                                    </div>
                                    <div className="profileFollowStats">
                                        <Link className="profileFollowStatLink" to={`${pathName}/followers`}>
                                            <span className="profileFollowStatCount">{followers}</span>
                                            <span className="profileFollowStatText">{`Befriender${followers === 1 ? "" : "s"}`}</span>
                                        </Link>
                                        <div className="profileFollowStat">
                                        <Link className="profileFollowStatLink" to={`${pathName}/following`}>
                                            <span className="profileFollowStatText">Befriending</span>
                                            <span className="profileFollowStatCount">{following}</span>
                                        </Link>
                                        </div>
                                    </div>
                                    <div className="profileSubscribeStats">
                                        <Link className="profileSubscribeStatLink" to={`${pathName}/subscribers`}>
                                            <span className="profileSubscribeStatCount">{subscribers}</span>
                                            <span className="profileSubscribeStatText">{`Subscriber${subscribers === 1 ? "" : "s"}`}</span>
                                        </Link>
                                        <div className="profileSubscribeStat">
                                        <Link className="profileSubscribeStatLink" to={`${pathName}/subscribing`}>
                                            <span className="profileSubscribeStatText">Subscribing</span>
                                            <span className="profileSubscribeStatCount">{subscribing}</span>
                                        </Link>
                                        </div>
                                    </div>
                                    
                                    {currentUser.unionId !== union._id && <ProfileFollowBtns union={union}/>}
                                    <hr className={`unionProfileHr HIGHER_BACKGROUND ${union.spectrum}`}/>
                                    <div className="profileDisplay-container">
                                        {profileDisplay}
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>  
                </div> 
            </div>   
        </div>
            {editAvatar &&
                <div className="POPUP_SCREEN" >
                    <div 
                        className={
                            `POPUP_BACKGROUND 
                            ${currentUser.spectrum 
                                ? currentUser.spectrum 
                                : "gray" 
                            }`
                        }
                    />
                    <div className="avatarEditorScreenContainer">
                        <AvatarEditor 
                            up={true}
                            mFirst={masculineUser.firstName}
                            fFirst={feminineUser.firstName}
                        />
                    </div>
                </div>
            }
            {avatarCDP &&
                
                    <div className="cdpAvatarScreenContainer">
                        <CDPAvatar />
                    </div>
              
            }
            {editBackgroundPic &&
                <div className="POPUP_SCREEN" >
                    <div 
                        className={
                            `POPUP_BACKGROUND 
                            ${currentUser.spectrum 
                                ? currentUser.spectrum 
                                : "gray" 
                            }`
                        }
                    />
                    <div className="avatarEditorScreenContainer">
                        <BackgroundPicEditor />
                    </div>
                </div>
            }
            {backgroundCDP &&
                <div className="POPUP_SCREEN" >
                    <div 
                        className={
                            `POPUP_BACKGROUND 
                            ${currentUser.spectrum 
                                ? currentUser.spectrum 
                                : "gray" 
                            }`
                        }
                    />
                    <div className="cdpAvatarScreenContainer">
                        <CDPBackground />
                    </div>
                </div>
            }
        </>
    )
}

export default GroupProfile;