import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';
import DOMPurify from 'dompurify';
import { energyIcon, spectrumIcon } from '../../../../Utils/icons/icons';
import "./AnswerNots.css";
import ChatBubbleIconSpectrum from '../../../../Utils/misc/ChatBubbleIconSpectrum';
import { qnaIcon } from '../../../../Lib/mui/icons';

function AnswerNots({ not }) {

    const notTopRef = useRef();

    const { notMDD, arrAddUser } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [ answerNot, setanswerNot ] = useState(not);
    const [ flare, setFlare ] = useState({});
    const [ seen, setSeen ] = useState(answerNot?.seen);
    const [ answerStatement, setAnswerStatement ] = useState(null);
    const [ UserAdded, setUserAdded ] = useState(false);
    const [ height, setHeight ] = useState(0);

    useEffect(() => {
        const getFlare = async () => {
            try {
                const res = await axiosReq("GET", `/${answerNot.flareType}s/${answerNot.flareId}`)
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
    }, [answerStatement]);

    useEffect(() => {
        if(answerNot) {
            setSeen(answerNot.seen)
        }
    }, [answerNot])

    useEffect(() => {
        if (notMDD && seen === false) {
            setSeen(true);
        }
    },[notMDD, seen]);


    useEffect(() => {
        if (arrAddUser) {
            if (answerNot._id === arrAddUser.notificationId && answerNot.seen === false) {
                setanswerNot({...answerNot, users: [...answerNot.users, arrAddUser]});
                setUserAdded(true); 
            }
        }
    }, [arrAddUser]);

    useEffect(() => {
        if (answerNot.users.length === 1) {
            setAnswerStatement(
                <span className="answerNotsTitleLeftPhrase">
                    <span className={`answerNotsName ${answerNot.users[0].color}`}>{`${answerNot.users[0].profileName} `}</span>     
                    <span className="answerNotsAction">{`answered your question!`}</span>
                </span>
            )
        } else if (answerNot.users.length === 2) {
            setAnswerStatement(
                <span className="answerNotsTitleLeftPhrase">
                    <span className={`answerNotsName ${answerNot.users[0].color}`}>{`${answerNot.users[0].profileName} `}</span>
                    <span className="answerNotsAction">{"and "}</span>
                    <span className={`answerNotsName ${answerNot.users[1].color}`}>{`${answerNot.users[1].profileName} `}</span>   
                    <span className="answerNotsAction">{`answered your question!`}</span>
                </span>
            )
        } else if (answerNot.users.length === 3) {
            setAnswerStatement(
                <span className="answerNotsTitleLeftPhrase">
                    <span className={`answerNotsName ${answerNot.users[0].color}`}>{answerNot.users[0].profileName}</span>
                    <span className="answerNotsAction">{", "}</span>
                    <span className={`answerNotsName ${answerNot.users[1].color}`}>{answerNot.users[1].profileName}</span>   
                    <span className="answerNotsAction">{", and "}</span>
                    <span className="answerNotsName">1</span>
                    <span className="answerNotsAction">{` other ${answerNot.union ? "union" : "flame"} answered your question!`}</span>
                </span>
            )
        } else if (answerNot.users.length > 3) {
            setAnswerStatement(
                <span className="answerNotsTitleLeftPhrase">
                    <span className={`answerNotsName ${answerNot.users[0].color}`}>{answerNot.users[0].profileName}</span>
                    <span className="answerNotsAction">{", "}</span>
                    <span className={`answerNotsName ${answerNot.users[1].color}`}>{answerNot.users[1].profileName}</span>   
                    <span className="answerNotsAction">{", and "}</span>
                    <span className="answerNotsName">{`${answerNot.users.length - 2}`}</span>
                    <span className="answerNotsAction">{` other ${answerNot.union ? "union" : "flame"}s answered your question!`}</span>
                </span>
            )
        }
    }, []);

    useEffect(() => {
        if (UserAdded) {
            if (answerNot.users.length === 1) {
                setAnswerStatement(
                    <span className="answerNotsTitleLeftPhrase">
                        <span className={`answerNotsName ${answerNot.users[0].color}`}>{`${answerNot.users[0].profileName} `}</span>     
                        <span className="answerNotsAction">{`answered your question!`}</span>
                    </span>
                )
            } else if (answerNot.users.length === 2) {
                setAnswerStatement(
                    <span className="answerNotsTitleLeftPhrase">
                        <span className={`answerNotsName ${answerNot.users[0].color}`}>{`${answerNot.users[0].profileName} `}</span>
                        <span className="answerNotsAction">{"and "}</span>
                        <span className={`answerNotsName ${answerNot.users[1].color}`}>{`${answerNot.users[1].profileName} `}</span>   
                        <span className="answerNotsAction">{`answered your question!`}</span>
                    </span>
                )
            } else if (answerNot.users.length === 3) {
                setAnswerStatement(
                    <span className="answerNotsTitleLeftPhrase">
                        <span className={`answerNotsName ${answerNot.users[0].color}`}>{answerNot.users[0].profileName}</span>
                        <span className="answerNotsAction">{", "}</span>
                        <span className={`answerNotsName ${answerNot.users[1].color}`}>{answerNot.users[1].profileName}</span>   
                        <span className="answerNotsAction">{", and "}</span>
                        <span className="answerNotsName">1</span>
                        <span className="answerNotsAction">{` other ${answerNot.union ? "union" : "flame"} answered your question!`}</span>
                    </span>
                )
            } else if (answerNot.users.length > 3) {
                setAnswerStatement(
                    <span className="answerNotsTitleLeftPhrase">
                        <span className={`answerNotsName ${answerNot.users[0].color}`}>{answerNot.users[0].profileName}</span>
                        <span className="answerNotsAction">{", "}</span>
                        <span className={`answerNotsName ${answerNot.users[1].color}`}>{answerNot.users[1].profileName}</span>   
                        <span className="answerNotsAction">{", and "}</span>
                        <span className="answerNotsName">{`${answerNot.users.length - 2}`}</span>
                        <span className="answerNotsAction">{` other ${answerNot.union ? "union" : "flame"}s answered your question!`}</span>
                    </span>
                )
            }
            setUserAdded(false);
        }
    }, [UserAdded]);

    
    return (
        <Link className={`answerNots`} to={`/${answerNot.flareType}/${answerNot.flareId}`}>
            <div 
                className={`
                    answerNotsBackgroundTheme 
                    ${answerNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${seen? "seen" : "unseen"} 
                    ${answerNot.users[0].color}
                    lgt
                `} 
            />
            <hr 
                className={`
                    answerNotsHr 
                    top 
                    ${answerNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${answerNot.users[0].color}
                `} 
            />
            <div className={`answerNotsContainer`}>
                <div className="answerNotsLeft">
                    <img 
                        className={`answerNotsProfilePic`} 
                        src={answerNot.users[0].avatar 
                            ? PS + answerNot.users[0].avatar
                            : answerNot.union 
                                ? "/picBlanks/no-union-avatar.jpg"
                                : "/picBlanks/no-avatar.jpg"
                        } 
                        alt="" 
                    />
                    <img 
                        className={`answerNotsIcon ${answerNot.union ? "union" : "flame"}`} 
                        src={answerNot.union
                            ? spectrumIcon(answerNot.users[0].color)
                            : energyIcon(answerNot.users[0].color)
                        } 
                        alt="" 
                    />
                </div>
                <div className={`answerNotsRight ${answerNot.users[0].color}`}>
                    <div className="answerNotsRightTop"> 
                        <div className="answerNotsTitle">
                            <div ref={notTopRef} className="answerNotsTitleLeft">
                                {answerStatement}
                            </div>
                            <div className="answerNotsTitleRight">
                                {answerNot.union ?
                                    (
                                        <>
                                            {answerNot.users[0].color === "diamond" ? 
                                                (
                                                    <i 
                                                        className={`answerNotsTitleRightPNGIcon PNG_ICON_QN_ANSWER ${answerNot.users[0].color}`} 
                                                        alt="answer/answerd" 
                                                    />
                                                ) : (
                                                    <ChatBubbleIconSpectrum 
                                                        spectrum={answerNot.users[0].color} 
                                                        cn={"answerNotsTitleRightPNGIcon"}  
                                                        flare={"question"}
                                                    />
                                                )
                                            }
                                        </>
                                    ) : (
                                        <div className={`answerNotsTitleRightPNGIcon ${answerNot.users[0].color}`}>{qnaIcon}</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>                                                      
                    <div className="answerNotsRightBottom">
                        {answerNot.flareType === "post" || answerNot.flareType === "Blog"
                            ? flare?.title?.length > 0 
                                ? <span 
                                    className="answerNotsRetort title" 
                                    style={height > 32 ? {height: "18px"} : {height: "36px"}} 
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.title)}} 
                                />
                                : <span
                                    className="answerNotsRetort description"
                                    style={height > 36 ? {height: "14px"} : {height: "28px"}}
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.description)}} 
                                />
                            : answerNot.flareType === "comment" || answerNot.flareType === "answer" || answerNot.flareType === "comment"
                                ? <span
                                    className="answerNotsRetort description" 
                                    style={height > 36 ? {height: "14px"} : {height: "28px"}}
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.description)}} 
                                />
                                : answerNot.flareType === "question"
                                    ? <span 
                                        className="answerNotsRetort question"
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
                    answerNotsHr 
                    bottom 
                    ${answerNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${answerNot.users[0].color}
                `} 
            />
        </Link>
    )
}

export default AnswerNots;