import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { energyIcon } from '../../../../Utils/icons/icons';
import "./StoryNots.css";

function StoryNots({ not }) {

    const { notMDD, arrAddStoryer } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [ storyNot, setStoryNot ] = useState(not);
    const [ seen, setSeen ] = useState(storyNot?.seen);
    const [ storyStatement, setStoryStatement ] = useState(null);
    const [ storyerAdded, setStoryerAdded ] = useState(false);

    useEffect(() => {
        if(storyNot) {
            setSeen(storyNot.seen)
        }
    }, [storyNot])

    useEffect(() => {
        if (notMDD && seen === false) {
            setSeen(true);
        }
    },[notMDD, seen]);


    useEffect(() => {
        if (arrAddStoryer) {
            if (storyNot._id === arrAddStoryer.notificationId && storyNot.seen === false) {
                setStoryNot({...storyNot, statusChangers: [...storyNot.statusChangers, arrAddStoryer]});
                setStoryerAdded(true); 
            }
        }
    }, [arrAddStoryer]);

    useEffect(() => {
        if (storyNot.statusChangers.length === 1) {
            setStoryStatement(
                <span className="storyNotsTitleLeftPhrase">
                    <span className={`storyNotsName ${storyNot.statusChangers[0].color}`}>{`${storyNot.statusChangers[0].profileName} `}</span>     
                    <span className="storyNotsAction">{`updated their story!`}</span>
                </span>
            )
        } else if (storyNot.statusChangers.length === 2) {
            setStoryStatement(
                <span className="storyNotsTitleLeftPhrase">
                    <span className={`storyNotsName ${storyNot.statusChangers[0].color}`}>{`${storyNot.statusChangers[0].profileName} `}</span>
                    <span className="storyNotsAction">{"and "}</span>
                    <span className={`storyNotsName ${storyNot.statusChangers[1].color}`}>{`${storyNot.statusChangers[1].profileName} `}</span>   
                    <span className="storyNotsAction">{`updated their story!`}</span>
                </span>
            )
        } else if (storyNot.statusChangers.length === 3) {
            setStoryStatement(
                <span className="storyNotsTitleLeftPhrase">
                    <span className={`storyNotsName ${storyNot.statusChangers[0].color}`}>{storyNot.statusChangers[0].profileName}</span>
                    <span className="storyNotsAction">{", "}</span>
                    <span className={`storyNotsName ${storyNot.statusChangers[1].color}`}>{storyNot.statusChangers[1].profileName}</span>   
                    <span className="storyNotsAction">{", and "}</span>
                    <span className="storyNotsName">1</span>
                    <span className="storyNotsAction">{`updated their story!`}</span>
                </span>
            )
        } else if (storyNot.statusChangers.length > 3) {
            setStoryStatement(
                <span className="storyNotsTitleLeftPhrase">
                    <span className={`storyNotsName ${storyNot.statusChangers[0].color}`}>{storyNot.statusChangers[0].profileName}</span>
                    <span className="storyNotsAction">{", "}</span>
                    <span className={`storyNotsName ${storyNot.statusChangers[1].color}`}>{storyNot.statusChangers[1].profileName}</span>   
                    <span className="storyNotsAction">{", and "}</span>
                    <span className="storyNotsName">{`${storyNot.statusChangers.length - 2}`}</span>
                    <span className="storyNotsAction">{`updated their story!`}</span>
                </span>
            )
        }
    }, []);

    useEffect(() => {
        if (storyerAdded) {
            if (storyNot.statusChangers.length === 1) {
                setStoryStatement(
                    <span className="storyNotsTitleLeftPhrase">
                        <span className={`storyNotsName ${storyNot.statusChangers[0].color}`}>{`${storyNot.statusChangers[0].profileName} `}</span>     
                        <span className="storyNotsAction">{`updated their story!`}</span>
                    </span>
                )
            } else if (storyNot.statusChangers.length === 2) {
                setStoryStatement(
                    <span className="storyNotsTitleLeftPhrase">
                        <span className={`storyNotsName ${storyNot.statusChangers[0].color}`}>{`${storyNot.statusChangers[0].profileName} `}</span>
                        <span className="storyNotsAction">{"and "}</span>
                        <span className={`storyNotsName ${storyNot.statusChangers[1].color}`}>{`${storyNot.statusChangers[1].profileName} `}</span>   
                        <span className="storyNotsAction">{`updated their story!`}</span>
                    </span>
                )
            } else if (storyNot.statusChangers.length === 3) {
                setStoryStatement(
                    <span className="storyNotsTitleLeftPhrase">
                        <span className={`storyNotsName ${storyNot.statusChangers[0].color}`}>{storyNot.statusChangers[0].profileName}</span>
                        <span className="storyNotsAction">{", "}</span>
                        <span className={`storyNotsName ${storyNot.statusChangers[1].color}`}>{storyNot.statusChangers[1].profileName}</span>   
                        <span className="storyNotsAction">{", and "}</span>
                        <span className="storyNotsName">1</span>
                        <span className="storyNotsAction">{`updated their story!`}</span>
                    </span>
                )
            } else if (storyNot.statusChangers.length > 3) {
                setStoryStatement(
                    <span className="storyNotsTitleLeftPhrase">
                        <span className={`storyNotsName ${storyNot.statusChangers[0].color}`}>{storyNot.statusChangers[0].profileName}</span>
                        <span className="storyNotsAction">{", "}</span>
                        <span className={`storyNotsName ${storyNot.statusChangers[1].color}`}>{storyNot.statusChangers[1].profileName}</span>   
                        <span className="storyNotsAction">{", and "}</span>
                        <span className="storyNotsName">{`${storyNot.statusChangers.length - 2}`}</span>
                        <span className="storyNotsAction">{`updated their story!`}</span>
                    </span>
                )
            }
            setStoryerAdded(false);
        }
    }, [storyerAdded]);

    
    return (
        <Link className={`storyNots`} to={`/${storyNot.flareType}/${storyNot.flareId}`}>
            <div 
                className={`
                    storyNotsBackgroundTheme 
                    ${storyNot.statusChangers[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${seen? "seen" : "unseen"} 
                    ${storyNot.statusChangers[0].color}
                    lgt
                `} 
            />
            <hr 
                className={`
                    storyNotsHr 
                    top 
                    ${storyNot.statusChangers[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${storyNot.statusChangers[0].color}
                `} 
            />
            <div className={`storyNotsContainer`}>
                <div className="storyNotsLeft">
                    <img 
                        className={`storyNotsProfilePic`} 
                        src={storyNot.statusChangers[0].avatar 
                            ? PS + storyNot.statusChangers[0].avatar
                            : storyNot.union 
                                ? "/picBlanks/no-union-avatar.jpg"
                                : "/picBlanks/no-avatar.jpg"} 
                        alt="" 
                    />
                    <img 
                        className="storyNotsIcon flame" 
                        src={storyNot.union
                            ? spectrumIcon(storyNot.statusChangers[0].color)
                            : energyIcon(storyNot.statusChangers[0].color)
                        } 
                        alt="" 
                    />
                </div>
                <div className={`storyNotsRight ${storyNot.statusChangers[0].color}`}>
                    <div className="storyNotsRightTop"> 
                        <div className="storyNotsTitle">
                            <div className="storyNotsTitleLeft">
                                {storyStatement}
                            </div>
                            <div className="storyNotsTitleRight">
                                <i className="storyNotsTitleRightPNGIcon PNG_ICON_story" alt=""/>
                            </div>
                        </div>
                    </div>                                                      
                    <div className="storyNotsRightBottom">
                        {"Congraduate them on their progress!"}
                    </div>
                </div>
            </div>
            <hr 
                className={`
                    storyNotsHr 
                    bottom 
                    ${storyNot.statusChangers[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${storyNot.statusChangers[0].color}
                `} 
            />
        </Link>
    )
}

export default StoryNots;