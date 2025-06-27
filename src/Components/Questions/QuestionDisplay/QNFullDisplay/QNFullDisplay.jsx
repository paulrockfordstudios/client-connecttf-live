import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';
import { format } from "timeago.js";
import { colorTheme } from '../../../../Utils/styling/colorTheme';
import { cAOpen } from '../../../../Redux/AuthSlice';
import "./QNFullDisplay.css";
import AnswerFeed from '../../../Answers/AnswerFeed/AnswerFeed';
import DOMPurify from 'dompurify';
import ChatBubbleIconSpectrum from '../../../../Utils/misc/ChatBubbleIconSpectrum';
import ViewsBubble from '../../../InfoBubbles/ViewsBubble/ViewsBubble';
import LikesBubble from '../../../InfoBubbles/LikesBubble/LikesBubble';
import LovesBubble from '../../../InfoBubbles/LovesBubble/LovesBubble';
import AnswersBubble from '../../../InfoBubbles/AnswersBubble/AnswersBubble';
import SharesBubble from '../../../InfoBubbles/SharesBubble/SharesBubble';
import FlareOptionsDropdown from '../../../Dropdowns/FlareOptionsDropdown/FlareOptionsDropdown';
import CDPQuestion from '../../../Popups/ConfirmDeletePopups/CDPQuestion/CDPQuestion'
import EditQuestion from '../../EditQuestion/EditQuestion';
import VisibilityIcon from '../../../../Utils/icons/VisibilityIcon';
import ProfileLink from '../../../ProfileLink/ProfileLink';
import CreateAnswer from '../../../Answers/CreateAnswer/CreateAnswer';
import { moreVertIcon, qnaIcon } from '../../../../Lib/mui/icons';


