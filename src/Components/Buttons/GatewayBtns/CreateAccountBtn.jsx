import React, { useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Trans, useTranslation } from 'react-i18next';
import { accessClose, ctfdOpen } from '../../../Redux/AuthSlice';
import "./GatewayBtns.css";
import useFocusVisible from '../../../Utils/crHooks/useFocusVisible';
import { componentClasses } from '../../../Lib/i18n/componentClasses';


function CreateAccountBtn({ setContracting }) {

    const {t} = useTranslation(['aria', 'auxiliary']);

    const createAccBtnRef = useRef();

    const focused = useFocusVisible(createAccBtnRef)

    const dispatch = useDispatch();

    const { access, screen } = useSelector((state) => state.auth);

    const clickHandler = () => {
        if (access) {
            setContracting(true);
            setTimeout(() => {
                dispatch(accessClose());
            }, 325);
        }
        dispatch(ctfdOpen());
    };

    return (
        <button
            id={"createAccount-btn"} 
            ref={createAccBtnRef}
            aria-label={t("aria:label.buttons.gateway_btns.create_account")}
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
                            i18nKey={"pages.login.components.gateway.create_account"} 
                            ns={"auxiliary"} 
                            components={componentClasses} 
                        />
                    </span>
                </div> 
            </div>
        </button>
    )
};

export default CreateAccountBtn;