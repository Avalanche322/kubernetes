import i18n from 'i18next'
import { initReactI18next } from 'react-i18next';
import translationEN from './assets/localize/en.json';
import translationUK from './assets/localize/uk.json'

const resources = {
	en: {
		translation: translationEN
	},
	uk: {
		translation: translationUK
	},
}

i18n.use(initReactI18next).init({
	resources,
  	keySeparator: false,
  	lng: "en",
	interpolation: {
		escapeValue: false
	}
})

export default i18n