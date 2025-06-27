import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { axiosReq } from '../../../Utils/axiosConfig';
import AnswerDisplay from '../AnswerDisplay/AnswerDisplay';
import { blockString } from '../../../Utils/blockString';
import "./AnswerFeed.css";


function AnswerFeed() {

    const scrollRef = useRef();

    const { id } = useParams();

    const { user, newAnswer } = useSelector((state) => state.auth);

    const [answers, setAnswers] = useState([]);
    const [ displayedAnswers, setDisplayedAnswers ] = useState([]);
    const [answerCnt, setAnswerCnt] = useState(0);
    const [ displayedAnswerCnt, setDisplayedAnswerCnt ] = useState(0);
    const [ btnDisplay, setBtnDisplay ] = useState("Show More");
    const [ pageNum, setPageNum ] = useState(2);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ hasMore, setHasMore ] = useState(true);
    const [ answersAll, setAnswersAll ] = useState(false);

    useEffect(() => {
        const fetchAnswerCnt = async () => { 
            try {
                const res = await axiosReq("GET", `/answers/post/${id}/count/${user._id}/${blockString(user)}`); 
                setAnswerCnt(res.data);
            } catch(err) {console.log(err)}
        }
        fetchanswerCnt();
    }, [id]);
   
    useEffect(() => {
        const fetchAnswers = async () => {
            const res = await axiosReq("GET", `/answers/post/${id}/initial/${user._id}/${blockString(user)}/${answerCnt}`); 
            setAnswerCnt(res.data.length);
            setAnswers(res.data.sort((a1, a2) => {
                return new Date(a1.createdAt) - new Date(a2.createdAt);
                })
            );
        }
        fetchAnswers();
    }, [id]);

    useEffect(() => {
        if (answersAll) return;
        setDisplayedAnswerCnt(answers.length);
        setDisplayedAnswers(answers)
        setAnswerAmount(answers)
        setHasMore(answerCnt > pageNum);
        setBtnDisplay(
            answerCnt !== answers.length
                ? answerCnt - answers.length <= 10 
                    ? "Show All"
                    : displayedAnswerCnt <= 12 ? "Show More" : "Show 10 More"
                : "Show Less"
        )
    }, [answers.length]);

    useEffect(() => {
        if (newAnswer) {
            setPageNum(pageNum + 1);
            setAnswers((prev) => [...prev, newAnswer]);
            setDisplayedAnswers((prev) => [...prev, newAnswer]);
            setAnswerCnt(answerCnt + 1);
            setDisplayedAnswerCnt(displayedAnswerCnt + 1);
        }
    }, [newAnswer]);

    useEffect(() => {
        if (pageNum !== 0) return;
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [answers]);

    const displayHandler = async () => {
        if (answerCnt === answers.length) {
            if (btnDisplay === "Show Less") {
                setDisplayedAnswers(answers.slice(answers.length - 2, answers.length));
                setDisplayedAnswerCnt(2);
                setBtnDisplay("Show More");
                setAnswerAmount(displayedanswers)
                if (!answersAll) {setAnswersAll(true)};
            } else if (answerCnt -  displayedAnswerCnt >= 20 ) {
                setDisplayedAnswerCnt(displayedAnswerCnt + 10);
                setDisplayedAnswers(answers.slice(answers.length - displayedAnswerCnt - 10, answers.length));
                setanswerAmount(displayedAnswers)
            } else if (answerCnt -  displayedAnswerCnt <= 20 && answerCnt -  displayedAnswerCnt >= 10) {
                setDisplayedAnswerCnt(displayedAnswerCnt + 10);
                setDisplayedAnswers(answers.slice(answers.length - displayedAnswerCnt - 10, answers.length));
                setBtnDisplay("Show All");
                setAnswerAmount(displayedAnswers)
            } else {
                const lastCnt = answerCnt - displayedAnswerCnt;
                setDisplayedAnswerCnt(displayedAnswerCnt + lastCnt);
                setDisplayedaAswers(answers.slice(answers.length - displayedAnswerCnt - lastCnt, answers.length))
                setBtnDisplay("Show Less");
                setanswerAmount(displayedAnswers)
            }
        } else {
            try {
                const res = await axiosReq("GET", `/answers/post/${id}/paginate/${pageNum}/${user._id}/${blockString(user)}`);
                setAnswers(prev => { 
                    return [...new Set([...res.data
                        .sort((c1, c2) => {
                            return new Date(c1.createdAt) - new Date(c2.createdAt);
                        })
                        , ...prev
                    ])]
                });
                setPageNum(pageNum + 10);
                setLoading(false);
            } catch(err) {setError(true)} 
        }
    };


    return (
        <div className="answerFeed">
            <div className="answerFeedController">
                <div className="answerFeedControllerLeft">
                    <span className="answerFeedTitle">Answers</span>
                    <span className="answerFeedCount">Showing 
                        <span style={{fontSize: "0.938rem" /*15px*/}}> {displayedAnswerCnt} </span>
                        of 
                        <span style={{fontSize: "0.938rem" /*15px*/}}> {answerCnt} </span>
                    </span>
                </div>
                <div className="answerFeedControllerRight">
                    {answerCnt >= 3 
                        ? <button className="answerFeedControllerBtn" onClick={displayHandler}>{btnDisplay}</button>
                        : <></>
                    }
                </div>
            </div>
            <div className="answerFeed-container">
                {displayedAnswers.map((answer) => (
                    <AnswerDisplay ref={scrollRef} key={answer._id} answer={answer} />
                ))}
            </div>
        </div>
    )
};

export default AnswerFeed;