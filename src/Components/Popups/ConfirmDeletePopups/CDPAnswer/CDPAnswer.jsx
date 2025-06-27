import React from 'react';
import ReactDom from "react-dom";
import { useHistory } from "react-router-dom";
import { axiosReq } from '../../../Utils/axiosConfig';
import { useSelector, useDispatch } from "react-redux";
import { dFClose } from "../../../Redux/AuthSlice";
import { colorTheme } from '../../../Utils/styling/colorTheme';
import "./CDPAnswer.css";


function CDPAnswer({ answer }) {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const deleteHandler = async () => {
        if (answer.flameReplies || answer.unionReplies) {
            const replies1 = answer.flameReplies.concat(answer.unionReplies);
            if (replies1.length > 0) {
                replies1.forEach(async (reply1) => {
                    if (reply1.flameReplies || reply1.unionReplies) {
                        const replies2 = reply1.flameReplies.concat(reply1.unionReplies);
                        if (replies2.length > 0) {
                            replies2.forEach(async (reply2) => {
                                if (reply2.flameReplies || reply2.unionReplies) {
                                    const replies3 = reply2.flameReplies.concat(reply2.unionReplies);
                                    if (replies3.length > 0) {
                                        replies3.forEach(async (reply3) => {
                                            if (reply3.flameReplies || reply3.unionReplies) {
                                                const replies4 = reply3.flameReplies.concat(reply3.unionReplies);
                                                if (replies4.length > 0) {
                                                    replies4.forEach(async (reply4) => {
                                                        if (reply4.flameReplies || reply4.unionReplies) {
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
    }

    const cancelHandler = () => {
        dispatch(dFClose())
    }

    return ReactDom.createPortal(
        <div className={`cdpAnswerPortal`}>
            <div className={`cdpAnswerBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme(user)}`} />
            <div className="cdpAnswerModal">
                <div className="cdpAnswer">
                    <div className="cdpAnswerContainer">
                        <div className="cdpAnswerTop">
                            <span className="cdpAnswerAnswer">Are you sure you want to delete this Answer?</span>
                            {answer?.title && <span className="cdpAnswerDataTitle">{answer?.title}</span>}
                        </div>
                        <div className="cdpAnswerBottom">
                            <button 
                                className={`
                                    cdpAnswerButton 
                                    ${colorTheme(user)}
                                    ${colorTheme(user) === "diamond" ? "DIAMOND_BTN2" : ""}
                                `}
                                onClick={cancelHandler}
                            >
                                {colorTheme(user) === "diamond" 
                                    ? <span className="upDiamondText">Cancel</span>
                                    : "Cancel"
                                }
                            </button>
                            <button 
                                className={`
                                    cdpAnswerButton 
                                    ${colorTheme(user)}
                                    ${colorTheme(user) === "diamond" ? "DIAMOND_BTN3" : ""}
                                `}
                                onClick={deleteHandler}
                            >
                                {colorTheme(user) === "diamond" 
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

export default CDPAnswer;