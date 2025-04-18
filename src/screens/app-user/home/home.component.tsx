import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text, FlatList } from "react-native";
import { Box } from "ui-kit/box";
import CustomInput from "ui-kit/custom-input/custom-input.component";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { AppIcon } from "assets/index";
import { Map } from "screens/app-user/home/components/map";
import { useTypedSelector } from "store/index";
import { selectUserLocation } from "store/selectors/user";
import { api } from "services/api";
import { ServiceItem } from "screens/app-user/home/components/service-item";
import { ServiceProductType } from "shared/types";
import { useStyles } from "./home.styles";

const Home = () => {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const userLocation = useTypedSelector(selectUserLocation);

  const [search, setSearch] = useState("");
  const [isShowMap, setIsShowMap] = useState(false);
  const [servicesList, setServicesList] = useState<ServiceProductType[]>([]);

  const getOrganizations = async () => {
    try {
      const { data } = await api.user.getNearbyOrganizations(userLocation);
      // console.log(data);
      // console.log('data');
    } catch (e) {
       // @ts-ignore
      console.error(e?.response?.data ?? "q");
    }
  };

  const getNearbyServices = async () => {
    try {
      const { data } = await api.user.getNearbyServices({ ...userLocation, page: 1, page_size: 20 });
      console.log(data);
      console.log('data');
      setServicesList(data?.results ?? []);
    } catch (e) {
       // @ts-ignore
      console.error(e?.response?.data ?? "q");
    }
  };

  useEffect(() => {
    if (userLocation) {
      getOrganizations();
      getNearbyServices();
    }
  }, []);


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
      <Map isShowMap={isShowMap} />
      {!isShowMap &&
        <Box pt={20} pl={16} pr={16}>
          <Text style={styles.allServices}>{t("allServices")}</Text>
          {Array.isArray(servicesList) && servicesList.length > 0 && (
            <FlatList
              keyboardShouldPersistTaps="always"
              data={servicesList}
              ListFooterComponent={() => <Box pt={200}/>}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item}) => (
                <ServiceItem item={item}/>
              )}
            />
          )}
        </Box>
      }
    </View>
  );
};

export default Home;
