import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AdSecondary from '../../../Components/AdSpace/AdSecondary/AdSecondary';
import "./Blogs.css";


function Blogs() {

    
    const { user: currentUser } = useSelector((state) => state.auth);

    const [ height, setHeight ] = useState();
    
    return (
        <div className="blogs">
            <div className="blogs-container">
                <div className="blogsAd">
                    <AdSecondary />
                </div>
                <div className="blogsRight">
                    {currentUser.unionName ?
                        (
                            <>
                                <div className="blogsDisplayContainer" >
                                    <div 
                                        className={`
                                            blogsDisplayBackgroundTheme
                                            HIGHER_BACKGROUND
                                            ${currentUser.spectrum}
                                        `} 
                                        style={{height: `${height}px`}} 
                                    />
                                    <div className={`blogsDisplay-container union BOX_SHADOW ${currentUser.spectrum}`} 
                                        
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
                                        {/*<BlogFeed />*/}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`blogsDisplay-container flame BOX_SHADOW ${currentUser.energy}`}>
                                     {/*<BlogFeed />*/}
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div> 
    )
};

export default  Blogs;