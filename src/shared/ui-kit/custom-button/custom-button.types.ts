import { APP_ICONS } from "assets/icon.data";

export interface ButtonProps {
  containerStyle?: object;
  disabled?: boolean;
  isLoading?: boolean;
  variant: string;
  title?: string;
  onPress: () => void;
  leftIcon?: keyof typeof APP_ICONS;
  rightIcon?: keyof typeof APP_ICONS;
  iconSize?: number;
}
