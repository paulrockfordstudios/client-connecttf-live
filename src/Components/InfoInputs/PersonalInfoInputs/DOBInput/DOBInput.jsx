import React, { useEffect, useRef, useState } from 'react';
import './DOBInput.css';
import { useSelector } from 'react-redux';
import { ctfbglgAngleBackdrop } from '../../../../Utils/calculateAngle';
import PersonalInfoInput from '../../../PersonalInfoInput/PersonalInfoInput';
import useElementSize from '../../../../Utils/crHooks/useElementSize';
import { formatLocaleDateInput } from '../../../../Utils/formatLocaleDateInput';
import { formik } from '../../../../Lib/formik/formik';
import { languages } from "../../../../Assets/localization/languages";
import cookies from "js-cookie";
import CTFCalendar from '../../../CTFCalendar/CTFCalendar';
import { Trans, useTranslation } from 'react-i18next';
import { FocusScope } from 'react-aria';


function DOBInput({ refer }) {

    const inputRef = useRef();

    const { screen } = useSelector((state) => state.auth);

    const {t} = useTranslation(["languages"]);

    const refDims = useElementSize(inputRef);

    const [ dateValue, setDateValue ] = useState("");
    const [ inputDate, setInputDate ] = useState({day: "", month: "", year: ""});
    const [ dropdown, setDropdown ] = useState(false);

    const { touched, errors } = formik();

    const currentLanguageCode = cookies.get('i18next') || "en-US";
    const currentLanguage = languages.find((lng) => lng.code === currentLanguageCode);

    useEffect(() => {
        if (dateValue.length > 0 && dateValue?.length !== currentLanguage.dateFormat.length) {
            setDropdown(true);
        } else {
            setDropdown(false);
        } 
    }, [dateValue]);

    const indecesOfDateEl = (str, letter) => {
        let indices = [];
        for(let i=0; i < str.length; i++) {
            if (str[i] === letter) indices.push(i);
        }
        return indices;
    };

    function handleNaN(value) {
        if (isNaN(value)) {
          return "";
        } else {
          return value;
        }
    };

    const handleDateInputChange = (e) => {
        const dayIndices = indecesOfDateEl(currentLanguage.dateFormat, "d");
        const monthIndices = indecesOfDateEl(currentLanguage.dateFormat, "m");
        const yearIndices = indecesOfDateEl(currentLanguage.dateFormat, "y");
        const inputValue = e.target.value.slice(0, currentLanguage.dateFormat.length);
        const localeDateValue = formatLocaleDateInput(e, dateValue, currentLanguage);
        setDateValue(localeDateValue);
        if (inputValue.length < dateValue?.length && inputValue.length > 0) return;
        const day = Number(`${handleNaN(inputValue[dayIndices[0]])}${handleNaN(inputValue[dayIndices[1]])}`);
        const month = Number(`${handleNaN(inputValue[monthIndices[0]])}${handleNaN(inputValue[monthIndices[1]])}`);
        const year = Number(
            `${handleNaN(inputValue[yearIndices[0]])}` +
            `${handleNaN(inputValue[yearIndices[1]])}` +
            `${handleNaN(inputValue[yearIndices[2]])}` +
            `${handleNaN(inputValue[yearIndices[3]])}`
        );
        setInputDate({day: day, month: month, year: year});   
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
            setDropdown(false);
        }
    };


    return (
        <div className="dobInputContainer BASE">
            <FocusScope contain autoFocus restoreFocus>
                <div 
                    className={`dobInputCalendarDropdown ANNEX ${/*dropdown ? */"open"/* : "close"*/}`}
                    style={ctfbglgAngleBackdrop(350, 226, false, "sat")}
                    onKeyDown={(e) => handleKeyDown(e)}
                >
                    <div 
                        className={`dobInputCalendarContainer BASE ${/*dropdown ? */"open"/* : "close"*/}`}
                        ref={inputRef}
                        style={ctfbglgAngleBackdrop(350, 226, false, "sat")}
                    >
                        <div className={`dobInputCalendarFade ANNEX FADE_SHADOW ${screen}`}/>
                        <div 
                            className={`personalInfoInputCalendar ANNEX`} 
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={(e) => e.preventDefault()} 
                        >
                            <CTFCalendar setDate={setDateValue} inputDate={inputDate} language={currentLanguage} refer={refer}/>
                        </div>
                    </div> 
                </div>
            </FocusScope>
            <div className="dobInputPersonalInfoInputContainer ANNEX">
                <PersonalInfoInput 
                    id={"dob"}
                    name={"dob"}
                    type={"text"}
                    handleDateInputChange={handleDateInputChange}
                    dateValue={dateValue?.slice(0, currentLanguage.dateFormat.length)}
                    required={true}
                    refer={refer}
                    dropdown={dropdown}
                    setDropdown={setDropdown}
                />
            </div>
            <div className="dobInputMessageContainer"> 
                <div className="accessGateFormSupports">
                    <div className="agMessageContainer" >
                        {errors["dob"] && touched["dob"] && <div className="invalidCredsMessage">{errors["dob"]}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DOBInput;