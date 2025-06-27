import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { audienceDefault } from "../../../Redux/AuthSlice";
import "./AudienceVisibilityDropdown.css";
import { axiosReq } from '../../../Utils/axiosConfig';
import { 
    arrowBackIcon, 
    arrowForwardIcon, 
    categoryIcon, 
    checkboxIcon, 
    checkboxOutlineBlankIcon, 
    peopleAltIcon, 
    peopleIcon, 
    personIcon, 
    publicIcon, 
    visOutlinedIcon 
} from '../../../Lib/mui/icons';


 function AudienceVisibilityDropdown({ type, feed, visible, setVisible, visDD, setVisDD }) {

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const [ selected, setSelected ] = useState(visible ? visible : user.defaultAudience ? user.defaultAudience : "Public");
    const [ defaultVis, setDefaultVis ] = useState(false);
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
        if (user.defaultAudience === selected) {
            setDefaultVis(false);
        }
        setSelected(select);  
    };
            
    const defaultVisHandler = () => {
        if (user.defaultAudience === selected) return;
            setDefaultVis(!defaultVis);
    };
            
    const cancelHandler = () => {
        setVisDD(false);
        setSelected(visible);
        setDefaultVis(false)
    }

    const handleSubmit = async () => {
        setVisible(selected);
        setVisDD(false);
        const updateDefaults = {defaultAudience: selected};
        Object.assign(updateDefaults, user.unionName? {unionId: user._id} : {userId: user._id});
        if (defaultVis) {
            try {
                axiosReq("PUT", `/${user.unionName ? "unions" : "users"}/${user._id}`, updateDefaults);
                dispatch(audienceDefault(selected));
                localStorage.setItem("user", JSON.stringify({...user, defaultAudience: selected}));
            } catch(err) {console.log(err)};    
        }
        setDefaultVis(false);
    };
   

    return (
        <div 
            className="visibilityDropdown"
            style={visDD ? {height: "580px"} : {height: "0px"}} 
        >
            <div className="visibilityDropdownTop">
                <p className="visibilityDropdownTopQuestion"> 
                    {`Who can see your ${type.toLowerCase()}?`}
                </p>
                <p className="visibilityDropdownDescription">
                    {`Your ${type.toLowerCase()} will show up in "`}
                    <span className="visibilityDropdownDefault">{`${feed} ${type}s`}</span>
                    {`" Feed, on your profile and in search results.`}
                </p>
                <p className="visibilityDropdownDescription">
                    {"Your default audience is set to "}
                    <span className="visibilityDropdownDefault">{user.defaultAudience}</span>
                    {", but you can change the audience of this specific post."}
                </p>
            </div>
            <hr className={`audienceVisibilityHr top COLOR_HR HIGHER_BACKGROUND ${colorTheme}`} />
            <div className="visibilityDropdownCenter">
                <ul className="visibilityAudienceList">
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Public" ? "HIGHER_BACKGROUND lgt" : ""}
                            ${visible === "Public" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        onClick={() => selectHandler("Public")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <div className="audienceVisibilityChoiceIcon primary">{publicIcon}</div>
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Public</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {'Anyone on or off '}
                                    <span style={{ color: "#4a76fd", opacity: ".7" }}>Connect</span>
                                    <span style={{ color: "#e639af", opacity: ".7" }}>TF</span>
                                    {` can view your ${type.toLowerCase()}.`}
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
                                    {selected === "Public"
                                        ? <i 
                                            className={`
                                                audienceVisibilityChoiceRadioBtnHS
                                                PNG_ICON_RADIOBTN
                                                ${colorTheme}
                                            `} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Public" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Public" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Friends" ? "HIGHER_BACKGROUND lgt" : ""}
                            ${visible === "Friends" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        onClick={() => selectHandler("Friends")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <div className="audienceVisibilityChoiceIcon primary">{peopleIcon}</div>
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Friends</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Anyone you are befriending or anyone befriending you can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Friends"
                                        ? <i 
                                            className={`
                                                audienceVisibilityChoiceRadioBtnHS
                                                PNG_ICON_RADIOBTN
                                                ${colorTheme}
                                            `} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Friends" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Friends" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Befrienders" ? "HIGHER_BACKGROUND lgt" : ""}
                            ${visible === "Befrienders" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        onClick={() => selectHandler("Befrienders")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <div className="audienceVisibilityChoiceIcon primary">{peopleIcon}</div>
                                <div className="audienceVisibilityChoiceIcon secondary">{arrowBackIcon}</div>
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Befrienders</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Anyone befriending you can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Befrienders"
                                        ? <i 
                                            className={`
                                                audienceVisibilityChoiceRadioBtnHS
                                                PNG_ICON_RADIOBTN
                                                ${colorTheme}
                                            `} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Befrienders" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Befrienders" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Befriending" ? "HIGHER_BACKGROUND lgt" : ""}
                            ${visible === "Befriending" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        onClick={() => selectHandler("Befriending")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <div className="audienceVisibilityChoiceIcon primary">{peopleIcon}</div>
                                <div className="audienceVisibilityChoiceIcon secondary">{arrowForwardIcon}</div>
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Befriending</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Anyone you are befriending can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Befriending"
                                        ? <i 
                                            className={`
                                                audienceVisibilityChoiceRadioBtnHS
                                                PNG_ICON_RADIOBTN
                                                ${colorTheme}
                                            `} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Befriending" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Befriending" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Unions" ? "HIGHER_BACKGROUND lgt" : ""}
                            ${visible === "Unions" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        onClick={() => selectHandler("Unions")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <div className="audienceVisibilityChoiceIcon primary">{peopleAltIcon}</div>
                                <div className="audienceVisibilityChoiceIcon secondary">{publicIcon}</div>
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Unions</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Any union can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Unions"
                                        ? <i 
                                            className={`
                                                audienceVisibilityChoiceRadioBtnHS
                                                PNG_ICON_RADIOBTN
                                                ${colorTheme}
                                            `} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Unions" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Unions" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Union Friends" ? "HIGHER_BACKGROUND lgt" : ""}
                            ${visible === "Union Friends" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        onClick={() => selectHandler("Union Friends")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <div className="audienceVisibilityChoiceIcon primary">{peopleAltIcon}</div>
                                <div className="audienceVisibilityChoiceIcon secondary">{peopleIcon}</div>
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Union Friends</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Unions you are befriending or befriending you can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Union Friends"
                                        ? <i 
                                            className={`
                                                audienceVisibilityChoiceRadioBtnHS
                                                PNG_ICON_RADIOBTN
                                                ${colorTheme}
                                            `} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Union Friends" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Unions Friends" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Union Befrienders" ? "HIGHER_BACKGROUND lgt" : ""}
                            ${visible === "Union Befrienders" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        onClick={() => selectHandler("Union Befrienders")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <div className="audienceVisibilityChoiceIcon primary">{peopleAltIcon}</div>
                                <div className="audienceVisibilityChoiceIcon secondary">{arrowBackIcon}</div>
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Union Befrienders</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Only unions befriending you can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Union Befrienders"
                                        ? <i 
                                            className={`
                                                audienceVisibilityChoiceRadioBtnHS
                                                PNG_ICON_RADIOBTN
                                                ${colorTheme}
                                            `} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Union Befrienders" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Union Befrienders" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Unions Befriending" ? "HIGHER_BACKGROUND lgt" : ""}
                            ${visible === "Unions Befriending" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        onClick={() => selectHandler("Unions Befriending")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <div className="audienceVisibilityChoiceIcon primary">{peopleAltIcon}</div>
                                <div className="audienceVisibilityChoiceIcon secondary">{arrowForwardIcon}</div>
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Unions Befriending</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Only unions you are befriending can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Unions Befriending"
                                        ? <i 
                                            className={`
                                                audienceVisibilityChoiceRadioBtnHS
                                                PNG_ICON_RADIOBTN
                                                ${colorTheme}
                                            `} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Unions Befriending" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Unions Befriending" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Flames" ? "HIGHER_BACKGROUND lgt" : ""}
                            ${visible === "Flames" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        onClick={() => selectHandler("Flames")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <div className="audienceVisibilityChoiceIcon primary">{personIcon}</div>
                                <div className="audienceVisibilityChoiceIcon secondary">{publicIcon}</div>
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Flames</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Any flame users (NOT in union) can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Flames"
                                        ? <i 
                                            className={`
                                                audienceVisibilityChoiceRadioBtnHS
                                                PNG_ICON_RADIOBTN
                                                ${colorTheme}
                                            `} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Flames" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Flames" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem
                            ${visible === "Flame Friends" ? "HIGHER_BACKGROUND lgt" : ""}
                            ${visible === "Flame Friends" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        onClick={() => selectHandler("Flame Friends")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <div className="audienceVisibilityChoiceIcon primary">{personIcon}</div>
                                <div className="audienceVisibilityChoiceIcon secondary">{peopleIcon}</div>
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Flame Friends</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Flame users (NOT in union) you are befriending or befriending you can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Flame Friends"
                                        ? <i 
                                            className={`
                                                audienceVisibilityChoiceRadioBtnHS
                                                PNG_ICON_RADIOBTN
                                                ${colorTheme}
                                            `} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Flame Friends" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Flame Friends" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Flame Befrienders" ? "HIGHER_BACKGROUND lgt" : ""}
                            ${visible === "Flame Befrienders" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        onClick={() => selectHandler("Flame Befrienders")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <div className="audienceVisibilityChoiceIcon primary">{personIcon}</div>
                                <div className="audienceVisibilityChoiceIcon secondary">{arrowBackIcon}</div>
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Flame Befrienders</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Flame users (NOT in union) befriending you can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Flame Befrienders"
                                        ? <i 
                                            className={`
                                                audienceVisibilityChoiceRadioBtnHS
                                                PNG_ICON_RADIOBTN
                                                ${colorTheme}
                                            `} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Flame Befrienders" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Flame Befrienders" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Flames Befriending" ? "HIGHER_BACKGROUND lgt" : ""}
                            ${visible === "Flames Befriending" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        onClick={() => selectHandler("Flames Befriending")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <div className="audienceVisibilityChoiceIcon primary">{personIcon}</div>
                                <div className="audienceVisibilityChoiceIcon secondary">{arrowForwardIcon}</div>
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Flames Befriending</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Flame users (NOT in union) you are befriending can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Flames Befriending"
                                        ? <i 
                                            className={`
                                                audienceVisibilityChoiceRadioBtnHS
                                                PNG_ICON_RADIOBTN
                                                ${colorTheme}
                                            `} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={`
                                        audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Flames Befriending" ? "active" : "inActive"} 
                                        ${colorTheme}
                                    `} 
                                >
                                    <div
                                        className={`
                                            audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Flames Befriending" ? "active" : "inActive"} 
                                            ${colorTheme}
                                        `} 
                                    />
                                </div>
                            )
                        }
                    </li>
                    {/*
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Custom" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        style={colorTheme === "diamond" && visible === "Custom" 
                            ? {backgroundImage: `url(/misc/${colorTheme}-background-lgt.jpg)`, backgroundSize: "cover"} 
                            : {}
                        }
                        onClick={() => selectHandler("Custom")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <Category className="audienceVisibilityChoiceIcon primary" />
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Custom</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Include or exclude anyone viewing your ${type.toLowerCase()}.`}
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
                                    {selected === "Custom"
                                        ? <i 
                                            className={`
                                                audienceVisibilityChoiceRadioBtnHS
                                                PNG_ICON_RADIOBTN
                                                ${colorTheme}
                                            `} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={
                                        `audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Custom" ? "active" : "inActive"} 
                                        ${colorTheme}`
                                    } 
                                >
                                    <div
                                        className={
                                            `audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Custom" ? "active" : "inActive"} 
                                            ${colorTheme}`
                                        } 
                                    />
                                </div>
                            )
                        }
                    </li>
                    */}
                    <li 
                        className={`
                            visibilityAudienceListItemVoid 
                            ${colorTheme}
                        `}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <div className="audienceVisibilityChoiceIcon primary">{categoryIcon}</div>
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Custom</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Include or exclude anyone viewing your ${type.toLowerCase()}.`}
                                </div>
                            </div>
                        </div>
                        {colorTheme === "rainbow" ||
                         colorTheme === "silver" ||
                         colorTheme === "gold" ||
                         colorTheme === "platinum" ||
                         colorTheme === "diamond" ?
                            (     
                                <div className="audienceVisibilityChoiceRadioBtn inActive" />
                            ) : (
                                <div 
                                    className={`
                                        audienceVisibilityChoiceRadioBtn 
                                        inActive 
                                        ${colorTheme}
                                    `} 
                                >
                                    <div
                                        className={`
                                            audienceVisibilityChoiceRadioBtnCenter 
                                            inActive 
                                            ${colorTheme}
                                        `} 
                                    />
                                </div>
                            )
                        }
                    </li>
                    <li 
                        className={
                            `visibilityAudienceListItem 
                            ${visible === "Only You" ? "HIGHER_BACKGROUND lgt" : ""}
                            ${visible === "Only You" ? "visible" : ""}
                            ${colorTheme}`
                        }
                        onClick={() => selectHandler("Only You")}
                    >
                        <div className="audienceVisibilityChoice">
                            <div className="audienceVisibilityChoiceIconDiv">
                                <div className="audienceVisibilityChoiceIcon primary">{visOutlinedIcon}</div>
                            </div>
                            <div className="audienceVisibilityChoiceDescription">
                                <div className="audienceVisibilityChoiceDescriptionTop">Only You</div>
                                <div className="audienceVisibilityChoiceDescriptionBottom">
                                    {`Only you, your spirit guides, and the Universal Source can see your ${type.toLowerCase()}.`}
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
                                    {selected === "Only You"
                                        ? <i 
                                            className={`
                                                audienceVisibilityChoiceRadioBtnHS
                                                PNG_ICON_RADIOBTN
                                                ${colorTheme}
                                            `} 
                                            //alt="radio-btn-icon" 
                                        />
                                        : <div className="audienceVisibilityChoiceRadioBtn inActive" />
                                    }
                                </>
                            ) : (
                                <div 
                                    className={`
                                        audienceVisibilityChoiceRadioBtn 
                                        ${selected === "Only You" ? "active" : "inActive"} 
                                        ${colorTheme}
                                    `} 
                                >
                                    <div
                                        className={`
                                            audienceVisibilityChoiceRadioBtnCenter 
                                            ${selected === "Only You" ? "active" : "inActive"} 
                                            ${colorTheme}
                                        `} 
                                    />
                                </div>
                            )
                        }
                    </li>
                </ul>
            </div>
            <hr className={`audienceVisibilityHr top COLOR_HR HIGHER_BACKGROUND ${colorTheme}`} />
            <div className="visibilityDropdownBottom">
                <div className="defaultVisibilityCheckboxContainer" onClick={defaultVisHandler}>
                    {user.defaultAudience === selected ?
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
                                            {defaultVis
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
                                                ${defaultVis ? "checked" : ""}
                                                ${colorTheme}
                                            `}
                                        >
                                            {defaultVis ? checkboxIcon : checkboxOutlineBlankIcon}
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                    <div className={`defaultVisibilityCheckboxLabel ${user.defaultAudience === selected && "defaulted"}`}>
                        {`Set as default audience`} 
                    </div>
                </div>
                <div className="audienceVisibilityControlBtns">
                    <div 
                        className={`
                            audienceVisibilityControlBtnBackground 
                            ${colorTheme === "diamond" && backHov ? "HIGHER_BACKGROUND" : ""}
                            ${backAct ? "drk lgt" : "lgt"}
                            back
                            ${colorTheme}
                        `}
                    >
                        <button 
                            className={`
                                audienceVisibilityControlBtn 
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
                            audienceVisibilityControlBtnBackground
                            HIGHER_BACKGROUND
                            ${dSAct ? "drk" : ""}
                            doneSave
                            ${colorTheme}
                        `}
                    >
                        <button 
                            className={`
                                audienceVisibilityControlBtn 
                                doneSave
                                ${colorTheme}
                            `}
                            onClick={handleSubmit}
                            onMouseDown={() => setDSAct(true)}
                            onMouseUp={() => setDSAct(false)}
                        >
                            {defaultVis ? "Save" : "Done"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AudienceVisibilityDropdown;