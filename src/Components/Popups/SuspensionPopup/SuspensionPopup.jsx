import React from 'react';
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import "./SuspensionPopup.css";


function SuspensionPopup() {

    return ReactDom.createPortal(
        {/*<div className="suspensionPopupPortal">
            <div className="suspensionPopupModal">
                <div className="suspensionPopup">
                    <div className="suspensionPopupContainer">
                        <img className="suspensionPopupConnectTFLogo" src="/logo/ConnectTF-logo-icon.png" alt="" />
                        <div className="suspensionPopupText">
                            <div className="suspensionPopupTextHeaderOne">User account has been suspended.</div> 
                            <div className="suspensionPopupTextHeaderTwo">This user account is currently under review.</div>
                            <div className="suspensionPopupTextHeaderTwo">Site access and platform privilages are suspended until further notice.</div>
                            <div className="suspensionPopupTextAppealInfo">
                                <span>{"If you feel this is in error, you can file an appeal request "}</span>
                                <Link 
                                    className="suspensionPopupTextAppealInfoLink"
                                    to="/appeals/request-form"
                                >
                                    {"here"}
                                </Link>
                                <span>{"."}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>*/},
        document.getElementById("portal")
    )
}

export default SuspensionPopup;