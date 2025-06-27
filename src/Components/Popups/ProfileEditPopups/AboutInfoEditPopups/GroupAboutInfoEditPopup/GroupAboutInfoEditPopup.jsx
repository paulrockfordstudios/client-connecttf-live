import React from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { colorTheme } from '../../../Utils/styling/colorTheme';
import "./GroupAboutInfoEditPopup.css";

function GroupAboutInfoEditPopup() {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    return ReactDom.createPortal(
        <div className={`gaiepPortal ${colorTheme(user)}`}>
            <div className={`gaiepBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme(user)}`} />
            <div className="gaiepModal">
                <div className="gaiep">
                    <div className="gaiepContainer">
                        <div className="gaiepTop">

                        </div>
                        <div className="gaiepBottom">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default GroupAboutInfoEditPopup;