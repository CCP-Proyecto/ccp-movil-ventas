import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";

import es from "./es";
import en from "./en";

const translations = {
  en,
  es,
};

const i18n = new I18n(translations);

const deviceLanguage = getLocales()[0]?.languageCode || "en";

i18n.locale = Object.keys(translations).includes(deviceLanguage)
  ? deviceLanguage
  : "en";

i18n.enableFallback = true;
i18n.defaultLocale = "en";

const t = (key: string, options?: object) => i18n.t(key, options);

export { i18n, t };
