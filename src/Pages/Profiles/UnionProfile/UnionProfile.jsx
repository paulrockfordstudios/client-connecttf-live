import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { pAEOpen, pBEOpen } from "../../../Redux/AuthSlice";
import { useParams } from "react-router";
import { stringHereFor } from "../../../Utils/misc/misc";
import { useScrollLock } from '../../../Utils/crHooks/useScrollLock';
import { axiosReq, axiosInstance } from '../../../Utils/axiosConfig';
import PostFeed from '../../../Components/Posts/PostFeed/PostFeed';
import Story from '../../../Components/Story/Story';
import AboutUnion from '../../../Components/About/AboutUnion/AboutUnion';
import QuestionFeed from '../../../Components/Questions/QuestionFeed/QuestionFeed';
import ProfileFollowBtns from '../../../Components/FollowButtons/ProfileFollowBtns/ProfileFollowBtns';
import CreatePost from '../../../Components/Posts/CreatePost/CreatePost';
import CreateQuestion from '../../../Components/Questions/CreateQuestion/CreateQuestion';
import BackgroundEditorDropdown from '../../../Components/Dropdowns/PhotoEditingDropdowns/BackgroundEditorDropdown/BackgroundEditorDropdown';
import AvatarEditorDropdown from '../../../Components/Dropdowns/PhotoEditingDropdowns/AvatarEditorDropdown/AvatarEditorDropdown';
import AvatarEditor from '../../../Components/Editors/AvatarEditor/AvatarEditor';
import CDPAvatar from '../../../Components/Popups/ConfirmDeletePopups/CDPAvatar/CDPAvatar';
import BackgroundPicEditor from '../../../Components/Editors/BackgroundPicEditor/BackgroundPicEditor';
import CDPBackground from '../../../Components/Popups/ConfirmDeletePopups/CDPBackground/CDPBackground';
import uAvatar from "../../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../../Assets/picBlanks/no-avatar.jpg";
import noBanner from "../../../Assets/picBlanks/no-banner.jpg";
import "./UnionProfile.css";
import ProfileLink from '../../../Components/ProfileLink/ProfileLink';
import { accBoxOutlinedIcon, addAPhotoIcon, wallPaperOutlinedIcon } from '../../../Lib/mui/icons';


