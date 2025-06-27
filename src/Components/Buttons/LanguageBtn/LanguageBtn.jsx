import React, {useEffect, useRef, useState } from 'react';
import i18next from 'i18next';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { lngSelectClose, setLngObj } from '../../../Redux/AuthSlice';
import "./LanguageBtn.css";
import useWindowSize from '../../../Utils/crHooks/useWindowSize';
import useTimeout from '../../../Utils/crHooks/useTimeout';
import convertPx2Rem from '../../../Utils/convertPx2Rem';
import useFocusVisible from '../../../Utils/crHooks/useFocusVisible';
import transFont from '../../../Utils/misc/transFont';


function LanguageBtn({category, lng, setContracting, btnEnabled}) {

    const lngBtnRef = useRef();
    const lngRef = useRef();

    const { screen } = useSelector((state) => state.auth);

    const focused = useFocusVisible(lngBtnRef);

    const dispatch = useDispatch();

    const {t} = useTranslation(["languages"]);

    const { width: wWidth } = useWindowSize();

    const [ lpHov, setLPHov ] = useState("");
    const [delayHandler, setDelayHandler] = useState(null);
    const [ btnPosition, setBtnPosition ] = useState("");
    const [ lngWidth, setLngWidth ] = useState(0);
    const [ expanding, setExpanding ] = useState(true);

    useTimeout(() => {
        setExpanding(false);
    }, 325);

    useEffect(() => {
        if (expanding) return;
        var rect = lngRef?.current?.getBoundingClientRect();
        setBtnPosition(rect?.left > wWidth/2 + 5);
    }, [lngRef, expanding]);

    useEffect(() => {
        if (expanding) return;
        const handleResize = () => {
            if (lngRef?.current) {
                const { width } = lngRef?.current.getBoundingClientRect();
                setLngWidth(width);
            }
        };
        document.fonts.ready.then(handleResize);
    }, [lngRef, expanding]);

    useEffect (() => {
        if (focused) {
            setDelayHandler(setTimeout(() => {
                setLPHov(lng.code);
            }, 400));
        } else {
            if (lpHov === "") return;
            clearTimeout(delayHandler)
            setLPHov("");
        }
    }, [focused]);

    const handleMouseEnter = () => {
        setDelayHandler(setTimeout(() => {
            setLPHov(lng.code);
        }, 400));
    };

    const handleMouseLeave = () => {
        clearTimeout(delayHandler)
        setLPHov("");
    };

    const selectLanguageHandler = () => {
        i18next.changeLanguage(lng.code);
        setContracting(true);
        dispatch(setLngObj(lng))
        setTimeout(() => {
            dispatch(lngSelectClose());
        }, 325);   
    };


    return (
        <div className={`languageBtn ${lng.translated.text ? "enabled" : "disabled"} ${screen}`}>
            <button 
                id={`${category}-${lng.code}-btn`}
                ref={lngBtnRef}
                className={`
                    languageBtn-btn 
                    ${screen} 
                    ${lng.translated.text 
                        ? focused ? "keyHov" : ""
                        : "disabled"
                    }
                `}
                aria-label={`${t(`languages:language.${lng.code}`, {lng: `${lng.code}`})}, (${t(`languages:language.${lng.code}`)})`} 
                onClick={selectLanguageHandler}
                disabled={btnEnabled ? lng.translated.text ? false : true : true}
                tabIndex={btnEnabled ? lng.translated.text ? 0 : -1 : -1}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <span ref={lngRef} className={`${lng.requiresFont && lng.script}`}>{lng.name}</span>
            </button>
            <div 
                className={`
                    localePronunciationBubble 
                    ${screen} 
                    ${focused ? "keyHov" : ""}
                    ${lpHov ? "lpHov" : ""} 
                    ${t(`languages:language.${lng.code}`)}
                `}
                style={
                    btnPosition 
                        ? {right: `${convertPx2Rem(lngWidth + (focused ? 20 : 10))}`} 
                        : {left: `${convertPx2Rem(lngWidth + (focused ? 20 : 10))}`}
                }
            >
                <span className={`localePronunciationText ${screen} ${transFont(`languages:language.${lng.code}`)}`}>
                    {t(`languages:language.${lng.code}`)}
                </span>
            </div>          
        </div>
    )
}

export default LanguageBtn;