import React from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { colorTheme } from '../../../Utils/styling/colorTheme';
import "./GroupIntroInfoEditPopup.css";


function GroupIntroInfoEditPopup() {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    return ReactDom.createPortal(
        <div className={`giiepPortal ${colorTheme(user)}`}>
            <div className={`giiepBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme(user)}`} />
            <div className="giiepModal">
                <div className="giiep">
                    <div className="giiepContainer">
                        <div className="giiepTop">

                        </div>
                        <div className="giiepBottom">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default GroupIntroInfoEditPopup;