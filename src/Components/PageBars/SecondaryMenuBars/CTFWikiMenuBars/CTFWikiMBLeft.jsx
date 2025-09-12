import React, { useState } from "react";
import "../SecondaryMenubars.css";



function CTFWikiMBLeft() {

    const [ t1Open, setT1Open ] = useState(false);
    const [ t2Open, setT2Open ] = useState(false);

    const spectrumsLO = ["Ruby", "Orange", "Sun", "Emerald", "Blue", "Indigo", "Violet"];
    const spectrumsHO = ["Rainbow", "Silver", "Gold", "Platinum", "Diamond"];

    const t1ClickHandler = (target) => {
        if (t1Open === target) {
            setT1Open("")
        } else {
            setT1Open(target)
        }
    };

    const t2ClickHandler = (target) => {
        if (t2Open === target) {
            setT2Open("")
        } else {
            setT2Open(target)
        }
    };

    const menuHandler = (target) => {
    };

    return (
        <div className="secondaryMenuBar">

            <div className='smb-topicDropdownMenu tier1'>
                <button 
                    className='smb-topicDropdownMenuBtn tier1'
                    onClick={() => t1ClickHandler("Energy")}
                >
                    Energy
                </button>
                <div className="smb-topicDropdownMenuDD tier1"></div>
            </div>

            <div className='smb-topicDropdownMenu tier1'>
                <button 
                    className='smb-topicDropdownMenuBtn tier1'
                    onClick={() => t1ClickHandler("Charge")}
                >
                    Charge
                </button>
                <div className="smb-topicDropdownMenuDD tier1"></div>
            </div>

            <div className='smb-topicDropdownMenu tier1'>
                <button 
                    className='smb-topicDropdownMenuBtn tier1'
                    onClick={() => t1ClickHandler("spectrum")}
                >
                    Spectrum
                </button>
                <div className="smb-topicDropdownMenuDD tier1">

                    <button 
                        className='smb-topicDropdownMenuItemBtn tier2'
                        onClick={() => menuHandler("Overview")}
                    >
                        Overview
                    </button>

                    <div className="smb-topicDropdownMenu tier2">
                        <button 
                            className='smb-topicDropdownMenuBtn tier2'
                            onClick={() => t2ClickHandler("Lower Order Spectrums")}
                        >
                            Lower Order Spectrums
                        </button>
                        <div className="smb-topicDropdownMenuDD tier2">
                            {spectrumsLO.map((item) => (
                                <button
                                    key={item} 
                                    className='smb-topicDropdownMenuItemBtn tier3'
                                    onClick={() => menuHandler(item)}
                                >
                                    {item}
                                </button> 
                            ))}
                        </div>
                    </div>

                    <div className="smb-topicDropdownMenu tier2">
                        <button 
                            className='smb-topicDropdownMenuItemBtn tier2'
                            onClick={() => t2ClickHandler("Higher Order Spectrums")}
                        >
                            Higher Order Spectrums
                        </button>
                        <div className="smb-topicDropdownMenuDD tier2">
                            {spectrumsHO.map((item) => (
                                <button
                                    key={item} 
                                    className='smb-topicDropdownMenuItemBtn tier3'
                                    onClick={() => menuHandler(item)}
                                >
                                    {item}
                                </button> 
                            ))}
                        </div>
                    </div>
                        
                </div>
            </div>

        </div>
    )
}

export default CTFWikiMBLeft;