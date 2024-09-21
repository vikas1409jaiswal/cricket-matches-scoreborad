import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./languages/english.json";
import hindi from "./languages/hindi.json";
import { config } from "./configs";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: english,
    },
    hi: {
      translation: hindi,
    },
  },
  lng: config.language === "hindi" ? "hi" : "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
