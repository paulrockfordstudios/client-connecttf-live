import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../Utils/axiosConfig';
import { format } from "timeago.js";
import DOMPurify from 'dompurify';
import { cReplyOpen } from '../../../Redux/AuthSlice';
import "./CommentDisplay.css";
import ReplyIconSpectrum from '../../../Utils/misc/ReplyIconSpectrum';
import ReplyFeed from '../../Replies/ReplyFeed/ReplyFeed';
import FlareOptionsDropdown from '../../Dropdowns/FlareOptionsDropdown/FlareOptionsDropdown';
import LikesBubble from '../../InfoBubbles/LikesBubble/LikesBubble';
import LovesBubble from '../../InfoBubbles/LovesBubble/LovesBubble';
import RepliesBubble from '../../InfoBubbles/RepliesBubble/RepliesBubble';
import { colorTheme } from '../../../Utils/styling/colorTheme';
import ProfileLink from '../../ProfileLink/ProfileLink';
import FlareLikeButton from '../../Buttons/EmoticonBtns/FlareDoteBtns/FlareLikeButton/FlareLikeButton';
import FlareLoveButton from '../../Buttons/EmoticonBtns/FlareDoteBtns/FlareLoveButton/FlareLoveButton';
import { flagIcon, moreVertIcon, replyIcon } from '../../../Lib/mui/icons';


