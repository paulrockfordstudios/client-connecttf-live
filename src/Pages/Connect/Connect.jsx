import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useScrollLock } from '../../Utils/crHooks/useScrollLock';
import ConnectList from '../../Components/ConnectList/ConnectList';
import AdSecondary from '../../Components/AdSpace/AdSecondary/AdSecondary';
import FollowButtonsPopup from '../../Components/Popups/FollowButtonsPopup/FollowButtonsPopup';
import TFConfirmPositivePopup from '../../Components/Popups/TwinFlamePopups/TFConfirmationPopups/TFConfirmPositivePopup/TFConfirmPositivePopup';
import "./Connect.css";


function Connect() {

    const { user: currentUser, fBOptions, tfcPos } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();

    const { lockScroll, unlockScroll } = useScrollLock();

    useEffect(() => {
        return fBOptions || tfcPos ? lockScroll() : unlockScroll();
    }, [fBOptions]);
    

    return (
        <div className="connect">
            <div className="connect-container">
                <div className="connectAd">
                    <AdSecondary />
                </div>
                <div className="connectRight">
                    {currentUser.unionName ?
                        (
                            <>
                                <div className="connectDisplayContainer" >
                                    <div 
                                        className={`
                                            connectDisplayBackgroundTheme
                                            HIGHER_BACKGROUND 
                                            ${currentUser.spectrum}
                                        `} 
                                        style={{height: `${height}px`}} 
                                    />
                                    <div className={`connectDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} 
                                        
                                        ref={el => {
                                            if (!el) return;
                                            let prevValue = JSON.stringify(el.getBoundingClientRect());
                                            const handle = setInterval(() => {
                                            let nextValue = JSON.stringify(el.getBoundingClientRect());
                                            if (nextValue === prevValue) {
                                                clearInterval(handle);
                                                setHeight(el.getBoundingClientRect().height)
                                            } else {
                                                prevValue = nextValue;
                                            }
                                            }, 1000);
                                        }} 
                                        
                                    >
                                        <ConnectList />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`connectDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                    <ConnectList />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
            {fBOptions && <FollowButtonsPopup user={user}/>}
            {tfcPos && <TFConfirmPositivePopup/>}
        </div> 
    )
};

export default Connect;