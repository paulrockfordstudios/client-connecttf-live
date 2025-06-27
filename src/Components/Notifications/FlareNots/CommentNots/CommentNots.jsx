import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';
import DOMPurify from 'dompurify';
import { energyIcon, spectrumIcon } from '../../../../Utils/icons/icons';
import "./CommentNots.css";
import ChatBubbleIconSpectrum from '../../../../Utils/misc/ChatBubbleIconSpectrum';
import { chatboIcon } from '../../../../Lib/mui/icons';

function CommentNots({ not }) {

    const notTopRef = useRef();

    const { notMDD, arrAddUser } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [ commentNot, setCommentNot ] = useState(not);
    const [ flare, setFlare ] = useState({});
    const [ seen, setSeen ] = useState(commentNot?.seen);
    const [ commentStatement, setCommentStatement ] = useState(null);
    const [ userAdded, setUserAdded ] = useState(false);
    const [ height, setHeight ] = useState(0);

    useEffect(() => {
        const getFlare = async () => {
            try {
                const res = await axiosReq("GET", `/${commentNot.flareType}s/${commentNot.flareId}`)
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
    }, [commentStatement]);

    useEffect(() => {
        if(commentNot) {
            setSeen(commentNot.seen)
        }
    }, [commentNot])

    useEffect(() => {
        if (notMDD && seen === false) {
            setSeen(true);
        }
    },[notMDD, seen]);


    useEffect(() => {
        if (arrAddUser) {
            if (commentNot._id === arrAddUser.notificationId && commentNot.seen === false) {
                setCommentNot({...commentNot, users: [...commentNot.users, arrAddUser]});
                setUserAdded(true); 
            }
        }
    }, [arrAddUser]);

    useEffect(() => {
        if (commentNot.users.length === 1) {
            setCommentStatement(
                <span className="commentNotsTitleLeftPhrase">
                    <span className={`commentNotsName ${commentNot.users[0].color}`}>{`${commentNot.users[0].profileName} `}</span>     
                    <span className="commentNotsAction">{`commented on your ${commentNot.flareType}!`}</span>
                </span>
            )
        } else if (commentNot.users.length === 2) {
            setCommentStatement(
                <span className="commentNotsTitleLeftPhrase">
                    <span className={`commentNotsName ${commentNot.users[0].color}`}>{`${commentNot.users[0].profileName} `}</span>
                    <span className="commentNotsAction">{"and "}</span>
                    <span className={`commentNotsName ${commentNot.users[1].color}`}>{`${commentNot.users[1].profileName} `}</span>   
                    <span className="commentNotsAction">{`commented on your ${commentNot.flareType}!`}</span>
                </span>
            )
        } else if (commentNot.users.length === 3) {
            setCommentStatement(
                <span className="commentNotsTitleLeftPhrase">
                    <span className={`commentNotsName ${commentNot.users[0].color}`}>{commentNot.users[0].profileName}</span>
                    <span className="commentNotsAction">{", "}</span>
                    <span className={`commentNotsName ${commentNot.users[1].color}`}>{commentNot.users[1].profileName}</span>   
                    <span className="commentNotsAction">{", and "}</span>
                    <span className="commentNotsName">1</span>
                    <span className="commentNotsAction">{` other ${commentNot.union ? "union" : "flame"} commented on your ${commentNot.flareType}!`}</span>
                </span>
            )
        } else if (commentNot.users.length > 3) {
            setCommentStatement(
                <span className="commentNotsTitleLeftPhrase">
                    <span className={`commentNotsName ${commentNot.users[0].color}`}>{commentNot.users[0].profileName}</span>
                    <span className="commentNotsAction">{", "}</span>
                    <span className={`commentNotsName ${commentNot.users[1].color}`}>{commentNot.users[1].profileName}</span>   
                    <span className="commentNotsAction">{", and "}</span>
                    <span className="commentNotsName">{`${commentNot.users.length - 2}`}</span>
                    <span className="commentNotsAction">{` other ${commentNot.union ? "union" : "flame"}s commented on your ${commentNot.flareType}!`}</span>
                </span>
            )
        }
    }, []);

    useEffect(() => {
        if (userAdded) {
            if (commentNot.users.length === 1) {
                setCommentStatement(
                    <span className="commentNotsTitleLeftPhrase">
                        <span className={`commentNotsName ${commentNot.users[0].color}`}>{`${commentNot.users[0].profileName} `}</span>     
                        <span className="commentNotsAction">{`commented on your ${commentNot.flareType}!`}</span>
                    </span>
                )
            } else if (commentNot.users.length === 2) {
                setCommentStatement(
                    <span className="commentNotsTitleLeftPhrase">
                        <span className={`commentNotsName ${commentNot.users[0].color}`}>{`${commentNot.users[0].profileName} `}</span>
                        <span className="commentNotsAction">{"and "}</span>
                        <span className={`commentNotsName ${commentNot.users[1].color}`}>{`${commentNot.users[1].profileName} `}</span>   
                        <span className="commentNotsAction">{`commented on your ${commentNot.flareType}!`}</span>
                    </span>
                )
            } else if (commentNot.users.length === 3) {
                setCommentStatement(
                    <span className="commentNotsTitleLeftPhrase">
                        <span className={`commentNotsName ${commentNot.users[0].color}`}>{commentNot.users[0].profileName}</span>
                        <span className="commentNotsAction">{", "}</span>
                        <span className={`commentNotsName ${commentNot.users[1].color}`}>{commentNot.users[1].profileName}</span>   
                        <span className="commentNotsAction">{", and "}</span>
                        <span className="commentNotsName">1</span>
                        <span className="commentNotsAction">{` other ${commentNot.union ? "union" : "flame"} commented on your ${commentNot.flareType}!`}</span>
                    </span>
                )
            } else if (commentNot.users.length > 3) {
                setCommentStatement(
                    <span className="commentNotsTitleLeftPhrase">
                        <span className={`commentNotsName ${commentNot.users[0].color}`}>{commentNot.users[0].profileName}</span>
                        <span className="commentNotsAction">{", "}</span>
                        <span className={`commentNotsName ${commentNot.users[1].color}`}>{commentNot.users[1].profileName}</span>   
                        <span className="commentNotsAction">{", and "}</span>
                        <span className="commentNotsName">{`${commentNot.users.length - 2}`}</span>
                        <span className="commentNotsAction">{` other ${commentNot.union ? "union" : "flame"}s commented on your ${commentNot.flareType}!`}</span>
                    </span>
                )
            }
            setCommentrAdded(false);
        }
    }, [userAdded]);

    
    return (
        <Link className={`commentNots`} to={`/${commentNot.flareType}/${commentNot.flareId}`}>
            <div 
                className={`
                    commentNotsBackgroundTheme 
                    ${commentNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${seen? "seen" : "unseen"} 
                    ${commentNot.users[0].color}
                    lgt
                `} 
            />
            <hr 
                className={`
                    commentNotsHr 
                    top 
                    ${commentNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${commentNot.users[0].color}
                `} 
            />
            <div className={`commentNotsContainer`}>
                <div className="commentNotsLeft">
                    <img 
                        className={`commentNotsProfilePic`} 
                        src={commentNot.users[0].avatar 
                            ? PS + commentNot.users[0].avatar
                            : commentNot.union 
                                ? "/picBlanks/no-union-avatar.jpg"
                                : "/picBlanks/no-avatar.jpg"
                        } 
                        alt="" 
                    />
                    <img 
                        className={`commentNotsIcon ${commentNot.union ? "union" : "flame"}`} 
                        src={commentNot.union
                            ? spectrumIcon(commentNot.users[0].color)
                            : energyIcon(commentNot.users[0].color)
                        } 
                        alt="" 
                    />
                </div>
                <div className={`commentNotsRight ${commentNot.users[0].color}`}>
                    <div className="commentNotsRightTop"> 
                        <div className="commentNotsTitle">
                            <div ref={notTopRef} className="commentNotsTitleLeft">
                                {commentStatement}
                            </div>
                            <div className="commentNotsTitleRight">
                                {commentNot.union ?
                                    (
                                        <>
                                            {commentNot.users[0].color === "diamond" ? 
                                                (
                                                    <i 
                                                        className={`commentNotsTitleRightPNGIcon PNG_ICON_CHAT_BUBBLE ${commentNot.users[0].color}`} 
                                                        alt="comment/commentd" 
                                                    />
                                                ) : (
                                                    <ChatBubbleIconSpectrum 
                                                        spectrum={commentNot.users[0].color} 
                                                        cn={"commentNotsTitleRightPNGIcon"}  
                                                        flare={commentNot.flareType}
                                                    />
                                                )
                                            }
                                        </>
                                    ) : (
                                        <div className={`commentNotsTitleRightPNGIcon ${commentNot.users[0].color}`}>{chatboIcon}</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>                                                      
                    <div className="commentNotsRightBottom">
                        {commentNot.flareType === "post" || commentNot.flareType === "Blog"
                            ? flare?.title?.length > 0 
                                ? <span 
                                    className="commentNotsRetort title" 
                                    style={height > 32 ? {height: "18px"} : {height: "36px"}} 
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.title)}} 
                                />
                                : <span
                                    className="commentNotsRetort description"
                                    style={height > 36 ? {height: "14px"} : {height: "28px"}}
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.description)}} 
                                />
                            : commentNot.flareType === "comment" || commentNot.flareType === "comment" || commentNot.flareType === "comment"
                                ? <span
                                    className="commentNotsRetort description" 
                                    style={height > 36 ? {height: "14px"} : {height: "28px"}}
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.description)}} 
                                />
                                : commentNot.flareType === "question"
                                    ? <span 
                                        className="commentNotsRetort question"
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
                    commentNotsHr 
                    bottom 
                    ${commentNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${commentNot.users[0].color}
                `} 
            />
        </Link>
    )
}

export default CommentNots;