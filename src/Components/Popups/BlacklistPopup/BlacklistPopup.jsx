import React from 'react';
import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import "./BlacklistPopup.css";


function BlacklistPopup() {

    return ReactDom.createPortal(
        <div className="blacklistPopupPortal">
            <div className="blacklistPopupModal">
                <div className="blacklistPopup">
                    <div className="blacklistPopupContainer">
                        <img className="blacklistPopupConnectTFLogo" src="/logo/ConnectTF-logo-icon.png" alt="" />
                        <div className="blacklistPopupText">
                            <div className="blacklistPopupTextHeaderOne">User account is blacklisted.</div> 
                            <div className="blacklistPopupTextHeaderTwo">Site access and platform privilages have been revoked.</div>
                            <div className="blacklistPopupTextAppealInfo">
                                <span>{"If you feel this is in error, you can file an appeal request here."}</span>
                                <Link 
                                    className="blacklistPopupTextAppealInfoLink"
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
        </div>,
        document.getElementById("portal")
    )
}

export default BlacklistPopup;