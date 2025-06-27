import React from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { cdpBackgroundClose } from '../../../../Redux/AuthSlice';
import "./CDPBackground.css";
import { axiosReq } from '../../../../Utils/axiosConfig';

function CDPBackground() {

    
    const dispatch = useDispatch();

    const { user, flame, union, actAcc, deleteFlare } = useSelector((state) => state.auth);

    const colorTheme = user.unionName 
        ? user.spectrum 
            ? user.spectrum 
            : "gray" 
        : user.energy 
            ? user.energy 
            : "gray"

    const removeHandler = async () => {
        const noBackground = user.unionName
            ? {unionId: user._id, backgroundPicture: ""}
            : {userId: user._id, backgroundPicture: ""}
        if (user.unionName) {
            try {
                await axiosReq("PUT", `/unions/${user._id}`, noBackground);
                localStorage.setItem("user", JSON.stringify({...user, backgroundPicture: noBackground.backgroundPicture}));
                localStorage.setItem("union", JSON.stringify({...user, backgroundPicture: noBackground.backgroundPicture}));
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await axiosReq("PUT", `/users/${user._id}`, noBackground);
                localStorage.setItem("user", JSON.stringify({...user, backgroundPicture: noBackground.backgroundPicture}));
                localStorage.setItem("flame", JSON.stringify({...user, backgroundPicture: noBackground.backgroundPicture}));
                window.location.reload();
            } catch (err) {
                console.log(err);
            } 
        }
    };


    const cancelHandler = () => {
        dispatch(cdpBackgroundClose())
    }

    return ReactDom.createPortal(
        <div className={`cdpBackgroundPortal`}>
            <div className={`cdpBackgroundBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme}`} />
            <div className="cdpBackgroundModal">
                <div className="cdpBackground">
                    <div className="cdpBackgroundContainer">
                        <div className="cdpBackgroundTop">
                            <span className="cdpBackgroundQuestion">Are you sure you want to remove this Background Picture?</span>
                        </div>
                        <div className="cdpBackgroundBottom">
                            <button 
                                className={`
                                    cdpBackgroundButton 
                                    ${colorTheme}
                                    ${colorTheme === "diamond" ? "DIAMOND_BTN3" : ""}
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
                                    cdpBackgroundButton 
                                    ${colorTheme}
                                    ${colorTheme === "diamond" ? "DIAMOND_BTN4" : ""}
                                `}
                                onClick={removeHandler}
                            >
                                {colorTheme === "diamond" 
                                    ? <span className="upDiamondText">Remove</span>
                                    : "Remove"
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

export default CDPBackground;