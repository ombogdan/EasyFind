import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BUTTON_VARIANTS, SIZE } from 'shared/constants';
import { FollowerParamActionType } from 'shared/types';
import { Box } from 'shared/ui-kit/box';
import { CustomButton } from 'shared/ui-kit/custom-button';
import { ProfilePicture } from 'shared/ui-kit/profile-picture';
import useProfileHeader from './profile-header.hook';
import { useStyles } from './profile-header.styles';
import { Props } from './profile-header.types';

const ProfileHeader = ({ public_user_id, username }: Props) => {
  const styles = useStyles();
  const {
    onPressFollow,
    onPressFollowers,
    handlePressEditProfile,
    onPressLink,
    stats,
    currentUser,
    isLoading,
  } = useProfileHeader({ public_user_id, username });

  if (!stats) {
    return null;
  }

  return (
    <Box pl={16} pr={16}>
      <Box pt={20} direction="row">
        {/* PROFOLE IMAGE */}
        <ProfilePicture uri={currentUser?.avatar || null} height={65} width={65} />
        {/* PROFOLE STATS */}
        <Box pl={24} direction="row">
          <View style={styles.subscriptionItem}>
            <Text style={styles.countText}>{stats?.reviews_count || 0}</Text>
            <Text style={styles.countNameText}>Reviews</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPressFollowers(FollowerParamActionType.FOLLOWERS)}
          >
            <View style={styles.subscriptionItem}>
              <Text style={styles.countText}>
                {stats?.followers_count || 0}
              </Text>
              <Text style={styles.countNameText}>Followers</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPressFollowers(FollowerParamActionType.FOLLOWING)}
          >
            <View style={styles.subscriptionItem}>
              <Text style={styles.countText}>
                {stats?.followings_count || 0}
              </Text>
              <Text style={styles.countNameText}>Following</Text>
            </View>
          </TouchableOpacity>
        </Box>
      </Box>
      {/* PROFOLE NAME */}
      <Text style={styles.fullNameText}>{currentUser?.full_name}</Text>
      {/* PROFOLE BIO */}
      {currentUser?.bio && (
        <Box mt={SIZE.x2s}>
          <Text numberOfLines={2} style={styles.describe}>
            {currentUser?.bio}
          </Text>
        </Box>
      )}
      {/* PROFOLE LINK */}
      {currentUser?.instagram_link && (
        <Box mt={SIZE.x2s}>
          <TouchableOpacity activeOpacity={0.5} onPress={onPressLink}>
            <Text numberOfLines={2} style={styles.link}>
              Instagram
            </Text>
          </TouchableOpacity>
        </Box>
      )}
      {/* EDIT BUTTON */}
      <Box pt={20}>
        {!public_user_id ? (
          <CustomButton
            variant={BUTTON_VARIANTS.primary}
            onPress={handlePressEditProfile}
            title="Edit Profile"
            leftIcon="pen_edit"
            iconSize={28}
          />
        ) : (
          <CustomButton
            isLoading={isLoading}
            variant={
              currentUser?.is_followed_by_me
                ? BUTTON_VARIANTS.secondary
                : BUTTON_VARIANTS.primary
            }
            onPress={onPressFollow}
            title={currentUser?.is_followed_by_me ? 'Following' : 'Follow'}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProfileHeader;
