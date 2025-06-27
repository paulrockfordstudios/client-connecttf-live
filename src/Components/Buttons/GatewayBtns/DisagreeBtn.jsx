import React, { useRef } from 'react';
// packages
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from 'react-i18next';
// context
import { ctfdClose } from '../../../Redux/AuthSlice';
//styling
import "./GatewayBtns.css";
import useFocusVisible from '../../../Utils/crHooks/useFocusVisible';
import { componentClasses } from '../../../Lib/i18n/componentClasses';


function DisagreeBtn() {

    const { screen } = useSelector((state) => state.auth);

    const disagreeBtnRef = useRef();

    const focused = useFocusVisible(disagreeBtnRef);

    const {t} = useTranslation(['aria', 'portals']);

    const dispatch = useDispatch();

    const clickHandler = () => {
        dispatch(ctfdClose())
    };


    return (
        <button
            id={"disagree-btn"} 
            ref={disagreeBtnRef}
            aria-label={t("aria:label.buttons.gateway_btns.i_disagree")}
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
                    : "feminine"
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
                    feminine
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
                        feminine
                    `}
                >
                    <span className="gatewayBtnText">
                        <Trans 
                            i18nKey={"user_agreement.buttons.i_disagree"} 
                            ns={"portals"} 
                            components={componentClasses} 
                        />
                    </span>
                </div>
            </div>
        </button>
    )
};

export default DisagreeBtn;