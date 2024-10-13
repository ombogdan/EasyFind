import { Dimensions, LayoutAnimation, NativeModules, Platform } from "react-native";

export const SUPPORT_EMAIL = 'easyFind@gmail.com';

export const LayoutAmimationConfig = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
}

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const TERMS_AND_CONDITIONS_LINK = "";
export const PRIVACY_POLICY_LINK = "";
export const HIT_SLOP={
  left: 10,
  right: 10,
  bottom: 10,
  top: 10,
}

export const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const BUTTON_VARIANTS = {
  primary: 'primary',
  secondary: 'secondary',
};
export const LOTTIE_BLACK_LOADER = require('shared/assets/lottie/loader-black.json');
export const LOTTIE_WHITE_LOADER = require('shared/assets/lottie/loader-white.json');

export const LOGO_ICON = require('shared/assets/images/logo.jpg');

export const FONT_SIZE = {
  /** xs = 10 */
  xs: 10,
  /** sm = 12 */
  sm: 12,
  /** md = 14 */
  md: 14,
  /** md = 16 */
  lg: 16,
  /** xl = 20 */
  xl: 20,
  /** xxl = 24 */
  xxl: 24,
}

export const SIZE = {
  /** xs = 2 */
  xs: 2,
  /** xs = 4 */
  x2s: 4,
  /** s = 6 */
  s: 6,
  /** sm = 8 */
  sm: 8,
  /** s2m = 12 */
  s2m: 12,
  /** md = 16 */
  md: 16,
  /** lg = 20 */
  lg: 20,
  /** xl = 24 */
  xl: 24,
  /** xxl = 28 */
  xxl: 28,
  /** x3l = 36 */
  x3l: 36,
}
export const isIOS = Platform.OS === 'ios';

const locale = isIOS
  ? NativeModules.SettingsManager.settings.AppleLocale ||
  NativeModules.SettingsManager.settings.AppleLanguages[0]
  : NativeModules.I18nManager.localeIdentifier;

export enum AppLanguages {
  En = 'en',
  Ua = 'es',
}

export const AppLanguagesNames: { [key: string]: string } = {
  "En": "English",
  "Ua": "Spanish",
}

export enum MMKVStorageKeys {
  Language = 'Language',
}
