import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { energyIcon } from '../../../../Utils/icons/icons';
import "./RelationshipNots.css";

function RelationshipNots({ not }) {

    const { notMDD, arrAddRelationshiper } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [ relationshipNot, setRelationshipNot ] = useState(not);
    const [ seen, setSeen ] = useState(relationshipNot?.seen);
    const [ relationshipStatement, setRelationshipStatement ] = useState(null);
    const [ relationshiperAdded, setRelationshiperAdded ] = useState(false);

    useEffect(() => {
        if(relationshipNot) {
            setSeen(relationshipNot.seen)
        }
    }, [relationshipNot])

    useEffect(() => {
        if (notMDD && seen === false) {
            setSeen(true);
        }
    },[notMDD, seen]);


    useEffect(() => {
        if (arrAddRelationshiper) {
            if (relationshipNot._id === arrAddRelationshiper.notificationId && relationshipNot.seen === false) {
                setRelationshipNot({...relationshipNot, statusChangers: [...relationshipNot.statusChangers, arrAddRelationshiper]});
                setRelationshiperAdded(true); 
            }
        }
    }, [arrAddRelationshiper]);

    useEffect(() => {
        if (relationshipNot.statusChangers.length === 1) {
            setRelationshipStatement(
                <span className="relationshipNotsTitleLeftPhrase">
                    <span className={`relationshipNotsName ${relationshipNot.statusChangers[0].color}`}>{`${relationshipNot.statusChangers[0].profileName} `}</span>     
                    <span className="relationshipNotsAction">{`changed their relationship status!`}</span>
                </span>
            )
        } else if (relationshipNot.statusChangers.length === 2) {
            setRelationshipStatement(
                <span className="relationshipNotsTitleLeftPhrase">
                    <span className={`relationshipNotsName ${relationshipNot.statusChangers[0].color}`}>{`${relationshipNot.statusChangers[0].profileName} `}</span>
                    <span className="relationshipNotsAction">{"and "}</span>
                    <span className={`relationshipNotsName ${relationshipNot.statusChangers[1].color}`}>{`${relationshipNot.statusChangers[1].profileName} `}</span>   
                    <span className="relationshipNotsAction">{`changed their relationship status!`}</span>
                </span>
            )
        } else if (relationshipNot.statusChangers.length === 3) {
            setRelationshipStatement(
                <span className="relationshipNotsTitleLeftPhrase">
                    <span className={`relationshipNotsName ${relationshipNot.statusChangers[0].color}`}>{relationshipNot.statusChangers[0].profileName}</span>
                    <span className="relationshipNotsAction">{", "}</span>
                    <span className={`relationshipNotsName ${relationshipNot.statusChangers[1].color}`}>{relationshipNot.statusChangers[1].profileName}</span>   
                    <span className="relationshipNotsAction">{", and "}</span>
                    <span className="relationshipNotsName">1</span>
                    <span className="relationshipNotsAction">{` other flame changed their relationship status!`}</span>
                </span>
            )
        } else if (relationshipNot.statusChangers.length > 3) {
            setrelationshipStatement(
                <span className="relationshipNotsTitleLeftPhrase">
                    <span className={`relationshipNotsName ${relationshipNot.statusChangers[0].color}`}>{relationshipNot.statusChangers[0].profileName}</span>
                    <span className="relationshipNotsAction">{", "}</span>
                    <span className={`relationshipNotsName ${relationshipNot.statusChangers[1].color}`}>{relationshipNot.statusChangers[1].profileName}</span>   
                    <span className="relationshipNotsAction">{", and "}</span>
                    <span className="relationshipNotsName">{`${relationshipNot.statusChangers.length - 2}`}</span>
                    <span className="relationshipNotsAction">{` other flames changed their relationship status!`}</span>
                </span>
            )
        }
    }, []);

    useEffect(() => {
        if (relationshiperAdded) {
            if (relationshipNot.statusChangers.length === 1) {
                setRelationshipStatement(
                    <span className="relationshipNotsTitleLeftPhrase">
                        <span className={`relationshipNotsName ${relationshipNot.statusChangers[0].color}`}>{`${relationshipNot.statusChangers[0].profileName} `}</span>     
                        <span className="relationshipNotsAction">{`changed their relationship status!`}</span>
                    </span>
                )
            } else if (relationshipNot.statusChangers.length === 2) {
                setRelationshipStatement(
                    <span className="relationshipNotsTitleLeftPhrase">
                        <span className={`relationshipNotsName ${relationshipNot.statusChangers[0].color}`}>{`${relationshipNot.statusChangers[0].profileName} `}</span>
                        <span className="relationshipNotsAction">{"and "}</span>
                        <span className={`relationshipNotsName ${relationshipNot.statusChangers[1].color}`}>{`${relationshipNot.statusChangers[1].profileName} `}</span>   
                        <span className="relationshipNotsAction">{`changed their relationship status!`}</span>
                    </span>
                )
            } else if (relationshipNot.statusChangers.length === 3) {
                setRelationshipStatement(
                    <span className="relationshipNotsTitleLeftPhrase">
                        <span className={`relationshipNotsName ${relationshipNot.statusChangers[0].color}`}>{relationshipNot.statusChangers[0].profileName}</span>
                        <span className="relationshipNotsAction">{", "}</span>
                        <span className={`relationshipNotsName ${relationshipNot.statusChangers[1].color}`}>{relationshipNot.statusChangers[1].profileName}</span>   
                        <span className="relationshipNotsAction">{", and "}</span>
                        <span className="relationshipNotsName">1</span>
                        <span className="relationshipNotsAction">{` other flame changed their relationship status!`}</span>
                    </span>
                )
            } else if (relationshipNot.statusChangers.length > 3) {
                setRelationshipStatement(
                    <span className="relationshipNotsTitleLeftPhrase">
                        <span className={`relationshipNotsName ${relationshipNot.statusChangers[0].color}`}>{relationshipNot.statusChangers[0].profileName}</span>
                        <span className="relationshipNotsAction">{", "}</span>
                        <span className={`relationshipNotsName ${relationshipNot.statusChangers[1].color}`}>{relationshipNot.statusChangers[1].profileName}</span>   
                        <span className="relationshipNotsAction">{", and "}</span>
                        <span className="relationshipNotsName">{`${relationshipNot.statusChangers.length - 2}`}</span>
                        <span className="relationshipNotsAction">{` other flames changed their relationship status!`}</span>
                    </span>
                )
            }
            setRelationshiperAdded(false);
        }
    }, [relationshiperAdded]);

    
    return (
        <Link className={`relationshipNots`} to={`/${relationshipNot.flareType}/${relationshipNot.flareId}`}>
            <div 
                className={`
                    relationshipNotsBackgroundTheme 
                    ${relationshipNot.statusChangers[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${seen? "seen" : "unseen"} 
                    ${relationshipNot.statusChangers[0].color}
                    lgt
                `} 
            />
            <hr 
                className={`
                    relationshipNotsHr 
                    top 
                    ${relationshipNot.statusChangers[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${relationshipNot.statusChangers[0].color}
                `} 
            />
            <div className={`relationshipNotsContainer`}>
                <div className="relationshipNotsLeft">
                    <img 
                        className={`relationshipNotsProfilePic`} 
                        src={PS + relationshipNot.statusChangers[0].avatar} 
                        alt="" 
                    />
                    <img 
                        className="relationshipNotsIcon flame" 
                        src={energyIcon(relationshipNot.statusChangers[0].color)} 
                        alt="" 
                    />
                </div>
                <div className={`relationshipNotsRight ${relationshipNot.statusChangers[0].color}`}>
                    <div className="relationshipNotsRightTop"> 
                        <div className="relationshipNotsTitle">
                            <div className="relationshipNotsTitleLeft">
                                {relationshipStatement}
                            </div>
                            <div className="relationshipNotsTitleRight">
                                <i className="relationshipNotsTitleRightPNGIcon PNG_ICON_RELATIONSHIP" alt=""/>
                            </div>
                        </div>
                    </div>                                                      
                    <div className="relationshipNotsRightBottom">
                        {"Check in with them!"}
                    </div>
                </div>
            </div>
            <hr 
                className={`
                    relationshipNotsHr 
                    bottom 
                    ${relationshipNot.statusChangers[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${relationshipNot.statusChangers[0].color}
                `} 
            />
        </Link>
    )
}

export default RelationshipNots;