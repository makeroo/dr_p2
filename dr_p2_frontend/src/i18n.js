import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

const availableLanguages = ['en', 'it'];

i18n
    .use(XHR)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        whitelist: availableLanguages,
        debug: true,

        // have a common namespace used around the full app
//        ns: ["translations"],
//        defaultNS: "translations",

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ","
        },

        react: {
            wait: true
        }
    });

export default i18n;
