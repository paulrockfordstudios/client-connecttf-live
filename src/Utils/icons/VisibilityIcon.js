import React from 'react';
import { 
    arrowBackIcon, 
    arrowForwardIcon, 
    categoryIcon, 
    peopleAltIcon, 
    peopleIcon, 
    personIcon, 
    publicIcon, 
    visOutlinedIcon 
} from "../../Lib/mui/icons";



function VisibilityIcon({ visible, primary, secondary}) {

    

    function getVisibilityIcon() {
        if(visible) {
            let icon;
                switch (visible) {
                    case "Public":
                        icon = <div className={primary}>{publicIcon}</div>;
                        break;
                    case "Friends":
                        icon = <div className={primary}>{peopleIcon}</div>;
                        break;
                    case "Befrienders":
                        icon = <>
                                <div className={primary}>{peopleIcon}</div>
                                <div className={secondary}>{arrowBackIcon}</div>
                               </>;
                        break;
                    case "Befriending":
                        icon = <>
                                <div className={primary}>{peopleIcon}</div>
                                <div className={secondary}>{arrowForwardIcon}</div>
                               </>;
                        break;
                    case "Unions":
                        icon = <>
                                <div className={primary}>{peopleAltIcon}</div>
                                <div className={secondary}>{publicIcon}</div>
                               </>;
                        break;
                    case "Union Friends":
                        icon = <>
                                <div className={primary}>{peopleAltIcon}</div>
                                <div className={secondary}>{peopleIcon}</div>
                               </>;
                        break;
                    case "Union Befrienders":
                        icon = <>
                                <div className={primary}>{peopleAltIcon}</div>
                                <div className={secondary}>{arrowBackIcon}</div>
                               </>;
                        break;
                    case "Unions Befriending":
                        icon = <>
                                <div className={primary}>{peopleAltIcon}</div>
                                <div className={secondary}>{arrowForwardIcon}</div>
                               </>;
                        break;
                    case "Flames":
                        icon = <>
                                <div className={primary}>{personIcon}</div>
                                <div className={secondary}>{publicIcon}</div>
                               </>;
                        break;
                    case "Flame Friends":
                        icon = <>
                                <div className={primary}>{personIcon}</div>
                                <div className={secondary}>{peopleIcon}</div>
                               </>;
                        break;
                    case "Flame Befrienders":
                        icon = <>
                                <div className={primary}>{personIcon}</div>
                                <div className={secondary}>{arrowBackIcon}</div>
                               </>;
                        break;
                    case "Flames Befriending":
                        icon = <>
                                <div className={primary}>{personIcon}</div>
                                <div className={secondary}>{arrowForwardIcon}</div>
                               </>;
                        break;
                    case "Custom":
                        icon = <div className={primary}>{categoryIcon}</div>;
                        break;
                    case "Only You":
                        icon = <div className={primary}>{visOutlinedIcon}</div>;
                        break;
                    default:
                        icon = <div className={primary}>{publicIcon}</div>;
            }
            return icon;
        }
    };
    return (
        <> 
            {getVisibilityIcon()}
        </>
    )
};

export default VisibilityIcon;