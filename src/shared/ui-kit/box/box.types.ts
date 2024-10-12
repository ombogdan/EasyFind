export interface IStylesProps {
  ml: number;
  mr: number;
  mt: number;
  mb: number;
  mx: number;
  my: number;

  pl: number;
  pr: number;
  pt: number;
  pb: number;
  px: number;
  py: number;

  top: number;
  left: number;
  right: number;
  bottom: number;

  flex: number;
  zIndex: string;
  wrap: string;
  direction: string;
  alignItems: string;
  justifyContent: string;
  position: string;
  fullWidth: boolean;
}

type Style = {
  name: string;
  hasSpacing: boolean;
};

export interface IStylesNamesProps {
  ml: Style;
  mr: Style;
  mt: Style;
  mb: Style;
  mx: Style;
  my: Style;

  pl: Style;
  pr: Style;
  pt: Style;
  pb: Style;
  px: Style;
  py: Style;

  top: Style;
  left: Style;
  right: Style;
  bottom: Style;

  flex: Style;
  zIndex: Style;
  wrap: Style;
  direction: Style;
  alignItems: Style;
  justifyContent: Style;
  position: Style;
  // fullWidth: Style;
}
