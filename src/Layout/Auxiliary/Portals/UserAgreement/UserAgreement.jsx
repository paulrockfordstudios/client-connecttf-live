import React, { useEffect, useRef, useState } from 'react';
// packages
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Trans, useTranslation } from 'react-i18next';
// lib
import { componentClasses } from '../../../../Lib/i18n/componentClasses';
// hooks
import useWindowSize from '../../../../Utils/crHooks/useWindowSize';
import useElementSize from '../../../../Utils/crHooks/useElementSize';
// functions
import { ctfbglgAngleBackdrop } from '../../../../Utils/calculateAngle';
// components
import DisagreeBtn from '../../../../Components/Buttons/GatewayBtns/DisagreeBtn';
import AgreeBtn from '../../../../Components/Buttons/GatewayBtns/AgreeBtn';
// styling
import "./userAgreement.css";
import "../../../../Assets/styling/general.css";
import { ctfdClose } from '../../../../Redux/AuthSlice';
import useTimeout from '../../../../Utils/crHooks/useTimeout';
import { FocusScope } from 'react-aria';
import { cancelIcon } from '../../../../Lib/mui/icons';


function UserAgreement() {

    const ref = useRef();

    const { screen } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const {t} = useTranslation(["aria", 'auxiliary, "common']);

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
            dispatch(ctfdClose());
        }, 325);
    };

    const handleKeyClose = (e) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    };


    return ReactDom.createPortal(
        <div className="PORTAL" onKeyDown={(e) => handleKeyClose(e)}                                                                >
            <div 
                className={`PORTAL_BACKDROP ${expanding ? "expand" : ""} ${contracting ? "contract" : ""}`} 
                style={ctfbglgAngleBackdrop(winWidth, winHeight, false, "pas")}
                
            />
            <div className="MODAL">
                <FocusScope contain autoFocus restoreFocus>
                    <div 
                        className={`
                            userAgreement 
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
                            className="userAgreementborderBg justAlignCenter" 
                            ref={ref} 
                            style={ctfbglgAngleBackdrop(refDims?.width, refDims?.height, false, "sat")}
                        >
                            <div className={`userAgreementContainer justAlignCenter ${screen}`}>
                                <div className={`accesGateCloseBtn ${screen}`} aria-label={t("label.close_btn.user_agreement", "aria")} onClick={closeHandler}>{cancelIcon}</div>
                                <div className={`userAgreementContent ${screen}`}>
                                    <div className="userAgreementTop">
                                        <div className="userAgreementDisclaimer">
                                            <div className="userAgreementDisclaimerHeader">
                                                <div className="userAgreementDisclaimerHeaderTextBox">
                                                    <span className="ctfdWait">
                                                        <Trans ns={"common"} i18nKey={"phrases.wait_hold_on"}/>
                                                    </span>
                                                    <span className="ctfdquestion">
                                                        <Trans ns={"auxiliary"} i18nKey={"portals.userAgreement.ua_statement"}/>
                                                    </span>
                                                    <span className="ctfdStatementTitle">
                                                        <Trans ns={"auxiliary"} i18nKey={"portals.userAgreement.ua_question"}/>
                                                    </span>
                                                </div>
                                                <div className="userAgreementDisclaimerHeaderIcon" aria-hidden="true">
                                                    <i className="ctfdIcon PNG_ICON_STOP"/>
                                                </div>
                                            </div>
                                            <div className={`ctfdStatementContainer ${screen}`}>
                                                <p className="ctfdStatementParagraph">
                                                    <Trans ns={"auxiliary"} i18nKey={"portals.userAgreement.ua_body.section1"}/>
                                                </p>
                                                <p className="ctfdStatementParagraph">
                                                    <Trans ns={"auxiliary"} i18nKey={"portals.userAgreement.ua_body.section2"}/>
                                                </p>
                                                <p className="ctfdStatementParagraph">
                                                    <Trans ns={"auxiliary"} i18nKey={"portals.userAgreement.ua_body.section3"}/>
                                                </p>
                                                <p className="ctfdStatementParagraph">
                                                    <Trans ns={"auxiliary"} i18nKey={"portals.userAgreement.ua_body.section4"}/>
                                                </p>
                                                <p className="ctfdStatementParagraph">
                                                    <Trans ns={"auxiliary"} i18nKey={"portals.userAgreement.ua_body.section5"}/>
                                                </p>
                                                <p className="ctfdStatementParagraph last">
                                                    <Trans ns={"auxiliary"} i18nKey={"portals.userAgreement.ua_body.section6"} components={componentClasses}/>
                                                </p>
                                            </div>
                                            <span className="ctfdStatementParagraph">
                                                <Trans ns={"auxiliary"} i18nKey={"portals.userAgreement.ua_body.section7"} components={componentClasses}/>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="userAgreementBottom">
                                        <div className="userAgreementBtnContainer" style={{marginBottom: "0.625rem" /*10px*/}}>
                                            <DisagreeBtn closeHandler={closeHandler}/>
                                        </div>
                                        <div className="userAgreementBtnContainer">
                                            <AgreeBtn setContracting={setContracting}/>
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
};

export default UserAgreement;