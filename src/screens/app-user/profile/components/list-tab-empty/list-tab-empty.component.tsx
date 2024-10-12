import { Text } from 'react-native';
import React from 'react';
import { navigate } from 'shared/navigation/root-navigator.config';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { Box } from 'shared/ui-kit/box';
import {
  BUTTON_VARIANTS,
  FONT_SIZE,
  SCREEN_WIDTH,
  SIZE,
} from 'shared/constants';
import { CustomButton } from 'shared/ui-kit/custom-button';

const ListTabEmpty = () => {
  const onPressCreateList = () => {
    navigate(AppUserRoutes.ListForm);
  };

  return (
    <>
      <Box mt={SIZE.md} pl={SIZE.md} pr={SIZE.md}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '600',
            fontSize: FONT_SIZE.xl,
          }}
        >
          You have not created any lists yet
        </Text>
      </Box>
      <Box alignItems="center" mt={SIZE.xl}>
        <CustomButton
          containerStyle={{
            width: SCREEN_WIDTH * 0.5,
          }}
          variant={BUTTON_VARIANTS.secondary}
          onPress={onPressCreateList}
          title="Create a new list"
        />
      </Box>
    </>
  );
};

export default ListTabEmpty;
