import React, { useRef } from 'react';
// packages
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from 'react-i18next';
// context
import { ctfdClose, registerOpen } from '../../../Redux/AuthSlice';
//styling
import "./GatewayBtns.css";
import useFocusVisible from '../../../Utils/crHooks/useFocusVisible';
import { componentClasses } from '../../../Lib/i18n/componentClasses';


function AgreeBtn({ setContracting }) {

    const { screen } = useSelector((state) => state.auth);

    const agreeBtnRef = useRef();

    const focused = useFocusVisible(agreeBtnRef);

    const {t} = useTranslation(['aria', 'portals']);

    const dispatch = useDispatch();

    const clickHandler = () => {
        setContracting(true);
        
        setTimeout(() => {
            dispatch(ctfdClose());
            dispatch(registerOpen());
        }, 325);
        
    };

    return (
        <button
            id={"agree-btn"} 
            ref={agreeBtnRef}
            aria-label={t("aria:label.buttons.gateway_btns.i_agree")}
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
                    : "masculine"
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
                    masculine
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
                        masculine
                    `}
                >
                    <span className="gatewayBtnText">
                        <Trans 
                            i18nKey={"user_agreement.buttons.i_agree"} 
                            ns={"portals"} 
                            components={componentClasses}
                        />
                    </span>
                </div> 
            </div>
        </button>
    )
}

export default AgreeBtn;