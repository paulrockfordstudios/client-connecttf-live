import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';
import DOMPurify from 'dompurify';
import { energyIcon, spectrumIcon } from '../../../../Utils/icons/icons';
import "./ReplyNots.css";
import ReplyIconSpectrum from '../../../../Utils/misc/ReplyIconSpectrum';
import { replyIcon } from '../../../../Lib/mui/icons';

function ReplyNots({ not }) {

    const notTopRef = useRef();

    const { notMDD, arrAddUser } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [ replyNot, setReplyNot ] = useState(not);
    const [ flare, setFlare ] = useState({});
    const [ seen, setSeen ] = useState(replyNot?.seen);
    const [ replyStatement, setReplyStatement ] = useState(null);
    const [ UserAdded, setUserAdded ] = useState(false);
    const [ height, setHeight ] = useState(0);

    useEffect(() => {
        const getFlare = async () => {
            try {
                const res = await axiosReq("GET", `/${replyNot.flareType}s/${replyNot.flareId}`)
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
    }, [replyStatement]);

    useEffect(() => {
        if(replyNot) {
            setSeen(replyNot.seen)
        }
    }, [replyNot])

    useEffect(() => {
        if (notMDD && seen === false) {
            setSeen(true);
        }
    },[notMDD, seen]);


    useEffect(() => {
        if (arrAddUser) {
            if (replyNot._id === arrAddUser.notificationId && replyNot.seen === false) {
                setReplyNot({...replyNot, users: [...replyNot.users, arrAddUser]});
                setUserAdded(true); 
            }
        }
    }, [arrAddUser]);

    useEffect(() => {
        if (replyNot.users.length === 1) {
            setReplyStatement(
                <span className="replyNotsTitleLeftPhrase">
                    <span className={`replyNotsName ${replyNot.users[0].color}`}>{`${replyNot.users[0].profileName} `}</span>     
                    <span className="replyNotsAction">{`replied to your ${replyNot.flareType}!`}</span>
                </span>
            )
        } else if (replyNot.users.length === 2) {
            setReplyStatement(
                <span className="replyNotsTitleLeftPhrase">
                    <span className={`replyNotsName ${replyNot.users[0].color}`}>{`${replyNot.users[0].profileName} `}</span>
                    <span className="replyNotsAction">{"and "}</span>
                    <span className={`replyNotsName ${replyNot.users[1].color}`}>{`${replyNot.users[1].profileName} `}</span>   
                    <span className="replyNotsAction">{`replied  to your ${replyNot.flareType}!`}</span>
                </span>
            )
        } else if (replyNot.users.length === 3) {
            setReplyStatement(
                <span className="replyNotsTitleLeftPhrase">
                    <span className={`replyNotsName ${replyNot.users[0].color}`}>{replyNot.users[0].profileName}</span>
                    <span className="replyNotsAction">{", "}</span>
                    <span className={`replyNotsName ${replyNot.users[1].color}`}>{replyNot.users[1].profileName}</span>   
                    <span className="replyNotsAction">{", and "}</span>
                    <span className="replyNotsName">1</span>
                    <span className="replyNotsAction">{` other ${replyNot.union ? "union" : "flame"} replied to your ${replyNot.flareType}!`}</span>
                </span>
            )
        } else if (replyNot.users.length > 3) {
            setReplyStatement(
                <span className="replyNotsTitleLeftPhrase">
                    <span className={`replyNotsName ${replyNot.users[0].color}`}>{replyNot.users[0].profileName}</span>
                    <span className="replyNotsAction">{", "}</span>
                    <span className={`replyNotsName ${replyNot.users[1].color}`}>{replyNot.users[1].profileName}</span>   
                    <span className="replyNotsAction">{", and "}</span>
                    <span className="replyNotsName">{`${replyNot.users.length - 2}`}</span>
                    <span className="replyNotsAction">{` other ${replyNot.union ? "union" : "flame"}s replied to your ${replyNot.flareType}!`}</span>
                </span>
            )
        }
    }, []);

    useEffect(() => {
        if (UserAdded) {
            if (replyNot.users.length === 1) {
                setReplyStatement(
                    <span className="replyNotsTitleLeftPhrase">
                        <span className={`replyNotsName ${replyNot.users[0].color}`}>{`${replyNot.users[0].profileName} `}</span>     
                        <span className="replyNotsAction">{`replied to your ${replyNot.flareType}!`}</span>
                    </span>
                )
            } else if (replyNot.users.length === 2) {
                setReplyStatement(
                    <span className="replyNotsTitleLeftPhrase">
                        <span className={`replyNotsName ${replyNot.users[0].color}`}>{`${replyNot.users[0].profileName} `}</span>
                        <span className="replyNotsAction">{"and "}</span>
                        <span className={`replyNotsName ${replyNot.users[1].color}`}>{`${replyNot.users[1].profileName} `}</span>   
                        <span className="replyNotsAction">{`replied  to your ${replyNot.flareType}!`}</span>
                    </span>
                )
            } else if (replyNot.users.length === 3) {
                setReplyStatement(
                    <span className="replyNotsTitleLeftPhrase">
                        <span className={`replyNotsName ${replyNot.users[0].color}`}>{replyNot.users[0].profileName}</span>
                        <span className="replyNotsAction">{", "}</span>
                        <span className={`replyNotsName ${replyNot.users[1].color}`}>{replyNot.users[1].profileName}</span>   
                        <span className="replyNotsAction">{", and "}</span>
                        <span className="replyNotsName">1</span>
                        <span className="replyNotsAction">{` other ${replyNot.union ? "union" : "flame"} replied to your ${replyNot.flareType}!`}</span>
                    </span>
                )
            } else if (replyNot.users.length > 3) {
                setReplyStatement(
                    <span className="replyNotsTitleLeftPhrase">
                        <span className={`replyNotsName ${replyNot.users[0].color}`}>{replyNot.users[0].profileName}</span>
                        <span className="replyNotsAction">{", "}</span>
                        <span className={`replyNotsName ${replyNot.users[1].color}`}>{replyNot.users[1].profileName}</span>   
                        <span className="replyNotsAction">{", and "}</span>
                        <span className="replyNotsName">{`${replyNot.users.length - 2}`}</span>
                        <span className="replyNotsAction">{` other ${replyNot.union ? "union" : "flame"}s replied to your ${replyNot.flareType}!`}</span>
                    </span>
                )
            }
            setUserAdded(false);
        }
    }, [UserAdded]);

    
    return (
        <Link className={`replyNots`} to={`/${replyNot.flareType}/${replyNot.flareId}`}>
            <div 
                className={`
                    replyNotsBackgroundTheme 
                    ${replyNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${seen? "seen" : "unseen"} 
                    ${replyNot.users[0].color}
                    lgt
                `} 
            />
            <hr 
                className={`
                    replyNotsHr 
                    top 
                    ${replyNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${replyNot.users[0].color}
                `} 
            />
            <div className={`replyNotsContainer`}>
                <div className="replyNotsLeft">
                    <img 
                        className={`replyNotsProfilePic`} 
                        src={replyNot.users[0].avatar 
                            ? PS + replyNot.users[0].avatar
                            : replyNot.union 
                                ? "/picBlanks/no-union-avatar.jpg"
                                : "/picBlanks/no-avatar.jpg"
                        } 
                        alt="" 
                    />
                    <img 
                        className={`replyNotsIcon ${replyNot.union ? "union" : "flame"}`} 
                        src={replyNot.union
                            ? spectrumIcon(replyNot.users[0].color)
                            : energyIcon(replyNot.users[0].color)
                        } 
                        alt="" 
                    />
                </div>
                <div className={`replyNotsRight ${replyNot.users[0].color}`}>
                    <div className="replyNotsRightTop"> 
                        <div className="replyNotsTitle">
                            <div ref={notTopRef} className="replyNotsTitleLeft">
                                {replyStatement}
                            </div>
                            <div className="replyNotsTitleRight">
                                {replyNot.union ?
                                    (
                                        <>
                                            {replyNot.users[0].color === "diamond" ? 
                                                (
                                                    <i 
                                                        className={`replyNotsTitleRightPNGIcon PNG_ICON_REPLY ${replyNot.users[0].color}`} 
                                                        alt="reply/replyd" 
                                                    />
                                                ) : (
                                                    <ReplyIconSpectrum 
                                                        spectrum={replyNot.users[0].color} 
                                                        cn={"replyNotsTitleRightPNGIcon"}  
                                                    />
                                                )
                                            }
                                        </>
                                    ) : (
                                        <div className={`replyNotsTitleRightPNGIcon ${replyNot.Users[0].color}`}>{replyIcon}</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>                                                      
                    <div className="replyNotsRightBottom">
                        {replyNot.flareType === "post" || replyNot.flareType === "Blog"
                            ? flare?.title?.length > 0 
                                ? <span 
                                    className="replyNotsRetort title" 
                                    style={height > 32 ? {height: "18px"} : {height: "36px"}} 
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.title)}} 
                                />
                                : <span
                                    className="replyNotsRetort description"
                                    style={height > 36 ? {height: "14px"} : {height: "28px"}}
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.description)}} 
                                />
                            : replyNot.flareType === "reply" || replyNot.flareType === "reply" || replyNot.flareType === "reply"
                                ? <span
                                    className="replyNotsRetort description" 
                                    style={height > 36 ? {height: "14px"} : {height: "28px"}}
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.description)}} 
                                />
                                : replyNot.flareType === "question"
                                    ? <span 
                                        className="replyNotsRetort question"
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
                    replyNotsHr 
                    bottom 
                    ${replyNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${replyNot.users[0].color}
                `} 
            />
        </Link>
    )
}

export default ReplyNots;