import React from 'react';
import { Cancel } from '@material-ui/icons';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { accessClose, setKeyHov } from "../../../../Redux/AuthSlice";


function ClosePortalBtn({id}) {

    const { screen, keyHov } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const {t} = useTranslation(["aria"]);

    const handleKeyFocus = (e) => {
        if (e.key === 'Tab') {
            dispatch(setKeyHov("agClose-btn"));
        }
    };

    return (
        <div>
            <button 
                id={id}
                className={`
                    accesGateCloseBtn 
                    justAlignCenter
                    ${screen} 
                    ${keyHov === "agClose-btn" ? "keyHov" : ""}`
                } 
                aria-label={t("label.close_btn.access", "aria")} 
                onKeyUp={(e) => handleKeyFocus(e)}
                onClick={closeHandler}
            >
                <Cancel/>
            </button>
        </div>
    )
};

export default ClosePortalBtn;