function QNFullDisplay({ question }) {


    const viewCntRef = useRef();
    const likeCntRef = useRef();
    const loveCntRef = useRef();
    const shareCntRef = useRef();
    const answerCntRef = useRef();
    const qnDisplayRef = useRef();
    const displayCntLeftRef = useRef();
    const displayCntRightRef = useRef();

    const { user: currentUser, flame, deleteFlare, editFlare, cAnswer } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const PS = process.env.PHOTO_STORAGE;
 
    const [user, setUser] = useState({});
    const [ height, setHeight ] = useState();
    const [ clicked, setClicked ] = useState(0);
    const [ qnODD, setQNODD] = useState(false);
    const [ qnPLDD, setQNPLDD ] = useState(false);
    const [ qnViewsDD, setQNViewsDD ] = useState(false);
    const [ qnLikesDD, setQNLikesDD ] = useState(false);
    const [ qnLovesDD, setQNLovesDD ] = useState(false);
    const [ qnSharesDD, setQNSharesDD ] = useState(false);
    const [ qnAnswersDD, setQNAnswersDD ] = useState(false);
    const [ isFlameLiked, setIsFlameLiked ] = useState(false);
    const [ isUnionLiked, setIsUnionLiked ] = useState(false);
    const [ isFlameLoved, setIsFlameLoved ] = useState(false);
    const [ isUnionLoved, setIsUnionLoved ] = useState(false);
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
    const [ AnswersCntWidth, setAnswersCntWidth ] = useState();
    const [ sharesCntWidth, setSharesCntWidth ] = useState();
    const [ viewCnt, setViewCnt ] = useState(0);
    const [ likeCnt, setLikeCnt ] = useState(0);
    const [ loveCnt, setLoveCnt ] = useState(0);
    const [ answerCnt, setAnswerCnt ] = useState(0);
    const [ shareCnt, setShareCnt ] = useState(0);
    const [ scrollPosition, setScrollPosition ] = useState(0);
    const [ deleteQN, setDeleteQN ] = useState(false);
    const [ displayCntLeftWidth, setDisplayCntLeftWidth ] = useState(0);
    const [ displayCntRightWidth, setDisplayCntRightWidth ] = useState(0);


    useEffect(() => {
        setViewCnt(question.flameViews.length + question.unionViews.length);
        setLikeCnt(question.flameLikes.length + question.unionLikes.length);
        setLoveCnt(question.flameLoves.length + question.unionLoves.length);
        setAnswerCnt(question.flameAnswers.length + question.unionAnswers.length);
        setShareCnt(question.flameShares.length + question.unionShares.length);
    }, [question]);

    useEffect(() => {
        setDisplayCntLeftWidth(displayCntLeftRef.current?.clientWidth + 20);
    }, [viewCnt, likeCnt, loveCnt]);

    useEffect(() => {
        setDisplayCntRightWidth(displayCntRightRef.current?.clientWidth + 20);
    }, [commentCnt, shareCnt]);

    useEffect(() => {
        setDeleteQN(deleteFlare);
    }, [deleteFlare]);
    
    useEffect(() => {
        var rect = qnDisplayRef.current.getBoundingClientRect();
        setScrollPosition(rect.top)
    }, []);

    useEffect(() => {
        setViewsCntWidth(`${viewCntRef.current.clientWidth + 65}px`);
        setLikesCntWidth(`${likeCntRef.current.clientWidth + viewCntRef.current.clientWidth + 110}px`);
        setLovesCntWidth(`${loveCntRef.current.clientWidth + likeCntRef.current.clientWidth + viewCntRef.current.clientWidth + 155}px`);
        setSharesCntWidth(`${shareCntRef.current.clientWidth + 65}px`);
        setAnswersCntWidth(`${shareCntRef.current.clientWidth + answerCntRef.current.clientWidth + 112}px`);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const res = question.unionId 
            ? await axiosReq("GET", `/unions?unionId=${question.unionId}`)
            : await axiosReq("GET", `/users?userId=${question.userId}`)
            setUser(res.data);
        }
        fetchUser();
    }, [question.userId, question.likes]);


    // Like/unlike qn
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLiked(question.unionLikes.includes(currentUser._id))
         : setIsFlameLiked(question.flameLikes.includes(currentUser._id))
    }, [currentUser])

    const likeHandler = () => {
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

    // Love/unlove qn
    useEffect(() => {
        currentUser.unionName
         ? setIsUnionLoved(question.unionLoves.includes(currentUser._id))
         : setIsFlameLoved(question.flameLoves.includes(currentUser._id))
    }, [currentUser._id, ])

    const loveHandler = () => {
        try {
            if ( currentUser.unionName ) {
                axiosReq("PUT", `/qns/${question._id}/unionLove`, { unionId: currentUser._id });
                setUnionLoves(isUnionLoved ? unionLoves - 1 : unionLoves + 1);
                setIsUnionLoved(!isUnionLoved);
            } else {
                axiosReq("PUT", `/qns/${question._id}/flameLove`, { userId: currentUser._id });
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
    
    return (
        <>
            <div className="qnFullDisplayContainer" style={{height: `${height}px`}}>               
                <div 
                    className={`qnFullDisplayBackgroundTheme HIGHER_BACKGROUND ${colorTheme(user)}`} 
                    style={{height: `${height}px`}} 
                />  
                <div 
                    className={`qnFullDisplay union BOX_SHADOW ${colorTheme(user)}`} 
                    onClick={() => setClicked((click) => click + 1)}        
                    ref={el => {
                        if (clicked >= 0 || clicked <= 9999) {
                            if (!el) return;
                            let prevValue = JSON.stringify(el.getBoundingClientRect());
                            const start = Date.now();
                            const handle = setInterval(() => {
                                let nextValue = JSON.stringify(el.getBoundingClientRect());
                                if (nextValue === prevValue) {
                                    clearInterval(handle);
                                    setHeight(el.getBoundingClientRect().height)
                                } else {
                                    prevValue = nextValue;
                                }
                            }, 1000);
                        }
                    }} 
                >
                    <div className="qnFullDisplay-container">
                        <div className="qnFullDisplayTop">
                            <div className="qnFullDisplayTopLeft">
                                <ProfileLink user={user} type={"flare"} display={"full"} bubble/>
                                <span className="qnFullDisplayInfo">{format(question.createdAt)}</span>
                                <span className="qnFullDisplayInfo">/</span>
                                <span className="qnFullDisplayInfo">{`${question.feed} Question`}</span>
                                <span className="qnFullDisplayInfo">/</span>
                                <span className="qnFullDisplayInfo">{question.access}</span>
                                <span className="qnFullDisplayVisibilityIcon">
                                    <VisibilityIcon 
                                        visible={question.access} 
                                        primary={{fontSize: "18px"}}
                                        secondary={{fontSize: "12px"}}
                                    />
                                </span>
                            </div>
                            <div className="qnFullDisplayTopRight">
                                <div onClick={() => setQNODD(!qnODD)}>{moreVertIcon}</div>
                                <div 
                                    className="qnFullDisplayQNODropdown" 
                                    style={qnODD ? {opacity: "100%"} : {opacity: "0%", right: "2000px"}}
                                >
                                    <FlareOptionsDropdown user={user}/>
                                </div>
                            </div>
                        </div>
                        <div className="qnFullDisplayCenter">
                            <span className="qnFullDisplayTitle">{question.title}</span>
                            <span 
                                className="qnFullDisplayText" 
                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(question.description)}} 
                            />
                            <div className="photoFullDisplay-container">
                                <ul className="photoList">      
                                    {question.photos.map((photo, index) => (
                                        <li className="photos" key={index}>
                                            {console.log(PS + photo)}
                                            <img className="qnImg" src={PS + photo} alt="" />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="qnFullDisplayHashtagList">
                                {question.hashtags.map((hashtag, index) => (
                                    <Link to={`/hashtag/${hashtag.substring(1)}`}>
                                        <span 
                                            key={index}
                                            className={`qnFullDisplayhashtags ${colorTheme(user)}`}
                                        >
                                            {hashtag}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="qnFullDisplayBottom" ref={qnDisplayRef}>
                            <div className="qnFullDisplayBottomLeft">
                                <div className="qnFullDisplayCountItem views">
                                    <i 
                                        className="qnFullDisplayPNGIcon PNG_ICON_SEEN left" 
                                        alt="seen" 
                                        onMouseOver={() => setQNViewsDD(true)}
                                        onMouseLeave={() => setQNViewsDD(false)}  
                                    />
                                    <span 
                                        className="qnFullDisplayCounter left" 
                                        ref={viewCntRef}
                                    >
                                        {flameViews + unionViews}
                                    </span>
                                    <div 
                                        className="qnFullDisplayViewsDropdown" 
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
                                <div className="qnFullDisplayCountItem likes">
                                    <i
                                        className={`
                                            qnFullDisplayPNGIcon 
                                            PNG_ICON_LIKE${isFlameLiked || isUnionLiked ? "D_LGT" : ""} 
                                            left
                                        `}  
                                        alt="like/liked" 
                                        onClick={likeHandler} 
                                        onMouseOver={() => setQNLikesDD(true)}
                                        onMouseLeave={() => setQNLikesDD(false)} 
                                    />
                                    <span 
                                        className="qnFullDisplayCounter left" 
                                        ref={likeCntRef}
                                    >
                                        {flameLikes + unionLikes}
                                    </span>
                                    <div 
                                        className="qnFullDisplayLikesDropdown" 
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
                                <div className="qnFullDisplayCountItem loves">
                                    <i
                                        className={`
                                            qnFullDisplayPNGIcon 
                                            PNG_ICON_LOVE${isFlameLoved || isUnionLoved ? "D_LGT" : ""} 
                                            left
                                        `}  
                                        alt="like/liked" 
                                        onClick={loveHandler} 
                                        onMouseOver={() => setQNLovesDD(true)}
                                        onMouseLeave={() => setQNLovesDD(false)} 
                                    />
                                    <span 
                                        className="qnFullDisplayCounter left" 
                                        ref={loveCntRef}
                                    >
                                        {flameLoves + unionLoves}
                                    </span>
                                    <div 
                                        className="qnFullDisplayLovesDropdown" 
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
                            <div className="qnFullDisplayBottomRight">
                                <div className="qnFullDisplayCountItem answers">
                                    {user.unionName ?
                                        (
                                            <>
                                                {colorTheme(user) === "diamond" ?
                                                    (
                                                        <>
                                                            <i 
                                                                className="
                                                                    qnFullDisplayPNGIcon
                                                                    PNG_ICON_QN_ANSWER 
                                                                    diamond 
                                                                    right
                                                                "  
                                                                alt="qn-answer"  
                                                                onMouseOver={() => setQNAnswersDD(true)}
                                                                onMouseLeave={() => setQNAnswersDD(false)}
                                                            />
                                                            <span 
                                                                className="qnFullDisplayCounter right" 
                                                                ref={answerCntRef}
                                                            >
                                                                {flameAnswers + unionAnswers}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div 
                                                                className="qnFullDisplaySVGIconDiv"
                                                                onMouseOver={() => setQNAnswersDD(true)}
                                                                onMouseLeave={() => setQNAnswersDD(false)}
                                                            >
                                                                <ChatBubbleIconSpectrum 
                                                                    spectrum={colorTheme(user)} 
                                                                    cn={"qnFullDisplaySVGIcon right"} 
                                                                    flare={"question"} 
                                                                />
                                                                <span 
                                                                    className="qnFullDisplayCounter right" 
                                                                    ref={answerCntRef}
                                                                >
                                                                    {flameAnswers + unionAnswers}
                                                                </span>
                                                            </div>
                                                        </>
                                                    )
                                                } 
                                            </>
                                        ):(
                                            <>
                                               <div
                                                    className={`qnFullDisplaySVGIcon right ${colorTheme(user)}`}
                                                    onMouseOver={() => setQNAnswersDD(true)}
                                                    onMouseLeave={() => setQNAnswersDD(false)}
                                                >
                                                    {qnaIcon}
                                                </div>
                                                <span 
                                                    className="qnFullDisplayCounter right" 
                                                    ref={answerCntRef}
                                                >
                                                    {flameAnswers + unionAnswers}
                                                </span> 
                                            </>
                                        ) 
                                    } 
                                    <div 
                                        className="qnFullDisplayAnswersDropdown" 
                                        style={qnAnswersDD 
                                            ? flameAnswers + unionAnswers === 0 
                                                ? {opacity: "0", right: "4000px"} 
                                                : {opacity: "100%", left: `${AnswersCntWidth}`, top: "0px"} 
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
                                <div className="qnFullDisplayCountItem shares">
                                    <i 
                                        className={`
                                            qnFullDisplayPNGIcon
                                            PNG_ICON_SHARE
                                            ${colorTheme(user)} 
                                            right
                                        `}  
                                        alt="share-icon"
                                        onMouseOver={() => setQNSharesDD(true)}
                                        onMouseLeave={() => setQNSharesDD(false)}   
                                    />
                                    <span 
                                        className="qnFullDisplayCounter right" 
                                        ref={shareCntRef}
                                    >
                                        {flameShares + unionShares}
                                    </span>
                                    <div 
                                        className="qnFullDisplaySharesDropdown" 
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
                        <hr className={`qnFullDisplayHr HIGHER_BACKGROUND ${colorTheme(user)}`} />
                    </div> 
                    <div className="qnFullDisplayResponseFeed">
                    <div className={`qnfdCreateAnswerBtn-container ${currentUser.spectrum}`} onClick={() => dispatch(cAOpen())}>
                            <div 
                                className={`
                                    qnfdCreateAnswerBtnHigherSpectrumBackground
                                    HIGHER_BACKGROUND 
                                    ${currentUser.spectrum}
                                `} 
                            />
                            <div className="qnfdCreateAnswerBtnWhiteBackground" />
                            <div className={`qnfdCreateAnswerBtn union INNER_BOX_SHADOW ${colorTheme(currentUser)}`} /*onClick={createClickHandler}*/>
                                <div className="qnfdCreateAnswerBtnLeft">
                                    <Link 
                                        to={
                                            currentUser.unionName
                                                ? `/union-profile/unionName/${currentUser.unionName}`
                                                : `/flame-profile/userName/${currentUser.userName}`
                                        }
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <img 
                                            className="qnfdCreateAnswerBtnAvatar" 
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
                                    <label className="qnfdCreateAnswerBtnPlaceHolder">
                                        <span className="qnfdCreateAnswerBtnText intangible">
                                            {`Do you have an answer for `}
                                        </span>
                                        <Link 
                                            to={
                                                user.unionName
                                                    ? `/union-profile/unionName/${user.unionName}`
                                                    : `/flame-profile/userName/${user.userName}`
                                            }
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <span className={`qnfdCreateAnswerBtnText tangible ${colorTheme(user)}`}>
                                                {user.profileName}
                                            </span>
                                        </Link>
                                        <span className="qnfdCreateAnswerBtnText intangible">
                                            {`'s question, `}
                                        </span>
                                        {currentUser.unionName ?
                                            (
                                                <>
                                                    <Link 
                                                        to={`/flame-profile/userName/${flame.userName}`}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <span className={`qnfdCreateAnswerBtnText tangible ${flame.energy}`}>
                                                            {`${flame.firstName} `}
                                                        </span>
                                                    </Link>
                                                    <span className="qnfdCreateAnswerBtnText intangible">{" of "}</span>
                                                    <Link 
                                                        to={`/union-profile/unionName/${currentUser.unionName}`}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <span className={`qnfdCreateAnswerBtnText tangible ${currentUser.spectrum}`}>
                                                            {`${currentUser.profileName}`}
                                                        </span>
                                                    </Link>
                                                </>
                                            ) : (
                                                <>
                                                    <Link 
                                                        to={`/flame-profile/userName/${currentUser.userName}`}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <span className={`qnfdCreateAnswerBtnText tangible ${currentUser.energy}`}>
                                                            {`${currentUser.firstName}`}
                                                        </span>
                                                    </Link>
                                                </>
                                            )
                                        }                            
                                        <span className="qnfdCreateAnswerBtnText intangible">{"?"}</span>
                                    </label>
                                </div>
                                <div className="qnfdCreateAnswerBtnRight">
                                    <div 
                                        className={`
                                            qnfdCreateAnswerAskBtn
                                            HIGHER_BACKGROUND
                                            ${colorTheme(currentUser)}
                                        `}
                                    >
                                        {user.unionName ?
                                            (
                                                <>
                                                    {colorTheme(user) === "diamond" ?
                                                        (
                                                            <i 
                                                                className="
                                                                    qnfdCreateAnswerAskBtnIcon
                                                                    PNG_ICON_QN_ANSWER 
                                                                    diamond 
                                                                    right
                                                                "  
                                                                alt="qn-answer"  
                                                            />
                                                        ) : (
                                                            <div className="qnFullDisplaySVGIconDiv">
                                                                <ChatBubbleIconSpectrum  
                                                                    cn={"qnfdCreateAnswerAskBtnIcon right"} 
                                                                    flare={"question"} 
                                                                />
                                                            </div>
                                                        )
                                                    } 
                                                </>
                                            ):(
                                                <div className={`qnfdCreateAnswerAskBtnIcon right `}>{qnaIcon}</div>
                                            ) 
                                        } 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <AnswerFeed />
                    </div>
                </div>
            </div> 
            {cAnswer && <CreateAnswer question={question} />}           
            {editFlare && <EditQuestion qn={question} />}
            {deleteQN &&
                <div className="POPUP_SCREEN" >
                    <div 
                        style={
                            colorTheme === "diamond" 
                                ? {backgroundImage: "url(/misc/diamond-background.jpg)"} 
                                : {}
                        }
                        className={
                            `POPUP_BACKGROUND 
                            ${colorTheme}`
                        }
                    />
                    <div className="cdpQuestionScreenContainer">
                        <CDPQuestion qn={question}/>
                    </div>
                </div>
            }
        </>
    )
};

export default QNFullDisplay;