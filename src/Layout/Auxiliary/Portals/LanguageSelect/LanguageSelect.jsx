import React, { useEffect, useRef, useState } from 'react';
import "./LanguageSelect.css";
import { ctfbglgAngleBackdrop } from '../../../../Utils/calculateAngle';
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import useWindowSize from '../../../../Utils/crHooks/useWindowSize';
import useElementSize from '../../../../Utils/crHooks/useElementSize';
import { languages } from "../../../../Assets/localization/languages";
import { lngSelectClose } from '../../../../Redux/AuthSlice';
import useTimeout from '../../../../Utils/crHooks/useTimeout';
import { FocusScope } from 'react-aria';
import LanguageCategoryDropdown from '../../../../Components/Dropdowns/LanguageCategoryDropdown/LanguageCategoryDropdown';
import { cancelIcon } from '../../../../Lib/mui/icons';


function LanguageSelect() {

    const ref = useRef();

    const { screen } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const {t} = useTranslation(["aria", "auxiliary", "languages"]);

    const { width: winWidth, height: winHeight } = useWindowSize();
    const refDims = useElementSize(ref);

    const [ selectList, setSelectList ] = useState("");
    const [ expanding, setExpanding ] = useState(true);
    const [ contracting, setContracting ] = useState(false);


    const categories = [
        {number: 1, name: 'All', trans: "all"},
        {number: 2, name: 'Universal', trans: "universal"},
        {number: 3, name: 'Africa', trans: "africa"},
        {number: 4, name: 'The Americas', trans: "americas"},
        {number: 5, name: 'East Asia', trans: "east_asia"},
        {number: 6, name: 'Eastern Europe', trans: "e_europe"},
        {number: 7, name: 'Western Europe', trans: "w_europe"},
        {number: 8, name: 'Oceania', trans: "oceania"},
        {number: 9, name: 'Middle East', trans: "middle_east"},
        {number: 10, name: 'Alternate', trans: "alternate"},
        {number: 11, name: 'Fictional', trans: "fictional"},
    ];

    useTimeout(() => {
        setExpanding(false);
    }, 325);

    const closeHandler = () => {
        setContracting(true);
        setTimeout(() => {
            dispatch(lngSelectClose());
        }, 325);
    }

    const selectListHandler = (lr) => {
        if (selectList === lr) {  
            setSelectList("");
        } else {
            setSelectList(lr);
        }
    };

    const handleKeyClose = (e) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    };

    return ReactDom.createPortal(
        <div className="PORTAL" onKeyDown={(e) => handleKeyClose(e)}>
            <div 
                className={`PORTAL_BACKDROP ${expanding ? "expand" : ""} ${contracting ? "contract" : ""}`} 
                style={ctfbglgAngleBackdrop(winWidth, winHeight, false, "pas")}
            />
            <div className="MODAL">
                <FocusScope contain autoFocus restoreFocus>
                    <div 
                        className={`
                            languageSelect 
                            justAlignCenter 
                            dynamicContainer
                            cp-bs 
                            portal
                            black 
                            ${screen}
                            ${expanding ? "expand" : ""} 
                            ${contracting ? "contract" : ""}
                        `} 
                    >
                        <div 
                            className="languageSelectborderBg justAlignCenter" 
                            ref={ref} 
                            style={ctfbglgAngleBackdrop(refDims?.width, refDims?.height, false, "sat")}
                        >
                            <div className={`languageSelectContainer justAlignCenter ${screen}`}>
                                <button className={`accesGateCloseBtn ${screen}`} aria-label={t("label.close_btn.lng_select", {ns: "aria"})} onClick={closeHandler}>{cancelIcon}</button>
                                <div className="languageSelectContent">
                                    <i className="accessGateLogo PG_IMG PNG_LOGO_THREE" aria-hidden="true" alt="connecttf-logo"/>
                                    <div className="languageSelectListContainer">  
                                        <ul className="languageSelectList">
                                            {categories.sort((a, b) => a.number < b.number).map((cat) => (
                                                <li key={`ctf-lng-Select-${cat.number}`} className="languageSelectListItem justAlignCenter">
                                                    <LanguageCategoryDropdown
                                                        category={cat}
                                                        langList={
                                                            cat.name === "All"
                                                                ? languages
                                                                : languages.filter((lang) => (
                                                                    cat.name === "Universal"
                                                                        ? lang.type === "universal"
                                                                        : lang.reach.includes(cat.name)
                                                                ))
                                                        }
                                                        selectList={selectList}
                                                        expanding={expanding}
                                                        setCantracting={setContracting}
                                                        selectListHandler={selectListHandler}
                                                    />
                                                </li> 
                                            ))}   
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </FocusScope>
            </div>
        </div>,
        document.getElementById("portal")
    )
};

export default LanguageSelect;