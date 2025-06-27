import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { energyIcon } from '../../../../Utils/icons/icons';
import "./BirthdayNots.css";

function BirthdayNots({ not }) {

    const { notMDD, arrAddBirthday } = useSelector((state) => state.auth);

    const PS = process.env.PHOTO_STORAGE;

    const [ birthdayNot, setBirthdayNot ] = useState(not);
    const [ seen, setSeen ] = useState(birthdayNot?.seen);
    const [ birthdayStatement, setBirthdayStatement ] = useState(null);
    const [ birthdayAdded, setBirthdayAdded ] = useState(false);

    useEffect(() => {
        if(birthdayNot) {
            setSeen(birthdayNot.seen)
        }
    }, [birthdayNot])

    useEffect(() => {
        if (notMDD && seen === false) {
            setSeen(true);
        }
    },[notMDD, seen]);


    useEffect(() => {
        if (arrAddBirthday) {
            if (birthdayNot._id === arrAddBirthday.notificationId && birthdayNot.seen === false) {
                setBirthdayNot({...birthdayNot, birthdays: [...birthdayNot.birthdays, arrAddBirthday]});
                setBirthdayAdded(true); 
            }
        }
    }, [arrAddBirthday]);

    useEffect(() => {
        if (birthdayNot.birthdays.length === 1) {
            setBirthdayStatement(
                <span className="birthdayNotsTitleLeftPhrase">
                    <span className={`birthdayNotsName ${birthdayNot.birthdays[0].color}`}>{`${birthdayNot.birthdays[0].profileName} `}</span>     
                    <span className="birthdayNotsAction">{`celebrate their birthday today!`}</span>
                </span>
            )
        } else if (birthdayNot.birthdayrs.length === 2) {
            setBirthdayStatement(
                <span className="birthdayNotsTitleLeftPhrase">
                    <span className={`birthdayNotsName ${birthdayNot.birthdays[0].color}`}>{`${birthdayNot.birthdays[0].profileName} `}</span>
                    <span className="birthdayNotsAction">{"and "}</span>
                    <span className={`birthdayNotsName ${birthdayNot.birthdays[1].color}`}>{`${birthdayNot.birthdays[1].profileName} `}</span>   
                    <span className="birthdayNotsAction">{`celebrate their birthdays today!`}</span>
                </span>
            )
        } else if (birthdayNot.birthdays.length === 3) {
            setBirthdayStatement(
                <span className="birthdayNotsTitleLeftPhrase">
                    <span className={`birthdayNotsName ${birthdayNot.birthdays[0].color}`}>{birthdayNot.birthdays[0].profileName}</span>
                    <span className="birthdayNotsAction">{", "}</span>
                    <span className={`birthdayNotsName ${birthdayNot.birthdays[1].color}`}>{birthdayNot.birthdays[1].profileName}</span>   
                    <span className="birthdayNotsAction">{", and "}</span>
                    <span className="birthdayNotsName">1</span>
                    <span className="birthdayNotsAction">{` other flame celebrate their birthdays today!`}</span>
                </span>
            )
        } else if (birthdayNot.birthdays.length > 3) {
            setBirthdayStatement(
                <span className="birthdayNotsTitleLeftPhrase">
                    <span className={`birthdayNotsName ${birthdayNot.birthdays[0].color}`}>{birthdayNot.birthdays[0].profileName}</span>
                    <span className="birthdayNotsAction">{", "}</span>
                    <span className={`birthdayNotsName ${birthdayNot.birthdays[1].color}`}>{birthdayNot.birthdays[1].profileName}</span>   
                    <span className="birthdayNotsAction">{", and "}</span>
                    <span className="birthdayNotsName">{`${birthdayNot.birthdays.length - 2}`}</span>
                    <span className="birthdayNotsAction">{` other flames celebrate their birthdays today!`}</span>
                </span>
            )
        }
    }, []);

    useEffect(() => {
        if (birthdayAdded) {
            if (birthdayNot.birthdays.length === 1) {
                setBirthdayStatement(
                    <span className="birthdayNotsTitleLeftPhrase">
                        <span className={`birthdayNotsName ${birthdayNot.birthdays[0].color}`}>{`${birthdayNot.birthdays[0].profileName} `}</span>     
                        <span className="birthdayNotsAction">{`celebrate their birthday today!`}</span>
                    </span>
                )
            } else if (birthdayNot.birthdayrs.length === 2) {
                setBirthdayStatement(
                    <span className="birthdayNotsTitleLeftPhrase">
                        <span className={`birthdayNotsName ${birthdayNot.birthdays[0].color}`}>{`${birthdayNot.birthdays[0].profileName} `}</span>
                        <span className="birthdayNotsAction">{"and "}</span>
                        <span className={`birthdayNotsName ${birthdayNot.birthdays[1].color}`}>{`${birthdayNot.birthdays[1].profileName} `}</span>   
                        <span className="birthdayNotsAction">{`celebrate their birthdays today!`}</span>
                    </span>
                )
            } else if (birthdayNot.birthdays.length === 3) {
                setBirthdayStatement(
                    <span className="birthdayNotsTitleLeftPhrase">
                        <span className={`birthdayNotsName ${birthdayNot.birthdays[0].color}`}>{birthdayNot.birthdays[0].profileName}</span>
                        <span className="birthdayNotsAction">{", "}</span>
                        <span className={`birthdayNotsName ${birthdayNot.birthdays[1].color}`}>{birthdayNot.birthdays[1].profileName}</span>   
                        <span className="birthdayNotsAction">{", and "}</span>
                        <span className="birthdayNotsName">1</span>
                        <span className="birthdayNotsAction">{` other flame celebrate their birthdays today!`}</span>
                    </span>
                )
            } else if (birthdayNot.birthdays.length > 3) {
                setBirthdayStatement(
                    <span className="birthdayNotsTitleLeftPhrase">
                        <span className={`birthdayNotsName ${birthdayNot.birthdays[0].color}`}>{birthdayNot.birthdays[0].profileName}</span>
                        <span className="birthdayNotsAction">{", "}</span>
                        <span className={`birthdayNotsName ${birthdayNot.birthdays[1].color}`}>{birthdayNot.birthdays[1].profileName}</span>   
                        <span className="birthdayNotsAction">{", and "}</span>
                        <span className="birthdayNotsName">{`${birthdayNot.birthdays.length - 2}`}</span>
                        <span className="birthdayNotsAction">{` other flames celebrate their birthdays today!`}</span>
                    </span>
                )
            }
            setBirthdayAdded(false);
        }
    }, [birthdayAdded]);

    
    return (
        <Link className={`birthdayNots`} to={`/${birthdayNot.flareType}/${birthdayNot.flareId}`}>
            <div 
                className={`
                    birthdayNotsBackgroundTheme 
                    ${birthdayNot.birthdays[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${seen? "seen" : "unseen"} 
                    ${birthdayNot.birthdays[0].color}
                    lgt
                `} 
            />
            <hr 
                className={`
                    birthdayNotsHr 
                    top 
                    ${birthdayNot.birthdays[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${birthdayNot.birthdays[0].color}
                `} 
            />
            <div className={`birthdayNotsContainer`}>
                <div className="birthdayNotsLeft">
                    <img 
                        className={`birthdayNotsProfilePic`} 
                        src={birthdayNot.birthdays[0].avatar 
                            ? PS + birthdayNot.birthdays[0].avatar
                            : "/picBlanks/no-avatar.jpg"
                        } 
                        alt="" 
                    />
                    <img 
                        className={`birthdayNotsIcon flame`} 
                        src={energyIcon(birthdayNot.birthdays[0].color)
                        } 
                        alt="" 
                    />
                </div>
                <div className={`birthdayNotsRight ${birthdayNot.birthdays[0].color}`}>
                    <div className="birthdayNotsRightTop"> 
                        <div className="birthdayNotsTitle">
                            <div className="birthdayNotsTitleLeft">
                                {birthdayStatement}
                            </div>
                            <div className="birthdayNotsTitleRight">
                                <i 
                                    className={`birthdayNotsTitleRightPNGIcon PNG_ICON_BIRTHDAY`} 
                                    //alt="birthday/birthdays" 
                                />
                            </div>
                        </div>
                    </div>                                                      
                    <div className="birthdayNotsRightBottom">
                        <span className="birthdayNotsRetort description">
                            {"Wish them a Happy Birthday!"}
                        </span>
                    </div>
                </div>
            </div>
            <hr 
                className={`
                    birthdayNotsHr 
                    bottom 
                    ${birthdayNot.birthdays[0].color === "diamond" ? "HIGHER_BACKGROUND" : ""} 
                    ${birthdayNot.birthdays[0].color}
                `} 
            />
        </Link>
    )
}

export default BirthdayNots;