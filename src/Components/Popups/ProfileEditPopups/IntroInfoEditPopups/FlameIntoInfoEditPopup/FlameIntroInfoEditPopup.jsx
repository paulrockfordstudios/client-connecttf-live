import React, { useEffect, useState } from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { axiosReq } from "../../../../../Utils/axiosConfig";
import { colorTheme } from '../../../../../Utils/styling/colorTheme';
import { fiiepClose, newProfileName, newAbout, newHereFor } from "../../../../../Redux/AuthSlice";
import "./FlameIntroInfoEditPopup.css";
import { cancelIcon } from '../../../../../Lib/mui/icons';


function FlameIntroInfoEditPopup() {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const color = colorTheme(user);

    const [ nameVal, setNameVal ] = useState(user.profileName);
    const [ aboutVal, setAboutVal ] = useState(user.about);
    const [ reasons, setReasons ] = useState(user.hereFor);
    const [ btnBckgrnd, setBtnBckgrnd ] = useState(false);
    const [ updateAct, setUpdateAct ] = useState(false); 

    const cbChoice = [
        {value: "guidance", column: 1},
        {value: "friendship", column: 1},
        {value: "curiousity", column: 1},
        {value: "shine my light", column: 1},
        {value: "insight", column: 2},
        {value: "acceptance", column: 2},
        {value: "emotional support", column: 2},
        {value: "be a guide", column: 2},
        {value: "I have questions", column: 3},
        {value: "hoping to meet someone special", column: 3},
        {value: "share my story", column: 3},
        {value: "meet others", column: 3},
    ];

    useEffect(() => {
        setReasons(user.hereFor)
    }, [user]);

    const handleChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setReasons([...reasons, value]);
        } else {
            setReasons(reasons.filter((r) => r !== value));
        }
    };

    const handleSubmit =  async () => {
        const newIntro = {
            userId: user._id,
            profileName: nameVal,
            about: aboutVal,
            hereFor: reasons,
        }
        try {
            await axiosReq("PUT", `/users/${user._id}`, newIntro);
            dispatch(newProfileName(nameVal));
            dispatch(newAbout(aboutVal));
            dispatch(newHereFor(reasons));
            localStorage.setItem("user", JSON.stringify({...user, profileName: nameVal, about: aboutVal, hereFor: reasons}));
            dispatch(fiiepClose());
        } catch (err) {console.log(err);}
    };


    return ReactDom.createPortal(
        <div className={`fiiepPortal ${color}`}>
            <div className={`fiiepBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${color}`} />
            <div className="fiiepModal">
                <div className="fiiep">
                    <div className="fiiepContainer">
                        <div className="fiiepTop">
                            <div className="fiiepHeader">
                                <i className="fiiepLogo PNG_ICON_LOGO"/>
                                <div className={`fiiepTitle ${color}`}>Introduction Information</div>
                                <div className={`fiiepCancelSVGIcon ${color}`} onClick={() => dispatch(fiiepClose())}>{cancelIcon}</div>
                            </div>
                            <hr className={`fiiepHr ${color}`}/>
                            <div className="fiiepAction One">
                                <div className="fiiepActionTitle">Change your profile name.</div>
                                <div className="fiiepActionDisclaimer">
                                    (If your account is set to anonymous, this will show up as "Anonymous User" and will not show up in searches.)
                                </div>
                                <div className="fiiepActionEditorContainer pName">
                                    <div className={`fiiepActionEditor INNER_BOX_SHADOW ${color}`}>
                                        <input 
                                            className="fiiepActionInput"
                                            required
                                            value={nameVal}
                                            placeholder="Required (25 characters or less.)" 
                                            onChange={(e) => setNameVal(e.target.value)}
                                        />
                                        <span className="fiiepActionRequirementText">{"(Required)"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="fiiepAction two">
                                <div className="fiiepActionTitle">Change your introduction sentence.</div>
                                <div className="fiiepActionDisclaimer">
                                    (A brief sentence about yourself. e.g. I am an energy healer who works as a store manager and I love to cook!)
                                </div>
                                <div className="fiiepActionEditorContainer sentence">
                                    <div className={`fiiepActionEditor INNER_BOX_SHADOW ${color}`}>
                                        <input 
                                            className="fiiepActionInput sentence" 
                                            value={aboutVal}
                                            onChange={(e) => setAboutVal(e.target.value)}
                                        />
                                        <span className="fiiepActionRequirementText">{"(Optional)"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="fiiepAction three">
                                <div className="fiiepActionTitle">Have your reasons for being here changed?</div>
                                <div className="fiiepActionDesc">Check all that apply.</div>
                                
                                <div className="fiiepCheckboxField">
                                    <div className="fiiepCheckboxFieldColumn one">
                                        {cbChoice.filter((choice) => choice.column === 1).map((choice, index) => (
                                            <div className={`fiiepCheckboxItem ${color}`}>
                                                <input 
                                                    key={`fiiepcb-c2-${index}`}
                                                    className={`fiiepCheckboxSelection ${color}`} 
                                                    type="checkbox" 
                                                    name="reasons"
                                                    value={choice.value}
                                                    checked={reasons.includes(choice.value)}
                                                    onChange={handleChange}
                                                />
                                                <span className="fiiepCheckboxText">{`${choice.value}`}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="fiiepCheckboxFieldColumn two">
                                        {cbChoice.filter((choice) => choice.column === 2).map((choice, index) => (
                                            <div className={`fiiepCheckboxItem ${color}`}>
                                                <input 
                                                    key={`fiiepcb-c2-${index}`}
                                                    className={`fiiepCheckboxSelection ${color}`} 
                                                    type="checkbox" 
                                                    name="reasons"
                                                    value={choice.value}
                                                    checked={reasons.includes(choice.value)}
                                                    onChange={handleChange}
                                                />
                                                <span className="fiiepCheckboxText">{`${choice.value}`}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="fiiepCheckboxFieldColumn three">
                                        {cbChoice.filter((choice) => choice.column === 3).map((choice, index) => (
                                            <div className={`fiiepCheckboxItem ${color}`}>
                                                <input 
                                                    key={`fiiepcb-c3-${index}`}
                                                    className={`fiiepCheckboxSelection ${color}`} 
                                                    type="checkbox" 
                                                    name="reasons"
                                                    value={choice.value}
                                                    checked={reasons.includes(choice.value)}
                                                    onChange={handleChange}
                                                />
                                                <span className="fiiepCheckboxText">{`${choice.value}`}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>   
                            </div>
                        </div>
                        <hr className={`fiiepHr ${color}`}/>
                        <div className="fiiepBottom">
                            <div 
                                    className={`
                                        fiiepButtonBackground 
                                        ${btnBckgrnd ? "drk" : ""}
                                        ${color} 
                                        ${nameVal === null || nameVal === "" || nameVal === "<p><br></p>" 
                                            ? "disabled" 
                                            : ""
                                        }
                                    `} 
                                    onMouseDown={() => setBtnBckgrnd(true)}
                                    onMouseUp={() => setBtnBckgrnd(false)}
                                >
                                    <button 
                                        className={`
                                            fiiepButton 
                                            ${nameVal === null || nameVal === "" || nameVal === "<p><br></p>" 
                                                ? `${color} lgt`
                                                : color
                                            }`
                                        } 
                                        disabled={
                                            nameVal === null || nameVal === "" || nameVal === "<p><br></p>" 
                                                ? true 
                                                : false
                                            }
                                        type="button|submit|reset" 
                                        onClick={handleSubmit}
                                        onMouseDown={() => setUpdateAct(true)}
                                        onMouseUp={() => setUpdateAct(false)}
                                    >
                                        Update
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default FlameIntroInfoEditPopup;