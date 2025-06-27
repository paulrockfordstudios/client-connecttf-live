import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';
import "./CreateChannel.css";


function CreateChannel() {

    
    const { user: currentUser } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();
    
    return (
        <div className="createChannel">
            <div className="createChannel-container">
                <div className="createChannelAd">
                    <AdSecondary />
                </div>
                <div className="createChannelRight">
                    {currentUser.unionName ?
                        (
                            <>
                                <div className="createChannelDisplayContainer" >
                                    {currentUser.spectrum === "rainbow" && <div className={`createChannelDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "silver" && <div className={`createChannelDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "gold" && <div className={`createChannelDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "platinum" && <div className={`createChannelDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "diamond" && <div className={`createChannelDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    <div className={`createChannelDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} 
                                        
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
                                        {/*createChannel*/}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`createChannelDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                     {/*createChannel*/}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div> 
    )
};

export default  CreateChannel;