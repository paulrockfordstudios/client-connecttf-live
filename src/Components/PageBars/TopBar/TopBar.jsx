import React, {memo} from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import AccMenuDropdown from '../../Dropdowns/TopbarDropdowns/AccMenuDropdown/AccMenuDropdown';
import "./TopBar.css";
import ChatDropdown from '../../Dropdowns/TopbarDropdowns/ChatDropdown/ChatDropdown';
import FriendRequestsDropdown from '../../Dropdowns/TopbarDropdowns/FriendRequestsDropdown/FriendRequestsDropdown';
import NotificationsDropdown from '../../Dropdowns/TopbarDropdowns/NotificationsDropdown/NotificationsDropdown';
import Searchbar from '../../Searchbar/Searchbar';
import TFDropdown from '../../Dropdowns/TopbarDropdowns/TFDropdown/TFDropdown';
import GroupsDropdown from '../../Dropdowns/TopbarDropdowns/GroupsDropdown/GroupsDropdown';
import LightPracticeDropdown from '../../Dropdowns/TopbarDropdowns/LightPracticeDropdown/LightPracticeDropdown';
import { colorTheme } from '../../../Utils/styling/colorTheme';
import NVAvatarBtn from '../../NVAvatarBtn/NVAvatarBtn';
import NVNotBtn from '../../NVNotBtn/NVNotBtn';



function TopBar() {

    const { user, screenMode, cp } = useSelector((state) => state.auth);
    

    return (
        <>
            {user && cp &&
                <>    
                    <div className={`topBar cp-bgc ${cp?.screen}`}>
                            <div className="topbar-container">
                                <div className="topbar-left-container">
                                    <Searchbar />
                                </div>
                                <div className="topbar-center-container">
                                    <Link to="/" className="topbarLogoLink PNG_LOGO_TWO" />
                                </div>
                                <div className="topbar-right-container">
                                    <div className="topbarIcons">
                                        <NVNotBtn cp={cp} type={"bell"}/>
                                        <FriendRequestsDropdown />
                                        {/*user.groupsAdmin && user.groupsAdmin.length > 0 && <GroupsDropdown />*/}
                                        {/*<GroupsDropdown />*/}
                                        
                                        {user.tfId?.length > 0 && <TFDropdown />}
                                        {/*<TFDropdown />*/}
                                        <ChatDropdown/> 
                                        {/*user.ltPractAdmin && user.ltPractAdmin.length > 0 && <LightPracticeDropdown />*/}
                                        {/*<LightPracticeDropdown />*/}   
                                        <NotificationsDropdown />
                                        <AccMenuDropdown />
                                        {/*<NVAvatarBtn />*/}
                                    </div>
                                    {/*
                                    <div className="topbar-right-right">
                                        <AccMenuDropdown />
                                    </div>
                                    */}
                                </div>
                            </div>
                            <div className={`topbarBorder cp-bg-${cp?.higherSpectrum ? "gi-ho" : "cs"} saturated static ${cp?.color}`}/>
                    </div>
                </>
            }
        </>
    )
};

export default memo(TopBar);