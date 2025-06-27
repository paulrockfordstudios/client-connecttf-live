// This Component is announce congratulations to the new TF union on both flames home pages
// This will pop up after a 5 second interval.

import React from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { colorTheme } from '../../../Utils/styling/colorTheme';
import "./TFCongratulationsPopup.css";


function TFCongratulationsPopup() {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    return ReactDom.createPortal(
        <div className={`tfCongratsPopupPortal`}>
            <div className={`tfCongratsPopupBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme(user)}`} />
            <div className="tfCongratsPopupModal">
                <div className="tfCongratsPopup">
                    <div className="tfCongratsPopupContainer">
                        <div className="tfCongratsPopupTop">
                            
                        </div>
                        <div className="tfCongratsPopupBottom">
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
};

export default TFCongratulationsPopup;