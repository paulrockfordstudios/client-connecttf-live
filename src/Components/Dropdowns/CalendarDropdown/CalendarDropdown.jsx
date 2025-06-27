import React, { useEffect, useRef, useState } from 'react';
import "./CalendarDropdown.css";
import { useSelector } from 'react-redux';
import { ctfbglgAngleBackdrop } from '../../../Utils/calculateAngle';
import convertPx2Rem from '../../../Utils/convertPx2Rem';
import { useTranslation } from 'react-i18next';
import { FocusScope } from 'react-aria';
import useElementSize from '../../../Utils/crHooks/useElementSize';


function CalendarDropdown({ setCurrent, current, type, list }) {

    const btnRef = useRef()

    const { screen } = useSelector((state) => state.auth);

    const {t} = useTranslation(["aria", "calendar", "characters"]);

    const refDims = useElementSize(btnRef);

    const [ button, setButton ] = useState(false);
    const [ dropdown, setDropdown ] = useState(false);
    const [width, setWidth] = useState(0);

    const localeYear = (year) => {
        const yearStr = year.toString();
        const firstDigit = `${t(`numerals.${yearStr[0]}`, {ns: "characters"})}`;
        const secondDigit = `${t(`numerals.${yearStr[1]}`, {ns: "characters"})}`;
        const thirdDigit = `${t(`numerals.${yearStr[2]}`, {ns: "characters"})}`;
        const fourthDigit = `${t(`numerals.${yearStr[3]}`, {ns: "characters"})}`;
        return firstDigit + secondDigit + thirdDigit + fourthDigit;
    };

    const clickHandler = (e) => {
        e.preventDefault();
        if (dropdown) {
            setDropdown(false)
            setTimeout(() => {
                setButton(false);   
            }, 325); 
        } else {
            setButton(true);
            setTimeout(() => {
                setDropdown(true);
            }, 325);
        }
    };

    const selectedHandler = (e, item) => {
        e.preventDefault();
        setCurrent(item);
        setDropdown(false);
        setTimeout(() => {
            setButton(false);
        }, 325);
    };

    useEffect(() => {
        let dropdownHandler = (event) => {
            var path = event.path || (event.composedPath && event.composedPath());
            if (path) {
                setDropdown(false);
                setTimeout(() => {
                    setButton(false);
                }, 325);
            }
        };
        if (dropdown) {
            document.body.addEventListener("click", dropdownHandler);
            return () => {
                document.body.removeEventListener("click", dropdownHandler);
            };
        }
    }, [dropdown]);

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
            setDropdown(false);
            setTimeout(() => {
                setButton(false);   
            }, 325); 
        }
    };


    return (
        <div 
            className={`calendarDropdown-container BASE ${type}`}
            style={
                button 
                    ? type === "year" 
                        ? {width: "4.375rem" /*70px*/} 
                        : {width: "7.5rem" /*120px*/} 
                    : {width: convertPx2Rem(refDims?.width), margin: "0 0.625rem", minWidth: "2.275rem"}
            }
        >

            <div 
                className={`calendarDropdown-button ANNEX dynamicContainer ${type} ${button ? "present" : "absent"}`}
                style={ctfbglgAngleBackdrop(type === "year" ? 70 : 120, 32, false, "sat")}
            >
                <div 
                    className={`calendarDropdownBtn-container BASE ${type}`} 
                    style={ctfbglgAngleBackdrop(type === "year" ? 66 : 116, 28, false, "sat")}
                >
                    <div className={`calendarDropdownBtn-fade ANNEX FADE_SHADOW ${screen} ${type}`}/>
                </div>
            </div>
            <div className={`calendarDropdownBtn-label-container ANNEX ${type}`}>
                <button 
                    className={`ctfCalendar-nav-btn ${type === "year" ? "year" : "month"} ${screen}`}
                    ref={btnRef} 
                    aria-haspopup="listbox"
                    aria-expanded={dropdown}
                    aria-label={type === "year" ? localeYear(current) : t(`months.${list[current]}`, {ns: "calendar"})}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => clickHandler(e)}
                >
                    {type === "year" ? localeYear(current) : t(`months.${list[current]}`, {ns: "calendar"})}
                </button>
            </div>

            {dropdown && 
                <FocusScope contain autoFocus restoreFocus>
                    <div 
                        className={`calendarDropdown-dropdown ANNEX ${type} ${dropdown ? "open" : "close"}`}
                        style={ctfbglgAngleBackdrop(type === "year" ? 70 : 120, 150, false, "sat")}
                        onKeyDown={(e) => handleKeyDown(e)}
                    >
                        <div 
                            className={`calendarDropdownDD-container BASE ${type} ${dropdown ? "open" : "close"}`} 
                            style={ctfbglgAngleBackdrop(type === "year" ? 66 : 116, 146, false, "sat")}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={(e) => e.preventDefault()}
                        >
                            <div 
                                className={`calendarDropdownDD-fade ANNEX FADE_SHADOW ${screen} ${type}`}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={(e) => e.preventDefault()}
                            />
                            <ul 
                                className={`calendarDropdownDD-content-container ANNEX ${type}`}
                                role="listbox"
                                aria-labelledby={t(`label.dropdowns.${type === "year" ? "year" : "month"}`, {ns: "aria"})}
                            >
                                {  
                                    list.map((item, index) => (
                                        <li className="ctfCalendar-choice-listItem justAlignCenter">
                                            <button 
                                                key={`CTF-Calendar-${type}-${index}`}
                                                className={` 
                                                    ctfCalendar-choice-btn
                                                    ${screen}
                                                    ${(type === "year" ? item + 1 : index) === current ? "current" : ""}
                                                `}
                                                role="option"
                                                aria-label={type === "year" ? localeYear(item + 1) : t(`months.${item}`, {ns: "calendar"})}
                                                disabled={!dropdown}
                                                tabIndex={dropdown ? 0 : -1}
                                                onMouseDown={(e) => e.preventDefault()}
                                                onClick={(e) => selectedHandler(e, type === "year" ? item + 1 : index)}
                                            >
                                                {type === "year" ? localeYear(item + 1) : t(`months.${item}`, {ns: "calendar"})}
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </FocusScope>
            }
            
        </div>
    )
};

export default CalendarDropdown;