import React, { useEffect, useState } from 'react';
import "./CTFCalendar.css";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { formatLocaleSelectedDate } from '../../Utils/formatLocaleDateInput';
import CalendarDropdown from '../Dropdowns/CalendarDropdown/CalendarDropdown';
import { arrowBackIosIcon, arrowForwardIosIcon } from '../../Lib/mui/icons';
import transFont from '../../Utils/misc/transFont';


function CTFCalendar({ setDate, inputDate, language }) {

    const {t} = useTranslation(["aria", "calendar", "characters"]);

    const { screen } = useSelector((state) => state.auth);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ];

    const { day, month, year } = inputDate;

    const currentDate = new Date();
    const lastYear = currentDate.getFullYear();
    const yearsList = [...Array(lastYear).keys()].slice(lastYear - 120, lastYear + 1);

    const [ currentMonth, setCurrentMonth ] = useState(currentDate?.getMonth());
    const [ currentYear, setCurrentYear ] = useState(currentDate?.getFullYear());
    const [ currentDay, setCurrentDay ] = useState(currentDate?.getDate());
    const [ calendarDate, setCalendarDate ] = useState(
        {day: currentDay, month: currentMonth, year: currentYear} 
    );

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInLastMonth = new Date(currentYear, currentMonth, 0).getDate();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDay();

    useEffect(() => {
        if (day > 0) {
            setCurrentDay(day);
            setCalendarDate({...calendarDate, day: day});
        };
    }, [day]);

    useEffect(() => {
        if (month > 0) {
            setCurrentMonth(month -1);
            setCalendarDate({...calendarDate, month: month - 1});
        };
    }, [month]);

    useEffect(() => {
        if (year > 0) {
            setCurrentYear(year);
            setCalendarDate({...calendarDate, year: year});
        };
    }, [year]);

    const localeDay = (day) => {
        const dayStr = day.toString();
        if (dayStr.length > 1) {
            const firstDigit = `${t(`numerals.${dayStr[0]}`, {ns: "characters"})}`;
            const secondDigit = `${t(`numerals.${dayStr[1]}`, {ns: "characters"})}`;
            return firstDigit + secondDigit;
        } else {
            const firstDigit = `${t(`numerals.${dayStr[0]}`, {ns: "characters"})}`;
            return firstDigit;
        }
    };

    const prevYear = (e) => {
        e.preventDefault();
        setCurrentYear(currentYear - 1);
    };

    const prevMonth = (e) => {
        e.preventDefault();
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
    };

    const nextMonth = (e) => {
        e.preventDefault();
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
    };

    const nextYear = (e) => {
        e.preventDefault();
        setCurrentYear(currentYear + 1);
    };

    const handleDayClick = (day) => {
        setCurrentDay(day)
        const clickedDate = {year: currentYear, month: currentMonth, day: day};
        setCalendarDate(clickedDate)
        setDate(formatLocaleSelectedDate(clickedDate, language))
    };


    return (
        <div className="ctfCalendar">
            <div className="ctfCalendar-nav">
                <button 
                    className={`ctfCalendar-nav-btn chevron prevYear ${screen}`} 
                    aria-label={`${t("aria:label.buttons.calendar_btns.prev_year")}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => prevYear(e)}
                >
                    <div className="ctfCalendar-nav-chevron">{arrowBackIosIcon}</div>
                </button>
                <button 
                    className={`ctfCalendar-nav-btn chevron prevMonth ${screen}`}
                    aria-label={`${t("aria:label.buttons.calendar_btns.prev_month")}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => prevMonth(e)}
                >
                    <div className="ctfCalendar-nav-chevron justAlignCenter">{arrowBackIosIcon}</div>
                </button>
                <div className="ctfCalendar-nav-btn-container date-month-year">
                    <CalendarDropdown setCurrent={setCurrentMonth} current={currentMonth} type={"month"} list={monthsOfYear}/>
                    <CalendarDropdown setCurrent={setCurrentYear} current={currentYear} type={"year"} list={yearsList}/>
                </div>
                <button 
                    className={`ctfCalendar-nav-btn chevron nextMonth ${screen}`}
                    aria-label={`${t("aria:label.buttons.calendar_btns.next_month")}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => nextMonth(e)}
                >
                    <div className="ctfCalendar-nav-chevron">{arrowForwardIosIcon}</div>
                </button>
                <button 
                    className={`ctfCalendar-nav-btn chevron nextYear ${screen}`}
                    aria-label={`${t("aria:label.buttons.calendar_btns.next_year")}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => nextYear(e)}
                >
                    <div className="ctfCalendar-nav-chevron">{arrowForwardIosIcon}</div>
                </button>
            </div>
            <div className="ctfCalendar-body">
                <div className={`ctfCalendar-weekdays ${screen}`}>
                    {daysOfWeek.map((day) => (
                        <span 
                            key={day} 
                            className={`inheritParentFont ${transFont(`calendar:weekdays_abbrv.${day}`)}`}
                        >
                            {t(`calendar:weekdays_abbrv.${day}`)}
                        </span>
                    ))}
                </div>
                <div className="ctfCalendar-days">
                    {[...Array(firstDayOfMonth).keys()].map((day, index) => (
                        <div className="ctfCalendar-day-Container span">
                            <span
                                key={`empty-${index}`}
                                className={`ctfCalendar-day-span ${screen}`} 
                            >
                                {localeDay((daysInLastMonth - firstDayOfMonth) + day + 1)}
                            </span>
                        </div>
                    ))}
                    {[...Array(daysInMonth).keys()].map((day) => (
                        <div className="ctfCalendar-day-Container btn">
                            <button 
                                key={day + 1} 
                                className={`
                                    ctfCalendar-choice-btn
                                    ${screen}
                                    ${
                                        day + 1 === currentDay &&
                                        currentMonth === calendarDate.month &&
                                        currentYear === calendarDate.year
                                            ? "current" 
                                            : ""
                                    }
                                `}
                                aria-label={t(`calendar:days.${day + 1}`)}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleDayClick(day + 1)}
                            >
                                {localeDay(day + 1)}
                            </button>
                        </div>
                    ))}
                    {[...Array(7 - (lastDayOfMonth + 1)).keys()].map((day, index) => (
                        <div className="ctfCalendar-day-Container span">
                            <span
                                key={`empty-${index}`}
                                className={`ctfCalendar-day-span ${screen}`} 
                            >
                                {localeDay(day + 1)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default CTFCalendar;
