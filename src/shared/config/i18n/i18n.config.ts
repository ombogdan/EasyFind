import { NativeModules } from "react-native";
import i18n from "i18next";

import { isIOS, AppLanguages, MMKVStorageKeys } from "shared/constants";
import { MMKVStorageService } from "shared/services/mmkv";

import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import uk from "./locales/ua.json";

const resources = {
  [AppLanguages.Uk]: {
    translation: uk
  },
  [AppLanguages.En]: {
    translation: en
  }
};

const locale = isIOS
  ? NativeModules.SettingsManager.settings.AppleLocale ||
  NativeModules.SettingsManager.settings.AppleLanguages[0]
  : NativeModules.I18nManager.localeIdentifier;

export const systemLanguage =
  locale && Object.values(AppLanguages).includes(locale.substring(0, 2))
    ? (locale as string).substring(0, 2)
    : AppLanguages.En;

export const initLanguage = () => {
  let language = MMKVStorageService.getItem(MMKVStorageKeys.Language);
  if (!language) {
    language = systemLanguage;
  }

  return i18n
    .use(initReactI18next)
    .init({
    compatibilityJSON: "v3",
    lng: language,
    fallbackLng: AppLanguages.En,
    resources,
    ns: ["translation"],
    defaultNS: "translation",
    debug: false,
    returnObjects: true
  });
};

initLanguage();

export default i18n;
