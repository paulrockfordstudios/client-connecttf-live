import React from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { colorTheme } from '../../../Utils/styling/colorTheme';
import "./UnionIntroInfoEditPopup.css";


function UnionIntroInfoEditPopup() {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    return ReactDom.createPortal(
        <div className={`uiiepPortal ${colorTheme(user)}`}>
            <div className={`uiiepBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme(user)}`} />
            <div className="uiiepModal">
                <div className="uiiep">
                    <div className="uiiepContainer">
                        <div className="uiiepTop">

                        </div>
                        <div className="uiiepBottom">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default UnionIntroInfoEditPopup;