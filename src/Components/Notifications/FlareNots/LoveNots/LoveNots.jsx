import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';
import DOMPurify from 'dompurify';
import { energyIcon, spectrumIcon } from '../../../../Utils/icons/icons';
import "./LoveNots.css";

function LoveNots({ not }) {

    const notTopRef = useRef();

    const { notMDD, arrAddUser } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [ loveNot, setLoveNot ] = useState(not);
    const [ flare, setFlare ] = useState({});
    const [ seen, setSeen ] = useState(loveNot?.seen);
    const [ loveStatement, setloveStatement ] = useState(null);
    const [ UserAdded, setUserAdded ] = useState(false);
    const [ height, setHeight ] = useState(0);

    useEffect(() => {
        const getFlare = async () => {
            try {
                const res = await axiosReq("GET", `/${loveNot.flareType}s/${loveNot.flareId}`)
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
    }, [loveStatement]);

    useEffect(() => {
        if(loveNot) {
            setSeen(loveNot.seen)
        }
    }, [loveNot])

    useEffect(() => {
        if (notMDD && seen === false) {
            setSeen(true);
        }
    },[notMDD, seen]);


    useEffect(() => {
        if (arrAddUser) {
            if (loveNot._id === arrAddUser.notificationId && loveNot.seen === false) {
                setLoveNot({...loveNot, users: [...loveNot.users, arrAddUser]});
                setUserAdded(true); 
            }
        }
    }, [arrAddUser]);

    useEffect(() => {
        if (loveNot.users.length === 1) {
            setloveStatement(
                <span className="loveNotsTitleLeftPhrase">
                    <span className={`loveNotsName ${loveNot.users[0].color}`}>{`${loveNot.users[0].profileName} `}</span>     
                    <span className="loveNotsAction">{`loved your ${loveNot.flareType}!`}</span>
                </span>
            )
        } else if (loveNot.users.length === 2) {
            setloveStatement(
                <span className="loveNotsTitleLeftPhrase">
                    <span className={`loveNotsName ${loveNot.users[0].color}`}>{`${loveNot.users[0].profileName} `}</span>
                    <span className="loveNotsAction">{"and "}</span>
                    <span className={`loveNotsName ${loveNot.users[1].color}`}>{`${loveNot.users[1].profileName} `}</span>   
                    <span className="loveNotsAction">{`loved your ${loveNot.flareType}!`}</span>
                </span>
            )
        } else if (loveNot.users.length === 3) {
            setloveStatement(
                <span className="loveNotsTitleLeftPhrase">
                    <span className={`loveNotsName ${loveNot.users[0].color}`}>{loveNot.users[0].profileName}</span>
                    <span className="loveNotsAction">{", "}</span>
                    <span className={`loveNotsName ${loveNot.users[1].color}`}>{loveNot.users[1].profileName}</span>   
                    <span className="loveNotsAction">{", and "}</span>
                    <span className="loveNotsName">1</span>
                    <span className="loveNotsAction">{` other ${loveNot.union ? "union" : "flame"} loved your ${loveNot.flareType}!`}</span>
                </span>
            )
        } else if (loveNot.users.length > 3) {
            setloveStatement(
                <span className="loveNotsTitleLeftPhrase">
                    <span className={`loveNotsName ${loveNot.users[0].color}`}>{loveNot.users[0].profileName}</span>
                    <span className="loveNotsAction">{", "}</span>
                    <span className={`loveNotsName ${loveNot.users[1].color}`}>{loveNot.users[1].profileName}</span>   
                    <span className="loveNotsAction">{", and "}</span>
                    <span className="loveNotsName">{`${loveNot.users.length - 2}`}</span>
                    <span className="loveNotsAction">{` other ${loveNot.union ? "union" : "flame"}s loved your ${loveNot.flareType}!`}</span>
                </span>
            )
        }
    }, []);

    useEffect(() => {
        if (UserAdded) {
            if (loveNot.users.length === 1) {
                setloveStatement(
                    <span className="loveNotsTitleLeftPhrase">
                        <span className={`loveNotsName ${loveNot.users[0].color}`}>{`${loveNot.users[0].profileName} `}</span>     
                        <span className="loveNotsAction">{`loved your ${loveNot.flareType}!`}</span>
                    </span>
                )
            } else if (loveNot.users.length === 2) {
                setloveStatement(
                    <span className="loveNotsTitleLeftPhrase">
                        <span className={`loveNotsName ${loveNot.users[0].color}`}>{`${loveNot.users[0].profileName} `}</span>
                        <span className="loveNotsAction">{"and "}</span>
                        <span className={`loveNotsName ${loveNot.users[1].color}`}>{`${loveNot.users[1].profileName} `}</span>   
                        <span className="loveNotsAction">{`loved your ${loveNot.flareType}!`}</span>
                    </span>
                )
            } else if (loveNot.users.length === 3) {
                setloveStatement(
                    <span className="loveNotsTitleLeftPhrase">
                        <span className={`loveNotsName ${loveNot.users[0].color}`}>{loveNot.users[0].profileName}</span>
                        <span className="loveNotsAction">{", "}</span>
                        <span className={`loveNotsName ${loveNot.users[1].color}`}>{loveNot.users[1].profileName}</span>   
                        <span className="loveNotsAction">{", and "}</span>
                        <span className="loveNotsName">1</span>
                        <span className="loveNotsAction">{` other ${loveNot.union ? "union" : "flame"} loved your ${loveNot.flareType}!`}</span>
                    </span>
                )
            } else if (loveNot.users.length > 3) {
                setloveStatement(
                    <span className="loveNotsTitleLeftPhrase">
                        <span className={`loveNotsName ${loveNot.users[0].color}`}>{loveNot.users[0].profileName}</span>
                        <span className="loveNotsAction">{", "}</span>
                        <span className={`loveNotsName ${loveNot.users[1].color}`}>{loveNot.users[1].profileName}</span>   
                        <span className="loveNotsAction">{", and "}</span>
                        <span className="loveNotsName">{`${loveNot.users.length - 2}`}</span>
                        <span className="loveNotsAction">{` other ${loveNot.union ? "union" : "flame"}s loved your ${loveNot.flareType}!`}</span>
                    </span>
                )
            }
            setUserAdded(false);
        }
    }, [UserAdded]);

    
    return (
        <Link className={`loveNots`} to={`/${loveNot.flareType}/${loveNot.flareId}`}>
            <div 
                className={`
                    loveNotsBackgroundTheme 
                    ${loveNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${seen ? "seen" : "unseen"} 
                    ${loveNot.users[0].color}
                    lgt
                `} 
            />
            <hr 
                className={`
                    loveNotsHr 
                    top 
                    ${loveNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${loveNot.users[0].color}
                `} 
            />
            <div className={`loveNotsContainer`}>
                <div className="loveNotsLeft">
                    <img 
                        className={`loveNotsProfilePic`} 
                        src={loveNot.users[0].avatar 
                            ? PS + loveNot.users[0].avatar
                            : loveNot.union 
                                ? "/picBlanks/no-union-avatar.jpg"
                                : "/picBlanks/no-avatar.jpg"
                        } 
                        alt="" 
                    />
                    <img 
                        className={`loveNotsIcon ${loveNot.union ? "union" : "flame"}`} 
                        src={loveNot.union
                            ? spectrumIcon(loveNot.users[0].color)
                            : energyIcon(loveNot.users[0].color)
                        } 
                        alt="" 
                    />
                </div>
                <div className={`loveNotsRight ${loveNot.users[0].color}`}>
                    <div className="loveNotsRightTop"> 
                        <div className="loveNotsTitle">
                            <div ref={notTopRef} className="loveNotsTitleLeft">
                                {loveStatement}
                            </div>
                            <div className="loveNotsTitleRight">
                                <i 
                                    className={`loveNotsTitleRightPNGIcon PNG_ICON_LOVED_LGT`} 
                                    alt="love/loved" 
                                />
                            </div>
                        </div>
                    </div>                                                      
                    <div className="loveNotsRightBottom">
                        {loveNot.flareType === "post" || loveNot.flareType === "Blog"
                            ? flare?.title?.length > 0 
                                ? <span 
                                    className="loveNotsRetort title" 
                                    style={height > 32 ? {height: "18px"} : {height: "36px"}} 
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.title)}} 
                                />
                                : <span
                                    className="loveNotsRetort description"
                                    style={height > 36 ? {height: "14px"} : {height: "28px"}}
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.description)}} 
                                />
                            : loveNot.flareType === "comment" || loveNot.flareType === "answer" || loveNot.flareType === "comment"
                                ? <span
                                    className="loveNotsRetort description" 
                                    style={height > 36 ? {height: "14px"} : {height: "28px"}}
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.description)}} 
                                />
                                : loveNot.flareType === "question"
                                    ? <span 
                                        className="loveNotsRetort question"
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
                    loveNotsHr 
                    bottom 
                    ${loveNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${loveNot.users[0].color}
                `} 
            />
        </Link>
    )
}

export default LoveNots;