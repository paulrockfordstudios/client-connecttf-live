import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { energyIcon } from '../../../../Utils/icons/icons';
import "./JourneyNots.css";

function JourneyNots({ not }) {

    const { notMDD, arrAddJourneyer } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [ journeyNot, setJourneyNot ] = useState(not);
    const [ seen, setSeen ] = useState(journeyNot?.seen);
    const [ journeyStatement, setJourneyStatement ] = useState(null);
    const [ journeyerAdded, setJourneyerAdded ] = useState(false);

    useEffect(() => {
        if(journeyNot) {
            setSeen(journeyNot.seen)
        }
    }, [journeyNot])

    useEffect(() => {
        if (notMDD && seen === false) {
            setSeen(true);
        }
    },[notMDD, seen]);


    useEffect(() => {
        if (arrAddJourneyer) {
            if (journeyNot._id === arrAddJourneyer.notificationId && journeyNot.seen === false) {
                setJourneyNot({...journeyNot, statusChangers: [...journeyNot.statusChangers, arrAddJourneyer]});
                setJourneyerAdded(true); 
            }
        }
    }, [arrAddJourneyer]);

    useEffect(() => {
        if (journeyNot.statusChangers.length === 1) {
            setJourneyStatement(
                <span className="journeyNotsTitleLeftPhrase">
                    <span className={`journeyNotsName ${journeyNot.statusChangers[0].color}`}>{`${journeyNot.statusChangers[0].profileName} `}</span>     
                    <span className="journeyNotsAction">{`changed their journey status!`}</span>
                </span>
            )
        } else if (journeyNot.statusChangers.length === 2) {
            setJourneyStatement(
                <span className="journeyNotsTitleLeftPhrase">
                    <span className={`journeyNotsName ${journeyNot.statusChangers[0].color}`}>{`${journeyNot.statusChangers[0].profileName} `}</span>
                    <span className="journeyNotsAction">{"and "}</span>
                    <span className={`journeyNotsName ${journeyNot.statusChangers[1].color}`}>{`${journeyNot.statusChangers[1].profileName} `}</span>   
                    <span className="journeyNotsAction">{`changed their journey status!`}</span>
                </span>
            )
        } else if (journeyNot.statusChangers.length === 3) {
            setJourneyStatement(
                <span className="journeyNotsTitleLeftPhrase">
                    <span className={`journeyNotsName ${journeyNot.statusChangers[0].color}`}>{journeyNot.statusChangers[0].profileName}</span>
                    <span className="journeyNotsAction">{", "}</span>
                    <span className={`journeyNotsName ${journeyNot.statusChangers[1].color}`}>{journeyNot.statusChangers[1].profileName}</span>   
                    <span className="journeyNotsAction">{", and "}</span>
                    <span className="journeyNotsName">1</span>
                    <span className="journeyNotsAction">{` other flame changed their journey status!`}</span>
                </span>
            )
        } else if (journeyNot.statusChangers.length > 3) {
            setJourneyStatement(
                <span className="journeyNotsTitleLeftPhrase">
                    <span className={`journeyNotsName ${journeyNot.statusChangers[0].color}`}>{journeyNot.statusChangers[0].profileName}</span>
                    <span className="journeyNotsAction">{", "}</span>
                    <span className={`journeyNotsName ${journeyNot.statusChangers[1].color}`}>{journeyNot.statusChangers[1].profileName}</span>   
                    <span className="journeyNotsAction">{", and "}</span>
                    <span className="journeyNotsName">{`${journeyNot.statusChangers.length - 2}`}</span>
                    <span className="journeyNotsAction">{` other flames changed their journey status!`}</span>
                </span>
            )
        }
    }, []);

    useEffect(() => {
        if (journeyerAdded) {
            if (journeyNot.statusChangers.length === 1) {
                setJourneyStatement(
                    <span className="journeyNotsTitleLeftPhrase">
                        <span className={`journeyNotsName ${journeyNot.statusChangers[0].color}`}>{`${journeyNot.statusChangers[0].profileName} `}</span>     
                        <span className="journeyNotsAction">{`changed their journey status!`}</span>
                    </span>
                )
            } else if (journeyNot.statusChangers.length === 2) {
                setJourneyStatement(
                    <span className="journeyNotsTitleLeftPhrase">
                        <span className={`journeyNotsName ${journeyNot.statusChangers[0].color}`}>{`${journeyNot.statusChangers[0].profileName} `}</span>
                        <span className="journeyNotsAction">{"and "}</span>
                        <span className={`journeyNotsName ${journeyNot.statusChangers[1].color}`}>{`${journeyNot.statusChangers[1].profileName} `}</span>   
                        <span className="journeyNotsAction">{`changed their journey status!`}</span>
                    </span>
                )
            } else if (journeyNot.statusChangers.length === 3) {
                setJourneyStatement(
                    <span className="journeyNotsTitleLeftPhrase">
                        <span className={`journeyNotsName ${journeyNot.statusChangers[0].color}`}>{journeyNot.statusChangers[0].profileName}</span>
                        <span className="journeyNotsAction">{", "}</span>
                        <span className={`journeyNotsName ${journeyNot.statusChangers[1].color}`}>{journeyNot.statusChangers[1].profileName}</span>   
                        <span className="journeyNotsAction">{", and "}</span>
                        <span className="journeyNotsName">1</span>
                        <span className="journeyNotsAction">{` other flame changed their journey status!`}</span>
                    </span>
                )
            } else if (journeyNot.statusChangers.length > 3) {
                setJourneyStatement(
                    <span className="journeyNotsTitleLeftPhrase">
                        <span className={`journeyNotsName ${journeyNot.statusChangers[0].color}`}>{journeyNot.statusChangers[0].profileName}</span>
                        <span className="journeyNotsAction">{", "}</span>
                        <span className={`journeyNotsName ${journeyNot.statusChangers[1].color}`}>{journeyNot.statusChangers[1].profileName}</span>   
                        <span className="journeyNotsAction">{", and "}</span>
                        <span className="journeyNotsName">{`${journeyNot.statusChangers.length - 2}`}</span>
                        <span className="journeyNotsAction">{` other flames changed their journey status!`}</span>
                    </span>
                )
            }
            setJourneyrAdded(false);
        }
    }, [journeyerAdded]);

    
    return (
        <Link className={`journeyNots`} to={`/${journeyNot.flareType}/${journeyNot.flareId}`}>
            <div 
                className={`
                    journeyNotsBackgroundTheme 
                    ${journeyNot.statusChangers[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${seen? "seen" : "unseen"} 
                    ${journeyNot.statusChangers[0].color}
                    lgt
                `} 
            />
            <hr 
                className={`
                    journeyNotsHr 
                    top 
                    ${journeyNot.statusChangers[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${journeyNot.statusChangers[0].color}
                `} 
            />
            <div className={`journeyNotsContainer`}>
                <div className="journeyNotsLeft">
                    <img 
                        className={`journeyNotsProfilePic`} 
                        src={PS + journeyNot.statusChangers[0].avatar} 
                        alt="" 
                    />
                    <img 
                        className="journeyNotsIcon flame" 
                        src={energyIcon(journeyNot.statusChangers[0].color)} 
                        alt="" 
                    />
                </div>
                <div className={`journeyNotsRight ${journeyNot.statusChangers[0].color}`}>
                    <div className="journeyNotsRightTop"> 
                        <div className="journeyNotsTitle">
                            <div className="journeyNotsTitleLeft">
                                {journeyStatement}
                            </div>
                            <div className="journeyNotsTitleRight">
                                <i className="journeyNotsTitleRightPNGIcon PNG_ICON_JOURNEY" alt=""/>
                            </div>
                        </div>
                    </div>                                                      
                    <div className="journeyNotsRightBottom">
                        {"Congraduate them on their progress!"}
                    </div>
                </div>
            </div>
            <hr 
                className={`
                    journeyNotsHr 
                    bottom 
                    ${journeyNot.statusChangers[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${journeyNot.statusChangers[0].color}
                `} 
            />
        </Link>
    )
}

export default JourneyNots;