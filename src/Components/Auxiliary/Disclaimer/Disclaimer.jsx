import React from 'react';
import { Trans } from 'react-i18next';
import "./Disclaimer.css";
import { componentClasses } from '../../../Lib/i18n/componentClasses';


function Disclaimer() {

    return (
        <div className="disclaimerContainer">
            <div className="disclaimerContainerBackground" />
            <div className="disclaimerContainerForground">
                <p className="disclaimerText">
                    <span className="disclaimerTitle inheritParentFont">
                        <Trans 
                            i18nKey={"pages.login.components.disclaimer.word1"}
                            ns={"auxiliary"}
                            components={componentClasses}
                        />
                    </span>
                    <span className="disclaimerSentence inheritParentFont">
                        <Trans 
                            i18nKey={"pages.login.components.disclaimer.sentence1"} 
                            ns={"auxiliary"} 
                            components={componentClasses}
                        />
                    </span>
                    <span className="disclaimerSentence inheritParentFont">
                        <Trans 
                            i18nKey={"pages.login.components.disclaimer.sentence2"} 
                            ns={"auxiliary"} 
                            components={componentClasses}
                        />
                    </span>
                    <span className="disclaimerSentence inheritParentFont">
                        <Trans 
                            i18nKey={"pages.login.components.disclaimer.sentence3"} 
                            ns={"auxiliary"}
                            components={componentClasses}
                        />
                    </span>
                    <span className="disclaimerSentence inheritParentFont">
                        <Trans 
                            i18nKey={"pages.login.components.disclaimer.sentence4"} 
                            ns={"auxiliary"} 
                            components={componentClasses}
                        />
                    </span>
                    <span className="disclaimerSentence inheritParentFont">
                        <Trans 
                            i18nKey={"pages.login.components.disclaimer.sentence5"} 
                            ns={"auxiliary"} 
                            components={componentClasses}
                        />
                    </span>
                    <span className="disclaimerSentence inheritParentFont">
                        <Trans 
                            i18nKey={"pages.login.components.disclaimer.sentence6"} 
                            ns={"auxiliary"} 
                            components={componentClasses}
                        />
                    </span>
                </p>
            </div>
        </div>
    )
};

export default Disclaimer;