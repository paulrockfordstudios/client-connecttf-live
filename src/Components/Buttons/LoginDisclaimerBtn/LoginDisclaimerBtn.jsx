import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';

function LoginDisclaimerBtn() {

    const {t} = useTranslation(['auxiliary']);

    const colors = [`${screen === "light" ? "black" : "white"}`, "#4a76fd", "#e639af"];

    useEffect(() => {
            const timer = setInterval(() => {
              setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
            }, 1000);
        
            return () => clearInterval(timer);
        }, [colors, 1000]);
        
    const textColor = colors[currentColorIndex];

    return (
        <div className="loginDisclaimerBtn" style={{ color: textColor }}>
            {`*** DISCLAIMER (Click to Read) ***`}
        </div>
    )
;}

export default LoginDisclaimerBtn;