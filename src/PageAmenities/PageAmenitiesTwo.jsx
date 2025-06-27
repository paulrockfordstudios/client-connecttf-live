import React from 'react';
import { Outlet } from "react-router-dom";
import ConversationBar from '../Components/PageBars/ConversationBar/ConversationBar';
import MessageBar from '../Components/PageBars/MessageBar/MessageBar';


function PageAmenitiesTwo() {

  return (
    <>
        <div className="div-1-2">
            <ConversationBar />
        </div> 
        <div className="div-1-2">
            <MessageBar />
        </div>
        <Outlet /> 
    </>
  )
}

export default PageAmenitiesTwo;