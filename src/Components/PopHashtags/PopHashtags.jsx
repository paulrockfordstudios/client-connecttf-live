import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import "./PopHashtags.css";

function PopHashtags() {

    const { user: currentUser } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();

    return (
        <>
            {currentUser.unionName ?
                (
                    <>
                        <div className="popHashtagsContainer" style={{height: `${height}px`}}>
                            <div 
                                className={`
                                    popHashtagsBackgroundTheme
                                    HIGHER_BACKGROUND 
                                    ${currentUser.spectrum}
                                `} 
                                style={{height: `${height}px`}} 
                            />
                            <div className={`popHashtags union BOX_SHADOW ${currentUser.spectrum}`}
                                
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
                                <div className="popHashtags-container">
                                    <h4 className="popHashtagsTitle">Most Popular Hashtags</h4>
                                    <ul className="popHashtagsList">
                                        <li className="popHashtag">
                                            #twiflame
                                        </li>
                                        <li className="popHashtag">
                                            #unconditional
                                        </li>
                                        <li className="popHashtag">
                                            #runner
                                        </li>
                                        <li className="popHashtag">
                                            #chaser
                                        </li>
                                        <li className="popHashtag">
                                            #mission
                                        </li>
                                        <li className="popHashtag">
                                            #love
                                        </li>
                                    </ul>
                                </div>     
                            </div> 
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`popHashtags flame BOX_SHADOW ${currentUser.energy}`}>
                            <div className="popHashtags-container">
                                <h4 className="popHashtagsTitle">Most Popular Hashtags</h4>
                                <ul className="popHashtagsList">
                                    <li className="popHashtag">
                                        #twiflame
                                    </li>
                                    <li className="popHashtag">
                                        #unconditional
                                    </li>
                                    <li className="popHashtag">
                                        #runner
                                    </li>
                                    <li className="popHashtag">
                                        #chaser
                                    </li>
                                    <li className="popHashtag">
                                        #mission
                                    </li>
                                    <li className="popHashtag">
                                        #love
                                    </li>
                                </ul>
                            </div>     
                        </div> 
                    </>
                )
            }
        </>
    )
};

export default PopHashtags;