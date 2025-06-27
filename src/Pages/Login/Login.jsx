import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Trans, useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import "./Login.css";
import Footer from '../../Layout/Auxiliary/Footer/Footer';
import Disclaimer from '../../Components/Auxiliary/Disclaimer/Disclaimer';
import Greeting from '../../Components/Auxiliary/Greeting/Greeting';
import Gateway from '../../Modules/Gateway/Gateway';
import useWindowSize from '../../Utils/crHooks/useWindowSize';


function Login({blacklist, suspension}) {

    const {t} = useTranslation(['auxiliary']);

    const dispatch = useDispatch();

    const { width, height } = useWindowSize()

    const { screen, fontSize } = useSelector((state) => state.auth);

    const [currentColorIndex, setCurrentColorIndex] = useState(0);

    const colors = [`${screen === "light" ? "black" : "white"}`, "#4a76fd", "#e639af"];

    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
        }, 1000);
    
        return () => clearInterval(timer);
    }, [colors, 1000]);
    
    const textColor = colors[currentColorIndex];

    
/*
    useEffect(() => {
        if (!blacklist) return;
        dispatch(blOpen())
    }, [blacklist]);

    useEffect(() => {
        if (!suspension) return;
        dispatch(susOpen())
    }, [suspension]);
*/

   
    return (
        <>
            <div className="login">
                <div className={`login-container ${fontSize === "32px" ? "xlFont" : ""}`}>
                    <div className="loginDisplayContainer">
                        <Greeting/>
                        <Gateway/>
                        {width < 600 && 
                            <div className="loginDisclaimerBtn" style={{ color: textColor }}>
                                {`*** DISCLAIMER (Click to Read) ***`}
                            </div>
                        }
                    </div>
                    {width > 600 && width < 800 || fontSize === "32px" && 
                        <div className="loginDisclaimerBtn" style={{ color: textColor }}>
                            {`*** DISCLAIMER (Click to Read) ***`}
                        </div>
                    }
                    {width > 800 && fontSize !== "32px" && 
                        <div className="loginDisclaimerPosted" >
                            <Disclaimer/>
                        </div>
                    }
                </div>
                <Footer/>
            </div>   
        </>
    )
};

export default Login;