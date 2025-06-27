// If language requires a special font, 
// this hook returns the font if the translated text exists.

import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";


const transFont = (key) => {

    const { i18n } = useTranslation();

    const { lngObj } = useSelector((state) => state.auth);

    if (!lngObj?.requiresFont) return;

    const originalFallbackLng = i18n.options.fallbackLng;

    i18n.options.fallbackLng = false;

    const keyExists = i18n.exists(key, lngObj);

    i18n.options.fallbackLng = originalFallbackLng;

    return keyExists ? lngObj.script : ""
};

export default transFont;