import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';
import "./EditChannel.css";


function EditChannel() {

    
    const { user: currentUser } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();
    
    return (
        <div className="editChannel">
            <div className="editChannel-container">
                <div className="editChannelAd">
                    <AdSecondary />
                </div>
                <div className="editChannelRight">
                    {currentUser.unionName ?
                        (
                            <>
                                <div className="editChannelDisplayContainer" >
                                    {currentUser.spectrum === "rainbow" && <div className={`editChannelDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/rainbow-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "silver" && <div className={`editChannelDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/silver-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "gold" && <div className={`editChannelDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/gold-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "platinum" && <div className={`editChannelDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/platinum-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    {currentUser.spectrum === "diamond" && <div className={`editChannelDisplayBackgroundTheme ${currentUser.spectrum}`} style={{backgroundImage: "url(/misc/diamond-background.jpg)", backgroundSize: "100%", backgroundRepeat: "repeat", height: `${height}px`}} />}
                                    <div className={`editChannelDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} 
                                        
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
                                        {/*editChannel*/}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`editChannelDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                     {/*editChannel*/}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div> 
    )
};

export default  EditChannel;