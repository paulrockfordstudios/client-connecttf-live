import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';
import { colorTheme } from '../../../../Utils/styling/colorTheme';
import { cCOpen, cSOpen, cCClose } from '../../../../Redux/AuthSlice';
import { higherSpectrumBoxShadow } from '../../../../Utils/higherSpectrumBoxShadow';
import Iframe from 'react-iframe';
import { format } from "timeago.js";
import CommentFeed from '../../../Comments/CommentFeed/CommentFeed';
import CreateComment from '../../../Comments/CreateComment/CreateComment';
import DOMPurify from 'dompurify';
import ChatBubbleIconSpectrum from '../../../../Utils/misc/ChatBubbleIconSpectrum';
import ViewsBubble from '../../../InfoBubbles/ViewsBubble/ViewsBubble';
import LikesBubble from '../../../InfoBubbles/LikesBubble/LikesBubble';
import LovesBubble from '../../../InfoBubbles/LovesBubble/LovesBubble';
import CommentsBubble from '../../../InfoBubbles/CommentsBubble/CommentsBubble';
import SharesBubble from '../../../InfoBubbles/SharesBubble/SharesBubble';
import FlareOptionsDropdown from '../../../Dropdowns/FlareOptionsDropdown/FlareOptionsDropdown';
import CDPPost from '../../../Popups/ConfirmDeletePopups/CDPPost/CDPPost'
import EditPost from '../../EditPost/EditPost';
import VisibilityIcon from '../../../../Utils/icons/VisibilityIcon';
import ProfileLink from '../../../ProfileLink/ProfileLink';
import fAvatar from "../../../../Assets/picBlanks/no-avatar.jpg";
import uAvatar from "../../../../Assets/picBlanks/no-union-avatar.jpg";
import "./PostFullDisplay.css";
import FlareLoveButton from '../../../Buttons/EmoticonBtns/FlareDoteBtns/FlareLoveButton/FlareLoveButton';
import FlareLikeButton from '../../../Buttons/EmoticonBtns/FlareDoteBtns/FlareLikeButton/FlareLikeButton';
import ConfirmFlagPopup from '../../../Popups/ConfirmFlagPopup/ConfirmFlagPopup';
import { blockString } from '../../../../Utils/blockString';
import convertPx2Rem from '../../../../Utils/convertPx2Rem';
import { convert2Iframe } from '../../../../Utils/videoEmbedConfig';
import { chatboIcon, flagIcon, moreVertIcon } from '../../../../Lib/mui/icons';