function UnionProfile() {

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

    const { lockScroll, unlockScroll } = useScrollLock();

    const [ union, setUnion ] = useState();
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

    const colorTheme = currentUser.unionName ? currentUser.spectrum : currentUser.energy;

    useEffect(() => {
        setCreatePost(cPost)
    }, [cPost]);

    useEffect(() => {
        setCreateQN(cQN)
    }, [cQN]);

    useEffect(() => {
        setEditAvatar(pAEditor)
    }, [pAEditor]);

    useEffect(() => {
        setAvatarCDP(cdpAvatar)
    }, [cdpAvatar]);

    useEffect(() => {
        setEditBackgroundPic(pBEditor)
    }, [pBEditor]);

    useEffect(() => {
        setBackgroundCDP(cdpBackground)
    }, [cdpBackground]);

    useEffect(() => {
        return pAEditor || pBEditor || cdpAvatar || cdpBackground ? lockScroll() : unlockScroll();
    }, [pAEditor, pBEditor, cdpAvatar, cdpBackground]);
   
    // Get union
    useEffect(() => {
        const fetchUnion = async () => {
            try {
                const res = await axiosInstance.get(`/unions?unionName=${unionName}`);
                setUnion(res.data);
            } catch(err) {console.log(err)}   
        }
        fetchUnion();
    }, [unionName]);

    // Get masculine user
    useEffect(() => {
        if(union) {
            const getMasculineUser = async () => {
                try {
                    const res = await axiosReq("GET", `/users?userId=${union?.masculineId}`);
                    setMasculineUser(res.data);
                } catch(err) {console.log(err)} 
            }
            getMasculineUser();
        }
    }, [union?.masculineId]);

    // Get feminine user
    useEffect(() => {
        if(union) {
            const getFeminineUser = async () => {
                try {
                    const res = await axiosReq("GET", `/users?userId=${union?.feminineId}`);
                    setFeminineUser(res.data);
                } catch(err) {console.log(err)} 
            }
            getFeminineUser();
        }
    }, [union?.feminineId]);

    useEffect(() => {
        if(union) {
            setFollowers(union.flameFollowers.length + union.unionFollowers.length);
            setFollowing(union.flameFollowing.length + union.unionFollowing.length);
            setSubscribers(union.flameSubscribers.length + union.unionSubscribers.length);
            setSubscribing(union.flameSubscribing.length + union.unionSubscribing.length);    
        }
    }, [union]);

    useEffect(() => {
        switch (active) {
            case "story":
                setProfileDisplay(<Story />);
                break;
            case "about":
                setProfileDisplay(<AboutUnion />);
                break;
            case "posts":
                setProfileDisplay(<PostFeed dc={union.spectrum} id={union._id}/>);
                break;
            case "questions":
                setProfileDisplay(<QuestionFeed dc={union.spectrum} id={union._id}/>);
                break;
            case "answers":
                setProfileDisplay("");
                break;
            case "blogs":
                setProfileDisplay("");
                break;
            default:
                setProfileDisplay(<Story />);
        }
    }, [active]);

    const backgroundPicEditorHandler = () => {
        dispatch(pBEOpen());
    }
   
    
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
                                    ${union?.spectrum}
                                `} 
                                style={{height: `${height}px`}}
                            />
                            <div 
                                className={`unionProfileDisplay-container union BOX_SHADOW ${union?.spectrum}`} 
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
                                {union?.unionName === currentUser.unionName ?
                                (
                                    <> 
                                        <>
                                      
                                            <div 
                                                className={`
                                                    unionProfileBackgroundImg
                                                    back
                                                    HIGHER_BACKGROUND
                                                    ${union?.spectrum}
                                                    lgt
                                                `} 
                                                style={!bckgrndImgLoad ? editBPHover || editBPActive ? {opacity: "0.3"} : {opacity: "1"} : {opacity: "1"}}
                                            />
                               
                                                <img 
                                                    className={`
                                                        unionProfileBackgroundImg
                                                        front
                                                        ${editBPHover || editBPActive ? "edit" : ""}
                                                        HIGHER_BACKGROUND
                                                        ${union?.spectrum}
                                                        lgt
                                                    `} 
                                                    style={bckgrndImgLoad ? editBPHover || editBPActive ? {opacity: "0.3"} : {opacity: "1"} : {opacity: "0"}}
                                                    src={PS + union?.backgroundPicture} 
                                                    onLoad={(e) => {
                                                        e.target.src === PS + union?.backgroundPicture
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
                                            ? <div 
                                                className={`profileFlameBackgroundImgEdit ${currentUser.spectrum}`} 
                                                onClick={backgroundPicEditorHandler}
                                            >
                                                {wallPaperOutlinedIcon}
                                            </div> 
                                            : null 
                                        }
                                        <div 
                                            className="profilePhotoEditorBtn background" 
                                            onMouseEnter={editPPActive ? null : () => setEditBPHover(true)} 
                                            onMouseLeave={() => setEditBPHover(false)}
                                            onClick={editPPActive ? null : () => setEditBPActive(!editBPActive)}
                                        >
                                            <div className="profilePhotoEditorIcon">{addAPhotoIcon}</div>                        
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
                                                    {union?.spectrum === "diamond" && <div 
                                                        className={`profileImgBackgroundLayer primary HIGHER_BACKGROUND ${union?.spectrum}`}
                                                        //style={{backgroundImage: "url(/misc/diamond-background.jpg)", opacity: "30%"}}
                                                    />}
                                                </>
                                            ) : null}
                                        <img 
                                            className={editPPHover || editPPActive ? "profileImg edit primary" : "profileImg primary"} 
                                            src={union?.isAnonymous 
                                                ? uAvatar 
                                                : union?.unionProfilePicture 
                                                    ? PS + union?.unionProfilePicture 
                                                    : uAvatar
                                            } 
                                            onError={e => {e.currentTarget.src = uAvatar}}
                                            //alt="union-avatar" 
                                        />
                                        {editPPHover || editPPActive 
                                            ? <div className={`profileImgEdit ${currentUser.spectrum}`}>{accBoxOutlinedIcon}</div> 
                                            : null
                                        }
                                        <div 
                                            className="profilePhotoEditorBtn avatar" 
                                            onMouseEnter={editBPActive ? null : () => setEditPPHover(true)} 
                                            onMouseLeave={() => setEditPPHover(false)}
                                            onClick={editBPActive ? null : () => setEditPPActive(!editPPActive)}
                                        >
                                            <div className="profilePhotoEditorIcon">{addAPhotoIcon}</div>            
                                        </div>
                                        
                                    </>
                                ) : (
                                    <>
                                 
                                        <div 
                                                    className={`
                                                        unionProfileBackgroundImg
                                                        back
                                                        ${union?.sepctrum === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                                        ${union?.spectrum}
                                                        lgt
                                                    `} 
                                                    style={!bckgrndImgLoad ? editBPHover || editBPActive ? {opacity: "0.3"} : {opacity: "1"} : {opacity: "0"}}
                                                />
                             
                                                <img 
                                                    className={`
                                                        unionProfileBackgroundImg
                                                        front
                                                        ${union?.sepctrum === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                                        ${union?.spectrum}
                                                        lgt
                                                    `} 
                                                    style={bckgrndImgLoad ? editBPHover || editBPActive ? {opacity: "0.3"} : {opacity: "1"} : {opacity: "0"}}
                                                    src={PS + union?.backgroundPicture} 
                                                    onLoad={(e) => {
                                                        e.target.src === PS + union?.backgroundPicture
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
                                            src={union?.isAnonymous
                                                ? uAvatar 
                                                : union?.unionProfilePicture 
                                                    ? PS + union?.unionProfilePicture 
                                                    : uAvatar
                                            } 
                                            onError={e => {e.currentTarget.src = uAvatar}}
                                            //alt="union-avatar"
                                        />
                                    </>
                                )
                            }
                                            <img 
                                                className="masculineProfileImg" 
                                                src={masculineUser?.isAnonymous 
                                                    ? fAvatar 
                                                    : masculineUser?.profilePicture 
                                                        ? PS + masculineUser?.profilePicture 
                                                        : fAvatar
                                                } 
                                                onError={e => {e.currentTarget.src = fAvatar}}
                                                //alt="masculine-avatar" 
                                            />
                                            <img 
                                                className="feminineProfileImg" 
                                                src={feminineUser?.isAnonymous 
                                                        ? fAvatar 
                                                        : feminineUser?.profilePicture 
                                                            ? PS + feminineUser?.profilePicture 
                                                            : fAvatar
                                                } 
                                                onError={e => {e.currentTarget.src = fAvatar}}
                                                //alt="feminine-avatar" 
                                            />
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
                                                            className={active === "story" 
                                                                ? `userProfileBtn-active story ${union?.spectrum}` 
                                                                : `userProfileBtn story ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN1" :  ""}`
                                                            } 
                                                            onClick={() => setActive("story")}
                                                        >
                                                            {union?.spectrum === "diamond" 
                                                                ? <span className="upDiamondText">Story</span>
                                                                : "Story"
                                                            }
                                                        </button>
                                                        <button 
                                                            className={active === "about" 
                                                                ? `userProfileBtn-active about ${union?.spectrum}` 
                                                                : `userProfileBtn about ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN2" :  ""}`
                                                            } 
                                                            onClick={() => setActive("about")}
                                                        >
                                                            {union?.spectrum === "diamond" 
                                                                ? <span className="upDiamondText">About</span>
                                                                : "About"
                                                            }
                                                        </button>
                                                        <button 
                                                            className={active === "posts" 
                                                                ? `userProfileBtn-active posts ${union?.spectrum}` 
                                                                : `userProfileBtn posts ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN3" :  ""}`
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
                                                                ? `userProfileBtn-active questions ${union?.spectrum}` 
                                                                : `userProfileBtn questions ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN4" :  ""}`
                                                            } 
                                                            onClick={() => setActive("questions")}
                                                        >
                                                            {union?.spectrum === "diamond" 
                                                                ? <span className="upDiamondText">Questions</span>
                                                                : "Questions"
                                                            }
                                                        </button>
                                                        <button 
                                                            className={active === "answers" 
                                                                ? `userProfileBtn-active answers ${union?.spectrum}` 
                                                                : `userProfileBtn answers ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN5" :  ""}`
                                                            } 
                                                            onClick={() => setActive("answers")}
                                                        >
                                                            {union?.spectrum === "diamond" 
                                                                ? <span className="upDiamondText">Answers</span>
                                                                : "Answers"
                                                            }
                                                        </button>
                                                        <button 
                                                            className={active === "blogs" 
                                                                ? `userProfileBtn-active blogs ${union?.spectrum}` 
                                                                : `userProfileBtn blogs ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN6" :  ""}`
                                                            } 
                                                            onClick={() => setActive("blogs")}
                                                        >
                                                            {union?.spectrum === "diamond" 
                                                                ? <span className="upDiamondText">Blogs</span>
                                                                : "Blogs"
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                            {union?.isPrivate || editPPActive || editBPActive ?
                                                (
                                                    <>
                                                        <div className="profileNavigation union">
                                                            <div className="profileNavLeft">
                                                                <button 
                                                                    className={`userProfileBtn private story ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN1" :  ""} `}
                                                                >
                                                                    {union?.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">Story</span>
                                                                        : "Story"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={`userProfileBtn private about ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN2" :  ""}`} 
                                                                >
                                                                    {union?.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">About</span>
                                                                        : "About"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={`userProfileBtn private posts ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN3" :  ""}`} 
                                                                >
                                                                    {union?.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">Posts</span>
                                                                        : "Posts"
                                                                    }
                                                                </button>
                                                            </div>
                                                            <div className="profileNavRight">
                                                                <button 
                                                                    className={`userProfileBtn private questions ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN4" :  ""}`} 
                                                                >
                                                                    {union?.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">Questions</span>
                                                                        : "Questions"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={`userProfileBtn private answers ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN5" :  ""}`} 
                                                                >
                                                                    {union?.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText private">Answers</span>
                                                                        : "Answers"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={`userProfileBtn private blogs ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN6" :  ""}`} 
                                                                >
                                                                    {union?.spectrum === "diamond" 
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
                                                                        ? `userProfileBtn-active story ${union?.spectrum}` 
                                                                        : `userProfileBtn story ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN1" :  ""}`
                                                                    } 
                                                                    onClick={() => setActive("story")}
                                                                >
                                                                    {union?.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">Story</span>
                                                                        : "Story"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={active === "about" 
                                                                        ? `userProfileBtn-active about ${union?.spectrum}` 
                                                                        : `userProfileBtn about ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN2" :  ""}`
                                                                    } 
                                                                    onClick={() => setActive("about")}
                                                                >
                                                                    {union?.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">About</span>
                                                                        : "About"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={active === "posts" 
                                                                    ? `userProfileBtn-active posts ${union?.spectrum}` 
                                                                    : `userProfileBtn posts ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN3" :  ""}`
                                                                    } 
                                                                    onClick={() => setActive("posts")}
                                                                >
                                                                    {union?.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">Posts</span>
                                                                        : "Posts"
                                                                    }
                                                                </button>
                                                            </div>
                                                            <div className="profileNavRight">
                                                                <button 
                                                                    className={active === "questions" 
                                                                        ? `userProfileBtn-active questions ${union?.spectrum}` 
                                                                        : `userProfileBtn questions ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN4" :  ""}`
                                                                    } 
                                                                    onClick={() => setActive("questions")}
                                                                >
                                                                    {union?.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">Questions</span>
                                                                        : "Questions"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={active === "answers" 
                                                                        ? `userProfileBtn-active answers ${union?.spectrum}` 
                                                                        : `userProfileBtn answers ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN5" :  ""}`
                                                                    } 
                                                                    onClick={() => setActive("answers")}
                                                                >
                                                                    {union?.spectrum === "diamond" 
                                                                        ? <span className="upDiamondText">Answers</span>
                                                                        : "Answers"
                                                                    }
                                                                </button>
                                                                <button 
                                                                    className={active === "blogs" 
                                                                        ? `userProfileBtn-active blogs ${union?.spectrum}` 
                                                                        : `userProfileBtn blogs ${union?.spectrum} ${union?.spectrum === "diamond" ? "DIAMOND_BTN6" :  ""}`
                                                                    } 
                                                                    onClick={() => setActive("blogs")}
                                                                >
                                                                    {union?.spectrum === "diamond" 
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
                    
                                <div className={`unionProfileInfo ${union?.spectrum}`}>
                                    <h4 className="unionProfileName">{union?.profileName}</h4>
                                    <span className="unionProfileAbout">{union?.about}</span>
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
                                            {masculineUser && feminineUser && 
                                                <ProfileLink 
                                                    user={currentFlame.energy ? currentFlame.energy === "masculine" ? masculineUser : feminineUser : masculineUser}
                                                    type={"profile"}
                                                />
                                            }
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
                                            {masculineUser && feminineUser && 
                                                <ProfileLink 
                                                    user={currentFlame.energy ? currentFlame.energy === "masculine" ? feminineUser : masculineUser : feminineUser}
                                                    type={"profile"}
                                                />
                                            }
                                        </div>
                                    </div>
                                    <div className="profileInfoHereFor">
                                        <span className="profileInfoHereForKey">Here For:</span>
                                        <span className="profileInfoHereForValue">{stringHereFor(union?.hereFor)}</span>
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
                                    
                                    {union && currentUser.unionId !== union?._id && <ProfileFollowBtns union={union}/>}
                                    <hr className={`unionProfileHr HIGHER_BACKGROUND ${union?.spectrum}`}/>
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
        {createPost && <CreatePost />}
        {createQN && <CreateQuestion />}
        {editAvatar && <AvatarEditor mFirst={masculineUser?.firstName} fFirst={feminineUser?.firstName}/>}
        {avatarCDP && <CDPAvatar />}
        {editBackgroundPic && <BackgroundPicEditor />}
        {backgroundCDP && <CDPBackground />}
        </>
    )
};

export default UnionProfile;