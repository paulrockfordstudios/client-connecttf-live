import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';
import DOMPurify from 'dompurify';
import { energyIcon, spectrumIcon } from '../../../../Utils/icons/icons';
import "./reviewNots.css";
import { starIcon } from '../../../../Lib/mui/icons';


function ReviewNots({ not }) {

    const notTopRef = useRef();

    const { notMDD, arrAddUser } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [ reviewNot, setReviewNot ] = useState(not);
    const [ flare, setFlare ] = useState({});
    const [ seen, setSeen ] = useState(reviewNot?.seen);
    const [ reviewStatement, setReviewStatement ] = useState(null);
    const [ UserAdded, setUserAdded ] = useState(false);
    const [ height, setHeight ] = useState(0);

    useEffect(() => {
        const getFlare = async () => {
            try {
                const res = await axiosReq("GET", `/${reviewNot.flareType}s/${reviewNot.flareId}`)
                setFlare(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        getFlare();
    }, []);

    useEffect(() => {
        const getDims = () => {
            const displayHeight = notTopRef?.current?.clientHeight;
            setHeight(displayHeight);
        }
        getDims();
    }, [reviewStatement]);

    useEffect(() => {
        if(reviewNot) {
            setSeen(reviewNot.seen)
        }
    }, [reviewNot])

    useEffect(() => {
        if (notMDD && seen === false) {
            setSeen(true);
        }
    },[notMDD, seen]);


    useEffect(() => {
        if (arrAddUser) {
            if (reviewNot._id === arrAddUser.notificationId && reviewNot.seen === false) {
                setReviewNot({...reviewNot, users: [...reviewNot.users, arrAddUser]});
                setUserAdded(true); 
            }
        }
    }, [arrAddUser]);

    useEffect(() => {
        if (reviewNot.users.length === 1) {
            setReviewStatement(
                <span className="reviewNotsTitleLeftPhrase">
                    <span className={`reviewNotsName ${reviewNot.users[0].color}`}>{`${reviewNot.users[0].profileName} `}</span>     
                    <span className="reviewNotsAction">{`reviewed your ${reviewNot.flareType}!`}</span>
                </span>
            )
        } else if (reviewNot.users.length === 2) {
            setReviewStatement(
                <span className="reviewNotsTitleLeftPhrase">
                    <span className={`reviewNotsName ${reviewNot.users[0].color}`}>{`${reviewNot.users[0].profileName} `}</span>
                    <span className="reviewNotsAction">{"and "}</span>
                    <span className={`reviewNotsName ${reviewNot.users[1].color}`}>{`${reviewNot.users[1].profileName} `}</span>   
                    <span className="reviewNotsAction">{`reviewed your ${reviewNot.flareType}!`}</span>
                </span>
            )
        } else if (reviewNot.users.length === 3) {
            setReviewStatement(
                <span className="reviewNotsTitleLeftPhrase">
                    <span className={`reviewNotsName ${reviewNot.users[0].color}`}>{reviewNot.users[0].profileName}</span>
                    <span className="reviewNotsAction">{", "}</span>
                    <span className={`reviewNotsName ${reviewNot.users[1].color}`}>{reviewNot.users[1].profileName}</span>   
                    <span className="reviewNotsAction">{", and "}</span>
                    <span className="reviewNotsName">1</span>
                    <span className="reviewNotsAction">{` other ${reviewNot.union ? "union" : "flame"} reviewed your ${reviewNot.flareType}!`}</span>
                </span>
            )
        } else if (reviewNot.users.length > 3) {
            setReviewStatement(
                <span className="reviewNotsTitleLeftPhrase">
                    <span className={`reviewNotsName ${reviewNot.users[0].color}`}>{reviewNot.users[0].profileName}</span>
                    <span className="reviewNotsAction">{", "}</span>
                    <span className={`reviewNotsName ${reviewNot.users[1].color}`}>{reviewNot.users[1].profileName}</span>   
                    <span className="reviewNotsAction">{", and "}</span>
                    <span className="reviewNotsName">{`${reviewNot.users.length - 2}`}</span>
                    <span className="reviewNotsAction">{` other ${reviewNot.union ? "union" : "flame"}s reviewed your ${reviewNot.flareType}!`}</span>
                </span>
            )
        }
    }, []);

    useEffect(() => {
        if (UserAdded) {
            if (reviewNot.users.length === 1) {
                setReviewStatement(
                    <span className="reviewNotsTitleLeftPhrase">
                        <span className={`reviewNotsName ${reviewNot.users[0].color}`}>{`${reviewNot.users[0].profileName} `}</span>     
                        <span className="reviewNotsAction">{`reviewed your ${reviewNot.flareType}!`}</span>
                    </span>
                )
            } else if (reviewNot.users.length === 2) {
                setReviewStatement(
                    <span className="reviewNotsTitleLeftPhrase">
                        <span className={`reviewNotsName ${reviewNot.users[0].color}`}>{`${reviewNot.users[0].profileName} `}</span>
                        <span className="reviewNotsAction">{"and "}</span>
                        <span className={`reviewNotsName ${reviewNot.users[1].color}`}>{`${reviewNot.users[1].profileName} `}</span>   
                        <span className="reviewNotsAction">{`reviewed your ${reviewNot.flareType}!`}</span>
                    </span>
                )
            } else if (reviewNot.users.length === 3) {
                setReviewStatement(
                    <span className="reviewNotsTitleLeftPhrase">
                        <span className={`reviewNotsName ${reviewNot.users[0].color}`}>{reviewNot.users[0].profileName}</span>
                        <span className="reviewNotsAction">{", "}</span>
                        <span className={`reviewNotsName ${reviewNot.users[1].color}`}>{reviewNot.users[1].profileName}</span>   
                        <span className="reviewNotsAction">{", and "}</span>
                        <span className="reviewNotsName">1</span>
                        <span className="reviewNotsAction">{` other ${reviewNot.union ? "union" : "flame"} reviewed your ${reviewNot.flareType}!`}</span>
                    </span>
                )
            } else if (reviewNot.users.length > 3) {
                setReviewStatement(
                    <span className="reviewNotsTitleLeftPhrase">
                        <span className={`reviewNotsName ${reviewNot.users[0].color}`}>{reviewNot.users[0].profileName}</span>
                        <span className="reviewNotsAction">{", "}</span>
                        <span className={`reviewNotsName ${reviewNot.users[1].color}`}>{reviewNot.users[1].profileName}</span>   
                        <span className="reviewNotsAction">{", and "}</span>
                        <span className="reviewNotsName">{`${reviewNot.users.length - 2}`}</span>
                        <span className="reviewNotsAction">{` other ${reviewNot.union ? "union" : "flame"}s reviewed your ${reviewNot.flareType}!`}</span>
                    </span>
                )
            }
            setUserAdded(false);
        }
    }, [UserAdded]);

    
    return (
        <Link className={`reviewNots`} to={`/${reviewNot.flareType}/${reviewNot.flareId}`}>
            <div 
                className={`
                    reviewNotsBackgroundTheme 
                    ${reviewNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${seen? "seen" : "unseen"} 
                    ${reviewNot.users[0].color}
                    lgt
                `} 
            />
            <hr 
                className={`
                    reviewNotsHr 
                    top 
                    ${reviewNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${reviewNot.users[0].color}
                `} 
            />
            <div className={`reviewNotsContainer`}>
                <div className="reviewNotsLeft">
                    <img 
                        className={`reviewNotsProfilePic`} 
                        src={reviewNot.users[0].avatar 
                            ? PS + reviewNot.users[0].avatar
                            : reviewNot.union 
                                ? "/picBlanks/no-union-avatar.jpg"
                                : "/picBlanks/no-avatar.jpg"
                        } 
                        alt="" 
                    />
                    <img 
                        className={`reviewNotsIcon ${reviewNot.union ? "union" : "flame"}`} 
                        src={reviewNot.union
                            ? spectrumIcon(reviewNot.users[0].color)
                            : energyIcon(reviewNot.users[0].color)
                        } 
                        alt="" 
                    />
                </div>
                <div className={`reviewNotsRight ${reviewNot.users[0].color}`}>
                    <div className="reviewNotsRightTop"> 
                        <div className="reviewNotsTitle">
                            <div ref={notTopRef} className="reviewNotsTitleLeft">
                                {reviewStatement}
                            </div>
                            <div className="reviewNotsTitleRight">
                                <div className="reviewNotsTitleRightPNGIcon">{starIcon}</div>
                            </div>
                        </div>
                    </div>                                                      
                    <div className="reviewNotsRightBottom">
                        {reviewNot.flareType === "post" || reviewNot.flareType === "Blog"
                            ? flare?.title?.length > 0 
                                ? <span 
                                    className="reviewNotsRetort title" 
                                    style={height > 32 ? {height: "18px"} : {height: "36px"}} 
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.title)}} 
                                />
                                : <span
                                    className="reviewNotsRetort description"
                                    style={height > 36 ? {height: "14px"} : {height: "28px"}}
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.description)}} 
                                />
                            : reviewNot.flareType === "review" || reviewNot.flareType === "review" || reviewNot.flareType === "review"
                                ? <span
                                    className="reviewNotsRetort description" 
                                    style={height > 36 ? {height: "14px"} : {height: "28px"}}
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.description)}} 
                                />
                                : reviewNot.flareType === "question"
                                    ? <span 
                                        className="reviewNotsRetort question"
                                        style={height > 32 ? {height: "18px"} : {height: "36px"}}
                                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.question)}} 
                                    />
                                    : ""
                        }               
                    </div>
                </div>
            </div>
            <hr 
                className={`
                    reviewNotsHr 
                    bottom 
                    ${reviewNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${reviewNot.users[0].color}
                `} 
            />
        </Link>
    )
}

export default ReviewNots;