import { StyleSheet } from 'react-native';
import { SIZE } from 'shared/constants';
import { createStyles } from 'shared/theme/createStyles';

const IMAGE_SIZE = 56;

export const useStyles = createStyles(({scale}: any) =>
  StyleSheet.create({
    container: {
      overflow: 'hidden',
      borderRadius: scale(SIZE.sm),
      height: scale(IMAGE_SIZE),
      width: scale(IMAGE_SIZE),
    },
    imageThumb: {
      width: scale(IMAGE_SIZE / 2),
      height: scale(IMAGE_SIZE / 2),
    },
    image: {
      width: scale(IMAGE_SIZE),
      height: scale(IMAGE_SIZE),
      borderRadius: scale(SIZE.sm),
    }
  }),
);
