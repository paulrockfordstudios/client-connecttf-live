import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { axiosReq } from '../../../Utils/axiosConfig';
import DOMPurify from 'dompurify';
import { format } from "timeago.js";
import { cAOpen } from '../../../Redux/AuthSlice';
import "./AnswerDisplay.css";
import { colorTheme } from '../../../Utils/styling/colorTheme';
import ReplyIconSpectrum from '../../../Utils/misc/ReplyIconSpectrum';
import LikesBubble from '../../InfoBubbles/LikesBubble/LikesBubble';
import LovesBubble from '../../InfoBubbles/LovesBubble/LovesBubble';
import RepliesBubble from '../../InfoBubbles/RepliesBubble/RepliesBubble';
import ReplyFeed from '../../Replies/ReplyFeed/ReplyFeed';
import FlareOptionsDropdown from '../../Dropdowns/FlareOptionsDropdown/FlareOptionsDropdown';
import FlareLikeButton from '../../Buttons/EmoticonBtns/FlareDoteBtns/FlareLikeButton/FlareLikeButton';
import FlareLoveButton from '../../Buttons/EmoticonBtns/FlareDoteBtns/FlareLoveButton/FlareLoveButton';
import ProfileLink from '../../ProfileLink/ProfileLink';
import { flagIcon, moreVertIcon, replyIcon } from '../../../Lib/mui/icons';


