import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';
import DOMPurify from 'dompurify';
import { energyIcon, spectrumIcon } from '../../../../Utils/icons/icons';
import "./LikeNots.css";

function LikeNots({ not }) {

    const notTopRef = useRef();

    const { notMDD, arrAddUser } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [ likeNot, setLikeNot ] = useState(not);
    const [ flare, setFlare ] = useState({});
    const [ seen, setSeen ] = useState(likeNot?.seen);
    const [ likeStatement, setlikeStatement ] = useState(null);
    const [ UserAdded, setUserAdded ] = useState(false);
    const [ height, setHeight ] = useState(0);

    useEffect(() => {
        const getFlare = async () => {
            try {
                const res = await axiosReq("GET", `/${likeNot.flareType}s/${likeNot.flareId}`)
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
    }, [likeStatement]);

    useEffect(() => {
        if(likeNot) {
            setSeen(likeNot.seen)
        }
    }, [likeNot])

    useEffect(() => {
        if (notMDD && seen === false) {
            setSeen(true);
        }
    },[notMDD, seen]);


    useEffect(() => {
        if (arrAddUser) {
            if (likeNot._id === arrAddUser.notificationId && likeNot.seen === false) {
                setLikeNot({...likeNot, users: [...likeNot.users, arrAddUser]});
                setUserAdded(true); 
            }
        }
    }, [arrAddUser]);

    useEffect(() => {
        if (likeNot.users.length === 1) {
            setlikeStatement(
                <span className="likeNotsTitleLeftPhrase">
                    <span className={`likeNotsName ${likeNot.users[0].color}`}>{`${likeNot.users[0].profileName} `}</span>     
                    <span className="likeNotsAction">{`liked your ${likeNot.flareType}!`}</span>
                </span>
            )
        } else if (likeNot.users.length === 2) {
            setlikeStatement(
                <span className="likeNotsTitleLeftPhrase">
                    <span className={`likeNotsName ${likeNot.users[0].color}`}>{`${likeNot.users[0].profileName} `}</span>
                    <span className="likeNotsAction">{"and "}</span>
                    <span className={`likeNotsName ${likeNot.users[1].color}`}>{`${likeNot.users[1].profileName} `}</span>   
                    <span className="likeNotsAction">{`liked your ${likeNot.flareType}!`}</span>
                </span>
            )
        } else if (likeNot.users.length === 3) {
            setlikeStatement(
                <span className="likeNotsTitleLeftPhrase">
                    <span className={`likeNotsName ${likeNot.users[0].color}`}>{likeNot.users[0].profileName}</span>
                    <span className="likeNotsAction">{", "}</span>
                    <span className={`likeNotsName ${likeNot.users[1].color}`}>{likeNot.users[1].profileName}</span>   
                    <span className="likeNotsAction">{", and "}</span>
                    <span className="likeNotsName">1</span>
                    <span className="likeNotsAction">{` other ${likeNot.union ? "union" : "flame"} liked your ${likeNot.flareType}!`}</span>
                </span>
            )
        } else if (likeNot.users.length > 3) {
            setlikeStatement(
                <span className="likeNotsTitleLeftPhrase">
                    <span className={`likeNotsName ${likeNot.users[0].color}`}>{likeNot.users[0].profileName}</span>
                    <span className="likeNotsAction">{", "}</span>
                    <span className={`likeNotsName ${likeNot.users[1].color}`}>{likeNot.users[1].profileName}</span>   
                    <span className="likeNotsAction">{", and "}</span>
                    <span className="likeNotsName">{`${likeNot.users.length - 2}`}</span>
                    <span className="likeNotsAction">{` other ${likeNot.union ? "union" : "flame"}s liked your ${likeNot.flareType}!`}</span>
                </span>
            )
        }
    }, []);

    useEffect(() => {
        if (UserAdded) {
            if (likeNot.users.length === 1) {
                setlikeStatement(
                    <span className="likeNotsTitleLeftPhrase">
                        <span className={`likeNotsName ${likeNot.users[0].color}`}>{`${likeNot.users[0].profileName} `}</span>     
                        <span className="likeNotsAction">{`liked your ${likeNot.flareType}!`}</span>
                    </span>
                )
            } else if (likeNot.users.length === 2) {
                setlikeStatement(
                    <span className="likeNotsTitleLeftPhrase">
                        <span className={`likeNotsName ${likeNot.users[0].color}`}>{`${likeNot.users[0].profileName} `}</span>
                        <span className="likeNotsAction">{"and "}</span>
                        <span className={`likeNotsName ${likeNot.users[1].color}`}>{`${likeNot.users[1].profileName} `}</span>   
                        <span className="likeNotsAction">{`liked your ${likeNot.flareType}!`}</span>
                    </span>
                )
            } else if (likeNot.users.length === 3) {
                setlikeStatement(
                    <span className="likeNotsTitleLeftPhrase">
                        <span className={`likeNotsName ${likeNot.users[0].color}`}>{likeNot.users[0].profileName}</span>
                        <span className="likeNotsAction">{", "}</span>
                        <span className={`likeNotsName ${likeNot.users[1].color}`}>{likeNot.users[1].profileName}</span>   
                        <span className="likeNotsAction">{", and "}</span>
                        <span className="likeNotsName">1</span>
                        <span className="likeNotsAction">{` other ${likeNot.union ? "union" : "flame"} liked your ${likeNot.flareType}!`}</span>
                    </span>
                )
            } else if (likeNot.users.length > 3) {
                setlikeStatement(
                    <span className="likeNotsTitleLeftPhrase">
                        <span className={`likeNotsName ${likeNot.users[0].color}`}>{likeNot.users[0].profileName}</span>
                        <span className="likeNotsAction">{", "}</span>
                        <span className={`likeNotsName ${likeNot.users[1].color}`}>{likeNot.users[1].profileName}</span>   
                        <span className="likeNotsAction">{", and "}</span>
                        <span className="likeNotsName">{`${likeNot.users.length - 2}`}</span>
                        <span className="likeNotsAction">{` other ${likeNot.union ? "union" : "flame"}s liked your ${likeNot.flareType}!`}</span>
                    </span>
                )
            }
            setUserAdded(false);
        }
    }, [UserAdded]);

    
    return (
        <Link className={`likeNots`} to={`/${likeNot.flareType}/${likeNot.flareId}`}>
            <div 
                className={`
                    likeNotsBackgroundTheme 
                    ${likeNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${seen ? "seen" : "unseen"} 
                    ${likeNot.users[0].color}
                    lgt
                `} 
            />
            <hr 
                className={`
                    likeNotsHr 
                    top 
                    ${likeNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${likeNot.users[0].color}
                `} 
            />
            <div className={`likeNotsContainer`}>
                <div className="likeNotsLeft">
                    <img 
                        className={`likeNotsProfilePic`} 
                        src={likeNot.users[0].avatar 
                            ? PS + likeNot.users[0].avatar
                            : likeNot.union 
                                ? "/picBlanks/no-union-avatar.jpg"
                                : "/picBlanks/no-avatar.jpg"
                        } 
                        alt="" 
                    />
                    <img 
                        className={`likeNotsIcon ${likeNot.union ? "union" : "flame"}`} 
                        src={likeNot.union
                            ? spectrumIcon(likeNot.users[0].color)
                            : energyIcon(likeNot.users[0].color)
                        } 
                        alt="" 
                    />
                </div>
                <div className={`likeNotsRight ${likeNot.users[0].color}`}>
                    <div className="likeNotsRightTop"> 
                        <div className="likeNotsTitle">
                            <div ref={notTopRef} className="likeNotsTitleLeft">
                                {likeStatement}
                            </div>
                            <div className="likeNotsTitleRight">
                                <i 
                                    className={`likeNotsTitleRightPNGIcon PNG_ICON_LIKED_LGT`} 
                                    alt="like/liked" 
                                />
                            </div>
                        </div>
                    </div>                                                      
                    <div className="likeNotsRightBottom">
                        {likeNot.flareType === "post" || likeNot.flareType === "Blog"
                            ? flare?.title?.length > 0 
                                ? <span 
                                    className="likeNotsRetort title" 
                                    style={height > 32 ? {height: "18px"} : {height: "36px"}} 
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.title)}} 
                                />
                                : <span
                                    className="likeNotsRetort description"
                                    style={height > 36 ? {height: "14px"} : {height: "28px"}}
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.description)}} 
                                />
                            : likeNot.flareType === "comment" || likeNot.flareType === "answer" || likeNot.flareType === "comment"
                                ? <span
                                    className="likeNotsRetort description" 
                                    style={height > 36 ? {height: "14px"} : {height: "28px"}}
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.description)}} 
                                />
                                : likeNot.flareType === "question"
                                    ? <span 
                                        className="likeNotsRetort question"
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
                    likeNotsHr 
                    bottom 
                    ${likeNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${likeNot.users[0].color}
                `} 
            />
        </Link>
    )
}

export default LikeNots;