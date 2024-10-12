import { useRoute } from "@react-navigation/native";
import { AppUserRouteProps, AppUserRoutesParamList } from "./app-user.navigator.types";

export function useAppRoute<RouteName extends keyof AppUserRoutesParamList>() {
  return useRoute<AppUserRouteProps<RouteName>>();
}
