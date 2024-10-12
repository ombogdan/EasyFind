import { KeyboardTypeOptions, TextInputProps, TextInput, TextStyle, StyleProp } from "react-native";
import { APP_ICONS } from "assets/icon.data";

export interface CustomInputProps extends TextInputProps  {
  value: string;
  name?: string;
  onChangeValue: (value: string) => void;
  errorMessage?: string | null;
  styleContainer?: object;
  styleInput?: object;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  leftIcon?: keyof typeof APP_ICONS;
  rightIcon?: keyof typeof APP_ICONS;
  search?: boolean;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onRightIconPress?: () => void;
  multiline?: boolean;
  ref?: TextInput;
  autoFocus?: boolean;
  errorMessageStyles?: StyleProp<TextStyle>;
}
