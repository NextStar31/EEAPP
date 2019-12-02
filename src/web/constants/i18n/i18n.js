import I18n from "i18n-js";
import en from "./locales/en";
import fr from "./locales/fr";


I18n.defaultLocale = "fr";
I18n.locale = "fr";
I18n.fallbacks = true;
I18n.translations = {
  en,
  fr
};

export default I18n;