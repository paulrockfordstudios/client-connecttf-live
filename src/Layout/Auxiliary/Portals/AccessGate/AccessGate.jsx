import React, { useRef, useState } from 'react';
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from 'react-i18next';
import { ctfbglgAngleBackdrop } from '../../../../Utils/calculateAngle';
import useWindowSize from '../../../../Utils/crHooks/useWindowSize';
import useElementSize from '../../../../Utils/crHooks/useElementSize';
import SignInBtn from '../../../../Components/Buttons/GatewayBtns/SignInBtn';
import FacebookGateBtn from '../../../../Components/Buttons/GatewayBtns/FacebookGateBtn';
import GoogleGateBtn from '../../../../Components/Buttons/GatewayBtns/GoogleGateBtn';
import { componentClasses } from '../../../../Lib/i18n/componentClasses';
import CreateAccountBtn from '../../../../Components/Buttons/GatewayBtns/CreateAccountBtn';
import { accessClose, setKeyHov } from "../../../../Redux/AuthSlice";
import PersonalInfoInput from '../../../../Components/InfoInputs/PersonalInfoInput/PersonalInfoInput';
import "./AccessGate.css";
import useTimeout from '../../../../Utils/crHooks/useTimeout';
import { FocusScope } from 'react-aria';
import { cancelIcon } from '../../../../Lib/mui/icons';


function AccessGate() {

    const ref = useRef();
    const identifier = useRef();
    const password = useRef();

    const { screen, keyHov } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const {t} = useTranslation(["aria", "auxiliary", "common"]);

    const { width: winWidth, height: winHeight } = useWindowSize();
    const refDims = useElementSize(ref);

    const [ expanding, setExpanding ] = useState(true);
    const [ contracting, setContracting ] = useState(false);

    useTimeout(() => {
        setExpanding(false);
    }, 325);

    const closeHandler = () => {
        setContracting(true);
        setTimeout(() => {
            dispatch(accessClose());
        }, 325);
    };

    const handleKeyFocus = (e) => {
        if (e.key === 'Tab') {
            dispatch(setKeyHov("agClose-btn"));
        }
    };

    const handleKeyClose = (e) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    };
   

    return ReactDom.createPortal(
        <div className="PORTAL" onKeyDown={(e) => handleKeyClose(e)}>
            <div 
                className={`PORTAL_BACKDROP ${expanding ? "expand" : ""} ${contracting ? "contract" : ""}`} 
                style={ctfbglgAngleBackdrop(winWidth, winHeight, false, "pas")}
            />
            <div className="MODAL">
                <FocusScope contain autoFocus restoreFocus>
                    <div 
                        className={`
                            accessGate 
                            justAlignCenter
                            dynamicContainer 
                            cp-bs 
                            portal 
                            black 
                            ${screen}
                            ${expanding ? "expand" : ""} 
                            ${contracting ? "contract" : ""}
                        `}
                    >
                        <div 
                            className="accessGateborderBg justAlignCenter " 
                            ref={ref} 
                            style={ctfbglgAngleBackdrop(refDims?.width, refDims?.height, false, "sat")}
                        >
                            <div className={`accessGateContainer justAlignCenter ${screen}`}>
                                <button 
                                    id={"agClose-btn"}
                                    className={`
                                        accesGateCloseBtn 
                                        justAlignCenter
                                        ${screen} 
                                        ${keyHov === "agClose-btn" ? "keyHov" : ""}
                                    `} 
                                    aria-label={t("aria:label.close_btn.access")} 
                                    onKeyUp={(e) => handleKeyFocus(e)}
                                    onClick={closeHandler}
                                >
                                    {cancelIcon}
                                </button>
                                <div className="accessGateContent">
                                    <i className="accessGateLogo PG_IMG PNG_LOGO_THREE" aria-hidden="true" alt="connecttf-logo"/>
                                
                                        <form id="accessForm">
                                            <PersonalInfoInput
                                                id={"login"}
                                                name={"agEmail"}
                                                type={"text"}
                                                required={true}
                                                refer={identifier}
                                            />
                                            <PersonalInfoInput
                                                id={"password"}
                                                name={"agPassword"}
                                                type={"password"}
                                                required={true}
                                                refer={password}
                                            />
                                        </form>
                                    
                                    <button
                                        id="ag-forgotPassword-btn" 
                                        className={`forgotPassword ${screen}`} 
                                        aria-label={t("aria:label.buttons.misc.forgot_password")}
                                    > 
                                        <Trans i18nKey={"pages.login.components.gateway.forgot_password"} ns={"auxiliary"} components={componentClasses} />
                                    </button>

                                    <div className="gatewayAccessBtnsContainer">  
                                        <div className="gatewayBtnContainer">
                                            <SignInBtn
                                                identifier={identifier} 
                                                password={password}
                                                auth={true}
                                            />
                                        </div>
                                        <div className="gatewayHRContainer">
                                            <hr className="gatewayHr cp-bg-cs saturated static masculine"/>
                                            <span className={`gatewayHrText ${screen}`}>
                                                <Trans i18nKey={"words.or"} ns={"common"} components={componentClasses}/>
                                            </span>
                                            <hr className="gatewayHr cp-bg-cs saturated static feminine"/>
                                        </div>
                                        <div className="gatewayBtnContainer" style={{marginBottom: "1.25rem" /*20px*/}}>
                                            <FacebookGateBtn/>
                                        </div>
                                        <div className="gatewayBtnContainer" onClick={() => setInvalidCreds(true)}>
                                            <GoogleGateBtn/>
                                        </div>
                                    </div>
                                    <div className="gatewayRegisterBtnContainer">
                                    <h3 className={`gatewayWelcomeLower ${screen}`}>
                                        <Trans i18nKey={"pages.login.components.gateway.not_connected"} ns={"auxiliary"} components={componentClasses}/>
                                    </h3>
                                    <div className="gatewayBtnContainer">
                                        <CreateAccountBtn setContracting={setContracting}/>
                                    </div>
                                </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </FocusScope>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default AccessGate;


/*
const [ invalidCreds, setInvalidCreds ] = useState(false);
    
    const invalidCredsResetHandler = () => {
        if (!invalidCreds) return;
        setInvalidCreds(false);
    }

    const emailInputHandler = () => {
        if (invalidCreds) {setInvalidCreds(false)};
    }
*/