import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dFClose } from "../../../../Redux/AuthSlice";
import ReactDom from "react-dom";
import "./CDPQuestion.css";
import { axiosReq } from '../../../../Utils/axiosConfig';


function CDPQuestion({ question }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const [ active, setActive ] = useState(false);

    const colorTheme = user.unionName 
        ? user.spectrum 
            ? user.spectrum 
            : "gray" 
        : user.energy 
            ? user.energy 
            : "gray"

    const deleteHandler = async () => {
        if (question.flameAnswers || question.UnionAnswers) {
            const answers = question.flameAnswers.concat(question.unionAnswers);
            if (answers.length > 0) {
                answers.forEach(async (answer) => {
                    if (answer.flameReplies || answer.UnionReplies) {
                        const replies1 = answer.flameReplies.concat(answer.unionReplies);
                        if (replies1.length > 0) {
                            replies1.forEach(async (reply1) => {
                                if (reply1.flameReplies || reply1.UnionReplies) {
                                    const replies2 = reply1.flameReplies.concat(reply1.unionReplies);
                                    if (replies2.length > 0) {
                                        replies2.forEach(async (reply2) => {
                                            if (reply2.flameReplies || reply2.UnionReplies) {
                                                const replies3 = reply2.flameReplies.concat(reply2.unionReplies);
                                                if (replies3.length > 0) {
                                                    replies3.forEach(async (reply3) => {
                                                        if (reply3.flameReplies || reply3.UnionReplies) {
                                                            const replies4 = reply3.flameReplies.concat(reply3.unionReplies);
                                                            if (replies4.length > 0) {
                                                                replies4.forEach(async (reply4) => {
                                                                    if (reply4.flameReplies || reply4.UnionReplies) {
                                                                        const repliesLast = reply4.flameReplies.concat(reply4.unionReplies);
                                                                        if (repliesLast.length > 0) {
                                                                            repliesLast.forEach(async (replyLast) => {
                                                                                try {
                                                                                    await axiosReq("DELETE", `/replies/${replyLast._id}`)
                                                                                } catch(err) {
                                                                                    console.log(err);
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                    try {
                                                                        await axiosReq("DELETE", `/replies/${reply4._id}`)
                                                                    } catch(err) {
                                                                        console.log(err);
                                                                    }
                                                                })
                                                            }
                                                        }
                                                        try {
                                                            await axiosReq("DELETE", `/replies/${reply3._id}`)
                                                        } catch(err) {
                                                            console.log(err);
                                                        }
                                                    })
                                                }
                                            }
                                            try {
                                                await axiosReq("DELETE", `/replies/${reply2._id}`)
                                            } catch(err) {
                                                console.log(err);
                                            }
                                        })
                                    }
                                }
                                try {
                                    await axiosReq("DELETE", `/replies/${reply1._id}`)
                                } catch(err) {
                                    console.log(err);
                                }
                            })
                        }
                    }
                    try {
                        await axiosReq("DELETE", `/answers/${answer._id}`);
                    } catch(err) {
                        console.log(err);
                    }
                })
            }
        }
        try {
            await axiosReq("DELETE", `/questions/${question._id}`)
        } catch(err) {
            console.log(err);
        }
        navigate("/");
        dispatch(dFClose())
    }

    const cancelHandler = () => {
        dispatch(dFClose())
    }

    return ReactDom.createPortal(
        <div className={`cdpQuestionPortal`}>
            <div className={`cdpQuestionBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme}`} />
            <div className="cdpQuestionModal">
                <div className="cdpQuestion">
                    <div className="cdpQuestionContainer">
                        <div className="cdpQuestionTop">
                            <span className="cdpQuestionQuestion">Are you sure you want to delete this question?</span>
                            {question?.title && <span className="cdpQuestionDataTitle">{question?.title}</span>}
                        </div>
                            <div className="cdpQuestionBottom">
                                <button 
                                    className={`
                                        cdpQuestionButton
                                        ${colorTheme}
                                        ${colorTheme === "diamond" ? "DIAMOND_BTN6" : ""}
                                    `}
                                    //onMouseDown={() => setActive(true)}
                                    //onMouseUp={() => setActive(false)}
                                    onClick={cancelHandler}    
                                >
                                    {colorTheme === "diamond" 
                                        ? <span className="upDiamondText">Cancel</span>
                                        : "Cancel"
                                    }
                                     {active && <div className="cdpQuestionBTNActive"/>}
                                </button>
                               
                                <button 
                                    className={`
                                        cdpQuestionButton
                                        ${colorTheme}
                                        ${colorTheme === "diamond" ? "DIAMOND_BTN1" : ""}
                                    `}
                                    onClick={deleteHandler}
                                >
                                    {colorTheme === "diamond" 
                                        ? <span className="upDiamondText">Delete</span>
                                        : "Delete"
                                    }
                                </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )

}

export default CDPQuestion;