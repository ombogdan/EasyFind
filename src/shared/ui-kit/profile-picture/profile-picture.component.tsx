import { View, Image } from 'react-native';
import React from 'react';
import { useStyles } from './profile-picture.styles';

interface Props {
  uri: string | null;
  height: number;
  width: number;
}

const ProfilePicture = ({ uri, height, width }: Props) => {
  const styles = useStyles({ height, width, uri });

  return (
    <View style={styles.container}>
      {!uri ? (
        <Image
          source={require('shared/assets/icons/profile.png')}
          style={styles.image}
        />
      ) : (
        <Image source={{ uri }} style={styles.image} />
      )}
    </View>
  );
};

export default ProfilePicture;
