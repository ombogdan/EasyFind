import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { Box } from "ui-kit/box";
import CustomInput from "ui-kit/custom-input/custom-input.component";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { AppIcon } from "assets/index";
import { Map } from "screens/app-user/home/components/map";
import { useStyles } from "./home.styles";

const Home = () => {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [isShowMap, setIsShowMap] = useState(false);

  const handleChangeMapVisible = () => {
    setIsShowMap(!isShowMap);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("shared/assets/images/homeBackground.png")}
        style={styles.homeBackground}
        resizeMethod="resize" />
      <Box direction="row" pt={insets.top + 15} alignItems="center" pl={16} pr={50}>
        <Box pr={10}>
          <CustomInput
            value={search}
            leftIcon="search"
            placeholder={t("search")}
            onChangeValue={(newValue) => {
              setSearch(newValue);
            }} />
        </Box>
        <TouchableOpacity style={styles.mapButtonContainer} onPress={handleChangeMapVisible}>
          <AppIcon name="map" color="white" />
        </TouchableOpacity>
      </Box>
      {isShowMap ?
        <Map />
        :
        <Box pt={20} pl={16} pr={16}>
          <Text style={styles.allServices}>{t("allServices")}</Text>
        </Box>
      }
    </View>
  );
};

export default Home;
