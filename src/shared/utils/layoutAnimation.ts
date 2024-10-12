import { LayoutAnimation } from "react-native";
import { LayoutAmimationConfig } from "shared/constants";

export const layoutAnimation = () => {
  LayoutAnimation.configureNext(LayoutAmimationConfig);
}