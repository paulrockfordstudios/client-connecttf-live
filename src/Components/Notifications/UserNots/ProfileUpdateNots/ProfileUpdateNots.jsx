import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { energyIcon, spectrumIcon } from '../../../../Utils/icons/icons';
import "./profileUpdateNots.css";

function ProfileUpdateNots({ not }) {

    const notTopRef = useRef();

    const { notMDD, arrAddProfileUpdater } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [ profileUpdateNot, setProfileUpdateNot ] = useState(not);
    const [ seen, setSeen ] = useState(profileUpdateNot?.seen);
    const [ profileUpdateStatement, setProfileUpdateStatement ] = useState(null);
    const [ profileUpdaterAdded, setProfileUpdaterAdded ] = useState(false);

    useEffect(() => {
        if(profileUpdateNot) {
            setSeen(profileUpdateNot.seen)
        }
    }, [profileUpdateNot])

    useEffect(() => {
        if (notMDD && seen === false) {
            setSeen(true);
        }
    },[notMDD, seen]);


    useEffect(() => {
        if (arrAddProfileUpdater) {
            if (profileUpdateNot._id === arrAddProfileUpdater.notificationId && profileUpdateNot.seen === false) {
                setProfileUpdateNot({...profileUpdateNot, statusChangers: [...profileUpdateNot.statusChangers, arrAddProfileUpdater]});
                setProfileUpdaterAdded(true); 
            }
        }
    }, [arrAddProfileUpdater]);

    useEffect(() => {
        if (profileUpdateNot.statusChangers.length === 1) {
            setProfileUpdateStatement(
                <span className="profileUpdateNotsTitleLeftPhrase">
                    <span className={`profileUpdateNotsName ${profileUpdateNot.statusChangers[0].color}`}>{`${profileUpdateNot.statusChangers[0].profileName} `}</span>     
                    <span className="profileUpdateNotsAction">{`updated their profile!`}</span>
                </span>
            )
        } else if (profileUpdateNot.statusChangers.length === 2) {
            setProfileUpdateStatement(
                <span className="profileUpdateNotsTitleLeftPhrase">
                    <span className={`profileUpdateNotsName ${profileUpdateNot.statusChangers[0].color}`}>{`${profileUpdateNot.statusChangers[0].profileName} `}</span>
                    <span className="profileUpdateNotsAction">{"and "}</span>
                    <span className={`profileUpdateNotsName ${profileUpdateNot.statusChangers[1].color}`}>{`${profileUpdateNot.statusChangers[1].profileName} `}</span>   
                    <span className="profileUpdateNotsAction">{`updated their profiles!`}</span>
                </span>
            )
        } else if (profileUpdateNot.statusChangers.length === 3) {
            setProfileUpdateStatement(
                <span className="profileUpdateNotsTitleLeftPhrase">
                    <span className={`profileUpdateNotsName ${profileUpdateNot.statusChangers[0].color}`}>{profileUpdateNot.statusChangers[0].profileName}</span>
                    <span className="profileUpdateNotsAction">{", "}</span>
                    <span className={`profileUpdateNotsName ${profileUpdateNot.statusChangers[1].color}`}>{profileUpdateNot.statusChangers[1].profileName}</span>   
                    <span className="profileUpdateNotsAction">{", and "}</span>
                    <span className="profileUpdateNotsName">1</span>
                    <span className="profileUpdateNotsAction">{` other flame updated their profiles`}</span>
                </span>
            )
        } else if (profileUpdateNot.statusChangers.length > 3) {
            setProfileUpdateStatement(
                <span className="profileUpdateNotsTitleLeftPhrase">
                    <span className={`profileUpdateNotsName ${profileUpdateNot.statusChangers[0].color}`}>{profileUpdateNot.statusChangers[0].profileName}</span>
                    <span className="profileUpdateNotsAction">{", "}</span>
                    <span className={`profileUpdateNotsName ${profileUpdateNot.statusChangers[1].color}`}>{profileUpdateNot.statusChangers[1].profileName}</span>   
                    <span className="profileUpdateNotsAction">{", and "}</span>
                    <span className="profileUpdateNotsName">{`${profileUpdateNot.statusChangers.length - 2}`}</span>
                    <span className="profileUpdateNotsAction">{` other flames updated their profiles`}</span>
                </span>
            )
        }
    }, []);

    useEffect(() => {
        if (profileUpdaterAdded) {
            useEffect(() => {
                if (profileUpdateNot.statusChangers.length === 1) {
                    setProfileUpdateStatement(
                        <span className="profileUpdateNotsTitleLeftPhrase">
                            <span className={`profileUpdateNotsName ${profileUpdateNot.statusChangers[0].color}`}>{`${profileUpdateNot.statusChangers[0].profileName} `}</span>     
                            <span className="profileUpdateNotsAction">{`updated their profile!`}</span>
                        </span>
                    )
                } else if (profileUpdateNot.statusChangers.length === 2) {
                    setProfileUpdateStatement(
                        <span className="profileUpdateNotsTitleLeftPhrase">
                            <span className={`profileUpdateNotsName ${profileUpdateNot.statusChangers[0].color}`}>{`${profileUpdateNot.statusChangers[0].profileName} `}</span>
                            <span className="profileUpdateNotsAction">{"and "}</span>
                            <span className={`profileUpdateNotsName ${profileUpdateNot.statusChangers[1].color}`}>{`${profileUpdateNot.statusChangers[1].profileName} `}</span>   
                            <span className="profileUpdateNotsAction">{`updated their profiles!`}</span>
                        </span>
                    )
                } else if (profileUpdateNot.statusChangers.length === 3) {
                    setProfileUpdateStatement(
                        <span className="profileUpdateNotsTitleLeftPhrase">
                            <span className={`profileUpdateNotsName ${profileUpdateNot.statusChangers[0].color}`}>{profileUpdateNot.statusChangers[0].profileName}</span>
                            <span className="profileUpdateNotsAction">{", "}</span>
                            <span className={`profileUpdateNotsName ${profileUpdateNot.statusChangers[1].color}`}>{profileUpdateNot.statusChangers[1].profileName}</span>   
                            <span className="profileUpdateNotsAction">{", and "}</span>
                            <span className="profileUpdateNotsName">1</span>
                            <span className="profileUpdateNotsAction">{` other flame updated their profiles`}</span>
                        </span>
                    )
                } else if (profileUpdateNot.statusChangers.length > 3) {
                    setProfileUpdateStatement(
                        <span className="profileUpdateNotsTitleLeftPhrase">
                            <span className={`profileUpdateNotsName ${profileUpdateNot.statusChangers[0].color}`}>{profileUpdateNot.statusChangers[0].profileName}</span>
                            <span className="profileUpdateNotsAction">{", "}</span>
                            <span className={`profileUpdateNotsName ${profileUpdateNot.statusChangers[1].color}`}>{profileUpdateNot.statusChangers[1].profileName}</span>   
                            <span className="profileUpdateNotsAction">{", and "}</span>
                            <span className="profileUpdateNotsName">{`${profileUpdateNot.statusChangers.length - 2}`}</span>
                            <span className="profileUpdateNotsAction">{` other flames updated their profiles`}</span>
                        </span>
                    )
                }
            }, []);
            setProfileUpdaterAdded(false);
        }
    }, [profileUpdaterAdded]);

    
    return (
        <Link className={`profileUpdateNots`} to={`/${profileUpdateNot.flareType}/${profileUpdateNot.flareId}`}>
            <div 
                className={`
                    profileUpdateNotsBackgroundTheme 
                    ${profileUpdateNot.statusChangers[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${seen? "seen" : "unseen"} 
                    ${profileUpdateNot.statusChangers[0].color}
                    lgt
                `} 
            />
            <hr 
                className={`
                    profileUpdateNotsHr 
                    top 
                    ${profileUpdateNot.statusChangers[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${profileUpdateNot.statusChangers[0].color}
                `} 
            />
            <div className={`profileUpdateNotsContainer`}>
                <div className="profileUpdateNotsLeft">
                    <img 
                        className={`profileUpdateNotsProfilePic`} 
                        src={profileUpdateNot.statusChangers[0].avatar 
                            ? PS + profileUpdateNot.statusChangers[0].avatar
                            : profileUpdateNot.union 
                                ? "/picBlanks/no-union-avatar.jpg"
                                : "/picBlanks/no-avatar.jpg"} 
                        alt="" 
                    />
                    <img 
                        className="profileUpdateNotsIcon flame" 
                        src={profileUpdateNot.union
                            ? spectrumIcon(profileUpdateNot.statusChangers[0].color)
                            : energyIcon(profileUpdateNot.statusChangers[0].color)
                        } 
                        alt="" 
                    />
                </div>
                <div className={`profileUpdateNotsRight ${profileUpdateNot.statusChangers[0].color}`}>
                    <div className="profileUpdateNotsRightTop"> 
                        <div className="profileUpdateNotsTitle">
                            <div className="profileUpdateNotsTitleLeft">
                                {profileUpdateStatement}
                            </div>
                            <div className="profileUpdateNotsTitleRight">
                                <i className="profileUpdateNotsTitleRightPNGIcon PNG_ICON_PROFILE" alt=""/>
                            </div>
                        </div>
                    </div>                                                      
                    <div className="profileUpdateNotsRightBottom">
                        {"Visit their profile to see what changed!"}
                    </div>
                </div>
            </div>
            <hr 
                className={`
                    profileUpdateNotsHr 
                    bottom 
                    ${profileUpdateNot.statusChangers[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${profileUpdateNot.statusChangers[0].color}
                `} 
            />
        </Link>
    )
}

export default ProfileUpdateNots;