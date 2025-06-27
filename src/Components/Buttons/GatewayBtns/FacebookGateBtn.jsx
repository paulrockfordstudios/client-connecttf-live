import React, { useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import "./GatewayBtns.css";
import { useDispatch, useSelector } from 'react-redux';
import { facebookIcon } from '../../../Lib/mui/icons';
import useFocusVisible from '../../../Utils/crHooks/useFocusVisible';
import { componentClasses } from '../../../Lib/i18n/componentClasses';


function FacebookGateBtn() {

    const { screen } = useSelector((state) => state.auth);

    const fbGateBtnRef = useRef();

    const focused = useFocusVisible(fbGateBtnRef);

    const {t} = useTranslation(['auxiliary', 'aria']);

    const dispatch = useDispatch();

    const clickHandler = () => {
        console.log("clicked");
    };

    
    return (
        <button
            id={"fbGate-btn"} 
            ref={fbGateBtnRef}
            aria-label={t("aria:label.buttons.gateway_btns.fb_gate")}
            className={`
                gatewayBtn
                outer 
                justAlignCenter 
                cp-bg-cs 
                saturated 
                dynamic 
                act 
                ${screen} 
                ${focused
                    ? screen === "light" 
                        ? "black"
                        : "white"
                    : "facebook"
                }
            `}
            onClick={clickHandler}
        >
            <div 
                className={`
                    gatewayBtn 
                    inner 
                    cp-bg-cs 
                    saturated 
                    dynamic 
                    act 
                    ${screen} 
                    facebook
                `} 
            >
                <div 
                    className={`
                        gatewayBtnContent
                        justAlignCenter
                        cp-fg-cs 
                        pastel 
                        dynamic 
                        hov 
                        act
                        ${screen}
                        white 
                        facebook
                        svg
                    `}
                >
                    <div className="gatewayBtnSVGIcon">{facebookIcon}</div>
                    <span className="gatewayBtnText">
                        <Trans 
                            i18nKey={"pages.login.components.gateway.sign_in_with_facebook"} 
                            ns={"auxiliary"} 
                            components={componentClasses}
                        />
                    </span>
                </div> 
            </div>
        </button>
    )
};

export default FacebookGateBtn;