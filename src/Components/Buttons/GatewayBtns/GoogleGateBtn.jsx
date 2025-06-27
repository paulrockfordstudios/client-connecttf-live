import React, { useRef, useState } from 'react';
// packages
import { Trans, useTranslation } from 'react-i18next';
// hooks
import useElementSize from '../../../Utils/crHooks/useElementSize';
// functions
import { ctfbglgAngleBackdrop } from '../../../Utils/calculateAngle';
// styling
import "./GatewayBtns.css";
import { useDispatch, useSelector } from 'react-redux';
import useFocusVisible from '../../../Utils/crHooks/useFocusVisible';
import { componentClasses } from '../../../Lib/i18n/componentClasses';


function GoogleGateBtn() {

    const { screen } = useSelector((state) => state.auth);

    const gGateBtnRef = useRef();

    const focused = useFocusVisible(gGateBtnRef);

    const refDims = useElementSize(gGateBtnRef);

    const {t} = useTranslation(['auxiliary']);

    const dispatch = useDispatch();

    const [ mouseHov, setMouseHov ] = useState(false);

    const clickHandler = () => {
        console.log("clicked");
    };


    return (
        <button
            id={"googleGate-btn"} 
            ref={gGateBtnRef}
            aria-label={t("label.buttons.gateway_btns.google_gate", {ns: "aria"})}
            className="gatewayBtn outer justAlignCenter"
            style={
                focused       
                    ? {backgroundColor: screen === "light" ? "black" : "white"}
                    : ctfbglgAngleBackdrop(refDims?.width, refDims?.height, false, "sat")
            }
            onClick={clickHandler}
            onMouseEnter={() => setMouseHov(true)} 
            onMouseLeave={() => setMouseHov(false)}   
        >
            <div 
                className="gatewayBtn inner BASE">
                <div className={`gatewayBtnForeground ANNEX ${screen}`}>
                    <div 
                        className="gatewayBtnContent justAlignCenter png" 
                        style={mouseHov ? {opacity: "0.7"} : {opacity: "1"}}
                    >
                        <i className="gatewayBtnPNGIcon PNG_IMG PNG_GOOGLE google"/>
                        <span className={`gatewayBtnText ${screen}`}>
                            <Trans 
                                i18nKey={"pages.login.components.gateway.sign_in_with_google"}
                                ns={"auxiliary"}
                                components={componentClasses}
                            />
                        </span>
                    </div>
                </div>
                <div className={`gatewayBtnClick ${screen}`}/>
            </div>
        </button>
    )
};

export default GoogleGateBtn;