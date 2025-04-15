import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // auto-detects user language
  .use(initReactI18next) // connects with React
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    resources: {
      en: {
        translation: require('./locales/en/translation.json'),
      },
      mon: {
        translation: require('./locales/mon/translation.json'),
      }
    }
  });

export default i18n;
