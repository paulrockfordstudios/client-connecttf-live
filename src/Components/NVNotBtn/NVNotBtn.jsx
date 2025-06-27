import React, { useEffect, useState } from 'react';
import "./NVNotBtn.css";


function NVNotBtn({cp, type}) {

    //const { colorPalette, select, type } = props;
    
    console.log(screen)

    const [ btnIcon, setBtnIcon ] = useState(null);
    const [ hovered, setHovered ] = useState(false);
    const [ active, setActive ] = useState(false);
    const [ selected, setSelected ] = useState(false);

    useEffect(() => {
        switch(type) {
            case "bell":
                setBtnIcon(`LB_${hovered ? active ? "DRK" : "WHT" : ""}`);
                break;
            case "chat":
                setBtnIcon(`CHAT${active ? "_DRK" : ""}`);
                break;
            case "follow":
                setBtnIcon(`FRIENDS${active ? "_DRK" : ""}`);
                break;
            case "groups":
                setBtnIcon(`GROUPS`);
                break;
            case "practice":
                setBtnIcon(`TORCH`);
                break;
            case "twin":
                setBtnIcon(<i />);
                break;
            default:
                setBtnIcon(null);
        }
    }, []);

    return (
        <div className={`nvNotBtn BASE ${cp?.screen === "dark" ? "cp-bs outer white" : ""}`}>
            {cp?.higherSpectrum && 
                <div className={`nvNotBtn ANNEX cp-bg-gi-ho saturated static ${selected ? "" : "BS-HS"} ${cp?.color}Alt`}>
                    {selected && <div className={`nvNotBtn cp-bs ho-fade ${cp?.screen}`}/>}
                </div>
            }
            <div className={`nvNotBtn ANNEX cp-bs ${selected ? "inner" : "outer"} ${cp?.screen} ${cp?.color}`}>
                <div className={`nvNotBtn ${selected ? "" : `cp-bg-cs element ${cp?.screen}`}`}>
                    <div className={`nvNotBtn nvNotIconContainer cp-bg-${cp?.higherSpectrum ? "gi-ho" : "cs"} pastel ${selected ? "static" : "dynamic hov act"} ${cp?.screen} ${cp?.color}`}>
                        <i className={`nvNotBtnIcon ${type} PNG_ICON_${btnIcon} ${cp?.color}`} alt={`bell-notifications-${cp?.color}`}/>
                    </div>
                </div>
            </div>
            <div className={`nvNotBtnBadge`}></div>
        </div>
    )
}

export default NVNotBtn;