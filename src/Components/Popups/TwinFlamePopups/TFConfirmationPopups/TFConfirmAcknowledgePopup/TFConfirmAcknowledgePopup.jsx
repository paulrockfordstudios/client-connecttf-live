// This component is for the recipient of TF Request to confirm that the requester if their TF.
// It pops up when the recipient presses the confirm button on the request.

import React from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { colorTheme } from '../../../Utils/styling/colorTheme';
import "./TFConfirmAcknowledgePopup.class";


function TFConfirmAcknowledgePopup() {

  const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    return ReactDom.createPortal(
        <div className={`tfConAckPopupPortal`}>
            <div className={`tfConAckPopupBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme(user)}`} />
            <div className="tfConAckPopupModal">
                <div className="tfConAckPopup">
                    <div className="tfConAckPopupContainer">
                        <div className="tfConAckPopupDisclaimer">
                            <div className="tfConAckPopupTop">
                                <div className="tfConAckPopupDisclaimerHeader">
                                    <div className="tfConAckPopupDisclaimerHeaderTextBox">
                                        <span className={`tfcapdWait ${colorTheme(user)}`}>Wait! Hold On!</span>
                                        <span className="tfcapdquestion" >
                                            <span>Are you sure this user is your </span> 
                                            <span className="tfcapdTwin">twin </span>
                                            <span className="tfcapdFlame">flame</span>
                                            <span>?</span>
                                        </span>
                                        <span className="tfcapdStatementTitle">
                                            <span>
                                                Accepting another user's
                                            </span>
                                            <span className="tfcapdTwin"> twin </span>
                                            <span className="tfcapdFlame">flame </span>
                                            <span> 
                                                claim request is a <b>SERIOUS MATTER</b>!
                                            </span>
                                        </span>
                                        <span className="tfcapdStatementParagraph">
                                            <span>Everyone has many soul mates of sorts but only one </span>
                                            <span className="tfcapdTwin">twin </span>
                                            <span className="tfcapdFlame">flame</span>
                                            <span>.</span>
                                        </span>
                                    </div>
                                    <div className="tfConAckPopupDisclaimerHeaderIcon">
                                        <i className="tfcapdIcon PNG_ICON_STOP"/>
                                    </div>
                                </div>
                                <span className="tfcapdStatementParagraph">
                                    Twin soul connections are <b>extremely rare</b>! The universe 
                                    only allows them to incarnate together and meet in a single lifetime
                                    once their souls have undergone many many lifetimes full of lessons and have 
                                    reached a level of maturity for their souls to move one to the next phase 
                                    of being. This connection requires both souls to complete all lifetime lessons and clear 
                                    up all karmic dept before they can come together into full union of harmonic bliss for eternity.
                                </span>
                                <span className="tfcapdStatementParagraph">
                                    Once twin souls have merged into union, it is time for them to carry on a special mission of 
                                    spiritual work to help uplift humanity and the planet as a whole into higher dimensions and frequencies of existance.
                                    This mission work is to be their focus for the rest of their lifes as well as the rest of their soul 
                                    time here on Mother Earth, Gaia.
                                </span>
                                <span className="tfcapdStatementParagraph">
                                    Twin soul connections are <b>NOT</b> easy! They are very tumultuous, chaotic, and difficult to endure in the beginning, 
                                    sometimes for many years. They are <b>NOT</b> for the faint of heart! Also, a high level of spiritual maturaty 
                                    is required for a meeting to happen.
                                </span>
                                <span className="tfcapdStatementParagraph">
                                    <span>Your</span>
                                    <span className="tfcapdTwin"> twin </span>
                                    <span className="tfcapdFlame">flame </span> 
                                    <span>
                                        is someone you feel deep in your soul! Your meeting happens when you least expect it 
                                        and are truly happy being alone on your own. The meeting is usually accompanied 
                                        with spiritual phenonema and synchronicities that cannot be easily explained.
                                    </span>
                                </span>
                                <span className="tfcapdStatementParagraph">
                                    <span>
                                        If you are lonely, wanting and hoping for a relationship or feel a lustful attraction, this 
                                        is probably <b>NOT</b> your
                                    </span> 
                                    <span className="tfcapdTwin"> twin </span>
                                    <span className="tfcapdFlame">flame</span> 
                                    <span>
                                        . This maybe a soul mate or a karmic entanglement. A
                                    </span>
                                    <span className="tfcapdTwin"> twin </span>
                                    <span className="tfcapdFlame">flame </span>
                                    <span>  
                                        is someone you feel to the very core of your being, both good and bad.
                                    </span>
                                </span>
                                <span className="tfcapdStatementParagraph">
                                    <span className="tfcapdWarning">Warning! </span>
                                    <span>
                                        Prematurely accepting a user's claim as your 
                                    </span>
                                    <span className="tfcapdTwin"> twin </span>
                                    <span className="tfcapdFlame">flame </span> 
                                    <span>
                                        could have <b>negative consequences</b>! Even if this user is your actual
                                    </span>
                                    <span className="tfcapdTwin"> twin </span>
                                    <span className="tfcapdFlame">flame </span> 
                                    <span>
                                        , accepting their claim before you are ready for union could lead to giving this user false hopes. 
                                        That especially holds true as for the connection being out in the open on a public social forum such as here on
                                    </span>
                                    <span className="tfcapdTwin"> <b> Connect</b></span>
                                    <span className="tfcapdFlame"><b>TF</b></span>
                                    <span>
                                        . It is probably best to wait before confirming their request after the two of you are 
                                        contact with each other, agree on your connection, and are ready to start your missionary work. 
                                        Prematurely accepting their claim as your
                                    </span> 
                                    <span className="tfcapdTwin"> twin </span>
                                    <span className="tfcapdFlame">flame </span> 
                                    <span>
                                        could possibly <b>inflate their ego</b>, <b>lead them on</b>, and increase their 
                                        <b>chasing and persuing</b> back actions to uncompfortable levels.
                                    </span> 
                                </span>
                                <span className="tfcapdStatementParagraph">
                                    <b>Before you confirm their request, We strongly advise that you first discuss this with your beloved before bringing 
                                    your connection out in to the open on this forum. Your actions carry responsibility as you will be
                                    expected to set a positive example for other users on this platform.</b> 
                                </span>                
                            </div>
                        </div>
                        <div className="tfConAckPopupBottom">
                            <button 
                                className={`tfConAckPopupButton cancel ${colorTheme(user)}`} 
                            >
                                <span onClick={() => dispatch(tfcpClose())}>
                                    Cancel
                                </span>
                            </button>
                            <button 
                                className="tfConAckPopupButton confirm gold" 
                            >
                                <span>
                                    Confirm Request
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
};

export default TFConfirmAcknowledgePopup;