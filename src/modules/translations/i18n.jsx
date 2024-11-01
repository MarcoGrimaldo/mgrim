import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation files
import translationEN from './locales/en.json';
import translationES from './locales/es.json';
import translationJP from './locales/jp.json';
import translationIT from './locales/it.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  jp: {
    translation: translationJP
  },
  es: {
    translation: translationES
  },
  it: {
    translation: translationIT
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, can be changed to use different lng
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
