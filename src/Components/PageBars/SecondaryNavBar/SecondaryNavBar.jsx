import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { colorTheme } from '../../../Utils/styling/colorTheme';
import "./SecondaryNavBar.css";
import { menuIcon } from '../../../Lib/mui/icons';


function SecondaryNavBar({ prompt }) {

    const { user, screen } = useSelector((state) => state.auth);

    const [ title, setTitle ] = useState("");

    useEffect(() => {
        const prompt2Title = () => {
            if(prompt) {
                switch(prompt) {
                    case "about":
                        setTitle(<>About<b className="hbt masculine">{" C"}</b><b className="hbt feminine">TF</b></>);
                        break;
                    case "ad":
                        setTitle("Advertising");
                        break;
                    case "pp":
                        setTitle("Privacy Policy")
                        break;
                    case "tou":
                        setTitle("Terms of Use")
                        break;
                    case "wiki":
                        setTitle(<><b className="inheritParentFont hbt masculine">C</b><b className="inheritParentFont hbt feminine">TF</b>Wiki</>);
                        break;
                    default:
                        setTitle(<><b className="hbt masculine">C</b><b className="hbt feminine">TF</b></>);
                } 
            }
        }
        prompt2Title();
    }, [prompt]);

    return (
       
                <>    
                    <div 
                        className={`
                            secondaryNavBarBorder 
                            cp-bgc-brt
                            static
                            gray
                            //${colorTheme(user)}
                        `} 
                    >
                        <div className={`secondaryNavBar ${screen}`}>
                            <div className="secondaryNavBarContainer">
                                <div className="secondaryNavBarMenu" >
                                    <div className={`secondaryNavBarMenuIcon full ${screen}`}>{menuIcon}</div>
                                </div>
                                <span className={`secondaryNavBarTitle full ${screen}`}>
                                    {title} 
                                </span>
                                <Link to="/" className="secondaryNavBarLogoLink logo1 secondary PNG_LOGO_TWO" /> 
                                <Link to="/" className="secondaryNavBarLogoLink logo2 secondary PNG_LOGO_THREE" />
                            </div>
                        </div>
                    </div>
                </>
    
    )
}

export default SecondaryNavBar;