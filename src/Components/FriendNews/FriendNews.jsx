import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import "./FriendNews.css";

function FriendNews() {

    const { user, birthdays } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();
    const [ bdayArr, setBdayArr ] = useState([]);
    const [ bdayNews, setBdayNews ] = useState("")

    const colorTheme = user?.unionName ? user?.spectrum : user?.energy;

    useEffect(() => {
        if (bdayArr.length === 0 && birthdays !== null) {
            setBdayArr(birthdays);
        }
    }, [birthdays]);

    useEffect(() => {
        if (bdayArr.length > 0) {
            if (bdayArr.length === 1) {
                setBdayNews(
                    <>
                        <Link 
                            to={`/flame-profile/userName/${bdayArr[0].userName}`} 
                            className={`fnName ${bdayArr[0]?.energy}`}
                        >
                            {bdayArr[0]?.profileName}
                        </Link>
                        <span> has a birthday today!</span>
                    </> 
                );
            } else if (bdayArr.length === 1) {
                setBdayNews(
                    <>
                        <Link 
                            to={`/flame-profile/userName/${bdayArr[0].userName}`} 
                            className={`fnName ${bdayArr[0]?.energy}`}
                        >
                            {bdayArr[0]?.profileName}
                        </Link>
                        <span> and </span>
                        <Link 
                            to={`/flame-profile/userName/${bdayArr[1].userName}`} 
                            className={`fnName ${bdayArr[1]?.energy}`}
                        >
                            {bdayArr[1]?.profileName}
                        </Link>
                        <span> have birthdays today!</span>
                    </> 
                );
            } else {
                setBdayNews(
                    <>
                        <Link 
                            to={`/flame-profile/userName/${bdayArr[0].userName}`} 
                            className={`fnName ${bdayArr[0]?.energy}`}
                        >
                            {bdayArr[0]?.profileName}
                        </Link>
                        <span>, </span>
                        <Link 
                            to={`/flame-profile/userName/${bdayArr[1].userName}`} 
                            className={`fnName ${bdayArr[1]?.energy}`}
                        >
                            {bdayArr[1]?.profileName}
                        </Link>
                        <span> and </span>
                        <b>{bdayArr.length - 2} others</b>
                        <span> have birthdays today!</span>
                    </>
                );
            }
        }
    }, [bdayArr]);

 
    return (
        <div className="friendNewsContainer" style={{height: `${height}px`}}>
            <div 
                className={`
                    friendNewsBackgroundTheme 
                    HIGHER_BACKGROUND
                    ${colorTheme}
                `} 
                style={{height: `${height}px`}} 
            />
            <div className={`friendNews union BOX_SHADOW ${colorTheme}`}
                                
                ref={el => {
                    if (!el) return;
                    let prevValue = JSON.stringify(el.getBoundingClientRect());
                    const start = Date.now();
                    const handle = setInterval(() => {
                        let nextValue = JSON.stringify(el.getBoundingClientRect());
                        if (nextValue === prevValue) {
                            clearInterval(handle);
                            setHeight(el.getBoundingClientRect().height)
                        } else {
                            prevValue = nextValue;
                        }
                    }, 1000);
                }} 
                                
            >
                <div className="friendNews-container">
                    <ul className="friendNewsList">
                        {bdayArr.length > 0 &&
                            <li className="friendNewsUpdate">
                                <i 
                                    className={`
                                        friendNewsIcon
                                        PNG_ICON_BIRTHDAY
                                    `} 
                                    alt="birthday-icon" 
                                />
                                
                                    <span className="friendNewsText">
                                        {bdayNews}
                                    </span>
                            </li>
                        }
                        <li className="friendNewsUpdate">
                            <i 
                                className={`
                                    friendNewsIcon
                                    PNG_ICON_RELATIONSHIP
                                `} 
                                alt="birthday-icon" 
                            />
                            <span className="friendNewsText">
                                <b>Someone</b> and <b>3 others</b> updated there relationship status to "".
                            </span>
                        </li>
                        <li className="friendNewsUpdate">
                            <i 
                                className={`
                                    friendNewsIcon
                                    PNG_ICON_JOURNEY
                                `} 
                                alt="birthday-icon" 
                            />
                            <span className="friendNewsText">
                                <b>Someone</b> and <b>3 others</b> updated there journey status to "".
                            </span>
                        </li>
                        <li className="friendNewsUpdate">
                            <i 
                                className={`
                                    friendNewsIcon
                                    PNG_ICON_PROFILE
                                `} 
                                alt="birthday-icon" 
                            />
                            <span className="friendNewsText">
                                <b>Someone</b> and <b>3 others</b> updated there profile.
                            </span>
                        </li>
                        <li className="friendNewsUpdate">
                            <i 
                                className={`
                                    friendNewsIcon
                                    PNG_ICON_STORY
                                `} 
                                alt="birthday-icon" 
                            />
                            <span className="friendNewsText">
                                <b>Someone</b> and <b>3 others</b> updated there story.
                            </span>
                        </li>
                    </ul>
                </div>     
            </div>
        </div>
    )
};

export default FriendNews;