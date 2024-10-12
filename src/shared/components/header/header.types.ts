import { APP_ICONS } from "assets/icon.data";

export interface CustomHeaderProps {
  name?: string;
  leftText?: string;
  rightText?: string;
  backButton?: boolean;
  leftIsLoading?: boolean;
  cancelButtonText?: string;
  leftIcon?: keyof typeof APP_ICONS;
  backButtonText?: string;
  leftButtonText?: string;
  onPressLeftButton?: () => void;
}
