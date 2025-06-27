import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';
import { format } from "timeago.js";
import DOMPurify from 'dompurify';
import "./QNShortDisplay.css";
import ChatBubbleIconSpectrum from '../../../../Utils/misc/ChatBubbleIconSpectrum';
import ViewsBubble from '../../../InfoBubbles/ViewsBubble/ViewsBubble';
import LikesBubble from '../../../InfoBubbles/LikesBubble/LikesBubble';
import LovesBubble from '../../../InfoBubbles/LovesBubble/LovesBubble';
import AnswersBubble from '../../../InfoBubbles/AnswersBubble/AnswersBubble';
import SharesBubble from '../../../InfoBubbles/SharesBubble/SharesBubble';
import VisibilityIcon from '../../../../Utils/icons/VisibilityIcon';
import noBanner from "../../../../Assets/picBlanks/no-banner.jpg";
import ProfileLink from '../../../ProfileLink/ProfileLink';
import { moreVertIcon, qnaIcon, wallPaperOutlinedIcon } from '../../../../Lib/mui/icons';

function QNShortDisplay({ question }) {

    const ref = useRef();
    const viewCntRef = useRef();
    const likeCntRef = useRef();
    const loveCntRef = useRef();
    const shareCntRef = useRef();
    const answerCntRef = useRef();
    const qnDisplayRef = useRef();

    const PS = process.env.PHOTO_STORAGE;

    //const {user: currentUser} = useContext(AuthContext);
    const { user: currentUser } = useSelector((state) => state.auth);

    const [ user, setUser ] = useState({});
    const [ height, setHeight ] = useState();
    const [ qnPLDD, setQNPLDD ] = useState(false);
    const [ qnViewsDD, setQNViewsDD ] = useState(false);
    const [ qnLikesDD, setQNLikesDD ] = useState(false);
    const [ qnLovesDD, setQNLovesDD ] = useState(false);
    const [ qnSharesDD, setQNSharesDD ] = useState(false);
    const [ qnAnswersDD, setQNAnswersDD ] = useState(false);
    const [isFlameLiked, setIsFlameLiked] = useState(false);
    const [isUnionLiked, setIsUnionLiked] = useState(false);
    const [isFlameLoved, setIsFlameLoved] = useState(false);
    const [isUnionLoved, setIsUnionLoved] = useState(false);
    const [ flameViews, setFlameViews ] = useState(question.flameViews.length);
    const [ unionViews, setUnionViews ] = useState(question.unionViews.length);
    const [ flameLikes, setFlameLikes ] = useState(question.flameLikes.length);
    const [ unionLikes, setUnionLikes ] = useState(question.unionLikes.length);
    const [ flameLoves, setFlameLoves ] = useState(question.flameLoves.length);
    const [ unionLoves, setUnionLoves ] = useState(question.unionLoves.length);
    const [ flameShares, setFlameShares ] = useState(question.flameShares.length);
    const [ unionShares, setUnionShares ] = useState(question.unionShares.length);
    const [ flameAnswers, setFlameAnswers ] = useState(question.flameAnswers.length);
    const [ unionAnswers, setUnionAnswers ] = useState(question.unionAnswers.length);
    const [ viewsCntWidth, setViewsCntWidth ] = useState();
    const [ likesCntWidth, setLikesCntWidth ] = useState();
    const [ lovesCntWidth, setLovesCntWidth ] = useState();
    const [ answersCntWidth, setAnswersCntWidth ] = useState();
    const [ sharesCntWidth, setSharesCntWidth ] = useState();
    const [ scrollPosition, setScrollPosition ] = useState(0);
    const [ accessible, setAccessible ] = useState();
    const [ descHeight, setDescHeight ] = useState(0);
    const [ textHide, setTextHide ] = useState(false);
    const [ done, setDone ] = useState(false);
    const [ photoLoad, setPhotoLoad ] = useState(true);


    const colorTheme = user.unionName 
        ? user.spectrum 
            ? user.spectrum 
            : "gray" 
        : user.energy 
            ? user.energy 
            : "gray";

    useEffect(() => {
        var rect = qnDisplayRef?.current?.getBoundingClientRect();
        setScrollPosition(rect?.top)
    }, []);
    
    useEffect(() => {
        const fetchUser = async () => {
            const res = question.unionId 
            ? await axiosReq("GET", `/unions?unionId=${question.unionId}`)
            : await axiosReq("GET", `/users?userId=${question.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [question.userId, question.unionId]);

    useEffect(() => {
        if (user.unionName) {
            const getDims = () => {
                const displayHeight = ref?.current?.clientHeight;
                setHeight(displayHeight);
            }
        getDims();
        }
    }, [user.unionName]);

    useEffect(() => {
        if (currentUser._id === user._id || accessible || accessible === "void") {
            setViewsCntWidth(`${viewCntRef.current.clientWidth + 56}px`);
            setLikesCntWidth(`${likeCntRef.current.clientWidth + viewCntRef.current.clientWidth + 100}px`);
            setLovesCntWidth(`${loveCntRef.current.clientWidth + likeCntRef.current.clientWidth + viewCntRef.current.clientWidth + 146}px`);
            setSharesCntWidth(`${shareCntRef.current.clientWidth + 55}px`);
            setAnswersCntWidth(`${shareCntRef.current.clientWidth + answerCntRef.current.clientWidth + 105}px`);
        }
    }, [currentUser._id, user._id, accessible]);

    

    // Viewed counter
    const viewHandler = () => {
        try {
            currentUser.unionName
                ? axiosReq("PUT", `/questions/${question._id}/unionView`, { unionId: currentUser._id })
                : axiosReq("PUT", `/questions/${question._id}/flameView`, { userId: currentUser._id })
        } catch(err) {}
        currentUser.unionName
            ? setUnionViews(unionViews + 1)
            : setFlameViews(flameViews + 1)
    };

    // Like/unlike question
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLiked(question.unionLikes.includes(currentUser._id))
         : setIsFlameLiked(question.flameLikes.includes(currentUser._id))
    }, [currentUser._id])

    const likeHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            if ( currentUser.unionName ) {
                axiosReq("PUT", `/questions/${question._id}/unionLike`, { unionId: currentUser._id });
                setUnionLikes(isUnionLiked ? unionLikes - 1 : unionLikes + 1);
                setIsUnionLiked(!isUnionLiked);
            } else {
                axiosReq("PUT", `/questions/${question._id}/flameLike`, { userId: currentUser._id });
                setFlameLikes(isFlameLiked ? flameLikes - 1 : flameLikes + 1);
                setIsFlameLiked(!isFlameLiked);
            }
        } catch(err) {}         
    };

    // Love/unlove question
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLoved(question.unionLoves.includes(currentUser._id))
         : setIsFlameLoved(question.flameLoves.includes(currentUser._id))
    }, [currentUser._id])

    const loveHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            if ( currentUser.unionName ) {
                axiosReq("PUT", `/questions/${question._id}/unionLove`, { unionId: currentUser._id });
                setUnionLoves(isUnionLoved ? unionLoves - 1 : unionLoves + 1);
                setIsUnionLoved(!isUnionLoved);
            } else {
                axiosReq("PUT", `/questions/${question._id}/flameLove`, { userId: currentUser._id });
                setFlameLoves(isFlameLoved ? flameLoves - 1 : flameLoves + 1);
                setIsFlameLoved(!isFlameLoved);
            }
        } catch(err) {}
    };

    useEffect(() => {
        if (qnViewsDD || qnLikesDD || qnLovesDD || qnAnswersDD || qnSharesDD) {
            var rect = qnDisplayRef.current.getBoundingClientRect();
            setScrollPosition(rect.top)
        }
      }, [qnViewsDD, qnLikesDD, qnLovesDD, qnAnswersDD, qnSharesDD]);


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
        accessHandler(question.access)
    }, []);
    
   
    return (
        <>
            {currentUser._id === user._id || accessible || accessible === "void" ?
                (      
                    <div className="qnShortDisplayContainer" style={{height: `${height}px`}}>
                        {user.unionName && user.spectrum === "rainbow" ||
                         user.unionName && user.spectrum === "silver" ||
                         user.unionName && user.spectrum === "gold" ||
                         user.unionName && user.spectrum === "platinum" ||
                         user.unionName && user.spectrum === "diamond" 
                            ? <i 
                                className={`
                                    qnShortDisplayBackgroundTheme 
                                    HIGHER_BACKGROUND
                                    ${colorTheme}
                                `} 
                                alt="higher-background"
                            />
                            : null
                        }
                        <div 
                            className={
                                `qnShortDisplay 
                                ${user.unionName ? "union" : "flame"} 
                                BOX_SHADOW 
                                ${colorTheme}`
                            } 
                            ref={ref}
                        >
                            <Link to={`/question/${question._id}`} onClick={viewHandler}>
                                <div className="qnShortDisplay-container">
                                    <div className="qnShortDisplayTop">
                                        <div className="qnShortDisplayTopLeft">
                                            <ProfileLink user={user} type={"flare"} display={"short"} bubble/>
                                            <span className="qnShortDisplayDateTime">{format(question.createdAt)}</span>
                                            <span className="qnShortDisplayVisibilityIcon">
                                                <VisibilityIcon 
                                                    visible={question.access} 
                                                    primary={{fontSize: "18px"}}
                                                    secondary={{fontSize: "12px"}}
                                                />
                                            </span>
                                        </div>
                                        <div className="qnShortDisplayTopRight">
                                            {moreVertIcon}
                                        </div>
                                    </div>
                                    <div className="qnShortDisplayCenter">
                                        <span className="qnShortDisplayTitle">{question.title}</span>
                                        <div 
                                            className="qnShortDisplayDescriptionPreview"
                                            style={
                                                question.description.length > 0 || 
                                                question.photos.length > 0 
                                                    ? { height: "100%", maxHeight: "80px", marginTop: "20px"} 
                                                    : {height: "0px"}
                                                }
                                        >
                                            {/*}
                                            <ShowMoreText
                                                lines={3}
                                                more="Show More"
                                                less="Show Less"
                                                className="content-css"
                                                anchorClass="my-anchor-css-class"
                                                expanded={false}
                                            >
                                                <span 
                                                    className="qnShortDisplayText" 
                                                    style={
                                                        question.description 
                                                            ? question.photos 
                                                                ? {width: "calc(100% - 120px"} 
                                                                : {width: "100%"} 
                                                            : {width: "0px"}
                                                    }
                                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question.description)}}
                                                />
                                            </ShowMoreText>
                                                */}
                                            <div 
                                                className="qnShortDisplayDescription"
                                                style={
                                                    question.description 
                                                        ? question.photos 
                                                            ? {width: "calc(100% - 120px"} 
                                                            : {width: "100%"} 
                                                        : {width: "0px"}
                                                }
                                            >
                                                <div 
                                                    className="qnShortDisplayTextContainer"
                                                    style={textHide ? {minHeight: "55px", maxHeight: "55px"} : {minHeight: "82px", maxHeight: "82px"}}
                                                >
                                                    <div
                                                        className="qnShortDisplayText"
                                                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question.description)}} 
                                                        ref={textEl => {
                                                            if (done === true) return;
                                                            if (!textEl) return;
                                                            const handle = setInterval(() => {
                                                                if (textEl.getBoundingClientRect().height > 82) {
                                                                    setDone(true)
                                                                    setDescHeight(textEl.getBoundingClientRect().height)
                                                                    setTextHide(true)
                                                                    clearInterval(handle);
                                                                }
                                                            }, 50);
                                                        }}  
                                                    />
                                                </div>
                                                {textHide && <div className="qnShortDisplayShowMore">...  Show More</div>}
                                            </div>
                                            {question.photos.length > 0 &&
                                                <div className="qnShortDisplayPhotoContainer">
                                                    <div 
                                                        className={`qnShortDisplayImgBackground BCKGRND_LGT ${colorTheme}`}
                                                        style={photoLoad ? {opacity: "0"} : {opacity: "1"}}
                                                    />
                                                    {!photoLoad && 
                                                        <div  
                                                            className="qnShortDisplayImgBGIcon"
                                                            style={question.photos.length > 1 ? {opacity: "0.5"} : {opacity: "1"}}
                                                        >
                                                            {wallPaperOutlinedIcon}
                                                        </div>
                                                    }
                                                    <img 
                                                        className="qnShortDisplayPhoto" 
                                                        src={question.photos[0] ? PS + question.photos[0] : noBanner}
                                                        style={photoLoad ? {opacity: "1"} : {opacity: "0"}}
                                                        onLoad={(e) => {
                                                            e.target.src === PS + question.photos[0]
                                                                ? setPhotoLoad(true)
                                                                : setPhotoLoad(false)
                                                        }} 
                                                        onError={(e) => {
                                                            e.currentTarget.src = noBanner
                                                            setPhotoLoad(false)
                                                        }}
                                                        //alt="photo-img"  
                                                    />
                                                    {question.photos.length > 1 && <div className={`qnShortDisplayPhotoCntBG BCKGRND_LGT ${colorTheme}`} />}
                                                    {question.photos.length > 1 && <div className="qnShortDisplayPhotCnt">{`${question.photos.length} Images`}</div>}
                                                </div>
                                            }
                                        </div>
                                        {question.hashtags.length > 0 &&
                                            <div className="qnShortDisplayHashtagList">
                                                {question.hashtags.map((hashtag, index) => (
                                                    <Link to={`/hashtag/${hashtag.substring(1)}`}>
                                                        <span 
                                                            key={index}
                                                            className={`qnShortDisplayhashtags ${colorTheme}`}
                                                        >
                                                            {hashtag}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                    <div className="qnShortDisplayBottom" ref={qnDisplayRef}>
                                        <div className="qnShortDisplayBottomLeft left">
                                            <div className="qnShortDisplayCountItem views">
                                                <i 
                                                    className={`
                                                        qnShortDisplayPNGIcon 
                                                        PNG_ICON_${
                                                            question.flameViews.includes(currentUser._id) || 
                                                            question.unionViews.includes(currentUser._id) 
                                                                ? "SEEN" 
                                                                : "UNSEEN"
                                                        } 
                                                        left
                                                    `}  
                                                    alt="seen" 
                                                    onMouseOver={() => setQNViewsDD(true)}
                                                    onMouseLeave={() => setQNViewsDD(false)}  
                                                />
                                                <span 
                                                    className="qnShortDisplayCounter left" 
                                                    ref={viewCntRef}
                                                >
                                                    {flameViews + unionViews}
                                                </span>
                                                <div 
                                                    className="qnShortDisplayViewsDropdown" 
                                                    style={qnViewsDD 
                                                        ? flameViews + unionViews === 0
                                                            ? {opacity: "0", right: "2000px"} 
                                                            : {opacity: "100%", right: `${viewsCntWidth}`, top: "0px"} 
                                                        : {opacity: "0", right: "2000px"}
                                                    }
                                                >
                                                    <ViewsBubble 
                                                        flameViews={question.flameViews} 
                                                        unionViews={question.unionViews} 
                                                        sp={scrollPosition} 
                                                    />
                                                </div>  
                                            </div>
                                            <div className="qnShortDisplayCountItem likes">
                                                <i
                                                    className={`
                                                        qnShortDisplayPNGIcon 
                                                        PNG_ICON_LIKE${isFlameLiked || isUnionLiked ? "D_LGT" : ""} 
                                                        left
                                                    `}  
                                                    alt="like/liked" 
                                                    onClick={likeHandler} 
                                                    onMouseOver={() => setQNLikesDD(true)}
                                                    onMouseLeave={() => setQNLikesDD(false)} 
                                                />
                                                <span 
                                                    className="qnShortDisplayCounter left" 
                                                    ref={likeCntRef}
                                                >
                                                    {flameLikes + unionLikes}
                                                </span>
                                                <div 
                                                    className="qnShortDisplayLikesDropdown" 
                                                    style={qnLikesDD 
                                                        ? flameLikes + unionLikes === 0
                                                            ? {opacity: "0", right: "2000px"} 
                                                            : {opacity: "100%", right: `${likesCntWidth}`, top: "0px"} 
                                                        : {opacity: "0", right: "2000px"}
                                                    }
                                                >
                                                    <LikesBubble 
                                                        flameLikes={question.flameLikes}    
                                                        unionLikes={question.unionLikes} 
                                                        isFlameLiked={isFlameLiked} 
                                                        isUnionLiked={isUnionLiked}
                                                        show={true}
                                                        list={"qn"}
                                                        sp={scrollPosition}
                                                    />
                                                </div>
                                            </div>
                                            <div className="qnShortDisplayCountItem loves">
                                                <i
                                                    className={`
                                                        qnShortDisplayPNGIcon 
                                                        PNG_ICON_LOVE${isFlameLoved || isUnionLoved ? "D_LGT" : ""} 
                                                        left
                                                    `}  
                                                    alt="like/liked" 
                                                    onClick={loveHandler} 
                                                    onMouseOver={() => setQNLovesDD(true)}
                                                    onMouseLeave={() => setQNLovesDD(false)} 
                                                />
                                                <span 
                                                    className="qnShortDisplayCounter left" 
                                                    ref={loveCntRef}
                                                >
                                                    {flameLoves + unionLoves}
                                                </span>
                                                <div 
                                                    className="qnShortDisplayLovesDropdown" 
                                                    style={qnLovesDD
                                                        ? flameLoves + unionLoves === 0
                                                            ? {opacity: "0", right: "2000px"} 
                                                            : {opacity: "100%", right: `${lovesCntWidth}`, top: "0px"} 
                                                        : {opacity: "0", right: "2000px"}
                                                    }
                                                >
                                                    <LovesBubble 
                                                        flameLoves={question.flameLoves} 
                                                        unionLoves={question.unionLoves} 
                                                        isFlameLoved={isFlameLoved} 
                                                        isUnionLoved={isUnionLoved}
                                                        list={"qn"}
                                                        sp={scrollPosition}   
                                                    />
                                                </div> 
                                            </div>
                                        </div>
                                        <div className="qnShortDisplayBottomRight">
                                            <div className="qnShortDisplayCountItem">
                                                {user.unionName ?
                                                    (
                                                        <>
                                                            {colorTheme === "diamond" ?
                                                                (
                                                                    <>
                                                                        <i 
                                                                            className="
                                                                            qnShortDisplayPNGIcon
                                                                                PNG_ICON_QN_ANSWER 
                                                                                diamond 
                                                                                right
                                                                            "  
                                                                            alt="qn-answer" 
                                                                            onMouseOver={() => setQNAnswersDD(true)}
                                                                            onMouseLeave={() => setQNAnswersDD(false)}
                                                                        />
                                                                        <span className="qnShortDisplayCounter right" ref={answerCntRef}>{flameAnswers + unionAnswers}</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div 
                                                                            className="qnShortDisplaySVGIconDiv"
                                                                            onMouseOver={() => setQNAnswersDD(true)}
                                                                            onMouseLeave={() => setQNAnswersDD(false)}
                                                                        >
                                                                            <ChatBubbleIconSpectrum 
                                                                                spectrum={user.spectrum} 
                                                                                cn={"qnShortDisplaySVGIcon right"}  
                                                                                flare={"question"}
                                                                            />
                                                                            <span className="qnShortDisplayCounter right" ref={answerCntRef}>{flameAnswers + unionAnswers}</span>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div 
                                                                className={`qnShortDisplaySVGIcon right ${colorTheme}`}
                                                                onMouseOver={() => setQNAnswersDD(true)}
                                                                onMouseLeave={() => setQNAnswersDD(false)}
                                                            >
                                                                {qnaIcon}
                                                            </div>
                                                            <span className="qnShortDisplayCounter right" ref={answerCntRef}>{flameAnswers + unionAnswers}</span>
                                                        </>
                                                    )
                                                }
                                                <div 
                                                    className="qnShortDisplayAnswersDropdown" 
                                                    style={qnAnswersDD 
                                                        ? flameAnswers + unionAnswers === 0 
                                                            ? {opacity: "0", right: "4000px"} 
                                                            : {opacity: "100%", left: `${answersCntWidth}`, top: "0px"} 
                                                        : {opacity: "0", right: "4000px"}
                                                    }
                                                >
                                                    <AnswersBubble 
                                                        flameAnswers={question.flameAnswers} 
                                                        unionAnswers={question.unionAnswers} 
                                                        sp={scrollPosition}
                                                    />
                                                </div> 
                                            </div>
                                            <div className="qnShortDisplayCountItem">
                                                <i 
                                                    className={`
                                                        qnShortDisplayPNGIcon
                                                        PNG_ICON_SHARE
                                                        ${colorTheme} 
                                                        right
                                                    `}  
                                                    alt="share-icon" 
                                                    onMouseOver={() => setQNSharesDD(true)}
                                                    onMouseLeave={() => setQNSharesDD(false)}   
                                                />
                                                <span className="qnShortDisplayCounter right" ref={shareCntRef}>{flameShares + unionShares}</span>
                                                <div 
                                                    className="qnShortDisplaySharesDropdown" 
                                                    style={qnSharesDD 
                                                        ? flameShares + unionShares === 0
                                                            ? {opacity: "0", right: "4000px"}
                                                            : {opacity: "100%", left: `${sharesCntWidth}`, top: "0px"} 
                                                        : {opacity: "0", right: "4000px"}
                                                    }
                                                >
                                                    <SharesBubble 
                                                        flameShares={question.flameShares} 
                                                        unionShares={question.unionShares} 
                                                        sp={scrollPosition}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </Link> 
                        </div>
                    </div>
                ) : (null)
            }
        </>
    )
};

export default QNShortDisplay;