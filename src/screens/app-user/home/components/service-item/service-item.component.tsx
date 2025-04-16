import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { IMAGE_HOST } from "constants/index";
import { Box } from "ui-kit/box";
import { SearchItemProps } from "./service-item.types";
import { useStyles } from "./service-item.styles";

const ServiceItem = ({ item }: SearchItemProps) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const { image, name, distance } = item || {};

  const handlePressItem = () => {

  };

  return (
    <TouchableOpacity onPress={handlePressItem} style={styles.container}>
      {image &&
        <Image source={{ uri: `${IMAGE_HOST}${image}` }} style={styles.image} resizeMode="cover"/>
      }
      <Box pt={10}>
        <Text style={styles.name}>{name} <Text style={styles.kilometers}>{distance} {t('km')}</Text></Text>
      </Box>
    </TouchableOpacity>
  );
};

export default ServiceItem;