function AnswerDisplay({answer}) {

    const aDisplayRef = useRef();
    const discRef = useRef();
    const displayCntLeftRef = useRef();

    const { user: currentUser, newAnswer, newReply, flagData, editedAns } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const PS = process.env.PHOTO_STORAGE;

    const color1 = colorTheme(currentUser);
    const color2 = colorTheme(user);

    const [user, setUser] = useState({});
    const [ aODD, setAODD ] = useState(false);
    const [ alkBubble, setALkBubble ] = useState(false);
    const [ alvBubble, setALvBubble ] = useState(false);
    const [ arBubble, setARBubble ] = useState(false);
    const [ flagged, setFlagged ] = useState(false);
    const [isFlameLiked, setIsFlameLiked] = useState(answer.flameLikes.includes(currentUser._id));
    const [isUnionLiked, setIsUnionLiked] = useState(answer.unionLikes.includes(currentUser._id));
    const [isFlameLoved, setIsFlameLoved] = useState(answer.flameLoves.includes(currentUser._id));
    const [isUnionLoved, setIsUnionLoved] = useState(answer.unionLoves.includes(currentUser._id));
    const [ isFlameFlagged, setIsFlameFlagged ] = useState(comment.flameFlags?.includes(currentUser._id));
    const [ isUnionFlagged, setIsUnionFlagged ] = useState(comment.unionFlags?.includes(currentUser._id));
    const [ scrollPosition, setScrollPosition ] = useState(0);
    const [ showReplies, setShowReplies ] = useState(false);
    const [ replyCreate, setReplyCreate ] = useState(false);
    const [ discHeight, setDiscHeight ] = useState(0);
    const [ hidden, setHidden ] = useState(false);
    const [ newDesc, setNewDesc ] = useState();
    const [ done, setDone ] = useState(false);
    const [ likeCnt, setLikeCnt ] = useState(0);
    const [ loveCnt, setLoveCnt ] = useState(0);
    const [ replyCnt, setReplyCnt ] = useState(0);
    const [ displayCntLeftWidth, setDisplayCntLeftWidth ] = useState(0);
    const [ isReported, setIsReported ] = useState(answer.reports?.length > 0);
    const [ flagThreshold, setFlagThreshold ] = useState(false);
    const [ body, setBody ] = useState(answer.body);
    const [ hashtags, setHashtags ] = useState(answer.hashtags);
    const [ photos, setPhotos ] = useState(answer.photos);

    const newReport = { 
        auto: true,
        plaintiffType: "system",
        plaintiffId: null,
        defendentType: answer.union ? "union" : "flame",
        defendentId: answer.union ? answer.unionId : answer.userId,
        reportType: "flare",
        flareType: "comment",
        flareId: answer._id,
        description: "<p>To many flags. Flare has reached its flag threshold.</p>",  
    };

    const newSuspension = { 
        accountType: answer.union ? "union" : "flare",
        accountId: user._id,
        mascId: answer.union ? user.masculineId : null,
        femId: answer.union ? user.feminineId : null,
        description: "<p>Auto report, too many flags on flare.</p>",  
    };

    const flareData = {
        user: user, 
        flare: answer, 
        type: "answer",
        flagged: flagged,
    };

    useEffect(() => {
        setLikeCnt(answer.flameLikes.length + answer.unionLikes.length);
        setLoveCnt(answer.flameLoves.length + answer.unionLoves.length);
        setReplyCnt(answer.flameReplies.length + answer.unionReplies.length);
        setFlagThreshold(answer.flameFlags?.length + answer.unionFlags?.length>= 3);
        setIsFlameFlagged(answer.flameFlags?.includes(currentUser._id));
        setIsUnionFlagged(answer.unionFlags?.includes(currentUser._id));
    }, [answer]);

    useEffect(() => {
        if(editedAns?._id === answer._id) {
            setBody(editedAns.body);
            setHashtags(editedAns.hashtags);
            setPhotos(editedAns.photos);
        }
    }, [editedAns]);

    useEffect(() => {
        if (user && flagThreshold && answer.reports?.length === 0) {
            const autoReport = async () => {
                try {
                    const reportRes = await axiosReq("POST", "/reports", newReport);
                    await axiosReq("PUT", `/answers/${comment._id}/report`, {reportId: reportRes.data._id});
                    const reportArr = [];
                    reportArr.push(res.data._id)
                    Object.assign(newSuspension, {reports: reportArr});
                    const suspensionRes = await axiosReq("POST", "/suspensions", newSuspension);
                    await axiosReq("PUT", `/${answer.union ? "unions" : "users"}/${user._id}/suspend`, {suspensionId: suspensionRes.data._id});
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
        let aODDHandler = (event) => {
            var path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                setAODD(false);
            }
        };
        if (aODD) {
            document.body.addEventListener("click", aODDHandler);
            return () => {
                document.body.removeEventListener("click", aODDHandler);
            };
        }
    }, [aODD]);

    useEffect(() => {
        if (!newReply) return;
        if (newReply.flareId !== answer._id) return;
        setReplyCnt(replyCnt + 1);
        setShowReplies(true);
    }, [newReply]);

    useEffect(() => {
        if (isFlameFlagged || isUnionFlagged) {
            setFlagged(true);
        }
    }, [isFlameFlagged, isUnionFlagged]);

    useEffect(() => {
        if (flagData?.flareId !== answer._id) return;
        setFlagged(flagData?.isFlagged);
    }, [flagData])

    useEffect(() => {
        var rect = aDisplayRef?.current?.getBoundingClientRect();
        setScrollPosition(rect?.top);
    }, [aDisplayRef]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = answer.union 
            ? await axiosReq("GET", `/unions?unionId=${answer.unionId}`)
            : await axiosReq("GET", `/users?userId=${answer.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [answer.userId]);

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
        const descString = JSON.stringify(answer.description);
        const descFix = descString.replace("<p><br></p>", "");
        const descParse = JSON.parse(descFix);
        setNewDesc(descParse);
    }, [])

    useEffect(() => {
        if (alkBubble || alvBubble || arBubble) {
            var rect = aDisplayRef.current.getBoundingClientRect();
            setScrollPosition(rect.top)
        }
    }, [alkBubble, alvBubble, arBubble]);

    
    return (
        <div className="answerDisplay">
                <div className="answerDisplay-container">
                    <div className="answerDisplayTop">
                        <div className="answerDisplayTopLeft">
                            <ProfileLink user={user} type={"flareRetort"} bubble/>
                            <span className="answerDisplayDateTime">{format(answer.createdAt)}</span>
                            {flagged && 
                                <span className="answerDisplayVisibilityIcon" style={{color: "red"}}>
                                    {flagIcon}
                                </span>
                            }
                        </div>
                        <div className="answerDisplayTopRight">
                            <div className="answerDisplayOptions" onClick={() => setAODD(!aODD)}>{moreVertIcon}</div>
                            <div className="answerDisplayAODropdown" style={aODD ? {opacity: "100%"} : {opacity: "0%", right: "2000px"}}>
                                <FlareOptionsDropdown data={flareData} />
                            </div>
                        </div>
                    </div>
                    <div className="answerDisplayCenter">
                        <span 
                            id={`cdt-${answer._id}`} 
                            ref={discRef}
                            className={hidden ? "answerDisplayText hidden" : "answerDisplayText"} 
                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(newDesc)}}
                        />
                        {discHeight > 60 && done && <span className="answerDisplyTextBtn" onClick={() => setHidden(!hidden)}>{hidden ? "... Read More" : "... Show Less"}</span>}
                        {hashtags.length > 0 &&
                            <div className={`answerDisplayHashtags ${user.unionName ? user.spectrum : user.energy}`}>
                                {hashtags.map((hashtag, index) => (
                                    <Link to={`/hashtag/${hashtag.substring(1)}`}>
                                        <span 
                                            key={`a-${answer._id}-ah-${index}`} 
                                            className={`answerDisplayHashtag TEXT_COLOR ${color2}`}
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
                                        <li className="photos" key={`a-${answer._id}-ap-${index}`}>
                                            {console.log(PF + photo)}
                                            <img className="postImg" src={PF + photo} alt="" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div>
                    <div className="answerDisplayBottom" >
                        <div className="answerDisplayBottomLeft" ref={displayCntLeftRef}>
                            <div 
                                className="answerDisplayInfoBubblePopup left"
                                style={
                                    alkBubble && likeCnt === 0 ||
                                    alvBubble && loveCnt === 0 ||
                                    arBubble && replyCnt === 0 
                                        ? {opacity: "0", right: "2000px"} 
                                        : {opacity: "100%", right: `${displayCntLeftWidth}px`, top: "0px"} 
                                }
                            >
                                <div className="answerDisplayInfoBubble left views" style={alkBubble && likeCnt > 0 ? {opacity: "100%"} : {opacity: "0"}}>
                                    <LikesBubble
                                        flameLikes={answer.flameLikes} 
                                        unionLikes={answer.unionLikes} 
                                        isFlameLiked={isFlameLiked} 
                                        isUnionLiked={isUnionLiked}
                                        show={true}
                                        list={"answer"}
                                        sp={scrollPosition}
                                    />
                                </div>
                                <div className="answerDisplayInfoBubble left views" style={alvBubble && loveCnt > 0 ? {opacity: "100%"} : {opacity: "0"}}>
                                    <LovesBubble
                                        flameLoves={answer.flameLoves} 
                                        unionLoves={answer.unionLoves} 
                                        isFlameLoved={isFlameLoved} 
                                        isUnionLoved={isUnionLoved}
                                        list={"answer"}
                                        sp={scrollPosition}   
                                    />
                                </div>
                                <div className="answerDisplayInfoBubble left views" style={arBubble && replyCnt > 0 ? {opacity: "100%"} : {opacity: "0"}}>
                                    <RepliesBubble
                                        flameReplies={answer.flameReplies} 
                                        unionReplies={answer.unionReplies} 
                                        list={"answer"}
                                        sp={scrollPosition}   
                                    />
                                </div>
                            </div>
                            <div className="answerDisplayCountItem left likes">
                                <FlareLikeButton 
                                    user={user} 
                                    flare={answer} 
                                    type={"answer"} 
                                    popup={setALkBubble} 
                                    setIsFLiked={setIsFlameLiked}
                                    setIsULiked={setIsUnionLiked}
                                    isFLoved={isFlameLoved}
                                    isULoved={isUnionLoved}
                                    likesCount={likeCnt}
                                    setLikesCount={setLikeCnt}
                                />
                            </div>
                            <div className="answerDisplayCountItem left loves">
                                <FlareLoveButton 
                                    user={user} 
                                    flare={answer} 
                                    type={"answer"} 
                                    popup={setALvBubble} 
                                    setIsFLiked={setIsFlameLoved}
                                    setIsULiked={setIsUnionLoved}
                                    isFLoved={isFlameLiked}
                                    isULoved={isUnionLiked}
                                    likesCount={loveCnt}
                                    setLikesCount={setLoveCnt}
                                />
                            </div>
                            <div className="answerDisplayCountItem left replies">
                                {user.unionName ?
                                    (
                                        <>
                                            {user.spectrum === "diamond" ?
                                                (
                                                    <>
                                                        <i
                                                            className={`
                                                                answerDisplayPNGIcon 
                                                                PNG_ICON_REPLY
                                                                ${color2} 
                                                                left
                                                            `}  
                                                            alt="replies"  
                                                            onMouseOver={() => setARBubble(true)}
                                                            onMouseLeave={() => setARBubble(false)}
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <div 
                                                            className="answerDisplaySVGIconDiv"
                                                            onMouseOver={() => setARBubble(true)}
                                                            onMouseLeave={() => setARBubble(false)}
                                                        >
                                                            <ReplyIconSpectrum spectrum={user.spectrum} cn={"answerDisplaySVGIcon SVG_ICON left"}/>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </>
                                    ) : (
                                        <>
                                            <div 
                                                className={`answerDisplaySVGIcon SVG_ICON left ${user.energy}`}
                                                onMouseOver={() => setARBubble(true)}
                                                onMouseLeave={() => setARBubble(false)}
                                            >
                                                {replyIcon}
                                            </div>
                                        </>
                                    )
                                }
                                <span className="answerDisplayCounter left">{replyCnt}</span> 
                            </div>
                        </div>
                        <div className="answerDisplayBottomMiddle">
                            {replyCnt > 0 &&
                                <div className="answerDisplayShowReplies" onClick={() => setShowReplies(!showReplies)}>
                                    {showReplies ? "Hide Replies" : "Show Replies"}
                                </div> 
                            }
                        </div>
                        <div className="answerDisplayBottomRight">
                            {user.unionName ?
                                (
                                    <>
                                        {user.spectrum === "diamond" ?
                                            (
                                                <>
                                                    <i
                                                        className={`
                                                            answerDisplayPNGIcon 
                                                            PNG_ICON_REPLY
                                                            ${color2} 
                                                            right
                                                        `}  
                                                        alt="replies" 
                                                        onClick={() => dispatch(cAOpen(flareData))} 
                                                    />
                                                </>
                                            ) : (
                                                <div onClick={() => dispatch(cAOpen(flareData))}>
                                                    <ReplyIconSpectrum 
                                                        spectrum={user.spectrum} 
                                                        cn={"answerDisplaySVGIcon SVG_ICON right"}      
                                                    />
                                                </div>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        <div 
                                            className={`answerDisplaySVGIcon SVG_ICON right ${user.energy}`}
                                            onClick={() => dispatch(cAOpen(flareData))}   
                                        >
                                            {replyIcon}
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    
                </div>
                <div className="answerDisplayResponseFeed">
                    {showReplies && <ReplyFeed prompt={"answer"} promptId={answer._id} rCntNum={1}/>}
                </div>
        </div>
    )
};

export default AnswerDisplay;