import { IStylesNamesProps, IStylesProps } from './box.types';

const STYLE_NAMES: IStylesNamesProps = {
  ml: {
    name: 'marginLeft',
    hasSpacing: true,
  },
  mr: {
    name: 'marginRight',
    hasSpacing: true,
  },
  mt: {
    name: 'marginTop',
    hasSpacing: true,
  },
  mb: {
    name: 'marginBottom',
    hasSpacing: true,
  },
  mx: {
    name: 'marginHorizontal',
    hasSpacing: true,
  },
  my: {
    name: 'marginVertical',
    hasSpacing: true,
  },

  pl: {
    name: 'paddingLeft',
    hasSpacing: true,
  },
  pr: {
    name: 'paddingRight',
    hasSpacing: true,
  },
  pt: {
    name: 'paddingTop',
    hasSpacing: true,
  },
  pb: {
    name: 'paddingBottom',
    hasSpacing: true,
  },
  px: {
    name: 'paddingHorizontal',
    hasSpacing: true,
  },
  py: {
    name: 'paddingVertical',
    hasSpacing: true,
  },

  top: {
    name: 'top',
    hasSpacing: true,
  },
  left: {
    name: 'left',
    hasSpacing: true,
  },
  right: {
    name: 'right',
    hasSpacing: true,
  },
  bottom: {
    name: 'bottom',
    hasSpacing: true,
  },

  flex: {
    name: 'flex',
    hasSpacing: false,
  },
  zIndex: {
    name: 'zIndex',
    hasSpacing: false,
  },
  wrap: {
    name: 'wrap',
    hasSpacing: false,
  },
  direction: {
    name: 'flexDirection',
    hasSpacing: false,
  },
  alignItems: {
    name: 'alignItems',
    hasSpacing: false,
  },
  justifyContent: {
    name: 'justifyContent',
    hasSpacing: false,
  },
  position: {
    name: 'position',
    hasSpacing: false,
  },
};

export const generateStyles = (props: IStylesProps) => {
  const stylesArray = Object.keys(props).reduce<
    { [x: string]: string | number }[]
  >((acc, key) => {
    if (STYLE_NAMES[key as keyof IStylesNamesProps]) {
      const value = STYLE_NAMES[key as keyof IStylesNamesProps].hasSpacing
        ? props[key as keyof IStylesNamesProps]
        : props[key as keyof IStylesNamesProps];

      return [
        ...acc,
        { [STYLE_NAMES[key as keyof IStylesNamesProps].name]: value },
      ];
    }
    return acc;
  }, []);
  return stylesArray;
};
