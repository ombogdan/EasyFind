import React, {useEffect, useState} from "react";
import {View, TouchableOpacity, Keyboard} from "react-native";
import {useTheme} from "theme/ThemeProvider";
import {AppIcon} from "assets/index";
import {APP_ICONS} from "assets/icon.data";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {useStyles} from "./custom-tab-bar.styles";

type TabIconKey = "Home" | "Catalogue" | "Profile";
const tabsIcon: Record<TabIconKey, keyof typeof APP_ICONS> = {
  "Home": "home",
  "Catalogue": "like",
  "Profile": "profile",
};
const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const styles = useStyles();
  const {theme} = useTheme();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setVisible(false);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setVisible(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View>
      {visible &&
        <View style={styles.container}>
          {state.routes.map((route: any, index: number) => {
            const {options} = descriptors[route.key];
            const label: TabIconKey =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key
              });
            };

            return (
              <React.Fragment key={`item_${label}`}>
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={styles.tabContainer}>
                  <View style={[styles.itemButtonContainer, isFocused && {backgroundColor: theme.palette.blue}]}>
                    <AppIcon
                      size={30}
                      name={tabsIcon[label]}
                      style={styles.tabIcon}
                      color={isFocused ? "white" : "textDefault"}/>
                  </View>
                </TouchableOpacity>
                {index !== state.routes.length - 1 && (
                  <View style={styles.line}/>
                )}
              </React.Fragment>
            );
          })}
        </View>
      }
    </View>
  );
};

export default CustomTabBar;
