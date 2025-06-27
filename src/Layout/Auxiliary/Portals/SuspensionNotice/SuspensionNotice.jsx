import React, { useRef } from 'react';
import ReactDom from "react-dom";
import { Trans, useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import "./SuspensionNotice.css";
import { FocusScope } from 'react-aria';
import { ctfbglgAngleBackdrop } from '../../../../Utils/calculateAngle';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '../../../../Utils/crHooks/useWindowSize';
import useElementSize from '../../../../Utils/crHooks/useElementSize';
import { componentClasses } from '../../../../Lib/i18n/componentClasses';


function SuspensionNotice() {

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
                style={ctfbglgAngleBackdrop(winWidth, winHeight, false, false, "pas")}
                
            />
            <div className="MODAL">
                <FocusScope contain autoFocus restoreFocus>
                    <div 
                        className={`
                            suspensionNotice 
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
                            className="suspensionNoticeborderBg justAlignCenter" 
                            ref={ref} 
                            style={ctfbglgAngleBackdrop(refDims?.width, refDims?.height, false, "sat")}
                        >
                            <div className={`suspensionNoticeContainer justAlignCenter ${screen}`}>

                                <img className="suspensionNoticeConnectTFLogo" src="/logo/ConnectTF-logo-icon.png" alt="" />
                                <div className="suspensionNoticeText">
                                    <div className="suspensionNoticeTextHeaderOne">
                                        <Trans key={"portals.suspensionNotice.suspension_notice"} ns={"auxiliary"} components={componentClasses} /> 
                                    </div> 
                                    <div className="suspensionNoticeTextHeaderTwo">
                                        <Trans key={"portals.suspensionNotice.under_review_notice"} ns={"auxiliary"} components={componentClasses} />
                                    </div>
                                    <div className="suspensionNoticeTextHeaderTwo">
                                        <Trans key={"portals.suspensionNotice.suspended_notice"} ns={"auxiliary"} components={componentClasses} />
                                    </div>
                                    <div className="suspensionNoticeTextAppealInfo">
                                        <Trans i18nKey={"phrases.appeal_request_Link_sentence"} ns={"common"} components={componentClasses}/>
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

export default SuspensionNotice;


/*<div className="suspensionNoticePortal">
            <div className="suspensionNoticeModal">
                <div className="suspensionNotice">
                    <div className="suspensionNoticeContainer">
                        <img className="suspensionNoticeConnectTFLogo" src="/logo/ConnectTF-logo-icon.png" alt="" />
                        <div className="suspensionNoticeText">
                            <div className="suspensionNoticeTextHeaderOne">
                                {t("portals.suspensionNotice.suspension_notice")} 
                            </div> 
                            <div className="suspensionNoticeTextHeaderTwo">
                                {t("portals.suspensionNotice.under_review_notice")}
                            </div>
                            <div className="suspensionNoticeTextHeaderTwo">
                                {t("portals.suspensionNotice.suspended_notice")}
                            </div>
                            <div className="suspensionNoticeTextAppealInfo">
                                <Trans 
                                    i18nKey={"phrases"}
                                    components={componentClasses}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>*/