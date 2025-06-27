import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import "./Greeting.css";
import { componentClasses } from '../../../Lib/i18n/componentClasses';


function Greeting() {

    const { t } = useTranslation(["auxiliary"]);

    return (
        <section className="greeting">
            <h1 className="greetingLogo" aria-label={`${t("title_w_logo", {ns: "common"})}`}>
                <i className="greetingLogoImg PNG_IMG PNG_LOGO_ONE" alt={`${t("title_w_logo", {ns: "common"})}`}/>
            </h1>
            <h2 className="greetingSlogan">
                <Trans 
                    i18nKey={"pages.login.components.greeting.slogan"} 
                    ns={"auxiliary"} 
                    components={componentClasses}
                />
            </h2>
        </section>
    )
};

export default Greeting;