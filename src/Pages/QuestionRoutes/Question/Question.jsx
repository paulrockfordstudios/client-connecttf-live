import React, { useEffect, useState, memo, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router";
import { axiosReq } from '../../../Utils/axiosConfig';
import QNFullDisplay from '../../../Components/Questions/QuestionDisplay/QNFullDisplay/QNFullDisplay';
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';
import "./Question.css";


function Question() {

    const [ question, setQuestion ] = useState();
    const [ height, setHeight ] = useState();
    const [ clicked, setclicked] = useState(0);

    const { user: currentUser } = useSelector((state) => state.auth);

    const { id } = useParams();

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const res = await axiosReq("GET", `/questions/${id}`);
                setQuestion(res.data);
            } catch(err) {console.log(err)}
        }
        fetchQuestion();
    }, [id]);
    

    return (
        <>
            <div className="question">
                <div className="question-container">
                    <div className="questionAd">
                        <AdSecondary />
                    </div>
                    <div className="questionRight">
                        {currentUser.unionName ?
                            (
                                <>

                                    {question && <div className="questionDisplayContainer" >
                                        <div 
                                            className={`
                                                questionDisplayBackgroundTheme 
                                                HIGHER_BACKGROUND 
                                                ${currentUser.spectrum}
                                            `} 
                                            style={{height: `${height}px`}} 
                                        />
                                        <div className={`questionDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} onClick={() => setclicked((click) => click + 1)}
                                        
                                        ref={el => {
                                            if (clicked >= 0 || clicked <= 9999) {
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
                                            }
                                        }} 
                                        
                                        >
                                            <QNFullDisplay question={question} />
                                        </div>
                                    </div>}
                                </>
                            ) : (
                                <>
                                    {question && <div className={`questionDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                        <QNFullDisplay question={question} />
                                    </div>}
                                </>
                            )
                        }
                    </div>
                </div>
            </div> 
        </>
    )
};

export default memo(Question);