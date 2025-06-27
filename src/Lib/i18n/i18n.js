import i18n from "i18next";
import languageDectector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";


const nameSpaces = ['aria', 'auxiliary', 'calendar', 'characters', 'common', 'languages', 'portals', 'primary', 'secondary']

i18n.use(languageDectector).use(initReactI18next).use(Backend).init({
    debug: true, // disabled in production
    fallbackLng: "en-US",
    returnObjects: true,
    detection: {
        order: ['cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
        caches: ['cookie'],
    },
    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: nameSpaces,
    defaultNS: nameSpaces,
    react: { useSuspense: true },
    interpolation: {
        espaceValue: false,
        formatSeperator: ",",
    }
});

export default i18n;