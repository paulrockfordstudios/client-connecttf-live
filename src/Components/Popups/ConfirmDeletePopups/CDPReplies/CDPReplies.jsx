import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dFClose } from "../../../Redux/AuthSlice";
import ReactDom from "react-dom";
import "./CDPReplies.css";
import { axiosReq } from '../../../Utils/axiosConfig';


function CDPReplies({ reply }) {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const colorTheme = user.unionName 
        ? user.spectrum 
            ? user.spectrum 
            : "gray" 
        : user.energy 
            ? user.energy 
            : "gray"

    const deleteHandler = async () => {
        if (reply.flameReplies || reply.unionReplies) {
            const replies1 = reply.flameReplies.concat(reply.unionReplies);
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
                                                                    replies4.forEach(async (replyLast) => {
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
            try {
                await axiosReq("DELETE", `/replies/${reply._id}`);
            } catch(err) {
                console.log(err);
            }
        }
        dispatch(dFClose())
    }

    const cancelHandler = () => {
        dispatch(dFClose())
    }

    return ReactDom.createPortal(
        <div className={`cdpRepliesPortal`}>
            <div className={`cdpRepliesBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme}`} />
            <div className="cdpRepliesModal">
                <div className="cdpReplies">
                    <div className="cdpRepliesContainer">
                        <div className="cdpRepliesTop">
                            <span className="cdpRepliesQuestion">Are you sure you want to delete this reply?</span>
                            {reply?.title && <span className="cdpRepliesDataTitle">{reply?.title}</span>}
                        </div>
                        <div className="cdpRepliesBottom">
                            <button 
                                className={`
                                    cdpRepliesButton
                                    ${colorTheme}
                                    ${colorTheme === "diamond" ? "DIAMOND_BTN2" : ""}
                                `}
                                onClick={cancelHandler}
                            >
                                {colorTheme === "diamond" 
                                    ? <span className="upDiamondText">Cancel</span>
                                    : "Cancel"
                                }
                            </button>
                            <button 
                                className={`
                                    cdpRepliesButton
                                    ${colorTheme}
                                    ${colorTheme === "diamond" ? "DIAMOND_BTN5" : ""}
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

export default CDPReplies;