function CommentDisplay({comment}) {

    const cDisplayRef = useRef();
    const discRef = useRef();
    const displayCntLeftRef = useRef();

    const dispatch = useDispatch();

    const { user: currentUser, newComment, newReply, flagData, editedCom } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [user, setUser] = useState({});
    const [ cODD, setCODD ] = useState(false);
    const [ clkBubble, setCLkBubble ] = useState(false);
    const [ clvBubble, setCLvBubble ] = useState(false);
    const [ crBubble, setCRBubble ] = useState(false);
    const [ flagged, setFlagged ] = useState(false);
    const [isFlameLiked, setIsFlameLiked] = useState(comment.flameLikes.includes(currentUser._id));
    const [isUnionLiked, setIsUnionLiked] = useState(comment.unionLikes.includes(currentUser._id));
    const [isFlameLoved, setIsFlameLoved] = useState(comment.flameLoves.includes(currentUser._id));
    const [isUnionLoved, setIsUnionLoved] = useState(comment.unionLoves.includes(currentUser._id));
    const [ isFlameFlagged, setIsFlameFlagged ] = useState(comment.flameFlags?.includes(currentUser._id));
    const [ isUnionFlagged, setIsUnionFlagged ] = useState(comment.unionFlags?.includes(currentUser._id));
    const [ scrollPosition, setScrollPosition ] = useState(0);
    const [ showReplies, setShowReplies ] = useState(false);
    const [ discHeight, setDiscHeight ] = useState();
    const [ hidden, setHidden ] = useState(false);
    const [ newBC, setNewBC ] = useState(comment.new);
    const [ likeCnt, setLikeCnt ] = useState(0);
    const [ loveCnt, setLoveCnt ] = useState(0);
    const [ replyCnt, setReplyCnt ] = useState(0);
    const [ displayCntLeftWidth, setDisplayCntLeftWidth ] = useState(0);
    const [ isReported, setIsReported ] = useState(comment.reports?.length > 0);
    const [ flagThreshold, setFlagThreshold ] = useState(false);
    const [ body, setBody ] = useState(comment.body);
    const [ hashtags, setHashtags ] = useState(comment.hashtags);
    const [ photos, setPhotos ] = useState(comment.photos);

    const newReport = { 
        auto: true,
        plaintiffType: "system",
        plaintiffId: null,
        defendentType: comment.union ? "union" : "flame",
        defendentId: comment.union ? comment.unionId : comment.userId,
        reportType: comment ? "flare" : "user",
        flareType: "comment",
        flareId: comment._id,
        description: "<p>To many flags. Flare has reached its flag threshold.</p>",  
    };

    const newSuspension = { 
        accountType: comment.union ? "union" : "flare",
        accountId: user._id,
        mascId: comment.union ? user.masculineId : null,
        femId: comment.union ? user.feminineId : null,
        description: "<p>Auto report, too many flags on flare.</p>",  
    };

    const flareData = {
        user: user, 
        flare: comment, 
        type: "comment",
        flagged: flagged,
    };


    useEffect(() => {
        setLikeCnt(comment.flameLikes.length + comment.unionLikes.length);
        setLoveCnt(comment.flameLoves.length + comment.unionLoves.length);
        setReplyCnt(comment.flameReplies.length + comment.unionReplies.length);
        setFlagThreshold(comment.flameFlags?.length + comment.unionFlags?.length>= 3);
        setIsFlameFlagged(comment.flameFlags?.includes(currentUser._id));
        setIsUnionFlagged(comment.unionFlags?.includes(currentUser._id));
    }, [comment]);

    useEffect(() => {
        if(editedCom?._id === comment._id) {
            setBody(editedCom.body);
            setHashtags(editedCom.hashtags);
            setPhotos(editedCom.photos);
        }
    }, [editedCom]);

    useEffect(() => {
        if (user && flagThreshold && comment.reports?.length === 0) {
            const autoReport = async () => {
                try {
                    const reportRes = await axiosReq("POST", "/reports", newReport);
                    await axiosReq("PUT", `/comments/${comment._id}/report`, {reportId: reportRes.data._id});
                    const reportArr = [];
                    reportArr.push(res.data._id)
                    Object.assign(newSuspension, {reports: reportArr});
                    const suspensionRes = await axiosReq("POST", "/suspensions", newSuspension);
                    await axiosReq("PUT", `/${comment.union ? "unions" : "users"}/${user._id}/suspend`, {suspensionId: suspensionRes.data._id});
                    setIsReported(true);
                } catch (err) {
                    console.log(err);
                }
            }
            autoReport();
        }
    }, [user, flagThreshold]);

    useEffect(() => {
        setDisplayCntLeftWidth(displayCntLeftRef.current?.clientWidth + 30);
    }, [likeCnt, loveCnt, replyCnt]);

    useEffect(() => {
        let cODDHandler = (event) => {
            var path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                setCODD(false);
            }
        };
        if (cODD) {
            document.body.addEventListener("click", cODDHandler);
            return () => {
                document.body.removeEventListener("click", cODDHandler);
            };
        }
    }, [cODD]);

    useEffect(() => {
        if (!newReply) return;
        if (newReply.flareId !== comment._id) return;
        setReplyCnt(replyCnt + 1);
        setShowReplies(true);
    }, [newReply]);

    useEffect(() => {
        if (isFlameFlagged || isUnionFlagged) {
            setFlagged(true);
        }
    }, [isFlameFlagged, isUnionFlagged]);

    useEffect(() => {
        if (flagData?.flareId !== comment._id) return;
        setFlagged(flagData?.isFlagged);
    }, [flagData])

    useEffect(() => {
        var rect = cDisplayRef?.current?.getBoundingClientRect();
        setScrollPosition(rect?.top);
    }, [cDisplayRef]);

    useEffect(() => {
        setNewBC(comment.new);
    }, [newComment])

    useEffect(() => {
        const fetchUser = async () => {
            const res = comment.union 
            ? await axiosReq("GET", `/unions?unionId=${comment.unionId}`)
            : await axiosReq("GET", `/users?userId=${comment.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [comment.userId]);

    useEffect(() => {
        const getDiscHeight = () => {
            if (discRef?.current?.clientHeight > 60) {
                setHidden(true);
            }
            setDiscHeight(discRef?.current?.clientHeight)
        }
        getDiscHeight();
    }, []);

    useEffect(() => {
        if (clkBubble || clvBubble || crBubble) {
            var rect = cDisplayRef.current.getBoundingClientRect();
            setScrollPosition(rect.top)
        }
    }, [clkBubble, clvBubble, crBubble]);
    
    return (
        <div 
            className={`
                commentDisplay
                ${comment.new ? "new" : "old"} 
                ${user?.spectrum}
            `}
        >
                <div className="commentDisplay-container">
                    <div className="commentDisplayTop">
                        <div className="commentDisplayTopLeft">
                            <ProfileLink user={user} type={"flareRetort"} bubble/>
                            <span className="commentDisplayDateTime">{format(comment.createdAt)}</span>
                            {flagged && 
                                <span className="commentDisplayVisibilityIcon">
                                    <div style={{color: "red"}}>{flagIcon}</div>
                                </span>
                            }
                        </div>
                        <div className="commentDisplayTopRight">
                            <div className="commentDisplayOptions" onClick={() => setCODD(!cODD)}>{moreVertIcon}</div>
                            <div className="commentDisplayAODropdown" style={cODD ? {opacity: "100%"} : {opacity: "0%", right: "2000px"}}>
                                <FlareOptionsDropdown data={flareData}/>
                            </div>
                        </div>
                    </div>
                    <div className="commentDisplayCenter">
                        <span 
                            id={`cdt-${comment._id}`}
                            ref={discRef}
                            className="commentDisplayText" 
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(body)}}
                        />
                        {hashtags.length > 0 &&
                            <div className="commentDisplayHashtagList">
                                {hashtags.map((hashtag, index) => (
                                    <Link to={`/hashtag/${hashtag.substring(1)}`}>
                                        <span 
                                            key={`c-${comment._id}-ch-${index}`}
                                            className={`commentDisplayhashtags TEXT_COLOR ${colorTheme(user)}`}
                                        >
                                            {hashtag}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        }
                        {photos.length > 0 &&
                            <div className="photoDisplay-container">
                                <ul className="photoList">      
                                    {photos.map((photo, index) => (
                                        <li className="photos" key={index}>
                                            <img className="postImg" src={PF + photo} alt="" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div>
                    <div className="commentDisplayBottom">
                        <div className="commentDisplayBottomLeft" ref={cDisplayRef}>
                            <div className="commentDisplayBottomLeft" ref={displayCntLeftRef}>
                                <div 
                                    className="commentDisplayInfoBubblePopup left"
                                    style={
                                        clkBubble && likeCnt === 0 ||
                                        clvBubble && loveCnt === 0 ||
                                        crBubble && replyCnt === 0 
                                            ? {opacity: "0", right: "2000px"} 
                                            : {opacity: "100%", right: `${displayCntLeftWidth}px`, top: "0px"} 
                                    }
                                >
                                    <div className="commentDisplayInfoBubble left views" style={clkBubble && likeCnt > 0 ? {opacity: "100%"} : {opacity: "0"}}>
                                        <LikesBubble
                                            flameLikes={comment.flameLikes} 
                                            unionLikes={comment.unionLikes} 
                                            isFlameLiked={isFlameLiked} 
                                            isUnionLiked={isUnionLiked}
                                            show={true}
                                            list={"comment"}
                                            sp={scrollPosition}
                                        />
                                    </div>
                                    <div className="commentDisplayInfoBubble left views" style={clvBubble && loveCnt > 0 ? {opacity: "100%"} : {opacity: "0"}}>
                                        <LovesBubble
                                            flameLoves={comment.flameLoves} 
                                            unionLoves={comment.unionLoves} 
                                            isFlameLoved={isFlameLoved} 
                                            isUnionLoved={isUnionLoved}
                                            list={"comment"}
                                            sp={scrollPosition}   
                                        />
                                    </div>
                                    <div className="commentDisplayInfoBubble left views" style={crBubble && replyCnt > 0 ? {opacity: "100%"} : {opacity: "0"}}>
                                        <RepliesBubble
                                            flameReplies={comment.flameReplies} 
                                            unionReplies={comment.unionReplies} 
                                            list={"comment"}
                                            sp={scrollPosition}   
                                        />
                                    </div>
                                </div>
                                <div className="commentDisplayCountItem left likes">
                                    <FlareLikeButton 
                                        user={user} 
                                        flare={comment} 
                                        type={"comment"} 
                                        popup={setCLkBubble} 
                                        setIsFLiked={setIsFlameLiked}
                                        setIsULiked={setIsUnionLiked}
                                        isFLoved={isFlameLoved}
                                        isULoved={isUnionLoved}
                                        likesCount={likeCnt}
                                        setLikesCount={setLikeCnt}
                                    />
                                </div>
                                <div className="commentDisplayCountItem left loves">
                                    <FlareLoveButton 
                                        user={user} 
                                        flare={comment} 
                                        type={"comment"} 
                                        popup={setCLvBubble}
                                        setIsFLoved={setIsFlameLoved}
                                        setIsULoved={setIsUnionLoved}
                                        isFLiked={isFlameLiked}
                                        isULiked={isUnionLiked}
                                        lovesCount={loveCnt}
                                        setLovesCount={setLoveCnt}
                                    /> 
                                </div>
                                <div className="commentDisplayCountItem">
                                    {user.unionName ?
                                        (
                                            <>
                                                {user.spectrum === "diamond" ?
                                                    (
                                                        <>
                                                            <i
                                                                className={`
                                                                    commentDisplayPNGIcon 
                                                                    PNG_ICON_REPLY
                                                                    ${colorTheme(user)} 
                                                                    left
                                                                `}  
                                                                alt="replies"  
                                                                onMouseOver={() => setCRBubble(true)}
                                                                onMouseLeave={() => setCRBubble(false)}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div 
                                                                className="commentDisplaySVGIconDiv"
                                                                onMouseOver={() => setCRBubble(true)}
                                                                onMouseLeave={() => setCRBubble(false)}
                                                            >
                                                                <ReplyIconSpectrum spectrum={user.spectrum} cn={"commentDisplaySVGIcon SVG_ICON left"}/>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </>
                                        ) : (
                                            <>
                                                <div 
                                                    className={`commentDisplaySVGIcon SVG_ICON left ${user.energy}`}
                                                    onMouseOver={() => setCRBubble(true)}
                                                    onMouseLeave={() => setCRBubble(false)}
                                                >
                                                    {replyIcon}
                                                </div>
                                            </>
                                        )
                                    }
                                    <span className="commentDisplayCounter left">{replyCnt}</span>  
                                </div>
                            </div>
                        </div>
                        <div className="commentDisplayBottomMiddle">
                            {replyCnt > 0 &&
                                <div className="commentDisplayShowReplies" onClick={() => setShowReplies(!showReplies)}>
                                    {showReplies ? "Hide Replies" : "Show Replies"}
                                </div> 
                            }
                        </div>
                        <div className="commentDisplayBottomRight">
                            {user.unionName ?
                                (
                                    <>
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <i
                                                        className={`
                                                            commentDisplayPNGIcon 
                                                            PNG_ICON_REPLY
                                                            ${colorTheme(user)} 
                                                            right
                                                        `}  
                                                        alt="replies" 
                                                        onClick={() => dispatch(cReplyOpen(flareData))} 
                                                    />
                                                </>
                                            ) : (

                                                <div onClick={() => dispatch(cReplyOpen(flareData))}>
                                                    <ReplyIconSpectrum 
                                                        spectrum={user.spectrum} 
                                                        cn={"commentDisplaySVGIcon SVG_ICON right"}     
                                                    />
                                                </div>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        <div 
                                            className={`commentDisplaySVGIcon SVG_ICON right ${user.energy}`} 
                                            onClick={() => dispatch(cReplyOpen(flareData))} 
                                        >
                                            {replyIcon}
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="commentDisplayResponseFeed">
                    {showReplies && <ReplyFeed prompt={"comment"} promptId={comment._id} rCntNum={1}/>}
                </div>
        </div>
    )
};

export default CommentDisplay;