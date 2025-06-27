import React from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { fFClose, flagAct } from "../../../Redux/AuthSlice";
import { axiosReq } from '../../../Utils/axiosConfig';
import { colorTheme } from '../../../Utils/styling/colorTheme';
import "./ConfirmFlagPopup.css";



function ConfirmFlagPopup({ data }) {

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector((state) => state.auth);

    const { user, flare, type ,flagged } = data;

    const flagHandler = async () => {
        try {
            currentUser.unionName
                ? axiosReq("PUT", `/${type}s/${flare._id}/unionFlag`, { unionId: currentUser._id })
                : axiosReq("PUT", `/${type}s/${flare._id}/flameFlag`, { userId: currentUser._id })
            dispatch(fFClose());
            dispatch(flagAct({flareId: flare._id, isFlagged: !flagged}));   
        } catch(err) {console.log(err)}         
    };

    const cancelHandler = () => {
        dispatch(fFClose());
    };


    return ReactDom.createPortal(
        <div className={`confirmFlagPopupPortal`}>
            <div className={`confirmFlagPopupBackdropOverlay POPUP_BACKGROUND ${colorTheme(user)}`} />
            <div className="confirmFlagPopupModal">
                <div className="confirmFlagPopup">
                    <div className="confirmFlagPopupContainer">
                        <div className="confirmFlagPopupTop">
                            <span className="confirmFlagPopupComment">{`Are you sure you want to ${flagged ? "Unflag" : "flag"} this ${type}?`}</span>
                            {flare.title && <span className="confirmFlagPopupflareTitle">{flare.title}</span>}
                        </div>
                        <div className="confirmFlagPopupBottom">
                            <button 
                                className={
                                    `confirmFlagPopupButton 
                                    ${colorTheme(user)}`
                                }
                                onClick={cancelHandler}
                            >
                                Cancel
                            </button>
                            <button 
                                className={
                                    `confirmFlagPopupButton 
                                    ${colorTheme(user)}`
                                }
                                onClick={flagHandler}
                            >
                                {`${flagged ? "Unflag" : "flag"}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )

}

export default ConfirmFlagPopup;