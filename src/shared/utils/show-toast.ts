import Toast, { ToastShowParams } from "react-native-toast-message";

type Props = {
  type: ToastShowParams['type'],
  text1: string;
  text2?: string;
}

export const showToast = (prop: Props) => Toast.show({
  type: prop.type,
  text1: prop.text1,
  text2: prop.text2 || ''
})