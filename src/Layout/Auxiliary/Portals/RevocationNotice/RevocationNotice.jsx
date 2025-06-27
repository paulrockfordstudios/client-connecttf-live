import React, { useRef } from 'react';
import ReactDom from "react-dom";
import { Trans, useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import "./revocationNotice.css";
import { FocusScope } from 'react-aria';
import { ctfbglgAngleBackdrop } from '../../../../Utils/calculateAngle';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '../../../../Utils/crHooks/useWindowSize';
import useElementSize from '../../../../Utils/crHooks/useElementSize';
import { componentClasses } from '../../../../Lib/i18n/componentClasses';


function RevocationNotice() {

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
                            revocationNotice 
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
                            className="revocationNoticeborderBg justAlignCenter" 
                            ref={ref} 
                            style={ctfbglgAngleBackdrop(refDims?.width, refDims?.height, false, "sat")}
                        >
                            <div className={`revocationNoticeContainer justAlignCenter ${screen}`}>
                                <img className="revocationNoticeConnectTFLogo" src="/logo/ConnectTF-logo-icon.png" alt="" />
                                <div className="revocationNoticeText">
                                    <div className="revocationNoticeTextHeaderOne">
                                       <Trans key={"potals.revocationNotice.blacklist_notice"} ns={"auxiliary"} components={componentClasses}/>
                                    </div> 
                                    <div className="revocationNoticeTextHeaderTwo">
                                        <Trans key={"potals.revocationNotice.revoked_notice"} ns={"auxiliary"} components={componentClasses}/>
                                    </div>
                                    <div className="revocationNoticeTextAppealInfo">
                                        <Trans key={"phrases.appeal_request_link_sentnece"} ns={"common"} components={componentClasses}/>
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

export default RevocationNotice;