import React from "react";
import "../SecondaryMenubars.css";



function CTFWikiMBLeft() {

  return (
    <div className="secondaryMenuBar">
        <div className='smb-topicDropdownMenu tier1'>
            <button className='smb-topicDropdownMenuBtn inheritParentFont tier1'>Energy</button>
            <div className="smb-topicDropdownMenuDD tier1"></div>
        </div>
        <div className='smb-topicDropdownMenu tier1'>
            <button className='smb-topicDropdownMenuBtn tier1'>Charge</button>
            <div className="smb-topicDropdownMenuDD tier1"></div>
        </div>
        <div className='smb-topicDropdownMenu tier1'>
            <button className='smb-topicDropdownMenuBtn tier1'>Spectrum</button>
            <div className="smb-topicDropdownMenuDD tier1"></div>
        </div>

    </div>
  )
}

export default CTFWikiMBLeft;