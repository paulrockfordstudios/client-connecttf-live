import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import QuestionFeed from '../../../Components/Questions/QuestionFeed/QuestionFeed';
import "./Questions.css";
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';
import CreateQuestion from '../../../Components/Questions/CreateQuestion/CreateQuestion';

function Questions() {

    const { user: currentUser, cQN } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();
    const [ createQN, setCreateQN ] = useState(false);

    useEffect(() => {
        setCreateQN(cQN)
    }, [cQN]);
    
    return (
        <>
            <div className="questions">
                <div className="questions-container">
                    <div className="questionsAd">
                        <AdSecondary />
                    </div>
                    <div className="questionsRight">
                        {currentUser.unionName ?
                            (
                                <>
                                    <div className="questionsDisplayContainer" >
                                        <div 
                                            className={`
                                                questionsDisplayBackgroundTheme 
                                                HIGHER_BACKGROUND 
                                                ${currentUser.spectrum}
                                            `} 
                                            style={{height: `${height}px`}} 
                                        />
                                        <div className={`questionsDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} 
                                            
                                            ref={el => {
                                                if (!el) return;
                                                /*console.log("initial height", el.getBoundingClientRect().height);*/
                                                let prevValue = JSON.stringify(el.getBoundingClientRect());
                                                const start = Date.now();
                                                const handle = setInterval(() => {
                                                let nextValue = JSON.stringify(el.getBoundingClientRect());
                                                if (nextValue === prevValue) {
                                                    clearInterval(handle);
                                                    /*console.log(
                                                    `height stopped changing in ${Date.now() - start}ms. final height:`,
                                                    el.getBoundingClientRect().height
                                                    );*/
                                                    setHeight(el.getBoundingClientRect().height)
                                                } else {
                                                    prevValue = nextValue;
                                                }
                                                }, 1000);
                                            }} 
                                            
                                        >
                                            <QuestionFeed /> 
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={`questionsDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                        <QuestionFeed /> 
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </> 
    )
};

export default Questions;