import React, { useRef, useState } from 'react';
// packages
import { Trans, useTranslation } from 'react-i18next';
// hooks
import useElementSize from '../../Utils/crHooks/useElementSize';
// functions
import { ctfbglgAngleBackdrop } from '../../Utils/calculateAngle';
// styling
import "./Gateway.css";
// components
import SignInBtn from '../../Components/Buttons/GatewayBtns/SignInBtn';
import FacebookGateBtn from '../../Components/Buttons/GatewayBtns/FacebookGateBtn';
import GoogleGateBtn from '../../Components/Buttons/GatewayBtns/GoogleGateBtn';
import CreateAccountBtn from '../../Components/Buttons/GatewayBtns/CreateAccountBtn';
import { componentClasses } from '../../Lib/i18n/componentClasses';
import { useDispatch, useSelector } from "react-redux";


function Gateway() {

    const ref = useRef();

    const { screen, fontSize } = useSelector((state) => state.auth);

    const refDims = useElementSize(ref);

    const {t} = useTranslation(['auxiliary', "common"]);

    console.log(fontSize)
    

    return (
      
        <section 
            className={`gateway cp-bs portal black ${fontSize === "32px" ? "xlFont" : ""}`}
            style={ctfbglgAngleBackdrop(refDims?.width, refDims?.height, false, "sat")}
            ref={ref} 
        >
            <div className={`gatewayForeground ${screen}`}>
                <div className={`gatewayContentContainer BASE ${fontSize === "32px" ? "xlFont" : ""}`}>     
                    <h2 className={`gatewayWelcomeUpper ${screen}`}>
                        <Trans i18nKey={"words.welcome!"} ns={"common"} components={componentClasses}/>
                    </h2>  
                    <div className="gatewayAccessBtnsContainer">
                        <h3 className={`gatewayWelcomeLower ${screen}`}> 
                            <Trans i18nKey={"pages.login.components.gateway.connect_today"} ns={"auxiliary"} components={componentClasses}/>
                        </h3>  
                        <div className="gatewayBtnContainer">
                            <SignInBtn auth={false}/>
                        </div>
                        <div className="gatewayHRContainer">
                            <hr className="gatewayHr cp-bg-cs saturated static masculine"/>
                            <span className={`gatewayHrText ${screen}`}>
                                <Trans i18nKey={"words.or"} ns={"common"} components={componentClasses}/>
                            </span>
                            <hr className="gatewayHr cp-bg-cs saturated static feminine"/>
                        </div>
                        <div className="gatewayBtnContainer" style={{marginBottom: "12px"}}>
                            <FacebookGateBtn/>
                        </div>
                        <div className="gatewayBtnContainer">
                            <GoogleGateBtn/>
                        </div>
                    </div>
                    <div className="gatewayRegisterBtnContainer">
                        <h3 className={`gatewayWelcomeLower ${screen}`}>
                            <Trans i18nKey={"pages.login.components.gateway.not_connected"} ns={"auxiliary"} components={componentClasses}/>
                        </h3>
                        <div className="gatewayBtnContainer">
                            <CreateAccountBtn/>
                        </div>
                    </div>
                </div> 
            </div>
        </section>
     
    )
};

export default Gateway;