import React, { useEffect, useState } from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { axiosReq } from '../../../Utils/axiosConfig'
import { colorTheme } from '../../../Utils/styling/colorTheme';
import { fBOClose, tfcpOpen } from "../../../Redux/AuthSlice";
import "./FollowButtonsPopup.css";



function FollowButtonsPopup({user}) {

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector((state) => state.auth);

    const [ flameBlocked, setFlameBlocked ] = useState(currentUser.flameBlocking.includes(user?._id));
    const [ unionBlocked, setUnionBlocked ] = useState(currentUser.unionBlocking.includes(user?._id));

    // Block/unblock flame user
    useEffect(() => {
        setFlameBlocked(currentUser.flameBlocking.includes(user?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.flameBlocking]);

    const handleFlameBlockClick = async () => {
        try {
            if(flameBlocked) {
                currentUser.unionName
                    ? await axiosReq("PUT", `/users/${user._id}/union-flame/unblock`, { unionId: currentUser._id })
                    : await axiosReq("PUT", `/users/${user._id}/flame-flame/unblock`, { userId: currentUser._id })
                dispatch(flameUnblock(user?._id));
            }else{
                currentUser.unionName
                    ? await axiosReq("PUT", `/users/${user._id}/union-flame/block`, { unionId: currentUser._id })
                    : await axiosReq("PUT", `/users/${user._id}/flame-flame/block`, { userId: currentUser._id })
                dispatch(flameBlock(user?._id));
            }
        } catch(err) {
            console.log(err);
        }
        setFlameBlocked(!flameBlocked);
    };

    // Block/unblock union user
    useEffect(() => {
        setUnionBlocked(currentUser.unionBlocking.includes(user?._id));
        localStorage.setItem("user", JSON.stringify(currentUser));
        currentUser.unionName
            ? localStorage.setItem("union", JSON.stringify(currentUser))
            : localStorage.setItem("flame", JSON.stringify(currentUser))
    },[currentUser.unionBlocking]);

    const handleUnionBlockClick = async () => {
        try {
            if(unionBlocked) {
                currentUser.unionName
                    ? await axiosReq("PUT", `/unions/${user._id}/union-union/unblock`, { unionId: currentUser._id })
                    : await axiosReq("PUT", `/unions/${user._id}/flame-union/unblock`, { userId: currentUser._id })
                dispatch(unionUnblock(user?._id));
            }else{
                currentUser.unionName
                    ? await axiosReq("PUT", `/unions/${user._id}/union-union/block`, { unionId: currentUser._id })
                    : await axiosReq("PUT", `/unions/${user._id}/flame-union/block`, { userId: currentUser._id })
                dispatch(unionBlock(user?._id));
            }
        } catch(err) {
            console.log(err);
        }
        setUnionBlocked(!unionBlocked);
    };

    const tfHandler = () => {
        dispatch(fBOClose());
        dispatch(tfcpOpen())
    };


    return ReactDom.createPortal(
        <div className={`folBtnsPopupPortal`}>
            <div className={`folBtnsPopupBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme(user)}`} />
            <div className="folBtnsPopupModal">
                <div className="folBtnsPopup">
                    <div className="folBtnsPopupContainer">
                        <div className="folBtnsPopupTop">
                            <i  
                                className="folBtnsPopupLogo PNG_LOGO_THREE"
                                alt="connecttf-logo-three" 
                            />  
                        </div>
                        <div className="folBtnsPopupBottom">
                            {
                                !currentUser.tfClaimReqor ||
                                !currentUser.tfClaimReqor ||
                                currentUser.tfId.length === 0 ||
                                user.tfId.length === 0 ||
                                currentUser.energy !== user.energy ?
                                    (
                                        <>
                                            <hr 
                                                className={`
                                                    folBtnsPopupHr 
                                                    ${colorTheme(user) === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                                    ${colorTheme(user)}  
                                                `} 
                                            />
                                            <button 
                                                className="folBtnsPopupButton TF"
                                            >
                                                <span onClick={tfHandler}>
                                                    <span>This is my </span>
                                                    <span className="folBtnsPopupTwin">Twin </span>
                                                    <span className="folBtnsPopupFlame">Flame</span>
                                                    <span>!</span>
                                                </span>
                                            </button>
                                        </>
                                    ) : (<></>)
                            }
                            <hr 
                                className={`
                                    folBtnsPopupHr 
                                    ${colorTheme(user) === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                    ${colorTheme(user)}
                                   
                                `} 
                            />
                            <button 
                                className={`
                                    folBtnsPopupButton 
                                    ${colorTheme(user)}
                                    ${colorTheme(user) === "diamond" ? "DIAMOND_BTN3" : ""}
                                `}   
                            >
                                {colorTheme(user) === "diamond" 
                                    ? <span className="upDiamondText">{flameBlocked || unionBlocked ? "Unblock" : "Block"}</span>
                                    : flameBlocked || unionBlocked ? "Unblock" : "Block"
                                }
                            </button>
                            <hr 
                                className={`
                                    folBtnsPopupHr 
                                    ${colorTheme(user) === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                    ${colorTheme(user)}
                                   
                                `} 
                            />
                            <button 
                                className={`
                                    folBtnsPopupButton 
                                    ${colorTheme(user)}
                                    ${colorTheme(user) === "diamond" ? "DIAMOND_BTN5" : ""}
                                `}
                                
                            >
                                {colorTheme(user) === "diamond" 
                                    ? <span className="upDiamondText">Report</span>
                                    : "Report"
                                }
                            </button>
                            <hr 
                                className={`
                                    folBtnsPopupHr 
                                    ${colorTheme(user) === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                    ${colorTheme(user)}
                                    
                                `} 
                            />
                            <button 
                                className={`
                                    folBtnsPopupButton 
                                    ${colorTheme(user)}
                                    ${colorTheme(user) === "diamond" ? "DIAMOND_BTN5" : ""}
                                `} 
                            >
                                <span onClick={() => dispatch(fBOClose())}>
                                    {colorTheme(user) === "diamond" 
                                        ? <span className="upDiamondText">Close</span>
                                        : "Close"
                                    }
                                </span>
                            </button>
                            <hr 
                                className={`
                                    folBtnsPopupHr 
                                    ${colorTheme(user) === "diamond" ? "HIGHER_BACKGROUND" : ""}
                                    ${colorTheme(user)}
                                    
                                `} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default FollowButtonsPopup;