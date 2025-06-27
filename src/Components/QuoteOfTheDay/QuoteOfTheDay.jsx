import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "./QuoteOfTheDay.css";

function QuoteOfTheDay() {

    const { user } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();

    const colorTheme = user.unionName ? user.spectrum : user.energy;

    return (
        <>
            {user.unionName ?
                (
                    <>
                        <div className="quoteOfTheDayContainer" style={{height: `${height}px`}}>
                            <div className={`
                                    quoteOfTheDayBackgroundTheme 
                                    HIGHER_BACKGROUND
                                    ${colorTheme}
                                `} 
                                style={{backgroundSize: "cover", height: `${height}px`}} 
                            />
                            <div className={`quoteOfTheDay union BOX_SHADOW ${colorTheme}`}
                                
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
                                <div className="quoteOfTheDay-container"> 
                                    <i 
                                        className={`
                                            quoteOfTheDayPNGIcon 
                                            PNG_ICON_FOL
                                            ${colorTheme}
                                        `}
                                        alt="fol" 
                                    />
                                    <div className="quoteOfTheDayQuoteContainer">
                                        <h5 className="quoteOfTheDayQuote">“Never let the fear of striking out keep you from playing the game.”</h5>
                                        <h5 className="quoteOfTheDayAuthor">~ Babe Ruth ~</h5>
                                    </div> 
                                </div>     
                            </div> 
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`quoteOfTheDay flame BOX_SHADOW ${colorTheme}`}>
                            <div className="quoteOfTheDay-container">
                                {/*<h4 className="popQuestionsTitle">Quote of the Day</h4>*/}
                                <i 
                                    className={`
                                        quoteOfTheDayPNGIcon 
                                        PNG_ICON_FOL
                                        ${colorTheme}
                                    `}
                                    alt="fol" 
                                />
                                <div className="quoteOfTheDayQuoteContainer">
                                    <h5 className="quoteOfTheDayQuote">“Never let the fear of striking out keep you from playing the game.”</h5>
                                    <h5 className="quoteOfTheDayAuthor">~ Babe Ruth ~</h5>
                                </div>
                            </div>     
                        </div> 
                    </>
                )
            }
        </>
    )
}


export default QuoteOfTheDay;