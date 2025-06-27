import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Iframe from 'react-iframe';
import { format } from "timeago.js";
import DOMPurify from 'dompurify';
import "./PostShortDisplay.css";
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
import { blockString } from '../../../../Utils/blockString';
import convertPx2Rem from '../../../../Utils/convertPx2Rem';
import { convert2Iframe } from '../../../../Utils/videoEmbedConfig';
import { chatboIcon, moreVertIcon } from '../../../../Lib/mui/icons';

function PostShortDisplay({ post, sDisable=false }) {

    const ref = useRef();
    const postDisplayRef = useRef();
    const textRef = useRef();
    const displayCntLeftRef = useRef();
    const displayCntRightRef = useRef();

    const dispatch = useDispatch();

    const PS = process.env.PHOTO_STORAGE;

    const { user: currentUser } = useSelector((state) => state.auth);

    const [ user, setUser ] = useState({});
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
    }, [post]);    

    useEffect(() => {
        var rect = postDisplayRef?.current?.getBoundingClientRect();
        setScrollPosition(rect?.top)
    }, []);
    
    useEffect(() => {
        const fetchUser = async () => {
            const res = post.unionId 
            ? await axiosReq("GET", `/unions?unionId=${post.unionId}`)
            : await axiosReq("GET", `/users?userId=${post.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [post.userId, post.unionId]);
    
    useEffect(() => {
        const fetchCommentCnt = async () => {
            try {
                const res = await axiosReq("GET", `/comments/post/${post._id}/count/${currentUser._id}/${blockString(currentUser)}`); 
                setCommentCnt(res?.data);
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
        setDisplayCntRightWidth(displayCntRightRef.current?.clientWidth + 10);
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
                    <div className="postShortDisplayContainer" style={{height: `${convertPx2Rem(Math.round(height))}`}}>
                        {user.unionName && user.spectrum === "rainbow" ||
                         user.unionName && user.spectrum === "silver" ||
                         user.unionName && user.spectrum === "gold" ||
                         user.unionName && user.spectrum === "platinum" ||
                         user.unionName && user.spectrum === "diamond" 
                            ? <i 
                                className={`
                                    postShortDisplayBackgroundTheme 
                                    HIGHER_BACKGROUND
                                    ${colorTheme(user)}
                                `} 
                                alt="higher-background"
                            />
                            : null
                        }
                        <div 
                            className={`
                                postShortDisplay 
                                ${user.unionName ? "union" : "flame"} 
                                BOX_SHADOW 
                                ${colorTheme(user)}
                            `} 
                            ref={ref}
                        >
                            <Link to={`/post/${post._id}`} onClick={viewHandler}>
                                <div className="postShortDisplay-container">
                                    <div className="postShortDisplayTop">
                                        <div className="postShortDisplayTopLeft">
                                            <ProfileLink user={user} type={"flare"} display={"short"} bubble/>
                                            <span className="postShortDisplayDateTime">{format(post.createdAt)}</span>
                                            <span className="postShortDisplayVisibilityIcon">
                                                <VisibilityIcon
                                                    visible={post.access} 
                                                    primary={{fontSize: "1.125rem" /*18px*/}}
                                                    secondary={{fontSize: "0.75rem" /*12px*/}}
                                                />
                                            </span>
                                        </div>
                                        <div className="postShortDisplayTopRight">
                                            {moreVertIcon}
                                        </div>
                                    </div>
                                    <div className="postShortDisplayCenter">
                                        {post.title.length > 0 && 
                                            <span className="postShortDisplayTitle">{post.title}</span>
                                        }
                                            <span 
                                                id={`psdt-${post._id}`}
                                                ref={textRef}
                                                className="postShortDisplayText" 
                                                //style={
                                                //    post.description 
                                                //        ? post.photos 
                                                //            ? {width: "calc(100% - 7.5rem" /*120px*/} 
                                                //            : {width: "100%"} 
                                                //        : {width: "0"}
                                                //}
                                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.description)}}
                                                
                                            />
                                            {post.photos.length > 0 &&
                                                <div className="postShortDisplayPhotoContainer">
                                                    <div 
                                                        className={`postShortDisplayImgBackground BCKGRND_LGT ${colorTheme(user)}`}
                                                        style={photoLoad ? {opacity: "0"} : {opacity: "1"}}
                                                    />
                                                    {/*!photoLoad && 
                                                        <WallpaperOutlined  
                                                            className="postShortDisplayImgBGIcon"
                                                            style={post.photos.length > 1 ? {opacity: "0.5"} : {opacity: "1"}}
                                                        />
                                            */}
                                                    <img 
                                                        className="postShortDisplayPhoto" 
                                                        src={post.photos[0] ? PS + post.photos[0] : noBanner}
                                                        style={photoLoad ? {opacity: "1"} : {opacity: "0"}}
                                                        onLoad={(e) => {
                                                            e.target.src === PS + post.photos[0]
                                                                ? setPhotoLoad(true)
                                                                : setPhotoLoad(false)
                                                        }} 
                                                        onError={(e) => {
                                                            e.currentTarget.src = noBanner
                                                            setPhotoLoad(false)
                                                        }}
                                                        //alt="photo-img"  
                                                    />
                                                    {/*post.photos.length > 1 && <div className={`postShortDisplayPhotoCntBG BCKGRND_LGT ${colorTheme(user)}`} />*/}
                                                    {/*post.photos.length > 1 && <div className="postShortDisplayPhotCnt">{`${post.photos.length} Images`}</div>*/}
                                                </div>
                                            }
                                        {post.videos.length > 0 &&
                                            <div className="postShortDisplayIframeContainer">
                                                <Iframe 
                                                    url={convert2Iframe(post.videos[0].value)}
                                                    className="postShortDisplayIframe"
                                                />
                                                <div className="postShortDisplayIframeCover"/>
                                                {post.videos.length > 1 &&
                                                    <div className="postShortDisplayMultiVideoCntContainer">
                                                        <div className="postShortDisplayMultiVideoCntWBG" >
                                                            <div className={`postShortDisplayMultiVideoCntBG BCKGRND_LGT ${colorTheme(user)}`}>
                                                                <div className="postShortDisplayMultiVideoCntText">{`${post.videos?.length}`}</div>
                                                                <div className="postShortDisplayMultiVideoCntText">{`videos`}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        }
                                        {post.hashtags.length > 0 &&
                                            <div className="postShortDisplayHashtagList">
                                                {post.hashtags.map((hashtag, index) => (
                                                    <Link to={`/hashtag/#${hashtag.value?.toLowerCase()}`}>
                                                        <span 
                                                            key={`post-${post._id}-${hashtag.value}-${index}`}
                                                            className={`postShortDisplayhashtags TEXT_COLOR ${colorTheme(user)}`}
                                                        >
                                                            {`#${hashtag.value}`}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                    <div className="postShortDisplayBottom" ref={postDisplayRef}>
                                        <div className="postShortDisplayBottomLeft" ref={displayCntLeftRef}>
                                            <div 
                                                className="postShortDisplayInfoBubblePopup left"
                                                style={
                                                    pvBubble && viewCnt === 0 ||
                                                    plkBubble && likeCnt === 0 ||
                                                    plvBubble && loveCnt === 0 
                                                        ? {opacity: "0", right: "125rem" /*2000px*/} 
                                                        : {opacity: "100%", right: `${convertPx2Rem(Math.round(displayCntLeftWidth))}`, top: "0"} 
                                                }
                                            >
                                                <div className="postShortDisplayInfoBubble left views" style={pvBubble ? {opacity: "100%"} : {opacity: "0"}}>
                                                    <ViewsBubble 
                                                        flameViews={post.flameViews} 
                                                        unionViews={post.unionViews} 
                                                        sp={scrollPosition} 
                                                    />
                                                </div>
                                                <div className="postShortDisplayInfoBubble left likes" style={plkBubble ? {opacity: "100%"} : {opacity: "0"}}>
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
                                                <div className="postShortDisplayInfoBubble left loves" style={plvBubble ? {opacity: "100%"} : {opacity: "0"}}>
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
                                            <div className="postShortDisplayCountItem views">
                                                <i 
                                                    className="postShortDisplayPNGIcon PNG_ICON_SEEN left" 
                                                    alt="seen" 
                                                    onMouseOver={() => setPVBubble(true)}
                                                    onMouseLeave={() => setPVBubble(false)}  
                                                />
                                                <span className="postShortDisplayCounter left">{viewCnt}</span>
                                            </div>
                                            <div className="postShortDisplayCountItem left likes">
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
                                            <div className="postShortDisplayCountItem left loves">
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
                                        <div className="postShortDisplayBottomRight" ref={displayCntRightRef} >
                                            <div 
                                                className="postShortDisplayInfoBubblePopup right"
                                                style={
                                                    pcBubble && commentCnt === 0 ||
                                                    psBubble && shareCnt === 0
                                                        ? {opacity: "0", left: "250rem" /*4000px*/} 
                                                        : {opacity: "100%", left: `${convertPx2Rem(Math.round(displayCntRightWidth))}`, top: "0"}  
                                                }
                                            >
                                                <div className="postShortDisplayInfoBubble right comments" style={pcBubble ? {opacity: "100%"} : {opacity: "0"}}>
                                                    <CommentsBubble 
                                                        flameComments={post.flameComments} 
                                                        unionComments={post.unionComments} 
                                                        sp={scrollPosition}
                                                    />
                                                </div>
                                                <div className="postShortDisplayInfoBubble right shares" style={psBubble ? {opacity: "100%"} : {opacity: "0"}}>
                                                    <SharesBubble 
                                                        flameShares={post.flameShares} 
                                                        unionShares={post.unionShares} 
                                                        sp={scrollPosition}
                                                    />
                                                </div>
                                            </div>
                                            <div className="postShortDisplayCountItem comments">
                                                {user.unionName ?
                                                    (
                                                        <>
                                                            {colorTheme(user) === "diamond" ?
                                                                (
                                                                    <>
                                                                        <i 
                                                                            className="
                                                                                postShortDisplayPNGIcon
                                                                                PNG_ICON_CHAT_BUBBLE 
                                                                                diamond 
                                                                                right
                                                                            "  
                                                                            alt="chat-bubble" 
                                                                            onMouseOver={() => setPCBubble(true)}
                                                                            onMouseLeave={() => setPCBubble(false)}
                                                                        />
                                                                        <span className="postShortDisplayCounter right">{commentCnt}</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div 
                                                                            className="postShortDisplaySVGIconDiv"
                                                                            onMouseOver={() => setPCBubble(true)}
                                                                            onMouseLeave={() => setPCBubble(false)}
                                                                        >
                                                                            <ChatBubbleIconSpectrum 
                                                                                spectrum={user.spectrum} 
                                                                                cn={"postShortDisplaySVGIcon right SVG_ICON"}
                                                                                flare={"post"}  
                                                                            />
                                                                            <span className="postShortDisplayCounter right">{commentCnt}</span>
                                                                        </div>
                                                                    </>
                                                                )
                                                            } 
                                                        </>
                                                    ):(
                                                        <>
                                                            <div 
                                                                className={`postShortDisplaySVGIcon right SVG_ICON ${user.energy}`}
                                                                onMouseOver={() => setPCBubble(true)}
                                                                onMouseLeave={() => setPCBubble(false)}
                                                            >
                                                                {chatboIcon}
                                                            </div>
                                                            <span className="postShortDisplayCounter right" >{commentCnt}</span>
                                                        </>
                                                    )
                                                }   
                                            </div>
                                            <div className="postShortDisplayCountItem shares">
                                                <i 
                                                    className={`
                                                        postShortDisplayPNGIcon
                                                        PNG_ICON_SHARE
                                                        ${colorTheme(user)} 
                                                        right
                                                    `}  
                                                    alt="share-icon" 
                                                    onMouseOver={() => setPSBubble(true)}
                                                    onMouseLeave={() => setPSBubble(false)}   
                                                />
                                                <span className="postShortDisplayCounter right" >{shareCnt}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </Link> 
                        </div>
                        <div className="psdShareBlock" style={sDisable ? {height: `${convertPx2Rem(Math.round(height))}`} : {}}/>
                    </div>
                ) : (null)
            }
        </>
    )
};

export default PostShortDisplay;