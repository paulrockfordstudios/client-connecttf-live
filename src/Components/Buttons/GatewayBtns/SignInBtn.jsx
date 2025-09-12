import React, { useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from 'react-i18next';
import { login, accessOpen, accessClose } from '../../../Redux/AuthSlice';
import "./GatewayBtns.css";
import { circleProgress } from '../../../Lib/mui/misc';
import useFocusVisible from '../../../Utils/crHooks/useFocusVisible';
import { componentClasses } from '../../../Lib/i18n/componentClasses';


function SignInBtn({ identifier, password, auth=false }) {

    const { t } = useTranslation(['auxiliary']);

    const { isLoading, screen } = useSelector((state) => state.auth);

    const signInBtnRef = useRef();

    const focused = useFocusVisible(signInBtnRef);

    const dispatch = useDispatch();

    const clickHandler = (e) => {
        if (auth) {
            e.preventDefault();
            const userData = { 
                password: password.current.value
            }
            // Determine the type of identifier for backend processing
            if (identifier.includes('@')) {
                Object.assign(userData, {email: identifier}) 
            } else if (/^\d+$/.test(identifier)) { // Simple check for digits only
                Object.assign(userData, {phoneNumber: identifier})
            } else {
                Object.assign(userData, {username: identifier})
            }
            dispatch(login(userData));
            !isLoading && dispatch(accessClose());
        } else {
            dispatch(accessOpen())
        }
    };


    return (
        <button
            id={"signIn-btn"} 
            ref={signInBtnRef}
            aria-label={t("aria:label.buttons.gateway_btns.sign_in")}
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
                        {isLoading 
                            ? <div color="white" size="22px">{circleProgress}</div>
                            : <span className="inheritParentFont">
                                <Trans 
                                    i18nKey={"pages.login.components.gateway.sign_in"}
                                    ns={"auxiliary"}
                                    components={componentClasses}
                                />
                            </span>
                        }
                    </span>
                </div>
            </div>
        </button>
    )
};

export default SignInBtn;