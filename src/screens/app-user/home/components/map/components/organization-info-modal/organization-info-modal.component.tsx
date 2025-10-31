import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useStyles } from "./organization-info-modal.styles";
import { OrganizationMarkerProps } from "./organization-info-modal.types";

const OrganizationInfoModal = ({
                                 organization, onClose
                               }: OrganizationMarkerProps) => {
  if (!organization) return null;
  const styles = useStyles();

  return (
    <View style={styles.modalContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{organization.name}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.close}>×</Text>
        </TouchableOpacity>
      </View>
      <Image source={{ uri: organization.image }} style={styles.image} />
      <Text style={styles.address}>{organization.address}</Text>
      <Text style={styles.phone}>{organization.phone}</Text>
    </View>
  );
};

export default OrganizationInfoModal;
