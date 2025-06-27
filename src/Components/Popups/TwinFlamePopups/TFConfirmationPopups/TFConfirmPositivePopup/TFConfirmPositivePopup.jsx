// This component is the popup after you click "This is my TF" button on FollowButtonsPopup.jsx. 
// It is for the user to confirm that they are sure that the user button they are clicking 
// is in fact their TF.

import React from 'react';
import ReactDom from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { colorTheme } from '../../../../../Utils/styling/colorTheme';
import { tfcpClose } from "../../../../../Redux/AuthSlice";
import "./TFConfirmPositivePopup.css";


function TFConfirmPositivePopup({user}) {

  const dispatch = useDispatch();

    const { user: currentUser } = useSelector((state) => state.auth);

    // Block/unblock flame user
    //useEffect(() => {
    //    setFlameBlocked(currentUser.flameBlocking.includes(user?._id));
    //    localStorage.setItem("user", JSON.stringify(currentUser));
    //    currentUser.unionName
    //        ? localStorage.setItem("union", JSON.stringify(currentUser))
    //        : localStorage.setItem("flame", JSON.stringify(currentUser))
    //},[currentUser.flameBlocking]);

    const handleTFClaimRequest = async () => {
        const request = {
            userId: currentUser._id,
            tfClaimReqor: true,
            tfClaimReqee: true,
        }
        try {
            await axiosReq("PUT", `/users/${user._id}/tfClaim`, request)
            //    dispatch(flameBlock(user?._id));
        } catch(err) {
            console.log(err);
        }
        //setFlameBlocked(!flameBlocked);
    };

    return ReactDom.createPortal(
        <div className={`tfConPosPopupPortal`}>
            <div className={`tfConPosPopupBackdropOverlay POPUP_BACKGROUND HIGHER_BACKGROUND ${colorTheme(user)}`} />
            <div className="tfConPosPopupModal">
                <div className="tfConPosPopup">
                    <div className="tfConPosPopupContainer">
                        <div className="tfConPosPopupTop">
                            <div className="tfConPosPopupDisclaimer">
                                <div className="tfConPosPopupDisclaimerHeader">
                                    <div className="tfConPosPopupDisclaimerHeaderTextBox">
                                        <span className={`tfcppdWait ${colorTheme(user)}`}>Wait! Hold On!</span>
                                        <span className="tfcppdquestion" >
                                            <span>Are you sure this user is your </span> 
                                            <span className="tfcppdTwin">twin </span>
                                            <span className="tfcppdFlame">flame</span>
                                            <span>?</span>
                                        </span>
                                        <span className="tfcppdStatementTitle">
                                            <span>
                                                Claiming someone as your
                                            </span>
                                            <span className="tfcppdTwin"> twin </span>
                                            <span className="tfcppdFlame">flame </span>
                                            <span> 
                                                is a <b>SERIOUS MATTER</b>!
                                            </span>
                                        </span>
                                        <span className="tfcppdStatementParagraph">
                                            <span>Everyone has many soul mates of sorts but only one </span>
                                            <span className="tfcppdTwin">twin </span>
                                            <span className="tfcppdFlame">flame</span>
                                            <span>.</span>
                                        </span>
                                    </div>
                                    <div className="tfConPosPopupDisclaimerHeaderIcon">
                                        <i className="tfcppdIcon PNG_ICON_STOP"/>
                                    </div>
                                </div>
                                <span className="tfcppdStatementParagraph">
                                    Twin soul connections are <b>extremely rare</b>! The universe 
                                    only allows them to incarnate together and meet in a single lifetime
                                    once their souls have undergone many many lifetimes full of lessons and have 
                                    reached a level of maturity for their souls to move one to the next phase 
                                    of being. This connection requires both souls to complete all lifetime lessons and clear 
                                    up all karmic dept before they can come together into full union of harmonic bliss for eternity.
                                </span>
                                <span className="tfcppdStatementParagraph">
                                    Once twin souls have merged into union, it is time for them to carry on a special mission of 
                                    spiritual work to help uplift humanity and the planet as a whole into higher dimensions and frequencies of existance.
                                    This mission work is to be their focus for the rest of their lifes as well as the rest of their soul 
                                    time here on Mother Earth, Gaia.
                                </span>
                                <span className="tfcppdStatementParagraph">
                                    Twin soul connections are <b>NOT</b> easy! They are very tumultuous, chaotic, and difficult to endure in the beginning, 
                                    sometimes for many years. They are <b>NOT</b> for the faint of heart! Also, a high level of spiritual maturaty 
                                    is required for a meeting to happen.
                                </span>
                                <span className="tfcppdStatementParagraph">
                                    <span>Your</span>
                                    <span className="tfcppdTwin"> twin </span>
                                    <span className="tfcppdFlame">flame </span> 
                                    <span>
                                        is someone you feel deep in your soul! Your meeting happens when you least expect it 
                                        and are truly happy being alone on your own. The meeting is usually accompanied 
                                        with spiritual phenonema and synchronicities that cannot be easily explained.
                                    </span>
                                </span>
                                <span className="tfcppdStatementParagraph">
                                    <span>
                                        If you are lonely, wanting and hoping for a relationship or feel a lustful attraction, this 
                                        is probably <b>NOT</b> your
                                    </span> 
                                    <span className="tfcppdTwin"> twin </span>
                                    <span className="tfcppdFlame">flame</span> 
                                    <span>
                                        . This maybe a soul mate or a karmic entanglement. A
                                    </span>
                                    <span className="tfcppdTwin"> twin </span>
                                    <span className="tfcppdFlame">flame </span>
                                    <span>  
                                        is someone you feel to the very core of your being, both good and bad.
                                    </span>
                                </span>
                                <span className="tfcppdStatementParagraph">
                                    <span className="tfcppdWarning">Warning! </span>
                                    <span>
                                        Prematurely claiming this user as your 
                                    </span>
                                    <span className="tfcppdTwin"> twin </span>
                                    <span className="tfcppdFlame">flame </span> 
                                    <span>
                                        could have <b>negative consequences</b>! Even if this user is your actual
                                    </span>
                                    <span className="tfcppdTwin"> twin </span>
                                    <span className="tfcppdFlame">flame </span> 
                                    <span>
                                        , they may not be fully ready to accept it 
                                        and/or welcome it into their lives just yet. That especially holds true as for the 
                                        connection being out in the open on a public social forum such as here on
                                    </span>
                                    <span className="tfcppdTwin"> <b> Connect</b></span>
                                    <span className="tfcppdFlame"><b>TF</b></span>
                                    <span>
                                        . It is probably best to wait before confirming your request after the two of you are 
                                        contact with each other, agree on your connection, and are ready to start your missionary work. 
                                        Prematurely claiming them as your
                                    </span> 
                                    <span className="tfcppdTwin"> twin </span>
                                    <span className="tfcppdFlame">flame </span> 
                                    <span>
                                        could possibly lead to this user <b>rejecting you</b>, <b>blocking you</b>, 
                                        and possibly further <b>prolonging seperation</b>. 
                                    </span> 
                                </span>
                                <span className="tfcppdStatementParagraph">
                                    <b>Before you confirm your request, We strongly advise that you first discuss this with your beloved before bringing 
                                    your connection out in to the open on this forum. Your actions carry responsibility as you will be
                                    expected to set a positive example for other users on this platform.</b> 
                                </span>                
                            </div>
                        </div>
                        <div className="tfConPosPopupBottom">
                            <button 
                                className={`tfConPosPopupButton cancel ${colorTheme(user)}`} 
                            >
                                <span onClick={() => dispatch(tfcpClose())}>
                                    Cancel
                                </span>
                            </button>
                            <button 
                                className="tfConPosPopupButton confirm gold" 
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

export default TFConfirmPositivePopup;