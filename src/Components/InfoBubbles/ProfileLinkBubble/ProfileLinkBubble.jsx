import React, { useEffect, useState } from 'react';
import { axiosReq } from '../../../Utils/axiosConfig';
import "./ProfileLinkBubble.css";
import { colorTheme } from '../../../Utils/styling/colorTheme';


function ProfileLinkBubble({ user, type, display }) {

    const color = colorTheme(user);

    const [ devFem, setDevFem ] = useState();
    const [ devMasc, setDevMasc ] = useState();

    useEffect(() => {
        if(user.unionName) {
            const getDevInfo = async () => {
                const femRes = await axiosReq("GET", `/users?userId=${user.feminineId}`);
                setDevFem(femRes.data);
                const mascRes = await axiosReq("GET", `/users?userId=${user.masculineId}`);
                setDevMasc(mascRes.data);
            }
            getDevInfo();
        }
    }, [user]);


    return (
        <>
            {user.unionName ?
                (
                    <>
                        {devFem && devMasc ?
                            (
                                <>
                                    {
                                        devFem.energy || 
                                        devFem.spectrum || 
                                        devFem.charge || 
                                        devFem.sex || 
                                        devFem.orientation || 
                                        devFem.sunSign || 
                                        devFem.compass ||
                                        devMasc.energy || 
                                        devMasc.spectrum || 
                                        devMasc.charge || 
                                        devMasc.sex || 
                                        devMasc.orientation || 
                                        devMasc.sunSign || 
                                        devMasc.compass ?
                                            ( 
                                                <div 
                                                    className={`
                                                        profileLinkBubble
                                                        ${type} 
                                                        ${display}
                                                        ${color === "diamond" && "HIGHER_BACKGROUND lgt"}
                                                        ${color}
                                                    `} 
                                                >
                                                    <div className="profileLinkBubbleLeft">
                                                        <span className={`profileLinkBubbleInfo ${devFem.energy} ${type}`}>DF:</span>
                                                        {devFem.energy && <i className={`profileLinkBubbleSpiritIcon ${type} union energy PNG_ICON_ENERGY ${devFem.energy}`} alt="energy-Icon"/>}
                                                        {devFem.charge && <i className={`profileLinkBubbleSpiritIcon ${type} union charge PNG_ICON_CHARGE ${devFem.charge}`} alt="charge-Icon"/>}                                                       
                                                        {devFem.sex && <i className={`profileLinkBubbleSpiritIcon ${type} union sex PNG_ICON_SEX ${devFem.sex}`} alt="sex-Icon"/>} 
                                                        {devFem.orientation && devFem.sex && <i className={`profileLinkBubbleSpiritIcon ${type} union orientation PNG_ICON_ORIENTATION ${devFem.sex} ${devFem.orientation}`} alt="orientation-icon"/>}
                                                        {devFem.sunSign && <i className={`profileLinkBubbleSpiritIcon ${type} union sunSign PNG_ICON_ZODIAC ${devFem.sunSign}`} alt="zodiac-Icon"/>} 
                                                        {devFem.compass && <i className={`profileLinkBubbleSpiritIcon ${type} union compass PNG_ICON_COMPASS ${devFem.compass}`} alt="compass-Icon"/>} 
                                                    </div>
                                                    <div className="profileLinkBubbleRight">
                                                        <span className={`profileLinkBubbleInfo ${devMasc.energy} ${type}`}>DM:</span>
                                                        {devMasc.energy && <i className={`profileLinkBubbleSpiritIcon ${type} union energy PNG_ICON_ENERGY ${devMasc.energy}`} alt="energy-Icon"/>}
                                                        {devMasc.charge && <i className={`profileLinkBubbleSpiritIcon ${type} union charge PNG_ICON_CHARGE ${devMasc.charge}`} alt="charge-Icon"/>}                                                       
                                                        {devMasc.sex && <i className={`profileLinkBubbleSpiritIcon ${type} union sex PNG_ICON_SEX ${devMasc.sex}`} alt="sex-Icon"/>} 
                                                        {devMasc.orientation && devMasc.sex && <i className={`profileLinkBubbleSpiritIcon ${type} union orientation PNG_ICON_ORIENTATION ${devMasc.sex} ${devMasc.orientation}`} alt="orientation-icon"/>}
                                                        {devMasc.sunSign && <i className={`profileLinkBubbleSpiritIcon ${type} union sunSign PNG_ICON_ZODIAC ${devMasc.sunSign}`} alt="zodiac-Icon"/>} 
                                                        {devMasc.compass && <i className={`profileLinkBubbleSpiritIcon ${type} union compass PNG_ICON_COMPASS ${devMasc.compass}`} alt="compass-Icon"/>} 
                                                    </div>
                                                </div>
                                            ) : ( <></> )
                                    }
                                </>
                            ) : ( <></> )
                        }
                    </>
                ) : (
                    <>
                        {
                            user.energy || 
                            user.spectrum || 
                            user.charge || 
                            user.sex || 
                            user.orientation || 
                            user.sunSign || 
                            user.compass ?
                                (
                                    <div 
                                        className={`
                                            profileLinkBubble 
                                            ${type} 
                                            ${display}
                                            ${color}
                                        `}
                                    >
                                        {user.energy && <i className={`profileLinkBubbleSpiritIcon ${type} flame energy PNG_ICON_ENERGY ${user.energy}`} alt="energy-Icon"/>}
                                        {user.charge && <i className={`profileLinkBubbleSpiritIcon ${type} flame charge PNG_ICON_CHARGE ${user.charge}`} alt="charge-Icon"/>}                                                       
                                        {user.sex && <i className={`profileLinkBubbleSpiritIcon ${type} flame sex PNG_ICON_SEX ${user.sex}`} alt="sex-Icon"/>} 
                                        {user.orientation && user.sex && <i className={`profileLinkBubbleSpiritIcon ${type} flame orientation PNG_ICON_ORIENTATION ${user.sex} ${user.orientation}`} alt="orientation-icon"/>}
                                        {user.sunSign && <i className={`profileLinkBubbleSpiritIcon ${type} flame sunSign PNG_ICON_ZODIAC ${user.sunSign}`} alt="zodiac-Icon"/>} 
                                        {user.compass && <i className={`profileLinkBubbleSpiritIcon ${type} flame compass PNG_ICON_COMPASS ${user.compass}`} alt="compass-Icon"/>} 
                                    </div>
                                ) : ( <></> )
                        }
                    </>
                )
            }
        </>
    )
}

export default ProfileLinkBubble;