import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { axiosReq } from '../../../Utils/axiosConfig';
import { format } from "timeago.js";
import DOMPurify from 'dompurify';
import { cReplyOpen } from '../../../Redux/AuthSlice';
import { colorTheme } from '../../../Utils/styling/colorTheme';
import "./ReplyDisplay.css";
import ReplyIconSpectrum from '../../../Utils/misc/ReplyIconSpectrum';
import LikesBubble from '../../InfoBubbles/LikesBubble/LikesBubble';
import LovesBubble from '../../InfoBubbles/LovesBubble/LovesBubble';
import RepliesBubble from '../../InfoBubbles/RepliesBubble/RepliesBubble';
import FlareOptionsDropdown from '../../Dropdowns/FlareOptionsDropdown/FlareOptionsDropdown';
import ReplyFeed from '../ReplyFeed/ReplyFeed';
import ProfileLink from '../../ProfileLink/ProfileLink';
import FlareLikeButton from '../../Buttons/EmoticonBtns/FlareDoteBtns/FlareLikeButton/FlareLikeButton';
import FlareLoveButton from '../../Buttons/EmoticonBtns/FlareDoteBtns/FlareLoveButton/FlareLoveButton';
import { flagIcon, moreVertIcon, replyIcon } from '../../../Lib/mui/icons';


