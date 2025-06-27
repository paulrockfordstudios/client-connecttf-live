import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import AdSecondary from '../../Components/AdSpace/AdSecondary/AdSecondary';
import "./Popular.css";


function Popular() {

    
    const { user: currentUser } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();
    
    return (
        <div className="popular">
            <div className="popular-container">
                <div className="popularAd">
                    <AdSecondary />
                </div>
                <div className="popularRight">
                    {currentUser.unionName ?
                        (
                            <>
                                <div className="popularDisplayContainer" >
                                    {currentUser.spectrum === "rainbow" && <div className={`popularDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "silver" && <div className={`popularDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "gold" && <div className={`popularDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "platinum" && <div className={`popularDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "diamond" && <div className={`popularDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    <div className={`popularDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} 
                                        
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
                                        {/*popular*/}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`popularDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                     {/*popular*/}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div> 
    )
};

export default  Popular;