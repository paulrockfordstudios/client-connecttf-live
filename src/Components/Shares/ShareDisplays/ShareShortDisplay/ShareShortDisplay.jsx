import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import DOMPurify from 'dompurify';
import "./ShareShortDisplay.css";
import { MoreVert, ChatBubbleOutline, WallpaperOutlined } from "@material-ui/icons";
import ChatBubbleIconSpectrum from '../../../../Utils/misc/ChatBubbleIconSpectrum';
import ViewsBubble from '../../../InfoBubbles/ViewsBubble/ViewsBubble';
import LikesBubble from '../../../InfoBubbles/LikesBubble/LikesBubble';
import LovesBubble from '../../../InfoBubbles/LovesBubble/LovesBubble';
import CommentsBubble from '../../../InfoBubbles/CommentsBubble/CommentsBubble';
import SharesBubble from '../../../InfoBubbles/SharesBubble/SharesBubble';
import VisibilityIcon from '../../../../Utils/icons/VisibilityIcon';
import { axiosReq } from '../../../../Utils/axiosConfig';
import noBanner from "../../../../Assets/picBlanks/no-banner.jpg";
import { setNewFlareNot, setNewAddFNUser } from '../../../../Redux/AuthSlice';
import ProfileLink from '../../../ProfileLink/ProfileLink';
import FlareLoveButton from '../../../Buttons/EmoticonBtns/FlareDoteBtns/FlareLoveButton/FlareLoveButton';
import FlareLikeButton from '../../../Buttons/EmoticonBtns/FlareDoteBtns/FlareLikeButton/FlareLikeButton';
import { colorTheme } from '../../../../Utils/styling/colorTheme';
import PostShortDisplay from '../../../Posts/PostDisplays/PostShortDisplay/PostShortDisplay';