function ReplyDisplay({reply}) {

    const rDisplayRef = useRef();
    const showRepliesRef = useRef();
    const discRef= useRef();
    const displayCntLeftRef = useRef();

    const dispatch = useDispatch();
    
    const { user: currentUser, newReply, flagData, editedReply } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [ rODD, setRODD ] =useState(false);
    const [ rlkBubble, setRLkBubble ] = useState(false);
    const [ rlvBubble, setRLvBubble ] = useState(false);
    const [ rrBubble, setRRBubble ] = useState(false);
    const [ flameReplies, setFlameReplies ] = useState(reply.flameReplies.length);
    const [ unionReplies, setUnionReplies ] = useState(reply.unionReplies.length);
    const [ isFlameFlagged, setIsFlameFlagged ] = useState(reply.flameFlags?.includes(currentUser._id));
    const [ isUnionFlagged, setIsUnionFlagged ] = useState(reply.unionFlags?.includes(currentUser._id));
    const [ flameLikes, setFlameLikes ] = useState(reply.flameLikes.length);
    const [ isFlameLiked, setIsFlameLiked ] = useState(false)
    const [ unionLikes, setUnionLikes ] = useState(reply.unionLikes.length);
    const [ isUnionLiked, setIsUnionLiked ] = useState(false);
    const [ flameLoves, setFlameLoves ] = useState(reply.flameLoves.length);
    const [ isFlameLoved, setIsFlameLoved ] = useState(false)
    const [ unionLoves, setUnionLoves ] = useState(reply.unionLoves.length);
    const [ isUnionLoved, setIsUnionLoved ] = useState(false);
    const [user, setUser] = useState({});
    const [ scrollPosition, setScrollPosition ] = useState(0);
    const [ replyCreate, setReplyCreate ] = useState(false);
    const [ rCntNum, setRCntNum ] = useState(reply.replyCnt);
    const [ rCntString, setRCntString ] = useState("");
    const [ cntRender, setCntRender ] = useState(false);
    const [ showReplies, setShowReplies ] = useState(false);
    const [ discHeight, setDiscHeight ] = useState();
    const [ hidden, setHidden ] = useState(false);
    const [ likeCnt, setLikeCnt ] = useState(0);
    const [ loveCnt, setLoveCnt ] = useState(0);
    const [ replyCnt, setReplyCnt ] = useState(0);
    const [ ibDistance, setIBDistance ] = useState(0);
    const [ displayCntLeftWidth, setDisplayCntLeftWidth ] = useState(0);
    const [ flagged, setFlagged ] = useState(false);
    const [ isReported, setIsReported ] = useState(reply.reports?.length > 0);
    const [ flagThreshold, setFlagThreshold ] = useState(false);
    const [ body, setBody ] = useState(reply.body);
    const [ hashtags, setHashtags ] = useState(reply.hashtags);
    const [ photos, setPhotos ] = useState(reply.photos);

    const flareData = {
        user: user, 
        flare: reply, 
        type: "reply",
        flagged: flagged,
    };

    useEffect(() => {
        setLikeCnt(reply.flameLikes.length + reply.unionLikes.length);
        setLoveCnt(reply.flameLoves.length + reply.unionLoves.length);
        setReplyCnt(reply.flameReplies.length + reply.unionReplies.length);
    }, [reply]);

    useEffect(() => {
        if(editedReply?._id === reply._id) {
            setBody(editedReply.body);
            setHashtags(editedReply.hashtags);
            setPhotos(editedReply.photos);
        }
    }, [editedReply]);

    useEffect(() => {
        setDisplayCntLeftWidth(displayCntLeftRef.current?.clientWidth + ibDistance);
    }, [likeCnt, loveCnt, replyCnt]);

    useEffect(() => {
        setReplyCnt(flameReplies + unionReplies);
    }, [flameReplies, unionReplies]);

    useEffect(() => {
        if (!newReply) return;
        if (newReply.flareId !== reply._id) return;
        setReplyCnt(replyCnt + 1);
        setShowReplies(true);
    }, [newReply]);

    useEffect(() => {
        if (isFlameFlagged || isUnionFlagged) {
            setFlagged(true);
        }
    }, [isFlameFlagged, isUnionFlagged]);

    useEffect(() => {
        if (flagData?.flareId !== reply._id) return;
        setFlagged(flagData?.isFlagged);
    }, [flagData])

    useEffect(() => {
        let rODDHandler = (event) => {
            var path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                setRODD(false);
            }
        };
        if (rODD) {
            document.body.addEventListener("click", rODDHandler);
            return () => {
                document.body.removeEventListener("click", rODDHandler);
            };
        }
    }, [rODD]);


    useEffect(() => {
        var rect = rDisplayRef.current.getBoundingClientRect();
        setScrollPosition(rect.top)
    }, []);

    useEffect(() => {
        const getDiscHeight = () => {
            if (discRef.current.clientHeight > 60) {
                setHidden(true);
            }
            setDiscHeight(discRef.current.clientHeight)
        }
        getDiscHeight();
    }, []);

    useEffect(() => {
        const rCountHandler = () => {
            if(reply.replyCnt) {
                switch(reply.replyCnt) {
                    case 2:
                        setRCntString("two");
                        setCntRender(true);
                        setIBDistance(120)
                        break;
                    case 3:
                        setRCntString("three");
                        setCntRender(true);
                        setIBDistance(170)
                        break;
                    case 4:
                        setRCntString("four");
                        setCntRender(true);
                        setIBDistance(220)
                        break;
                    default:
                        setRCntString("one");
                        setCntRender(true);
                        setIBDistance(70)
                } 
            }
        }
        rCountHandler();
    }, [reply.replyCnt]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = reply.union 
            ? await axiosReq("GET", `/unions?unionId=${reply.unionId}`)
            : await axiosReq("GET", `/users?userId=${reply.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [reply]);


    useEffect(() => {
        if (rlkBubble || rlvBubble || rrBubble) {
            var rect = rDisplayRef.current.getBoundingClientRect();
            setScrollPosition(rect.top)
        }
      }, [rlkBubble, rlvBubble, rrBubble]);

    
    return (
        <div className="replyDisplay">
                <div className={`replyDisplay-container ${rCntString}`}>
                    <div className="replyDisplayTop">
                        <div className="replyDisplayTopLeft">
                            <ProfileLink user={user} type={"flareRetort"} bubble/>
                            <span className="replyDisplayDateTime">{format(reply.createdAt)}</span>
                            {flagged && 
                                <span className="replyDisplayVisibilityIcon">
                                    <div style={{color: "red"}}>{flagIcon}</div>
                                </span>
                            }
                        </div>
                        <div className="replyDisplayTopRight">
                            <div className="replyDisplayOptions" onClick={() => setRODD(!rODD)}>{moreVertIcon}</div>
                            <div className="replyDisplayRODropdown" style={rODD ? {opacity: "100%"} : {opacity: "0%", right: "2000px"}}>
                                <FlareOptionsDropdown data={flareData}/>
                            </div>
                        </div>
                    </div>
                    <div className="replyDisplayCenter">
                        <span 
                            className="replyDisplayText" 
                            ref={discRef}
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(body)}}
                        />
                        {hashtags.length > 0 &&
                            <div className="replyDisplayHashtagList">
                                {hashtags.map((hashtag, index) => (
                                    <Link to={`/hashtag/${hashtag.substring(1)}`}>
                                        <span 
                                            key={`p-${reply._id}-ch-${index}`}
                                            className={`replyDisplayhashtags TEXT_COLOR ${colorTheme(user)}`}
                                        >
                                            {hashtag}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        }
                        <div className="photoDisplay-container">
                            <ul className="photoList">      
                                {photos.map((photo, index) => (
                                    <li className="photos" key={index}>
                                        {console.log(PS + photo)}
                                        <img className="postImg" src={PS + photo} alt="" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="replyDisplayBottom" 
                        ref={rDisplayRef} 
                        style={reply.replyCnt < 4 
                            ? {marginTop: "0"} 
                            : {marginTop: "5px"}
                        }
                    >
                        <div className="replyDisplayBottomLeft" ref={displayCntLeftRef}>
                            <div 
                                className="replyDisplayInfoBubblePopup left"
                                style={
                                    rlkBubble && likeCnt === 0 ||
                                    rlvBubble && loveCnt === 0 ||
                                    rrBubble && replyCnt === 0 
                                        ? {opacity: "0", right: "2000px"} 
                                        : {opacity: "100%", right: `${displayCntLeftWidth}px`, top: "0px"} 
                                }
                            >
                                <div className="replyDisplayInfoBubble left likes" style={rlkBubble && likeCnt > 0 ? {opacity: "100%"} : {opacity: "0"}}>
                                    <LikesBubble
                                        flameLikes={reply.flameLikes} 
                                        unionLikes={reply.unionLikes} 
                                        isFlameLiked={isFlameLiked} 
                                        isUnionLiked={isUnionLiked}
                                        show={true}
                                        list={"reply"}
                                        sp={scrollPosition}
                                    />
                                </div>
                                <div className="replyDisplayInfoBubble left loves" style={rlvBubble && loveCnt > 0 ? {opacity: "100%"} : {opacity: "0"}}>
                                    <LovesBubble
                                        flameLoves={reply.flameLoves} 
                                        unionLoves={reply.unionLoves} 
                                        isFlameLoved={isFlameLoved} 
                                        isUnionLoved={isUnionLoved}
                                        show={true}
                                        list={"reply"}
                                        sp={scrollPosition}   
                                    />
                                </div>
                                <div className="replyDisplayInfoBubble left replies" style={rrBubble && replyCnt > 0 ? {opacity: "100%"} : {opacity: "0"}}>
                                    <RepliesBubble
                                        flameReplies={reply.flameReplies} 
                                        unionReplies={reply.unionReplies} 
                                        show={showReplies}
                                        list={"reply"}
                                        sp={scrollPosition}
                                        na={reply.replyCnt === 4 ? true : false}   
                                    />
                                </div>
                            </div>
                            <div className="replyDisplayCountItem left likes">
                                <FlareLikeButton 
                                    user={user} 
                                    flare={reply} 
                                    type={"reply"} 
                                    popup={setRLkBubble} 
                                    setIsFLiked={setIsFlameLiked}
                                    setIsULiked={setIsUnionLiked}
                                    isFLoved={isFlameLoved}
                                    isULoved={isUnionLoved}
                                    likesCount={likeCnt}
                                    setLikesCount={setLikeCnt}
                                />
                            </div>
                            <div className="replyDisplayCountItem left loves">
                                <FlareLoveButton 
                                    user={user} 
                                    flare={reply} 
                                    type={"reply"} 
                                    popup={setRLvBubble}
                                    setIsFLoved={setIsFlameLoved}
                                    setIsULoved={setIsUnionLoved}
                                    isFLiked={isFlameLiked}
                                    isULiked={isUnionLiked}
                                    lovesCount={loveCnt}
                                    setLovesCount={setLoveCnt}
                                /> 
                            </div>
                            <div className="replyDisplayCountItem left replies">
                                {reply.replyCnt < 4 ?
                                    (
                                        <>
                                            {user.unionName ?
                                                (
                                                    <>
                                                        {user.spectrum === "diamond" ?
                                                            (
                                                                <>
                                                                    <img 
                                                                        className="replyDisplayPNGIcon left" 
                                                                        src="/icons/middlebar/reply.png" 
                                                                        alt="" 
                                                                        onMouseOver={() => setRRBubble(true)}
                                                                        onMouseLeave={() => setRRBubble(false)}
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div 
                                                                        className="replyDisplaySVGIconDiv"
                                                                        onMouseOver={() => setRRBubble(true)}
                                                                        onMouseLeave={() => setRRBubble(false)}
                                                                    >
                                                                        <ReplyIconSpectrum 
                                                                            spectrum={user.spectrum} 
                                                                            cn={"replyDisplaySVGIcon SVG_ICON left"}
                                                                        />
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                    </>
                                                ) : (
                                                    <>
                                                        <div 
                                                            className={`replyDisplaySVGIcon SVG_ICON left ${user.energy}`}
                                                            onMouseOver={() => setRRBubble(true)}
                                                            onMouseLeave={() => setRRBubble(false)}
                                                        >
                                                            {replyIcon}
                                                        </div>
                                                    </>
                                                )
                                            }
                                            <span className="replyDisplayCounter left">{replyCnt}</span>
                                        </>
                                    ) : ( <></> )
                                }
                            </div>
                        </div>
                        <div className="replyDisplayBottomMiddle">
                            {replyCnt > 0 && 
                                <span 
                                    className="replyDisplayShowReplies" 
                                    ref={showRepliesRef} 
                                    onClick={() => setShowReplies(!showReplies)}
                                >
                                    {showReplies ? "Hide Replies" : "Show Replies"}
                                </span>
                            }
                        </div>
                        <div className="replyDisplayBottomRight">
                            {reply.replyCnt < 4 ?
                                (
                                    <>
                                        {user.unionName ?
                                            (
                                                <>
                                                    {user.spectrum === "diamond" ?
                                                        (
                                                            <>
                                                                <i
                                                                    className={`
                                                                        replyDisplayPNGIcon 
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
                                                                    cn={"replyDisplaySVGIcon SVG_ICON right"}     
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                <>
                                                    <div 
                                                        className={`replyDisplaySVGIcon SVG_ICON right ${user.energy}`} 
                                                        onClick={() => dispatch(cReplyOpen(flareData))} 
                                                    >
                                                        {replyIcon}
                                                    </div>
                                                </>
                                            )
                                        }
                                    </>
                                ) : ( <></> )
                            }
                        </div>
                    </div>
                </div>
                <div className="replyDisplayResponseFeed">
                    {showReplies && 
                        <ReplyFeed 
                            prompt={"reply"} 
                            promptId={reply._id} 
                            rCntNum={rCntNum + 1}
                        />
                    }
                </div>
        </div>
    )
};

export default ReplyDisplay;