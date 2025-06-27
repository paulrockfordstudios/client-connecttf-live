import React from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { colorTheme } from '../../../Utils/styling/colorTheme';
import "./FlameAboutInfoEditPopup.css";

function FlameAboutInfoEditPopup() {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    return ReactDom.createPortal(
        <div className={`faiepPortal ${colorTheme(user)}`}>
            <div className={`faiepBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme(user)}`} />
            <div className="faiepModal">
                <div className="faiep">
                    <div className="faiepContainer">
                        <div className="faiepTop">

                        </div>
                        <div className="faiepBottom">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default FlameAboutInfoEditPopup;