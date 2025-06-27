import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { pAEOpen, pBEOpen, cdpAvatarOpen, cdpBackgroundOpen, fiiepOpen } from "../../../Redux/AuthSlice";
import { useParams } from "react-router";
import { axiosReq } from '../../../Utils/axiosConfig';
import PostFeed from '../../../Components/Posts/PostFeed/PostFeed';
import Story from '../../../Components/Story/Story';
import AboutFlame from '../../../Components/About/AboutFlame/AboutFlame';
import QuestionFeed from '../../../Components/Questions/QuestionFeed/QuestionFeed';
import ProfileFollowBtns from '../../../Components/FollowButtons/ProfileFollowBtns/ProfileFollowBtns';
import "./FlameProfile.css";
import { stringHereFor, btnsColorByEnergy } from "../../../Utils/misc/misc";
import { 
    energyIcon,
    spectrumIcon,
    chargeIcon,
    zodiacIcon,
    sexIcon,
    compassIcon,
    orientationIcon
 } from "../../../Utils/icons/icons";
import NoMatch from '../../NoMatch/NoMatch';
import CreateQuestion from '../../../Components/Questions/CreateQuestion/CreateQuestion';
import CreatePost from '../../../Components/Posts/CreatePost/CreatePost';
import AvatarEditor from '../../../Components/Editors/AvatarEditor/AvatarEditor';
import BackgroundPicEditor from '../../../Components/Editors/BackgroundPicEditor/BackgroundPicEditor';
import AvatarEditorDropdown from '../../../Components/Dropdowns/PhotoEditingDropdowns/AvatarEditorDropdown/AvatarEditorDropdown';
import CDPAvatar from '../../../Components/Popups/ConfirmDeletePopups/CDPAvatar/CDPAvatar';
import BackgroundEditorDropdown from '../../../Components/Dropdowns/PhotoEditingDropdowns/BackgroundEditorDropdown/BackgroundEditorDropdown';
import CDPBackground from '../../../Components/Popups/ConfirmDeletePopups/CDPBackground/CDPBackground';
import uAvatar from "../../../Assets/picBlanks/no-union-avatar.jpg";
import fAvatar from "../../../Assets/picBlanks/no-avatar.jpg";
import noBanner from "../../../Assets/picBlanks/no-banner.jpg";
import TFConfirmPositivePopup from '../../../Components/Popups/TwinFlamePopups/TFConfirmationPopups/TFConfirmPositivePopup/TFConfirmPositivePopup';
import FollowButtonsPopup from '../../../Components/Popups/FollowButtonsPopup/FollowButtonsPopup';
import FlameIntroInfoEditPopup from '../../../Components/Popups/ProfileEditPopups/IntroInfoEditPopups/FlameIntoInfoEditPopup/FlameIntroInfoEditPopup';
import { accBoxOutlinedIcon, addAPhotoIcon, editOutlinedIcon, wallPaperOutlinedIcon } from '../../../Lib/mui/icons';

