import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dFClose } from "../../../Redux/AuthSlice";
import ReactDom from "react-dom";
import "./CDPComment.css";
import { axiosReq } from '../../../Utils/axiosConfig';


function CDPComment({ comment }) {

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
        if (comment.flameReplies || comment.unionReplies) {
            const replies1 = comment.flameReplies.concat(comment.unionReplies);
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
            await axiosReq("DELETE", `/comments/${comment._id}`);
        } catch(err) {
            console.log(err);
        }
    }

    const cancelHandler = () => {
        dispatch(dFClose())
    }

    return ReactDom.createPortal(
        <div className={`cdpCommentPortal`}>
            <div className={`cdpCommentBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme}`} />
            <div className="cdpCommentModal">
                <div className="cdpComment">
                    <div className="cdpCommentContainer">
                        <div className="cdpCommentTop">
                            <span className="cdpCommentComment">Are you sure you want to delete this Comment?</span>
                            {comment?.title && <span className="cdpCommentDataTitle">{comment?.title}</span>}
                        </div>
                        <div className="cdpCommentBottom">
                            <button 
                                className={`
                                    cdpCommentButton 
                                    ${colorTheme}
                                    ${colorTheme === "diamond" ? "DIAMOND_BTN4" : ""}
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
                                    cdpCommentButton 
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

export default CDPComment;