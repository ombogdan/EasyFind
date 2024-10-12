import { TouchableOpacity } from 'react-native';
import React from 'react';
import { SIZE } from 'shared/constants';
import { Shadow } from 'shared/ui-kit/shadow';
import { Box } from 'shared/ui-kit/box';
import { MediaCard } from 'shared/components/media-card';
import { useScale } from 'shared/hooks/useScale';
import { useTheme } from 'shared/theme/ThemeProvider';
import { SpotifyMediaType, SpotifySearch } from 'shared/types';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useStyles } from './search-item.styles';
import useSearchItem from './search-item.hook';

interface Props {
  entity: SpotifySearch;
  type_object: SpotifyMediaType;
}

const SearchItem = ({ entity, type_object }: Props) => {
  const scale = useScale();
  const { theme } = useTheme();
  const styles = useStyles();
  const { onPressItem, selectedItems, is_favorite_select } = useSearchItem();

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPressItem(entity, type_object)}>
      <Box mt={SIZE.sm}>
        <Shadow radius={16} />
        <Box direction="row" alignItems="center" style={styles.itemContainer}>
          <MediaCard
            uri={entity.image[0].url}
            title={entity.name}
            name={entity?.artist?.length ? entity.artist[0].name : ''}
          />
          {!is_favorite_select && (
            <Box>
              <BouncyCheckbox
                size={scale(SIZE.lg)}
                isChecked={Boolean(
                  selectedItems.find((i) => i.object_spotify.id === entity.id),
                )}
                fillColor={theme.palette.orange}
                unFillColor={theme.palette.white}
                innerIconStyle={{
                  borderWidth: scale(SIZE.xs),
                  borderRadius: scale(SIZE.s),
                }}
                iconStyle={{
                  borderRadius: scale(SIZE.s),
                }}
                onPress={onPressItem(entity, type_object)}
              />
            </Box>
          )}
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default SearchItem;
