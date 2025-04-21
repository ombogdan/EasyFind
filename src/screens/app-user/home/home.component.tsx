import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text, FlatList } from "react-native";
import { Box } from "ui-kit/box";
import CustomInput from "ui-kit/custom-input/custom-input.component";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { AppIcon } from "assets/index";
import { Map } from "screens/app-user/home/components/map";
import { api } from "services/api";
import { ServiceItem } from "screens/app-user/home/components/service-item";
import { OrganizationType, ServiceProductType } from "shared/types";
import { useUserLocation } from "hooks/useUserLocation";
import { useStyles } from "./home.styles";

const Home = () => {
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { location } = useUserLocation();

  const [search, setSearch] = useState("");
  const [isShowMap, setIsShowMap] = useState(false);
  const [servicesList, setServicesList] = useState<ServiceProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nearbyOrganizations, setNearbyOrganizations] = useState<OrganizationType[]>([]);

  const getOrganizations = async () => {
    try {
      if (location) {
        const { data } = await api.user.getNearbyOrganizations(location);
        const organizations = data?.results ?? [];
        setNearbyOrganizations(organizations);
      }
    } catch (error: any) {
      console.log(error);
      console.error(error?.response?.data ?? "getOrganizations");
    }
  };

  const getNearbyServices = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.user.getNearbyServices({
        latitude: location?.latitude ?? null,
        longitude: location?.longitude ?? null,
        page: 1,
        page_size: 20
      });
      setServicesList(data?.results ?? []);
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      console.error(error?.response?.data ?? "getNearbyServices");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      getOrganizations();
    }
    getNearbyServices();
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
      <Map isShowMap={isShowMap} organizationsList={nearbyOrganizations} />
      {!isShowMap &&
        <Box pt={20} pl={16} pr={16}>
          <Text style={styles.allServices}>{t("allServices")}</Text>
          {Array.isArray(servicesList) && servicesList.length > 0 && (
            <FlatList
              keyboardShouldPersistTaps="always"
              data={servicesList}
              onRefresh={getNearbyServices}
              refreshing={isLoading}
              ListFooterComponent={() => <Box pt={200} />}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ServiceItem item={item} />
              )}
            />
          )}
        </Box>
      }
    </View>
  );
};

export default Home;
