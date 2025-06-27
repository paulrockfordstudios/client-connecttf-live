import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';
import "./EditCoach.css";


function EditCoach() {

    
    const { user: currentUser } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();
    
    return (
        <div className="editCoach">
            <div className="editCoach-container">
                <div className="editCoachAd">
                    <AdSecondary />
                </div>
                <div className="editCoachRight">
                    {currentUser.unionName ?
                        (
                            <>
                                <div className="editCoachDisplayContainer" >
                                    {currentUser.spectrum === "rainbow" && <div className={`editCoachDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "silver" && <div className={`editCoachDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "gold" && <div className={`editCoachDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "platinum" && <div className={`editCoachDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "diamond" && <div className={`editCoachDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    <div className={`editCoachDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} 
                                        
                                        ref={el => {
                                            if (!el) return;
                                            /*console.log("initial height", el.getBoundingClientRect().height);*/
                                            let prevValue = JSON.stringify(el.getBoundingClientRect());
                                            const start = Date.now();
                                            const handle = setInterval(() => {
                                            let nextValue = JSON.stringify(el.getBoundingClientRect());
                                            if (nextValue === prevValue) {
                                                clearInterval(handle);
                                                /*console.log(
                                                `height stopped changing in ${Date.now() - start}ms. final height:`,
                                                el.getBoundingClientRect().height
                                                );*/
                                                setHeight(el.getBoundingClientRect().height)
                                            } else {
                                                prevValue = nextValue;
                                            }
                                            }, 1000);
                                        }} 
                                        
                                    >
                                        {/*editCoach*/}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`editCoachDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                     {/*editCoach*/}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div> 
    )
};

export default  EditCoach;