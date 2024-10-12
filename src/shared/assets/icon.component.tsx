import React from 'react';
import { Image } from 'react-native';
import { AppIconProps } from 'shared/assets/icon.types';
import { APP_ICONS } from './icon.data';
import { useStyles } from './icon.styles';

const AppIconComponent = ({
  name,
  color = 'dark',
  size = 28,
  style,
  enable_color = true,
}: AppIconProps) => {
  const styles = useStyles({ color, size, enable_color });

  return (
    <Image
      source={APP_ICONS[name]}
      resizeMode="contain"
      style={[styles.icon, [style]]}
    />
  );
};

const AppIcon = React.memo(AppIconComponent);

export default AppIcon;