function ShareShortDisplay({ share }) {

    const ref = useRef();
    const postDisplayRef = useRef();
    const textRef = useRef();
    const displayCntLeftRef = useRef();
    const displayCntRightRef = useRef();

    const dispatch = useDispatch();

    const PS = process.env.PHOTO_STORAGE;

    const { user: currentUser } = useSelector((state) => state.auth);

    const [ user, setUser ] = useState({});
    const [ post, setPost ] = useState({});
    const [ height, setHeight ] = useState();
    const [ pvBubble, setPVBubble ] = useState(false);
    const [ plkBubble, setPLkBubble ] = useState(false);
    const [ plvBubble, setPLvBubble ] = useState(false);
    const [ pcBubble, setPCBubble ] = useState(false);
    const [ psBubble, setPSBubble ] = useState(false);
    const [isFlameLiked, setIsFlameLiked] = useState(false);
    const [isUnionLiked, setIsUnionLiked] = useState(false);
    const [isFlameLoved, setIsFlameLoved] = useState(false);
    const [isUnionLoved, setIsUnionLoved] = useState(false);
    const [ flameViews, setFlameViews ] = useState(post.flameViews.length);
    const [ unionViews, setUnionViews ] = useState(post.unionViews.length);
    const [ viewCnt, setViewCnt ] = useState(0);
    const [ likeCnt, setLikeCnt ] = useState(0);
    const [ loveCnt, setLoveCnt ] = useState(0);
    const [ commentCnt, setCommentCnt ] = useState(0);
    const [ shareCnt, setShareCnt ] = useState(0);
    const [ displayCntLeftWidth, setDisplayCntLeftWidth ] = useState(0);
    const [ displayCntRightWidth, setDisplayCntRightWidth ] = useState(0);
    const [ scrollPosition, setScrollPosition ] = useState(0);
    const [ accessible, setAccessible ] = useState();
    const [ photoLoad, setPhotoLoad ] = useState(true);

    const descDiv = document.getElementById(`psdt-${post._id}`);
    const linkElems = descDiv?.getElementsByTagName('a');

    useEffect(() => {
        setViewCnt(post.flameViews.length + post.unionViews.length);
        setLikeCnt(post.flameLikes.length + post.unionLikes.length);
        setLoveCnt(post.flameLoves.length + post.unionLoves.length);
        setCommentCnt(post.flameComments.length + post.unionComments.length);
        setShareCnt(post.flameShares.length + post.unionShares.length);
    }, [post]);    

    useEffect(() => {
        var rect = postDisplayRef?.current?.getBoundingClientRect();
        setScrollPosition(rect?.top)
    }, []);
    
    useEffect(() => {
        const fetchUser = async () => {
            const res = share.unionId 
            ? await axiosReq("GET", `/unions?unionId=${share.unionId}`)
            : await axiosReq("GET", `/users?userId=${share.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [share]);

    useEffect(() => {
        const fetchPost = async () => {
            const res = await axiosReq("GET", `/posts/${share.flareId}`)
            setPost(res.data);
        }
        fetchPost();
    }, [share]);

    useEffect(() => {
        const getDims = () => {
            const displayHeight = ref?.current?.clientHeight;
            setHeight(displayHeight);
        }
        getDims();    
    }, [user]);

    useEffect(() => {
        setDisplayCntLeftWidth(displayCntLeftRef.current?.clientWidth + 10);
        }, [viewCnt, likeCnt, loveCnt]);

    useEffect(() => {
        setDisplayCntRightWidth(displayCntRightRef.current?.clientWidth + 12);
    }, [commentCnt, shareCnt]);

    // Viewed counter
    const viewHandler = () => {
        try {
            currentUser.unionName
                ? axiosReq("PUT", `/posts/${post._id}/unionView`, { unionId: currentUser._id })
                : axiosReq("PUT", `/posts/${post._id}/flameView`, { userId: currentUser._id })
        } catch(err) {}
        currentUser.unionName
            ? setUnionViews(unionViews + 1)
            : setFlameViews(flameViews + 1)
    };

    useEffect(() => {
        if (linkElems) {
            let linkElem = null;
            let mElem = null;
            if (post.mentions.length > 0) {
                for (let i = 0; i < linkElems?.length; i++) {linkElem = linkElems.item(i)};
                for (let m = 0; m < post.mentions.length; m++) {mElem = post.mentions[m]};
                if (mElem?.link === linkElem?.getAttribute('href')) {
                    linkElem?.classList.add('mentionLink');
                    linkElem?.classList.add(`${mElem.color}`);
                }
            }
        }
    }, [linkElems, post.mentions]);

    useEffect(() => {
        const accessHandler = (visible) => {
            switch (visible) {
                case "Public":
                    setAccessible("void");
                    break;
                case "Friends":
                    setAccessible(
                        user.flameFollowers?.includes(currentUser._id) ||
                        user.flameFollowing?.includes(currentUser._id) ||
                        user.unionFollowers?.includes(currentUser._id) ||
                        user.unionFollowing?.includes(currentUser._id)
                    );
                    break;
                case "Befrienders":
                    setAccessible(
                        user.flameFollowers?.includes(currentUser._id) ||
                        user.unionFollowers?.includes(currentUser._id)
                    );
                    break;
                case "Befriending":
                    setAccessible(
                        user.flameFollowing?.includes(currentUser._id) ||
                        user.unionFollowing?.includes(currentUser._id)
                    );
                    break;
                case "Unions":
                    setAccessible(currentUser.unionName);
                    break;
                case "Union Friends":
                    setAccessible(
                        user.unionFollowers?.includes(currentUser._id) ||
                        user.unionFollowing?.includes(currentUser._id)
                    );
                    break;
                case "Union Befrienders":
                    setAccessible(
                        user.unionFollowers?.includes(currentUser._id)
                    );
                    break;
                case "Unions Befriending":
                    setAccessible(
                        user.unionFollowing?.includes(currentUser._id)
                    );
                    break;
                case "Flames":
                    setAccessible(currentUser.userName);
                    break;
                case "Flame Friends":
                    setAccessible(
                        user.flameFollowers?.includes(currentUser._id) ||
                        user.flameFollowing?.includes(currentUser._id)
                    );
                    break;
                case "Flame Befrienders":
                    setAccessible(
                        user.flameFollowers?.includes(currentUser._id)
                    );
                    break;
                case "Flames Befriending":
                    setAccessible(
                        user.flameFollowing?.includes(currentUser._id)
                    );
                    break;
                case "Custom":
                    setAccessible("void");
                    break;
                case "Only You":
                    setAccessible(currentUser._id === user._id);
                    break;
                default:
                    setAccessible("void");
            }
        }
        accessHandler(post.access)
    }, []);

    useEffect(() => {
        if (pvBubble || plkBubble || plvBubble || pcBubble || psBubble) {
            var rect = postDisplayRef?.current?.getBoundingClientRect();
            setScrollPosition(rect?.top)
        }
    }, [pvBubble, plkBubble, plvBubble, pcBubble, psBubble]);
    
   
    return (
        <>
            {currentUser._id === user._id || accessible || accessible === "void" ?
                (      
                    <div className="shareShortDisplayContainer" style={{height: `${height}px`}}>
                        {user.unionName && user.spectrum === "rainbow" ||
                         user.unionName && user.spectrum === "silver" ||
                         user.unionName && user.spectrum === "gold" ||
                         user.unionName && user.spectrum === "platinum" ||
                         user.unionName && user.spectrum === "diamond" 
                            ? <i 
                                className={`
                                    shareShortDisplayBackgroundTheme 
                                    HIGHER_BACKGROUND
                                    ${colorTheme(user)}
                                `} 
                                alt="higher-background"
                            />
                            : null
                        }
                        <div 
                            className={
                                `shareShortDisplay 
                                ${user.unionName ? "union" : "flame"} 
                                BOX_SHADOW 
                                ${colorTheme(user)}`
                            } 
                            ref={ref}
                        >
                            <Link to={`/post/${post._id}`} onClick={viewHandler}>
                                <div className="shareShortDisplay-container">
                                    <div className="shareShortDisplayTop">
                                        <div className="shareShortDisplayTopLeft">
                                            <ProfileLink user={user} type={"flare"} display={"short"} bubble/>
                                            <span className="shareShortDisplayDateTime">{format(post.createdAt)}</span>
                                            <span className="shareShortDisplayVisibilityIcon">
                                                <VisibilityIcon 
                                                    visible={post.access} 
                                                    primary={{fontSize: "18px"}}
                                                    secondary={{fontSize: "12px"}}
                                                />
                                            </span>
                                        </div>
                                        <div className="shareShortDisplayTopRight">
                                            <MoreVert />
                                        </div>
                                    </div>
                                    <div className="shareShortDisplayCenter">
                                        <div 
                                            className="shareShortDisplayDescriptionPreview"
                                            style={
                                                post.description.length > 0 || 
                                                post.photos.length > 0 
                                                    ? { height: "100%", maxHeight: "80px", marginTop: "20px"} 
                                                    : {height: "0px"}
                                                }
                                        >
                                            <span 
                                                id={`psdt-${post._id}`}
                                                ref={textRef}
                                                className="shareShortDisplayText" 
                                                style={
                                                    post.description 
                                                        ? post.photos 
                                                            ? {width: "calc(100% - 120px"} 
                                                            : {width: "100%"} 
                                                        : {width: "0px"}
                                                }
                                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.description)}}    
                                            />
                                        </div>
                                        <div className="shareShortDisplayContainer">
                                            <PostShortDisplay post={post}  sDisable={true}/>
                                        </div>
                                    </div>
                                    <div className="shareShortDisplayBottom" ref={postDisplayRef}>
                                        <div className="shareShortDisplayBottomLeft" ref={displayCntLeftRef}>
                                            <div 
                                                className="shareShortDisplayInfoBubblePopup left"
                                                style={
                                                    pvBubble && viewCnt === 0 ||
                                                    plkBubble && likeCnt === 0 ||
                                                    plvBubble && loveCnt === 0 
                                                        ? {opacity: "0", right: "2000px"} 
                                                        : {opacity: "100%", right: `${displayCntLeftWidth}px`, top: "0px"} 
                                                }
                                            >
                                                <div className="shareShortDisplayInfoBubble left views" style={pvBubble ? {opacity: "100%"} : {opacity: "0"}}>
                                                    <ViewsBubble 
                                                        flameViews={post.flameViews} 
                                                        unionViews={post.unionViews} 
                                                        sp={scrollPosition} 
                                                    />
                                                </div>
                                                <div className="shareShortDisplayInfoBubble left likes" style={plkBubble ? {opacity: "100%"} : {opacity: "0"}}>
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
                                                <div className="shareShortDisplayInfoBubble left loves" style={plvBubble ? {opacity: "100%"} : {opacity: "0"}}>
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
                                            <div className="shareShortDisplayCountItem views">
                                                <i 
                                                    className="shareShortDisplayPNGIcon PNG_ICON_SEEN left" 
                                                    alt="seen" 
                                                    onMouseOver={() => setPVBubble(true)}
                                                    onMouseLeave={() => setPVBubble(false)}  
                                                />
                                                <span className="shareShortDisplayCounter left">{viewCnt}</span>
                                            </div>
                                            <div className="shareShortDisplayCountItem left likes">
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
                                                    flagged={false}
                                                />
                                            </div>
                                            <div className="shareShortDisplayCountItem left loves">
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
                                                    flagged={false}
                                                />
                                            </div>             
                                        </div>
                                        <div className="shareShortDisplayBottomRight" ref={displayCntRightRef} >
                                            <div 
                                                className="shareShortDisplayInfoBubblePopup right"
                                                style={
                                                    pcBubble && commentCnt === 0 ||
                                                    psBubble && shareCnt === 0
                                                        ? {opacity: "0", left: "4000px"} 
                                                        : {opacity: "100%", left: `${displayCntRightWidth}px`, top: "0px"}  
                                                }
                                            >
                                                <div className="shareShortDisplayInfoBubble right comments" style={pcBubble ? {opacity: "100%"} : {opacity: "0"}}>
                                                    <CommentsBubble 
                                                        flameComments={post.flameComments} 
                                                        unionComments={post.unionComments} 
                                                        sp={scrollPosition}
                                                    />
                                                </div>
                                                <div className="shareShortDisplayInfoBubble right shares" style={psBubble ? {opacity: "100%"} : {opacity: "0"}}>
                                                    <SharesBubble 
                                                        flameShares={post.flameShares} 
                                                        unionShares={post.unionShares} 
                                                        sp={scrollPosition}
                                                    />
                                                </div>
                                            </div>
                                            <div className="shareShortDisplayCountItem comments">
                                                {user.unionName ?
                                                    (
                                                        <>
                                                            {colorTheme(user) === "diamond" ?
                                                                (
                                                                    <>
                                                                        <i 
                                                                            className="
                                                                                shareShortDisplayPNGIcon
                                                                                PNG_ICON_CHAT_BUBBLE 
                                                                                diamond 
                                                                                right
                                                                            "  
                                                                            alt="chat-bubble" 
                                                                            onMouseOver={() => setPCBubble(true)}
                                                                            onMouseLeave={() => setPCBubble(false)}
                                                                        />
                                                                        <span className="shareShortDisplayCounter right">{commentCnt}</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div 
                                                                            className="shareShortDisplaySVGIconDiv"
                                                                            onMouseOver={() => setPCBubble(true)}
                                                                            onMouseLeave={() => setPCBubble(false)}
                                                                        >
                                                                            <ChatBubbleIconSpectrum 
                                                                                spectrum={user.spectrum} 
                                                                                cn={"shareShortDisplaySVGIcon right"}
                                                                                flare={"post"}  
                                                                            />
                                                                            <span className="shareShortDisplayCounter right">{commentCnt}</span>
                                                                        </div>
                                                                    </>
                                                                )
                                                            } 
                                                        </>
                                                    ):(
                                                        <>
                                                            <ChatBubbleOutline 
                                                                className={`shareShortDisplaySVGIcon right ${user.energy}`}
                                                                onMouseOver={() => setPCBubble(true)}
                                                                onMouseLeave={() => setPCBubble(false)}
                                                            />
                                                            <span className="shareShortDisplayCounter right" >{commentCnt}</span>
                                                        </>
                                                    )
                                                }   
                                            </div>
                                            <div className="shareShortDisplayCountItem shares">
                                                <i 
                                                    className={`
                                                        shareShortDisplayPNGIcon
                                                        PNG_ICON_SHARE
                                                        ${colorTheme(user)} 
                                                        right
                                                    `}  
                                                    alt="share-icon" 
                                                    onMouseOver={() => setPSBubble(true)}
                                                    onMouseLeave={() => setPSBubble(false)}   
                                                />
                                                <span className="shareShortDisplayCounter right" >{shareCnt}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </Link> 
                        </div>
                        <div className="psdShareBlock" style={sDisable ? {height: `${height}px`} : {}}/>
                    </div>
                ) : (null)
            }
        </>
    )
};

export default ShareShortDisplay;