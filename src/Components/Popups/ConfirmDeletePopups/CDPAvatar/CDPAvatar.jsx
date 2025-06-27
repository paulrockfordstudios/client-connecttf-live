import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { newFlameAvatar, newUnionAvatar, cdpAvatarClose } from '../../../../Redux/AuthSlice';
import ReactDom from "react-dom";
import "./CDPAvatar.css";
import { axiosReq } from '../../../../Utils/axiosConfig';


function CDPAvatar({ avatar }) {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const colorTheme = user.unionName 
        ? user.spectrum 
            ? user.spectrum 
            : "gray" 
        : user.energy 
            ? user.energy 
            : "gray"

    const removeHandler = async () => {
        const noAvatar = user.unionName
            ? {unionId: user._id, unionProfilePicture: ""}
            : {userId: user._id, profilePicture: ""}
        if (user.unionName) {
            try {
                await axiosReq("PUT", `/unions/${user._id}`, noAvatar);
                dispatch(newUnionAvatar(noAvatar.unionProfilePicture));
                localStorage.setItem("user", JSON.stringify({...user, unionProfilePicture: noAvatar.unionProfilePicture}));
                localStorage.setItem("union", JSON.stringify({...user, unionProfilePicture: noAvatar.unionProfilePicture}));
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await aaxiosReq("PUT", `/users/${user._id}`, noAvatar);
                dispatch(newFlameAvatar(noAvatar.profilePicture));
                localStorage.setItem("user", JSON.stringify({...user, profilePicture: noAvatar.profilePicture}));
                localStorage.setItem("flame", JSON.stringify({...user, profilePicture: noAvatar.profilePicture}));
                window.location.reload();
            } catch (err) {
                console.log(err);
            } 
        }
    };


    const cancelHandler = () => {
        dispatch(cdpAvatarClose())
    }

    return ReactDom.createPortal(
        <div className={`cdpAvatarPortal`}>
            <div className={`cdpAvatarBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme}`} />
            <div className="cdpAvatarModal">
                <div className="cdpAvatar">
                    <div className="cdpAvatarContainer">
                        <div className="cdpAvatarTop">
                            <span className="cdpAvatarQuestion">Are you sure you want to remove this Avatar?</span>
                        </div>
                        <div className="cdpAvatarBottom">
                            <button 
                                className={`
                                    cdpAvatarButton 
                                    ${colorTheme}
                                    ${colorTheme === "diamond" ? "DIAMOND_BTN1" : ""}
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
                                cdpAvatarButton 
                                ${colorTheme}
                                ${colorTheme === "diamond" ? "DIAMOND_BTN2" : ""}
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

export default CDPAvatar;