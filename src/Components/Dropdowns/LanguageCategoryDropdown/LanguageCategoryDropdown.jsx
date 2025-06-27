import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import "./LanguageCategoryDropdown.css";
import LanguageBtn from '../../Buttons/LanguageBtn/LanguageBtn';
import { componentClasses } from '../../../Lib/i18n/componentClasses';
import { FocusScope } from 'react-aria';
import useFocusVisible from '../../../Utils/crHooks/useFocusVisible';


function LanguageCategoryDropdown({category, langList, selectList, expanding, setContracting, selectListHandler}) {

    const lngCatDDBtnRef = useRef()

    const {t} = useTranslation(["aria", "auxiliary", "languages"]);

    const { screen } = useSelector((state) => state.auth);

    const focused = useFocusVisible(lngCatDDBtnRef);

    const { name, trans } = category;

    const dropdownButtonId = `${trans.replace(/_/g, '-')}-cat-dropdown-button`;
    const dropdownListId = `${trans.replace(/_/g, '-')}-cat-dropdown-list`;

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && selectList === name) {
            selectListHandler(name);
        }
    };

    return (
        <div key={`ctf-lng-${name}`} className="languageCategoryDropdown">
            <div 
                className={`
                    languageCategoryDropdownBtnContainer 
                    justAlignCenter
                    ${focused ? "keyFocus" : ""}
                `}
            >
                <button
                    id={dropdownButtonId}
                    ref={lngCatDDBtnRef}
                    aria-label={`${t(`category.${trans}`, {ns: "languages"})} ${t(`label.dropdowns.lng_cat_dd`, {ns: "aria"})}`} 
                    aria-haspopup="listbox"
                    aria-expanded={selectList === name ? true : false}
                    aria-controls={dropdownListId}
                    className={`
                        languageCategoryDropdownBtn
                        ${screen} 
                        ${selectList.length > 0 ? selectList === name ? "open highlight" : "close" : "open"}
                    `} 
                    onClick={() => selectListHandler(name)}
                >
                    <div className="languageCategoryDropdownBtnTextContainer">
                        <div className="languageCategoryDropdownBtnText title">
                            {t(`category.${trans}`, {ns: "languages"})}
                        </div>
                        <div className="languageCategoryDropdownBtnText count">
                            {`(${langList.length})`}
                        </div>
                    </div>
                    <div className="languageCategoryDropdownBtnText icon">{selectList === name ? "-" : "+"}</div>
                </button>
            </div>
            <FocusScope contain autoFocus restoreFocus>
                <div 
                    className={`
                        languageCategoryDropdownLanguagesListContainer
                        ${selectList === name ? "open" : "close"}
                    `}
                    onKeyDown={(e) => handleKeyDown(e)} 
                >
                    <div className="languageCategoryDropdownListAllContainer">
                        
                        <ul 
                            id={dropdownListId}
                            role="listbox"
                            aria-labelledby={dropdownButtonId}
                            className="languageCategoryDropdownLanguagesList all"
                            style={{height: `${Math.ceil(((langList.length * 36)/3)/36) * 36}px`}}
                        >
                            {!expanding && langList.sort((a, b) => a.name.localeCompare(b.name)).map((lng) => (
                                <li 
                                    key={lng.code} 
                                    role={`${name} Language Menu Option Item`}
                                    className="languageCategoryDropdownLanguagesListItem"
                                >
                                    <LanguageBtn 
                                        category={category} 
                                        lng={lng} 
                                        setContracting={() => setContracting(true)}
                                        btnEnabled={selectList === name ? true : false}
                                    />
                                </li>
                            ))}    
                        </ul>

                        <div className={`languageListCatInfoContainer ${name}`}>
                            <span className={`languageListCatInfoLinkSentence ${screen}`}>
                                <Trans 
                                    ns={"auxiliary"} 
                                    i18nKey={"portals.languageSelect.alt_lang_info_sentence"} 
                                    components={componentClasses}
                                />
                            </span>
                        </div>
            
                    </div>
                </div>
            </FocusScope>
        </div> 
    )
};

export default LanguageCategoryDropdown;