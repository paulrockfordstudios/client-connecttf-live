import React, { useRef, useState } from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { Trans, useTranslation } from 'react-i18next';
import { ctfbglgAngleBackdrop } from '../../../../Utils/calculateAngle';
import useWindowSize from '../../../../Utils/crHooks/useWindowSize';
import useElementSize from '../../../../Utils/crHooks/useElementSize';
import "./RegistrationGate.css";
import CreateAccountBtn from '../../../../Components/Buttons/GatewayBtns/CreateAccountBtn';
import PersonalInfoInput from '../../../../Components/PersonalInfoInput/PersonalInfoInput';
import { registerClose } from '../../../../Redux/AuthSlice';
import useTimeout from '../../../../Utils/crHooks/useTimeout';
import DOBInput from '../../../../Components/InfoInputs/PersonalInfoInputs/DOBInput/DOBInput';
import { FocusScope } from 'react-aria';
import { cancelIcon } from '../../../../Lib/mui/icons';


function RegistrationGate() {

    const ref = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const dob = useRef();
    const rgEmail = useRef();
    const password = useRef();
    const reEnterPassword = useRef();

    const { screen } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const {t} = useTranslation(["aria", "auxiliary", "common"]);

    const { width: winWidth, height: winHeight } = useWindowSize();
    const refDims = useElementSize(ref);

    const [ passwordShow, setPasswordShow ] = useState(false);
    const [ invalidCreds, setInvalidCreds ] = useState(false);
    const [ expanding, setExpanding ] = useState(true);
    const [ contracting, setContracting ] = useState(false);
    const [ pwReadOnly, setPWReadOnly ] = useState(true);
    const [ emReadOnly, setEMReadOnly ] = useState(true);

    useTimeout(() => {
        setExpanding(false);
    }, 325);

    const closeHandler = () => {
        setContracting(true);
        setTimeout(() => {
            dispatch(registerClose());
        }, 325);
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
                            registrationGate 
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
                            className="registrationGateborderBg justAlignCenter" 
                            ref={ref} 
                            style={ctfbglgAngleBackdrop(refDims?.width, refDims?.height, false, "sat")}
                        >
                            <div className={`registrationGateContainer justAlignCenter ${screen}`}>
                                <div className={`registrationGateCloseBtn ${screen}`} aria-label={t("label.buttons.close_btn.reg_a", {ns: "aria"})} onClick={closeHandler}>{cancelIcon}</div>
                                <div className="registrationGateContent">
                                    <i className="registrationGateLogo PG_IMG PNG_LOGO_THREE" aria-hidden="true" alt="connecttf-logo"/>
                                    
                                    <form id="registrationForm" className="registrationForm" autoComplete='off'>
                                        <input type="text" name="hidden" style={{ display: 'none' }} autoComplete={false} /> 
                                        <PersonalInfoInput
                                            id={"first_name"}
                                            name={"rgFirstName"}
                                            type={"text"}
                                            required={true}
                                            refer={firstName}
                                        />
                                        <PersonalInfoInput
                                            id={"last_name"}
                                            name={"rgLastName"}
                                            type={"text"}
                                            required={true}
                                            refer={lastName}
                                        />



                                        <PersonalInfoInput
                                            id={"email"}
                                            name={"rgEmail"}
                                            type={"email"}
                                            required={true}
                                            refer={rgEmail}
                                            autoComplete={"new-email"}
                                        />
                                        <PersonalInfoInput
                                            id={"password"}
                                            name={"rgPassword"}
                                            type={"password"}
                                            required={true}
                                            refer={password}
                                            autoComplete={"new-password"}
                                        />
                                        <PersonalInfoInput
                                            id={"re-enter_password"}
                                            name={"rgRenterPassword"}
                                            type={"password"}
                                            required={true}
                                            refer={reEnterPassword}
                                        />

                                        <DOBInput refer={dob}/>
                                    </form>

                                    <div className="gatewayBtnContainer">
                                        <CreateAccountBtn/>
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

export default RegistrationGate;