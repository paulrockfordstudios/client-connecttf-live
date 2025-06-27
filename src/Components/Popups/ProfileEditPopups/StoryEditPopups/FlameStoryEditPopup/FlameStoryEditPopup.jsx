import React from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { colorTheme } from '../../../Utils/styling/colorTheme';
import "./FlameStoryEditPopup.css";


function FlameStoryEditPopup() {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    return ReactDom.createPortal(
        <div className={`fsepPortal ${colorTheme(user)}`}>
            <div className={`fsepBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme(user)}`} />
            <div className="fsepModal">
                <div className="fsep">
                    <div className="fsepContainer">
                        <div className="fsepTop">

                        </div>
                        <div className="fsepBottom">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default FlameStoryEditPopup;