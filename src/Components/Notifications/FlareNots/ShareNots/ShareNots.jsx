import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosReq } from '../../../../Utils/axiosConfig';
import DOMPurify from 'dompurify';
import { energyIcon, spectrumIcon } from '../../../../Utils/icons/icons';
import "./ShareNots.css";

function ShareNots({ shn }) {

    const notTopRef = useRef();

    const { notMDD, arrAddUser } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [ shareNot, setshareNot ] = useState(shn);
    const [ flare, setFlare ] = useState({});
    const [ seen, setSeen ] = useState(shareNot?.seen);
    const [ shareStatement, setshareStatement ] = useState(null);
    const [ UserAdded, setUserAdded ] = useState(false);
    const [ height, setHeight ] = useState(0);

    useEffect(() => {
        const getFlare = async () => {
            try {
                const res = await axiosReq("GET", `/${shareNot.flareType}s/${shareNot.flareId}`)
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
    }, [shareStatement]);

    useEffect(() => {
        if(shareNot) {
            setSeen(shareNot.seen)
        }
    }, [shareNot])

    useEffect(() => {
        if (notMDD && seen === false) {
            setSeen(true);
        }
    },[notMDD, seen]);


    useEffect(() => {
        if (arrAddUser) {
            if (shareNot._id === arrAddUser.notificationId && shareNot.seen === false) {
                setshareNot({...shareNot, users: [...shareNot.users, arrAddUser]});
                setUserAdded(true); 
            }
        }
    }, [arrAddUser]);

    useEffect(() => {
        if (shareNot.users.length === 1) {
            setshareStatement(
                <span className="shareNotsTitleLeftPhrase">
                    <span className={`shareNotsName ${shareNot.users[0].color}`}>{`${shareNot.users[0].profileName} `}</span>     
                    <span className="shareNotsAction">{`shared your ${shareNot.flareType}!`}</span>
                </span>
            )
        } else if (shareNot.users.length === 2) {
            setshareStatement(
                <span className="shareNotsTitleLeftPhrase">
                    <span className={`shareNotsName ${shareNot.users[0].color}`}>{`${shareNot.users[0].profileName} `}</span>
                    <span className="shareNotsAction">{"and "}</span>
                    <span className={`shareNotsName ${shareNot.users[1].color}`}>{`${shareNot.users[1].profileName} `}</span>   
                    <span className="shareNotsAction">{`shared your ${shareNot.flareType}!`}</span>
                </span>
            )
        } else if (shareNot.users.length === 3) {
            setshareStatement(
                <span className="shareNotsTitleLeftPhrase">
                    <span className={`shareNotsName ${shareNot.users[0].color}`}>{shareNot.users[0].profileName}</span>
                    <span className="shareNotsAction">{", "}</span>
                    <span className={`shareNotsName ${shareNot.users[1].color}`}>{shareNot.users[1].profileName}</span>   
                    <span className="shareNotsAction">{", and "}</span>
                    <span className="shareNotsName">1</span>
                    <span className="shareNotsAction">{` other ${shareNot.union ? "union" : "flame"} shared your ${shareNot.flareType}!`}</span>
                </span>
            )
        } else if (shareNot.users.length > 3) {
            setshareStatement(
                <span className="shareNotsTitleLeftPhrase">
                    <span className={`shareNotsName ${shareNot.users[0].color}`}>{shareNot.users[0].profileName}</span>
                    <span className="shareNotsAction">{", "}</span>
                    <span className={`shareNotsName ${shareNot.users[1].color}`}>{shareNot.users[1].profileName}</span>   
                    <span className="shareNotsAction">{", and "}</span>
                    <span className="shareNotsName">{`${shareNot.users.length - 2}`}</span>
                    <span className="shareNotsAction">{` other ${shareNot.union ? "union" : "flame"}s shared your ${shareNot.flareType}!`}</span>
                </span>
            )
        }
    }, []);

    useEffect(() => {
        if (UserAdded) {
            if (shareNot.users.length === 1) {
                setshareStatement(
                    <span className="shareNotsTitleLeftPhrase">
                        <span className={`shareNotsName ${shareNot.users[0].color}`}>{`${shareNot.users[0].profileName} `}</span>     
                        <span className="shareNotsAction">{`shared your ${shareNot.flareType}!`}</span>
                    </span>
                )
            } else if (shareNot.users.length === 2) {
                setshareStatement(
                    <span className="shareNotsTitleLeftPhrase">
                        <span className={`shareNotsName ${shareNot.users[0].color}`}>{`${shareNot.users[0].profileName} `}</span>
                        <span className="shareNotsAction">{"and "}</span>
                        <span className={`shareNotsName ${shareNot.users[1].color}`}>{`${shareNot.users[1].profileName} `}</span>   
                        <span className="shareNotsAction">{`shared your ${shareNot.flareType}!`}</span>
                    </span>
                )
            } else if (shareNot.users.length === 3) {
                setshareStatement(
                    <span className="shareNotsTitleLeftPhrase">
                        <span className={`shareNotsName ${shareNot.users[0].color}`}>{shareNot.users[0].profileName}</span>
                        <span className="shareNotsAction">{", "}</span>
                        <span className={`shareNotsName ${shareNot.users[1].color}`}>{shareNot.users[1].profileName}</span>   
                        <span className="shareNotsAction">{", and "}</span>
                        <span className="shareNotsName">1</span>
                        <span className="shareNotsAction">{` other ${shareNot.union ? "union" : "flame"} shared your ${shareNot.flareType}!`}</span>
                    </span>
                )
            } else if (shareNot.users.length > 3) {
                setshareStatement(
                    <span className="shareNotsTitleLeftPhrase">
                        <span className={`shareNotsName ${shareNot.users[0].color}`}>{shareNot.users[0].profileName}</span>
                        <span className="shareNotsAction">{", "}</span>
                        <span className={`shareNotsName ${shareNot.users[1].color}`}>{shareNot.users[1].profileName}</span>   
                        <span className="shareNotsAction">{", and "}</span>
                        <span className="shareNotsName">{`${shareNot.users.length - 2}`}</span>
                        <span className="shareNotsAction">{` other ${shareNot.union ? "union" : "flame"}s shared your ${shareNot.flareType}!`}</span>
                    </span>
                )
            }
            setUserAdded(false);
        }
    }, [UserAdded]);

    
    return (
        <Link className={`shareNots`} to={`/${shareNot.flareType}/${shareNot.flareId}`}>
            <div 
                className={`
                    shareNotsBackgroundTheme 
                    ${shareNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${seen? "seen" : "unseen"} 
                    ${shareNot.users[0].color}
                    lgt
                `} 
            />
            <hr 
                className={`
                    shareNotsHr 
                    top 
                    ${shareNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${shareNot.users[0].color}
                `} 
            />
            <div className={`shareNotsContainer`}>
                <div className="shareNotsLeft">
                    <img 
                        className={`shareNotsProfilePic`} 
                        src={shareNot.users[0].avatar 
                            ? PS + shareNot.users[0].avatar
                            : shareNot.union 
                                ? "/picBlanks/no-union-avatar.jpg"
                                : "/picBlanks/no-avatar.jpg"
                        } 
                        alt="" 
                    />
                    <img 
                        className={`shareNotsIcon ${shareNot.union ? "union" : "flame"}`} 
                        src={shareNot.union
                            ? spectrumIcon(shareNot.users[0].color)
                            : energyIcon(shareNot.users[0].color)
                        } 
                        alt="" 
                    />
                </div>
                <div className={`shareNotsRight ${shareNot.users[0].color}`}>
                    <div className="shareNotsRightTop"> 
                        <div className="shareNotsTitle">
                            <div ref={notTopRef} className="shareNotsTitleLeft">
                                {shareStatement}
                            </div>
                            <div className="shareNotsTitleRight">
                                <i 
                                    className={`shareNotsTitleRightPNGIcon PNG_ICON_SHARE ${shareNot.users[0].color}`} 
                                    alt="share/shared" 
                                />
                            </div>
                        </div>
                    </div>                                                      
                    <div className="shareNotsRightBottom">
                        {shareNot.flareType === "post" || shareNot.flareType === "Blog"
                            ? flare?.title?.length > 0 
                                ? <span 
                                    className="shareNotsRetort title" 
                                    style={height > 32 ? {height: "18px"} : {height: "36px"}} 
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.title)}} 
                                />
                                : <span
                                    className="shareNotsRetort description"
                                    style={height > 36 ? {height: "14px"} : {height: "28px"}}
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.description)}} 
                                />
                            : shareNot.flareType === "comment" || shareNot.flareType === "answer" || shareNot.flareType === "comment"
                                ? <span
                                    className="shareNotsRetort description" 
                                    style={height > 36 ? {height: "14px"} : {height: "28px"}}
                                    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(flare?.description)}} 
                                />
                                : shareNot.flareType === "question"
                                    ? <span 
                                        className="shareNotsRetort question"
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
                    shareNotsHr 
                    bottom 
                    ${shareNot.users[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${shareNot.users[0].color}
                `} 
            />
        </Link>
    )
}

export default ShareNots;