function PostFullDisplay({post}) {

    const el = useRef();

    const pfdRef = useRef();
    const postDisplayRef = useRef();
    const displayCntLeftRef = useRef();
    const displayCntRightRef = useRef();

    const { user: currentUser, flame, newComment, newShare: nShare, cReport, flagData, editedPost } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const dispatch = useDispatch();
 
    const [user, setUser] = useState({});
    const [ clicked, setClicked ] = useState(0);
    const [ height, setHeight ] = useState();
    const [ postODD, setPostODD] = useState(false);
    const [ pvBubble, setPVBubble ] = useState(false);
    const [ plkBubble, setPLkBubble ] = useState(false);
    const [ plvBubble, setPLvBubble ] = useState(false);
    const [ pcBubble, setPCBubble ] = useState(false);
    const [ psBubble, setPSBubble ] = useState(false);
    const [ isFlameLiked, setIsFlameLiked ] = useState(post.flameLikes.includes(currentUser._id));
    const [ isUnionLiked, setIsUnionLiked ] = useState(post.unionLikes.includes(currentUser._id));
    const [ isFlameLoved, setIsFlameLoved ] = useState(post.flameLoves.includes(currentUser._id));
    const [ isUnionLoved, setIsUnionLoved ] = useState(post.unionLoves.includes(currentUser._id));
    const [ isFlameFlagged, setIsFlameFlagged ] = useState(post.flameFlags.includes(currentUser._id));
    const [ isUnionFlagged, setIsUnionFlagged ] = useState(post.unionFlags.includes(currentUser._id));
    const [ flagged, setFlagged ] = useState(false);
    const [ viewCnt, setViewCnt ] = useState(0);
    const [ likeCnt, setLikeCnt ] = useState(0);
    const [ loveCnt, setLoveCnt ] = useState(0);
    const [ commentCnt, setCommentCnt ] = useState(0);
    const [ shareCnt, setShareCnt ] = useState(0);
    const [ scrollPosition, setScrollPosition ] = useState(0);
    const [ displayCntLeftWidth, setDisplayCntLeftWidth ] = useState(0);
    const [ displayCntRightWidth, setDisplayCntRightWidth ] = useState(0);
    const [ commentAmount, setCommentAmount ] = useState(0);
    const [ isReported, setIsReported ] = useState(post.reports?.length > 0);
    const [ flagThreshold, setFlagThreshold ] = useState(false);
    const [ feed, setFeed ] = useState(post.feed);
    const [ access, setAccess ] = useState(post.access);
    const [ title, setTitle ] = useState(post.title);
    //const [ body, setBody ] = useState(post.body);
    const [ desc, setDesc ] = useState(post.description);
    const [ hashtags, setHashtags ] = useState(post.hashtags);
    const [ photos, setPhotos ] = useState(post.photos);

    const newReport = { 
        auto: true,
        plaintiffType: "system",
        plaintiffId: null,
        defendentType: post.union ? "union" : "flame",
        defendentId: post.union ? post.unionId : post.userId,
        reportType: post ? "flare" : "user",
        flareType: "post",
        flareId: post._id,
        description: "<p>To many flags. Flare has reached its flag threshold.</p>",  
    };

    const newSuspension = { 
        accountType: post.union ? "union" : "flare",
        accountId: user._id,
        mascId: post.union ? user.masculineId : null,
        femId: post.union ? user.feminineId : null,
        description: "<p>Auto report, too many flags on flare.</p>",  
    };

    const flareData = {
        user: user, 
        flare: post, 
        type: "post",
        flagged: flagged,
    };

    useEffect(() => {
        setViewCnt(post.flameViews.length + post.unionViews.length);
        setLikeCnt(post.flameLikes.length + post.unionLikes.length);
        setLoveCnt(post.flameLoves.length + post.unionLoves.length);
        setFlagThreshold(post.flameFlags?.length + post.unionFlags?.length>= 3);
        setIsFlameFlagged(post.flameFlags.includes(currentUser._id));
        setIsUnionFlagged(post.unionFlags.includes(currentUser._id));
    }, [post]);

    useEffect(() => {
        if(editedPost?._id === post._id) {
            setFeed(editedPost.feed);
            setAccess(editedPost.access);
            setTitle(editedPost.title);
            //setBody(editedPost.body);
            setDesc(editedPost.description);
            setHashtags(editedPost.hashtags);
            setPhotos(editedPost.photos);
        }
    }, [editedPost]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = post.unionId 
            ? await axiosReq("GET", `/unions?unionId=${post.unionId}`)
            : await axiosReq("GET", `/users?userId=${post.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [post]);

    useEffect(() => {
        const fetchCommentCnt = async () => {
            try {
                const res = await axiosReq("GET", `/comments/post/${post._id}/count/${currentUser._id}/${blockString(currentUser)}`); 
                setCommentCnt(res.data);
            } catch(err) {console.log(err)}
        }
        fetchCommentCnt();
    }, [user]);

    useEffect(() => {
        const fetchShareCnt = async () => {
            try {
                const res = await axiosReq("GET", `/shares/post/${post._id}/count/${currentUser._id}/${blockString(currentUser)}`); 
                setShareCnt(res?.data);
            } catch(err) {console.log(err)}
        }
        fetchShareCnt();
    }, [user]);

    useEffect(() => {
        if (user && flagThreshold && post.reports?.length === 0) {
            const autoReport = async () => {
                try {
                    const reportRes = await axiosReq("POST", "/reports", newReport);
                    await axiosReq("PUT", `/posts/${post._id}/report`, {reportId: reportRes.data._id});
                    const reportArr = [];
                    reportArr.push(res.data._id)
                    Object.assign(newSuspension, {reports: reportArr});
                    const suspensionRes = await axiosReq("POST", "/suspensions", newSuspension);
                    await axiosReq("PUT", `/${post.union ? "unions" : "users"}/${user._id}/suspend`, {suspensionId: suspensionRes.data._id});
                    setIsReported(true);
                } catch (err) {
                    console.log(err);
                }
            }
            autoReport();
        }
    }, [user, flagThreshold]);

    useEffect(() => {
        setHeight(pfdRef.current?.clientHeight);
    }, [commentAmount]);


    useEffect(() => {
            setDisplayCntLeftWidth(displayCntLeftRef.current?.clientWidth + 20);
    }, [viewCnt, likeCnt, loveCnt]);

    useEffect(() => {
        setDisplayCntRightWidth(displayCntRightRef.current?.clientWidth + 20);
    }, [commentCnt, shareCnt]);

    useEffect(() => {
        if (isFlameFlagged || isUnionFlagged) {
            setFlagged(true);
        }
    }, [isFlameFlagged, isUnionFlagged]);

    useEffect(() => {
        if (flagData?.flareId !== post._id) return;
        setFlagged(flagData?.isFlagged);
    }, [flagData])

    useEffect(() => {
        let postODDHandler = (event) => {
            var path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                setPostODD(false);
            }
        };
        if (postODD) {
            document.body.addEventListener("click", postODDHandler);
            return () => {
                document.body.removeEventListener("click", postODDHandler);
            };
        }
    }, [postODD]);

    useEffect(() => {
        if (newComment) {
            setCommentCnt(commentCnt + 1);
            dispatch(cCClose());
        }
    }, [newComment]);

    useEffect(() => {
        if (nShare) {
            setShareCnt(shareCnt + 1);
        }
    }, [nShare]);
    
    useEffect(() => {
        var rect = postDisplayRef?.current?.getBoundingClientRect();
        setScrollPosition(rect?.top)
    }, []);

    useEffect(() => {
        if (pvBubble || plkBubble || plvBubble || pcBubble || psBubble) {
            var rect = postDisplayRef?.current?.getBoundingClientRect();
            setScrollPosition(rect?.top)
        }
    }, [pvBubble, plkBubble, plvBubble, pcBubble, psBubble]);

    
    return (
        <>
            {
                isFlameFlagged || isUnionFlagged || isReported ? (<></>) : (
                    <div 
                        className="postFullDisplayContainer"
                        ref={(el) => higherSpectrumBoxShadow(el, setHeight)} 
                    > 
                        <div 
                            className={`postFullDisplayBackgroundTheme HIGHER_BACKGROUND ${colorTheme(user)}`} 
                            style={{height: `${convertPx2Rem(Math.round(height))}`}} 
                        />              
                        <div 
                            className={`postFullDisplay union BOX_SHADOW ${colorTheme(user)}`}
                            ref={pfdRef}
                        >
                            
                                <div className="postFullDisplayTop">
                                    <div className="postFullDisplayTopLeft">
                                        <ProfileLink user={user} type={"flare"} display={"full"} bubble/>
                                        <span className="postFullDisplayInfo">{format(post.createdAt)}</span>
                                        <span className="postFullDisplayInfo">/</span>
                                        <span className="postFullDisplayInfo">{`${feed} Question`}</span>
                                        <span className="postFullDisplayInfo">/</span>
                                        <span className="postFullDisplayInfo">{access}</span>
                                        <span className="postFullDisplayVisibilityIcon">
                                            <VisibilityIcon 
                                                visible={access} 
                                                primary={{fontSize: "1.125rem" /*18px*/}}
                                                secondary={{fontSize: "0.75rem" /*12px*/}}
                                            />
                                        </span>
                                        {flagged && 
                                            <span className="postFullDisplayVisibilityIcon">
                                                <div style={{color: "red"}} >{flagIcon}</div>
                                            </span>
                                        }
                                    </div>
                                    <div className="postFullDisplayTopRight">
                                        <div onClick={() => setPostODD(!postODD)}>{moreVertIcon}</div>
                                        <div 
                                            className="postFullDisplayPostODropdown" 
                                            style={postODD ? {opacity: "100%"} : {opacity: "0%", right: "125rem" /*2000px*/}}
                                        >
                                            <FlareOptionsDropdown data={flareData}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="postFullDisplayCenter">
                                    <span 
                                        className="postFullDisplayText" 
                                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(desc)}} 
                                    />
                                    {hashtags.length > 0 &&
                                        <div className="postFullDisplayHashtagList">
                                            {hashtags.map((hashtag, index) => (
                                                <Link to={`/hashtag/${hashtag.value.substring(1)}`}>
                                                    <span 
                                                        key={index}
                                                        className={`postFullDisplayhashtags TEXT_COLOR ${colorTheme(user)}`}
                                                    >
                                                        {`#${hashtag.value}`}
                                                    </span>
                                                </Link>
                                            ))}
                                        </div>
                                    }
                                    {photos.length > 0 &&
                                        <div className="photoFullDisplay-container">
                                            <ul className="photoList">      
                                                {photos.map((photo, index) => (
                                                    <li className="photos" key={`pfd-photos-${post._id}-${index}`}>
                                                        <img className="postImg" src={PS + photo} alt="" />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    }
                                    {post.videos.length >0 &&
                                        <ul className="pfdVideoList">      
                                            {post.videos.map((video, index) => (
                                                <li className="pfdVideo" key={`pfd-videos-${post._id}-${index}`}>
                                                    <div className="postFullDisplayIframeContainer">
                                                        <Iframe 
                                                            url={convert2Iframe(video.value)}
                                                            className="postFullDisplayIframe"
                                                        />
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                </div>
                                <div className="postFullDisplayBottom" ref={postDisplayRef}>
                                    <div className="postFullDisplayBottomLeft" ref={displayCntLeftRef}>
                                        <div 
                                            className="postFullDisplayInfoBubblePopup left"
                                            style={
                                                pvBubble && viewCnt === 0 ||
                                                plkBubble && likeCnt === 0 ||
                                                plvBubble && loveCnt === 0 
                                                    ? {opacity: "0", right: "125rem" /*2000px*/} 
                                                    : {opacity: "100%", right: `${convertPx2Rem(Math.round(displayCntLeftWidth))}`, top: "0rem"} 
                                            }
                                        >
                                            <div className="postFullDisplayInfoBubble left views" style={pvBubble ? {opacity: "100%"} : {opacity: "0"}}>
                                                <ViewsBubble 
                                                    flameViews={post.flameViews} 
                                                    unionViews={post.unionViews} 
                                                    sp={scrollPosition} 
                                                />
                                            </div>
                                            <div className="postFullDisplayInfoBubble left likes" style={plkBubble ? {opacity: "100%"} : {opacity: "0"}}>
                                                <LikesBubble
                                                    flameLikes={post.flameLikes}    
                                                    unionLikes={post.unionLikes} 
                                                    isFlameLiked={isFlameLiked} 
                                                    isUnionLiked={isUnionLiked}
                                                    show={true}
                                                    list={"post"}
                                                    sp={scrollPosition}
                                                />
                                            </div>
                                            <div className="postFullDisplayInfoBubble left loves" style={plvBubble ? {opacity: "100%"} : {opacity: "0"}}>
                                                <LovesBubble 
                                                    flameLoves={post.flameLoves} 
                                                    unionLoves={post.unionLoves} 
                                                    isFlameLoved={isFlameLoved} 
                                                    isUnionLoved={isUnionLoved}
                                                    list={"post"}
                                                    sp={scrollPosition}   
                                                />
                                            </div>
                                        </div>
                                        <div className="postFullDisplayCountItem views">
                                            <i 
                                                className="postFullDisplayPNGIcon PNG_ICON_SEEN left" 
                                                alt="seen" 
                                                onMouseOver={() => setPVBubble(true)}
                                                onMouseLeave={() => setPVBubble(false)}  
                                            />
                                            <span className="postFullDisplayCounter left">{viewCnt}</span>
                                        </div>
                                        <div className="postFullDisplayCountItem left likes">
                                            <FlareLikeButton 
                                                user={user} 
                                                flare={post} 
                                                type={"post"} 
                                                popup={setPLkBubble} 
                                                setIsFLiked={setIsFlameLiked}
                                                setIsULiked={setIsUnionLiked}
                                                isFLoved={isFlameLoved}
                                                isULoved={isUnionLoved}
                                                likesCount={likeCnt}
                                                setLikesCount={setLikeCnt}
                                                flagged={flagged}
                                            />
                                        </div>
                                        <div className="postFullDisplayCountItem left loves">
                                            <FlareLoveButton 
                                                user={user} 
                                                flare={post} 
                                                type={"post"} 
                                                popup={setPLvBubble}
                                                setIsFLoved={setIsFlameLoved}
                                                setIsULoved={setIsUnionLoved}
                                                isFLiked={isFlameLiked}
                                                isULiked={isUnionLiked}
                                                lovesCount={loveCnt}
                                                setLovesCount={setLoveCnt}
                                                flagged={flagged}
                                            />
                                        </div>             
                                    </div>
                                    <div className="postFullDisplayBottomRight" ref={displayCntRightRef} >
                                        <div 
                                            className="postFullDisplayInfoBubblePopup right"
                                            style={
                                                pcBubble && commentCnt === 0 ||
                                                psBubble && shareCnt === 0
                                                    ? {opacity: "0", left: "250rem" /*4000px*/} 
                                                    : {opacity: "100%", left: `${convertPx2Rem(Math.round(displayCntRightWidth))}`, top: "0"}  
                                            }
                                        >
                                            <div className="postFullDisplayInfoBubble right comments" style={pcBubble ? {opacity: "100%"} : {opacity: "0"}}>
                                                <CommentsBubble 
                                                    flameComments={post.flameComments} 
                                                    unionComments={post.unionComments} 
                                                    sp={scrollPosition}
                                                />
                                            </div>
                                            <div className="postFullDisplayInfoBubble right shares" style={psBubble ? {opacity: "100%"} : {opacity: "0"}}>
                                                <SharesBubble 
                                                    flameShares={post.flameShares} 
                                                    unionShares={post.unionShares} 
                                                    sp={scrollPosition}
                                                />
                                            </div>
                                        </div>
                                        <div className="postFullDisplayCountItem comments">
                                            {user.unionName ?
                                                (
                                                    <>
                                                        {colorTheme(user) === "diamond" ?
                                                            (
                                                                <>
                                                                    <i 
                                                                        className="
                                                                            postFullDisplayPNGIcon
                                                                            PNG_ICON_CHAT_BUBBLE 
                                                                            diamond 
                                                                            right
                                                                        "  
                                                                        alt="chat-bubble" 
                                                                        onMouseOver={() => setPCBubble(true)}
                                                                        onMouseLeave={() => setPCBubble(false)}
                                                                    />
                                                                    <span className="postFullDisplayCounter right">{commentCnt}</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div 
                                                                        className="postFullDisplaySVGIconDiv"
                                                                        onMouseOver={() => setPCBubble(true)}
                                                                        onMouseLeave={() => setPCBubble(false)}
                                                                    >
                                                                        <ChatBubbleIconSpectrum 
                                                                            spectrum={user.spectrum} 
                                                                            cn={"postFullDisplaySVGIcon right SVG_ICON"}
                                                                            flare={"post"}  
                                                                        />
                                                                        <span className="postFullDisplayCounter right">{commentCnt}</span>
                                                                    </div>
                                                                </>
                                                            )
                                                        } 
                                                    </>
                                                ):(
                                                    <>
                                                        <div 
                                                            className={`postFullDisplaySVGIcon right SVG_ICON ${user.energy}`}
                                                            onMouseOver={() => setPCBubble(true)}
                                                            onMouseLeave={() => setPCBubble(false)}
                                                        >
                                                            {chatboIcon}
                                                        </div>
                                                        <span className="postFullDisplayCounter right" >{commentCnt}</span>
                                                    </>
                                                )
                                            }   
                                        </div>
                                        <div className="postFullDisplayCountItem shares">
                                            <i 
                                                className={`
                                                    postFullDisplayPNGIcon
                                                    PNG_ICON_SHARE
                                                    ${colorTheme(user)} 
                                                    right
                                                `}  
                                                alt="share-icon" 
                                                onMouseOver={() => setPSBubble(true)}
                                                onMouseLeave={() => setPSBubble(false)}   
                                            />
                                            <span className="postFullDisplayCounter right" >{shareCnt}</span>
                                        </div>
                                        <div 
                                            className={`
                                                postFullDisplayShareButtonBackground 
                                                ${colorTheme(user) === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                                ${colorTheme(user)} 
                                            `} 
                                            onClick={() => dispatch(cSOpen(flareData))}
                                            //onMouseDown={() => setSBtnBckgrnd(true)}
                                            //onMouseUp={() => setSBtnBckgrnd(false)}
                                        >
                                            <button className={`postFullDisplayShareButton ${colorTheme(user)}`}>
                                                Share
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <hr className={`postFullDisplayHr COLOR_HR ${colorTheme(user)}`} />
                             
                            <div className="postFullDisplayResponseFeed">
                                <div 
                                    className={`pfdCreatePostBtn-container ${currentUser.spectrum}`} 
                                    style={flagged ? {opacity: "30%"} : {opacity: "100%"}}
                                    onClick={() => flagged ? null : dispatch(cCOpen(flareData))}
                                >
                                    <div 
                                        className={`
                                            pfdCreatePostBtnHigherSpectrumBackground
                                            ${currentUser.unionName ? "HIGHER_BACKGROUND" : ""} 
                                            ${currentUser.unionName ? currentUser.spectrum : ""}
                                        `} 
                                    />
                                    <div className="pfdCreatePostBtnWhiteBackground" />
                                    <div className={`pfdCreatePostBtn union INNER_BOX_SHADOW ${colorTheme(currentUser)}`} >
                                        <div className="pfdCreatePostBtnLeft">
                                            <Link 
                                                to={flagged
                                                    ? ""
                                                    : currentUser.unionName
                                                        ? `/union-profile/unionName/${currentUser.unionName}`
                                                        : `/flame-profile/userName/${currentUser.userName}`
                                                }
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <img 
                                                    className="pfdCreatePostBtnAvatar" 
                                                    src={currentUser.unionName 
                                                        ? currentUser.unionProfilePicture 
                                                            ? PS + currentUser.unionProfilePicture 
                                                            : uAvatar
                                                        : currentUser.profilePicture 
                                                            ? PS + currentUser.profilePicture 
                                                            : fAvatar
                                                    } 
                                                    onError={e => {e.currentTarget.src = currentUser.unionName ? uAvatar : fAvatar}}
                                                    alt=""
                                                />
                                            </Link>
                                            <label className="pfdCreatePostBtnPlaceHolder">
                                                <span className="pfdCreatePostBtnText intangible">
                                                    {`Do you care to comment on `}
                                                </span>
                                                {currentUser._id === user._id 
                                                    ? <span className="pfdCreatePostBtnText intangible">
                                                        {`your`}
                                                    </span>
                                                    : <Link 
                                                        to={flagged
                                                            ? ""
                                                            : user.unionName
                                                                ? `/union-profile/unionName/${user.unionName}`
                                                                : `/flame-profile/userName/${user.userName}`
                                                        }
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <span className={`pfdCreatePostBtnText tangible TEXT_COLOR ${colorTheme(user)}`}>
                                                            {`${user.profileName}'s`}
                                                        </span>
                                                    </Link>
                                                }
                                                <span className="pfdCreatePostBtnText intangible">
                                                    {` post, `}
                                                </span>
                                                {currentUser.unionName ?
                                                    (
                                                        <>
                                                            <Link 
                                                                to={flagged ? "" : `/flame-profile/userName/${flame.userName}`}
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <span className={`pfdCreatePostBtnText tangible TEXT_COLOR ${flame.energy}`}>
                                                                    {`${flame.firstName} `}
                                                                </span>
                                                            </Link>
                                                            <span className="pfdCreatePostBtnText intangible">{" of "}</span>
                                                            <Link 
                                                                to={flagged ? "" : `/union-profile/unionName/${currentUser.unionName}`}
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <span className={`pfdCreatePostBtnText tangible TEXT_COLOR ${currentUser.spectrum}`}>
                                                                    {`${currentUser.profileName}`}
                                                                </span>
                                                            </Link>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Link 
                                                                to={flagged ? "" : `/flame-profile/userName/${currentUser.userName}`}
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <span className={`pfdCreatePostBtnText tangible TEXT_COLOR ${currentUser.energy}`}>
                                                                    {`${currentUser.firstName} `}
                                                                </span>
                                                            </Link>
                                                        </>
                                                    )
                                                }                            
                                                <span className="pfdCreatePostBtnText intangible">{"?"}</span>
                                            </label>
                                        </div>
                                        <div className="pfdCreatePostBtnRight">
                                            <div 
                                                className={`
                                                    pfdCreatePostAskBtn
                                                    HIGHER_BACKGROUND
                                                    ${colorTheme(currentUser)}
                                                `}
                                            >
                                                {user.unionName ?
                                                    (
                                                        <>
                                                            {colorTheme === "diamond" ?
                                                                (
                                                                    <>
                                                                        <i 
                                                                            className="
                                                                                postFullDisplayPNGIcon
                                                                                PNG_ICON_CHAT_BUBBLE 
                                                                                diamond 
                                                                                right
                                                                            "  
                                                                            alt="chat-bubble" 
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    <div className="postFullDisplaySVGIconDiv">
                                                                        <ChatBubbleIconSpectrum 
                                                                            spectrum={user.spectrum} 
                                                                            cn={"pfdccBtnSVGIcon right SVG_ICON"}
                                                                            flare={"post"}  
                                                                        />
                                                                    </div>
                                                                )
                                                            } 
                                                        </>
                                                    ):(
                                                        <div className={`pfdccBtnSVGIcon right ${user.energy}`}>{chatboIcon}</div>
                                                    )
                                                }  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <CommentFeed setCommentAmount={setCommentAmount}/> 
                            </div>
                        </div>
                    </div> 
                )
            }
        </>
    )
};

export default PostFullDisplay;