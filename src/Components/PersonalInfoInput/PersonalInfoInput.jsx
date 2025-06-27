import React, { useEffect, useRef, useState } from 'react';
import { ctfbglgAngleBackdrop } from '../../Utils/calculateAngle';
import { formik } from '../../Lib/formik/formik';
import { useDispatch, useSelector } from 'react-redux';
import useElementSize from '../../Utils/crHooks/useElementSize';
import { useTranslation } from 'react-i18next';
import "./PersonalInfoInput.css";
import { languages } from '../../Assets/localization/languages';
import { setKeyHov } from '../../Redux/AuthSlice';
import cookies from "js-cookie";
import { cakeIcon, lockIcon, personIcon, visOnIcon, visOffIcon, calendarTodayIcon, mailIcon } from '../../Lib/mui/icons';
import useFocusVisible from '../../Utils/crHooks/useFocusVisible';


function PersonalInfoInput(
    {id, name, type, handleDateInputChange, dateValue, required, autoComplete, refer, dropdown, setDropdown}
) {

    const inputRef = useRef();

    const dispatch = useDispatch(); 

    const { screen ,keyHov } = useSelector((state) => state.auth);

    const focused = useFocusVisible(inputRef);

    const refDims = useElementSize(refer);

    const {t} = useTranslation(["auxiliary", "common", "languages"]);

    const [ focus, setFocus ] = useState("");
    const [ passwordShow, setPasswordShow ] = useState(false);
    const [ icon, setIcon ] = useState(<></>);
    

    const { handleBlur, handleChange, values, touched, errors, setErrors, setFieldTouched } = formik();

    const currentLanguageCode = cookies.get('i18next') || "en-US";
    const currentLanguage = languages.find((lng) => lng.code === currentLanguageCode);

    useEffect(() => {
        const style="personalInfoInputIcon"
        switch (id) {
            case "email":
                setIcon(<div className={style}>{mailIcon}</div>)
                break;
            case "password":
                setIcon(<div className={style}>{lockIcon}</div>)
                break;
            case "re-enter_password":
                setIcon(<div className={style}>{lockIcon}</div>)
                break;
            case "first_name":
                setIcon(<div className={style}>{personIcon}</div>)
                break; 
            case "last_name":
                setIcon(<div className={style}>{personIcon}</div>)
                break;   
            case "dob":
                setIcon(<div className={style}>{cakeIcon}</div>)
                break;   
            default:
                setIcon(<></>);
        };
    }, [id]); 
    
    const handleInputChange = (e) => {
        handleChange(e);
        setFieldTouched(e.target.name, false); // Clear touched state
        setErrors({}); // Clear errors
    }; 
    
    const handleInputBlur = (e) => {
        if (id === 'dob') {setDropdown(false)};
        dispatch(setKeyHov(""));
        handleBlur(e);
    };

    const clickHandler = () => {
        if (id.includes("password")) {setPasswordShow(!passwordShow)}
        if (id === 'dob') {setDropdown(!dropdown)};
        refer.current.focus();
    };



    const keyFocus = (e) => {
        if (e.key === "Tab") {
            dispatch(setKeyHov(id));
            console.log(e.key)
        }
    };



    return (
        <>
            <div 
                className="personalInfoInputBorder justAlignCenter"
                style={
                    keyHov === id 
                        ? {backgroundColor: screen === "light" ? "black" : "white"} 
                        : errors[name] && touched[name] 
                            ? {backgroundColor: "red"} 
                            : ctfbglgAngleBackdrop(refDims?.width, refDims?.height, false, "sat")
                }
            >
                <div 
                    className={`
                        personalInfoInputContainer 
                        BASE 
                        agEmail 
                        ${errors[name] && touched[name] ? "invalid" : "valid"}
                        cp-fg-cs 
                        saturated 
                        static ${id === focus ? "bright" : "light"} 
                        gray
                    `} 
                    style={
                        errors[name] && touched[name] 
                            ? {backgroundColor: "red"} 
                            : ctfbglgAngleBackdrop(refDims?.width, refDims?.height, false, "sat")
                    }
                    ref={refer} 
                    onClick={() => setFocus(id)}
                    onFocus={() => setFocus(id)}
                    onBlur={() => setFocus("")}
                >
                    <div className={`personalInfoInputFade ANNEX FADE_SHADOW ${screen}`}/>
                    <div className="personalInfoInputItemsContainer ANNEX">
                        <label 
                            htmlFor={name} 
                            aria-label={t(`pages.login.components.gateway.${id}`, "auxiliary")}
                            className={`personalInfoInputIconContainer ${screen}`}
                        >
                            {icon}
                        </label>
                        <input 
                            id={id}
                            name={name}
                            className={`personalInfoInput ${screen}`} 
                            type={type.includes("password") ? passwordShow ? "text" : "password" : type} 
                            required={required}
                            autoComplete={autoComplete}
                            value={id === 'dob' ? dateValue : values[name]}
                            onChange={(e) => id === 'dob' ? handleDateInputChange(e) : handleInputChange(e)}
                            onKeyUp={(e) => keyFocus(e)}
                            onBlur={(e) => handleInputBlur(e)}
                            placeholder={id === 'dob' ? t(`dateFormat.${currentLanguage.dateFormat}`, {ns: "languages"}) : t(`pages.login.components.gateway.${id}`, "auxiliary")}
                            ref={inputRef}
                        />

                        {id.includes("password") &&
                            <button 
                                className="ctfInputIconContainer" 
                                aria-label={t(`pages.login.components.gateway.${passwordShow ? "hide" : "show"}_password`, "auxiliary")} 
                                onClick={clickHandler}
                            >              
                                <div className={`personalInfoInputIcon toggle ${screen}`}>{passwordShow ? visOnIcon : visOffIcon}</div> 
                            </button>
                        }
                        {name.includes("dob") &&
                            <button 
                                className="ctfInputIconContainer"
                                aria-label={t(`pages.login.components.gateway.${dropdown ? "close" : "open"}_dd_calendar`, "auxiliary")}
                                onMouseDown={(e) => e.preventDefault()} 
                                onClick={clickHandler}
                            > 
                                <div className={`personalInfoInputIcon toggle ${screen}`}>{calendarTodayIcon}</div> 
                            </button>
                        }
                    </div>    
                </div>
            </div>
            {!name.includes("dob") &&
                <div className="accessGateFormSupports">
                    <div className="agMessageContainer">
                        {errors[name] && touched[name] && <div className="invalidCredsMessage">{errors[name]}</div>}
                    </div>
                </div>
            }
            
        </>
    )
};

export default PersonalInfoInput;