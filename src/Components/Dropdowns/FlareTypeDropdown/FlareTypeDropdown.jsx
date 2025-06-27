import React, { uuseEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { feedDefault } from "../../../Redux/AuthSlice";
import { axiosReq } from '../../../Utils/axiosConfig';
import "./FlareTypeDropdown.css";
import { checkboxIcon, checkboxOutlineBlankIcon } from '../../../Lib/mui/icons';


 function FlareTypeDropdown({ type, feed, setFeed, fTDD, setFTDD }) {

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [ selected, setSelected ] = useState(feed ? feed : user.defaultFeed ? user.defaultFeed : "Journey");
    const [ defaultFT, setDefaultFT ] = useState(false);
    const [ backHov, setBackHov ] = useState(false);
    const [ backAct, setBackAct ] = useState(false);
    const [ dSAct, setDSAct ] = useState(false);

    const colorTheme = user.unionName 
            ? user.spectrum 
                ? user.spectrum
                : "gray"
            : user.energy
                ? user.energy
                : "gray";

    const selectHandler = (select) => {
        if (user.defaultFeed === selected) {
            setDefaultFT(false);
        }
        setSelected(select);          
    };
            
    const defaultFTHandler = () => {
        if (user.defaultFeed === selected) return;
        setDefaultFT(!defaultFT);
    };
            
    const cancelHandler = () => {
        setFTDD(false);
        setSelected(feed);
        setDefaultFT(false)
    };


    const handleSubmit = async () => {
        setFeed(selected);
        setFTDD(false);
        const updateDefaults = {defaultFeed: selected};
        Object.assign(updateDefaults, user.unionName? {unionId: user._id} : {userId: user._id});
        if (defaultFT === true) {
            try {
                axiosReq("PUT", `/${user.unionName ? "unions" : "users"}/${user._id}`, updateDefaults);
                dispatch(feedDefault(selected));
                localStorage.setItem("user", JSON.stringify({...user, defaultFeed: selected}));
            } catch (err) {
                console.log(err);
            }
        }
    };


    return (
        <div 
            className="flareTypeDropdown"
            style={fTDD ? {height: "586px"} : {height: "0px"}} 
        >
            <div className="flareTypeDropdownTop">
                <p className="flareTypeDropdownTopQuestion"> 
                    {`Who can see your ${type}?`}
                </p>
                <p className="flareTypeDropdownDescription">
                    {`Your ${type.toLowerCase()} will show up in the "`}
                    <span className="flareTypeDropdownDefault">{`${feed} ${type}s`}</span>
                    {`" feed, on your profile and in search results.`}
                </p>
                <p className="flareTypeDropdownDescription">
                    {"The default feed is set to "}
                    <span className="flareTypeDropdownDefault">{`${feed} ${type}s`}</span>
                    {`, but you can change the feed of this specific ${type.toLowerCase()}.`}
                </p>
            </div>
            <hr className={`flareTypeHr top COLOR_HR HIGHER_BACKGROUND ${colorTheme}`} />
            <div className="flareTypeDropdownCenter">
                <ul className="flareTypeList">
                    <li 
                        className={`
                            flareTypeListItem 
                            ${feed === "Journey" ? "HIGHER_BACKGROUND lgt" : ""}
                            ${feed === "Journey" ? "visible" : ""}
                            ${colorTheme}
                        `}
                        onClick={() => selectHandler("Journey")}
                    >
                        <div className="flareTypeChoice">
                            <div className="flareTypeChoiceDescription">
                                <div className="flareTypeChoiceDescriptionTop">{`Journey ${type}s`}</div>
                                <div className="flareTypeChoiceDescriptionBottom">
                                    {`Journey ${type}s are for anyone and everyone on the twin flame journey, awakening or enlightenment.  
                                    This is the feed in which you can express yourself and/or gain insight.`}
                                </div>
                            </div>
                        </div>
                        {colorTheme === "rainbow" ||
                         colorTheme === "silver" ||
                         colorTheme === "gold" ||
                         colorTheme === "platinum" ||
                         colorTheme === "diamond" ?
                            (
                                <>
                                    {selected === "Journey"
                                        ? <i 
                                            className={`flareTypeChoiceRadioBtnHS PNG_ICON_RADIOBTN ${colorTheme}`} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="flareTypeChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `flareTypeChoiceRadioBtn
                                        ${selected === "Journey" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `flareTypeChoiceRadioBtnCenter 
                                            ${selected === "Journey" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `flareTypeListItem 
                            ${feed === "Coaching" ? "HIGHER_BACKGROUND lgt" : ""}
                            ${feed === "Coaching" ? "visible" : ""}
                            ${user.unionName ? user.spectrum : user.energy}`
                        }
                        onClick={() => selectHandler("Coaching")}
                    >
                        <div className="flareTypeChoice">
                            {/*<div className="flareTypeChoiceIconDiv"></div>*/}
                            <div className="flareTypeChoiceDescription">
                                <div className="flareTypeChoiceDescriptionTop">{`Coaching ${type}s`}</div>
                                <div className="flareTypeChoiceDescriptionBottom">
                                    {`Coaching ${type}s are for helping others on the journey with guidence, insight, and understanding.  
                                    Only select this feed with the intent of guiding others.`}
                                </div>
                            </div>
                        </div>
                        {colorTheme === "rainbow" ||
                         colorTheme === "silver" ||
                         colorTheme === "gold" ||
                         colorTheme === "platinum" ||
                         colorTheme === "diamond" ?
                            (
                                <>
                                    {selected === "Coaching"
                                        ? <i 
                                            className={`flareTypeChoiceRadioBtnHS PNG_ICON_RADIOBTN ${colorTheme}`} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="flareTypeChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `flareTypeChoiceRadioBtn 
                                        ${selected === "Coaching" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `flareTypeChoiceRadioBtnCenter 
                                            ${selected === "Coaching" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                </ul>
            </div>
            <hr className={`flareTypeHr top COLOR_HR HIGHER_BACKGROUND ${colorTheme}`} />
            <div className="flareTypeDropdownBottom">
                <div className="defaultflareTypeCheckboxContainer" onClick={defaultFTHandler}>
                    {user.defaultFeed === selected ?
                        (
                            <div className="defaultVisibilityCheckbox defaulted">
                                {checkboxIcon}
                            </div>
                        ) : (
                            <>
                                {colorTheme === "rainbow" ||
                                colorTheme === "silver" ||
                                colorTheme === "gold" ||
                                colorTheme === "platinum" ||
                                colorTheme === "diamond" ?
                                    (
                                        <>
                                            {defaultFT
                                                ? <i 
                                                    className={`
                                                        defaultVisibilityCheckboxPNGIcon
                                                        PNG_ICON_CHECKBOX
                                                        ${colorTheme}
                                                    `}
                                                    //alt="checkbox-icon"
                                                />
                                                : <div className="defaultVisibilityCheckbox">
                                                    {checkboxOutlineBlankIcon}
                                                </div>
                                            }
                                        </>
                                    ) : (
                                        <div 
                                            className={`
                                                defaultVisibilityCheckbox
                                                ${defaultFT ? "checked" : ""}
                                                ${colorTheme}
                                            `}
                                        >
                                            {defaultFT ? checkboxIcon : checkboxOutlineBlankIcon}
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                    <div className={`defaultflareTypeCheckboxLabel ${user.defaultFeed === selected && "defaulted"}`}>
                        {`Set as default feed`} 
                    </div>
                </div>
                <div className="flareTypeControlBtns">
                    <div 
                        className={`
                            flareTypeControlBtnBackground 
                            ${colorTheme === "diamond" && backHov ? "HIGHER_BACKGROUND" : ""}
                            ${backAct ? "drk lgt" : "lgt"}
                            back
                            ${colorTheme}
                        `}
                    >
                        <button 
                            className={`
                                flareTypeControlBtn 
                                back
                                ${colorTheme}
                            `}
                            onClick={cancelHandler}
                            onMouseEnter={() => setBackHov(true)}
                            onMouseLeave={() => setBackHov(false)}
                            onMouseDown={() => setBackAct(true)}
                            onMouseUp={() => setBackAct(false)}
                        >
                            Back
                        </button>
                    </div>
                    <div 
                        className={`
                            flareTypeControlBtnBackground 
                            HIGHER_BACKGROUND
                            ${dSAct ? "drk" : ""}
                            doneSave
                            ${colorTheme}
                        `}
                    >
                        <button 
                            className={`
                                flareTypeControlBtn 
                                doneSave
                                ${colorTheme}
                            `}
                            onClick={handleSubmit}
                            onMouseDown={() => setDSAct(true)}
                            onMouseUp={() => setDSAct(false)}
                        >
                            {defaultFT ? "Save" : "Done"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default FlareTypeDropdown;