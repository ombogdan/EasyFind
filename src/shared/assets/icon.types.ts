import { ImageProps, ImageStyle } from 'react-native';
import { IAppTheme } from 'shared/theme/theme';
import { APP_ICONS } from './icon.data';

export interface AppIconProps extends Omit<ImageProps, 'source'> {
  name: keyof typeof APP_ICONS;
  color?: keyof IAppTheme['palette'];
  size?: number;
  style?: ImageStyle;
  enable_color?: boolean;
}

export type IconName = keyof typeof APP_ICONS;
