import React from 'react';
import "./CTFWiki.css";
import SecondaryNavBar from '../../Components/PageBars/SecondaryNavBar/SecondaryNavBar';
import CTFWikiMBLeft from '../../Components/PageBars/SecondaryMenuBars/ctfWikiMenuBars/ctfWikiMBLeft'



function CTFWiki() {

    return (
        
            
            <div className="secondaryBackground">
                <SecondaryNavBar prompt={"wiki"} />
                <div className="SecondaryLeftMenuBar justAlignCenter">
                    <CTFWikiMBLeft />
                </div>
                <div className="SecondaryFeedBar justAlignCenter"></div>
                <div className="SecondaryRightMenuBar justAlignCenter"></div>
            </div>
       
    )
};

export default CTFWiki;