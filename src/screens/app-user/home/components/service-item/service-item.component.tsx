import React from "react";
import { Text, Image, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { IMAGE_HOST } from "constants/index";
import { Box } from "ui-kit/box";
import { SearchItemProps } from "./service-item.types";
import { useStyles } from "./service-item.styles";

const ServiceItem = ({ item }: SearchItemProps) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const { image, name, distance, organization } = item || {};

  const handlePressItem = () => {
  };

  return (
    <Pressable onPress={handlePressItem} style={styles.container}>
      {image &&
        <Image source={{ uri: `${IMAGE_HOST}${image}` }} style={styles.image} resizeMode="cover" />
      }
      <Box pt={10}>
        <Text style={styles.name}>{name} ({organization?.name ?? ""}) <Text
          style={styles.kilometers}>{distance} {t("km")}</Text></Text>
      </Box>
      <Text style={styles.address}>{organization?.address ?? ""}</Text>
    </Pressable>
  );
};

export default ServiceItem;
