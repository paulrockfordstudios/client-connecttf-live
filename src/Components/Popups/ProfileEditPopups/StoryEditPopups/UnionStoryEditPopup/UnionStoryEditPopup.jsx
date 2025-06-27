import React from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { colorTheme } from '../../../Utils/styling/colorTheme';
import "./UnionStoryEditPopup.css";


function UnionStoryEditPopup() {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    return ReactDom.createPortal(
        <div className={`usepPortal ${colorTheme(user)}`}>
            <div className={`usepBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme(user)}`} />
            <div className="usepModal">
                <div className="usep">
                    <div className="usepContainer">
                        <div className="usepTop">

                        </div>
                        <div className="usepBottom">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default UnionStoryEditPopup;