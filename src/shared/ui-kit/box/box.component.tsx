import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { IAppTheme } from "theme/theme";
import { useTheme } from "theme/ThemeProvider";
import { generateStyles } from './box.styles';
import { IStylesProps } from './box.types';

type BoxProps = {
  bgColor?: keyof IAppTheme['palette'];
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
});

const BoxComponent: React.FC<BoxProps & ViewProps & Partial<IStylesProps>> = ({
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        // @ts-ignore
        ...generateStyles(props),
        props.bgColor && {
          backgroundColor: theme.palette[props.bgColor],
        },
        props.fullWidth && styles.fullWidth,
        props.style,
      ]}>
      {props.children}
    </View>
  );
};

export const Box = React.memo(BoxComponent);