function FlameProfile() {

    const { userName } = useParams();
    const { id } = useParams();
    
    const { 
        user: currentUser, 
        flame: currentFlame, 
        cPost, 
        cQN, 
        pAEditor, 
        pBEditor, 
        cdpAvatar, 
        cdpBackground, 
        fBOptions, 
        tfcPos,
        fiiEdit
    } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const PS = process.env.PHOTO_STORAGE;
    
    const [ user, setUser ] = useState({});
    const [ twinFlame, setTwinFlame ] = useState();
    const [ union, setUnion ] = useState({});
    const [active, setActive] = useState("story");
    const [followers, setFollowers] =useState();
    const [following, setFollowing] =useState();
    const [subscribers, setSubscribers] =useState();
    const [subscribing, setSubscribing] =useState();
    const [profileDisplay, setProfileDisplay] = useState(<Story userName={userName} />);
    const [ blockingFlames, setBlockingFlames ] = useState([]);
    const [ blockingUnions, setBlockingUnions ] = useState([]);
    const [ blocked, setBlocked ] = useState(false);
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
        const getBlockingFlames = async () => {
            let results = []; 
            for (let i = 0; i < currentUser.flameBlockers.length; i++) {
                const flameId = currentUser.flameBlockers[i];
                const flameUser = await axiosReq("GET", `/users?userId=${flameId}`)
                const { _id, userName } = flameUser.data;
                results.push({ _id, userName });
            }
            setBlockingFlames(results)
        }
        getBlockingFlames();
    }, [currentUser]);


    useEffect(() => {
        blockingFlames.forEach((fb) => {
            if (fb.userName === userName || fb._id === id) {
                setBlocked(true)
            } else {
                setBlocked(false)
            }
        })
    }, [currentUser]);

   
    // Get user
    useEffect(() => {
        const fetchUser = async () => {
            const res = userName
                ? await axiosReq("GET", `/users?userName=${userName}`)
                : await axiosReq("GET", `/users?userId=${id}`)
            setUser(res.data);
        }
        fetchUser();
    }, [userName]);

    useEffect(() => {
        if(user._id === currentUser._id) {
            setUser(currentUser);
        }
    }, [user, currentUser]);

    // Get twin flame
    useEffect(() => {
        if(user.inUnion === true) {
            const getTwinFlame = async () => {
                try {
                    const TF = await axiosReq("GET", "/users/twin-flame/" + user._id);
                    setTwinFlame(TF.data);
                } catch(err) {
                    console.log(err);
                }
            }
            getTwinFlame();
        }
    }, [user._id]);

    useEffect(() => {
        if(user) {
            const connectNumbers = async () => {
                try {
                    setFollowers(user.flameFollowers.length + user.unionFollowers.length);
                    setFollowing(user.flameFollowing.length + user.unionFollowing.length);
                    setSubscribers(user.flameSubscribers.length + user.unionSubscribers.length);
                    setSubscribing(user.flameSubscribing.length + user.unionSubscribing.length);
                } catch(err) {
                    console.log(err)
                }
            }
            connectNumbers();
        }
    }, [user]);

    useEffect(() => {
        switch (active) {
            case "story":
                setProfileDisplay(<Story />);
                break;
            case "about":
                setProfileDisplay(<AboutFlame />);
                break;
            case "posts":
                setProfileDisplay(<PostFeed dc={user.energy}/>);
                break;
            case "questions":
                setProfileDisplay(<QuestionFeed dc={user.energy}/>);
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

    const avatarEditorHandler = () => {
        dispatch(pAEOpen());
    }

    const backgroundPicEditorHandler = () => {
        dispatch(pBEOpen());
    }


    return (
        <>
        <div className="profile">
            <div className="profile-container">
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className={`profileUserDisplay-container BOX_SHADOW ${user.energy ? user.energy : "gray"}`}>
                            {user.userName === currentUser.userName ?
                                (
                                    <> 
                                
                                        {/*bckgrndImgLoad ?
                                            (*/}
                                                <>
                                                 <div 
                                                    className={`
                                                        flameProfileBackgroundImg
                                                        back
                                                        BCKGRND_LGT
                                                        ${user.energy}
                                                    `}
                                                    style={!bckgrndImgLoad ? editBPHover || editBPActive ? {opacity: "0.3"} : {opacity: "1"} : {opacity: "1"}}
                                                />
                                                <img 
                                                    className={`
                                                        flameProfileBackgroundImg
                                                        front
                                                        ${editBPHover || editBPActive ? "edit" : ""}
                                                        BCKGRND_LGT
                                                        ${user.energy}
                                                    `} 
                                                    style={bckgrndImgLoad ? editBPHover || editBPActive ? {opacity: "0.3"} : {opacity: "1"} : {opacity: "0"}}
                                                    src={PS + user.backgroundPicture} 
                                                    onLoad={(e) => {
                                                        e.target.src === PS + user.backgroundPicture
                                                            ? setBckgrndImgLoad(true)
                                                            : setBckgrndImgLoad(false)
                                                        }}
                                                    //onLoad={() => setBckgrndImgLoad(true)}
                                                    //onError={(e) => setBckgrndImgLoad(false)} 
                                                    onError={(e) => {
                                                        e.currentTarget.src = noBanner
                                                        setBckgrndImgLoad(false)
                                                    }}
                                                    //alt="profile-bckgrnd" 
                                                />  
                                                </>   
                                            {/*}) : (
                                                <div 
                                                    className={`
                                                        profileBackgroundImg
                                                        ${editBPHover || editBPActive ? "edit" : ""}
                                                        BCKGRND_LGT
                                                        ${user.energy}
                                                    `} 
                                                    style={editBPHover || editBPActive ? {opacity: "0.3"} : {}}
                                                />
                                            )
                                            */}
                                        {editBPHover || editBPActive 
                                            ? <div 
                                                className={`profileFlameBackgroundImgEdit ${user.energy}`} 
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
                                                    <div className={`profileImgBackgroundLayer primary ${user.energy}`} /> 
                                                </>
                                            ) : null}
                                        <img 
                                            className={editPPHover || editPPActive ? "profileImg edit primary" : "profileImg primary"} 
                                            src={user.isAnonymous 
                                                ? fAvatar 
                                                : user.profilePicture 
                                                    ? PS + user.profilePicture 
                                                    : fAvatar
                                            } 
                                            onError={e => {e.currentTarget.src = fAvatar}}
                                            alt="flame-avatar" 
                                        />
                                        {editPPHover || editPPActive 
                                            ? <div className={`profileImgEdit ${user.energy}`}>{accBoxOutlinedIcon}</div> 
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
                                        {editPPActive &&
                                            <div className="profileAvatarEditorDropdown">
                                                <AvatarEditorDropdown setEditPPActive={setEditPPActive}/>
                                            </div>
                                        }
                                    </>
                                ) : (
                                    <>
                                        {/*bckgrndImgLoad ?
                                            (*/}
                                            <>
                                                 <div 
                                                    className={`
                                                        flameProfileBackgroundImg
                                                        back
                                                        BCKGRND_LGT
                                                        ${user.energy}
                                                    `}
                                                    style={!bckgrndImgLoad ? editBPHover || editBPActive ? {opacity: "0.3"} : {opacity: "1"} : {opacity: "1"}}
                                                />
                                                <img 
                                                    className={`
                                                        flameProfileBackgroundImg
                                                        front
                                                        BCKGRND_LGT
                                                        ${user.energy}
                                                    `} 
                                                    style={bckgrndImgLoad ? editBPHover || editBPActive ? {opacity: "0.3"} : {opacity: "1"} : {opacity: "0"}}
                                                    src={PS + user.backgroundPicture} 
                                                    onLoad={(e) => {
                                                        e.target.src === PS + user.backgroundPicture
                                                            ? setBckgrndImgLoad(true)
                                                            : setBckgrndImgLoad(false)
                                                        }}
                                                    //onLoad={() => setBckgrndImgLoad(true)}
                                                    //onError={() => setBckgrndImgLoad(false)} 
                                                    onError={(e) => {
                                                        e.currentTarget.src = noBanner
                                                        setBckgrndImgLoad(false)
                                                    }}
                                                    //alt="profile-bckgrnd" 
                                                /> 
                                            </>    
                                            {/*}) : (
                                                <div 
                                                    className={`
                                                        profileBackgroundImg
                                                        BCKGRND_LGT
                                                        ${user.energy}
                                                    `} 
                                                />
                                            )
                                            */}
                                        <img 
                                            className="profileImg primary" 
                                            src={user.isAnonymous
                                                ? fAvatar
                                                : user.profilePicture 
                                                    ? PS + user.profilePicture 
                                                    : fAvatar
                                            } 
                                            onError={(e) => {e.currentTarget.src = fAvatar}}
                                            //alt="flame-avatar"
                                        />
                                    </>
                                )
                            }
                        
                                        {currentUser?.flameFollowing.includes(user?._id) || currentUser?.unionFollowing.includes(user?._id)?
                                            (
                                                <div className="profileNavigation flame">
                                                    <div className="profileNavLeft">
                                                        <button className={active === "story" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("story")}>Story</button>
                                                        <button className={active === "about" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("about")}>About</button>
                                                        <button className={active === "posts" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("posts")}>Posts</button>
                                                    </div>
                                                    <div className="profileNavRight">
                                                        <button className={active === "questions" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("questions")}>Questions</button>
                                                        <button className={active === "answers" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("answers")}>Answers</button>
                                                        <button className={active === "blogs" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("blogs")}>Blogs</button>
                                                    </div>
                                                </div>  
                                            ) : (
                                                <>
                                                    {user.isPrivate ?
                                                        (
                                                            <div className="profileNavigation">
                                                                <div className="profileNavLeft">
                                                                    <button className={`userProfileBtn private ${user.energy}`} >Story</button>
                                                                    <button className={`userProfileBtn private ${user.energy}`} >About</button>
                                                                    <button className={`userProfileBtn private ${user.energy}`} >Posts</button>
                                                                </div>
                                                                <div className="profileNavRight">
                                                                    <button className={`userProfileBtn private ${user.energy}`} >Questions</button>
                                                                    <button className={`userProfileBtn private ${user.energy}`} >Answers</button>
                                                                    <button className={`userProfileBtn private ${user.energy}`} >Blogs</button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                {editPPActive || editBPActive ?
                                                                    (
                                                                        <div className="profileNavigation">
                                                                            <div className="profileNavLeft">
                                                                                <button className={`userProfileBtn private ${user.energy}`} >Story</button>
                                                                                <button className={`userProfileBtn private ${user.energy}`} >About</button>
                                                                                <button className={`userProfileBtn private ${user.energy}`} >Posts</button>
                                                                            </div>
                                                                            <div className="profileNavRight">
                                                                                <button className={`userProfileBtn private ${user.energy}`} >Questions</button>
                                                                                <button className={`userProfileBtn private ${user.energy}`} >Answers</button>
                                                                                <button className={`userProfileBtn private ${user.energy}`} >Blogs</button>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="profileNavigation">
                                                                            <div className="profileNavLeft">
                                                                                <button className={active === "story" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("story")}>Story</button>
                                                                                <button className={active === "about" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("about")}>About</button>
                                                                                <button className={active === "posts" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("posts")}>Posts</button>
                                                                            </div>
                                                                            <div className="profileNavRight">
                                                                                <button className={active === "questions" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("questions")}>Questions</button>
                                                                                <button className={active === "answers" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("answers")}>Answers</button>
                                                                                <button className={active === "blogs" ? `userProfileBtn ${user.energy}-active` : `userProfileBtn ${user.energy}`} onClick={() => setActive("blogs")}>Blogs</button>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </>
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                  
                            <div className={`profileInfo ${user.energy}`}>
                            {user.userName === currentUser.userName && (
                            <div className={`profileInfoEdit ${user.energy}`} onClick={() => dispatch(fiiepOpen())}>{editOutlinedIcon}</div>
                            )}
                                <h4 className="profileName">{user.isAnonymous? "Anonymous User" : user.profileName}</h4>
                                {user?.about && <span className="profileAbout">{user.about}</span>}
                                {!user.isPrivate &&
                                    <>
                                        {user.energy || user.spectrum || user.charge || user.sex || user.orientation || user.sunSign || user.compass ?
                                            (
                                                <div className="flameProfileSpiritIcons">
                                                    {user.energy && <i className={`flameProfileSpiritIcon energy PNG_ICON_ENERGY ${user.energy}`} alt="energy-icon"/>}
                                                    {user.spectrum && <i className={`flameProfileSpiritIcon spectrum PNG_ICON_SPECTRUM ${user.spectrum}`} alt="spectrum-icon"/>}
                                                    {user.charge && <i className={`flameProfileSpiritIcon charge PNG_ICON_CHARGE ${user.charge}`} alt="charge-icon"/>}
                                                    {user.sex && <i className={`flameProfileSpiritIcon sex PNG_ICON_SEX ${user.sex}`} alt="sex-icon"/>}
                                                    {user.orientation && user.sex && <i className={`flameProfileSpiritIcon orientation PNG_ICON_ORIENTATION ${user.sex} ${user.orientation}`} alt="orientation-icon"/>}
                                                    {user.sunSign && <i className={`flameProfileSpiritIcon sunSign PNG_ICON_ZODIAC ${user.sunSign}`} alt="sinSign-icon"/>}
                                                    {user.compass && <i className={`flameProfileSpiritIcon compass PNG_ICON_COMPASS ${user.compass}`} alt="compass-icon"/>}
                                                </div>
                                            ) : ( <></> )
                                        }
                                    </>
                                }
                                {user.hereFor?.length > 0 && 
                                    <div className="profileInfoHereFor">
                                        <span className="profileInfoHereForKey">Here For:</span>
                                        <span className="profileInfoHereForValue">{stringHereFor(user.hereFor)}</span>
                                    </div>
                                }
                                {twinFlame ?
                                    (
                                        <>
                                        <div className="profileUserTF">
                                            <span className={`profileUserTFKey ${user.energy}`}>TF:</span>
                                            <div className="profileUserTFValue">
                                                <Link 
                                                    className="profileUserTFLink" 
                                                    to={`/flame-profile/${twinFlame.userName}`} 
                                                    onClick={() => setActive("story")}
                                                >
                                                    <img className="profileUserTFPic" src={twinFlame.profilePicture || "/picBlanks/no-avatar.jpg"} alt="" />
                                                    <img className="profileUserTFEnergy" src={energyIcon(twinFlame.energy)} alt="" />
                                                    <span className="profileUserTFName">{twinFlame.profileName}</span>
                                                </Link>
                                            </div>
                                        </div>
                                        </>
                                    ) : (
                                        <></>
                                    )
                                }
                                <div className="profileFollowStats">
                                    <Link className="profileFollowStatLink" to={`/flame-profile/userName/${user.userName}/followers`}>
                                        <span className="profileFollowStatCount">{followers}</span>
                                        <span className="profileFollowStatText">{`Befriender${followers === 1 ? "" : "s"}`}</span>
                                    </Link>
                                    <div className="profileFollowStat">
                                    <Link className="profileFollowStatLink" to={`/flame-profile/userName/${user.userName}/following`}>
                                        <span className="profileFollowStatText">Befriending</span>
                                        <span className="profileFollowStatCount">{following}</span>
                                    </Link>
                                    </div>
                                </div>
                                <div className="profileSubscribeStats">
                                    <Link className="profileSubscribeStatLink" to={`/flame-profile/userName/${user.userName}/subscribers`}>
                                        <span className="profileSubscribeStatCount">{subscribers}</span>
                                        <span className="profileSubscribeStatText">{`Subscriber${subscribers === 1 ? "" : "s"}`}</span>
                                    </Link>
                                    <div className="profileSubscribeStat">
                                    <Link className="profileSubscribeStatLink" to={`/flame-profile/userName/${user.userName}/subscribing`}>
                                        <span className="profileSubscribeStatText">Subscribing</span>
                                        <span className="profileSubscribeStatCount">{subscribing}</span>
                                    </Link>
                                    </div>
                                </div>
                                {currentFlame._id !== user._id && <ProfileFollowBtns user={user}/>}
                                <hr className={`flameProfileHr ${user.energy? user.energy : "gray"}`}/>
                                <div className="profileDisplay-container">
                                    {currentUser.flameFollowing.includes(user?._id) ?
                                        ( 
                                            <>{profileDisplay}</> 
                                        ) : (
                                            <>
                                                {user.isPrivate 
                                                    ? ( <div className="privateAccText">This Account is Private.</div> )
                                                    : ( <>{profileDisplay}</> ) 
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>  
            </div>    
        </div>
            {editAvatar && <AvatarEditor />}
            {avatarCDP && <CDPAvatar />}
            {editBackgroundPic && <BackgroundPicEditor />}
            {backgroundCDP && <CDPBackground />}
            {fBOptions && <FollowButtonsPopup user={user}/>}
            {tfcPos && <TFConfirmPositivePopup user={user}/>}
            {fiiEdit && <FlameIntroInfoEditPopup />}
        </>
    )
};

export default FlameProfile;