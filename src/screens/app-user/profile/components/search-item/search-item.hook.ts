import { CustomMusicTrack, SpotifyMediaType, SpotifySearch } from 'shared/types';
import { useTypedDispatch } from 'shared/store';
import { useSelector } from 'react-redux';
import {
  profileActions,
  profileFavoriteMusicSelector,
  profileIsFavoriteSelector,
  profileSelectedMusicSelector,
} from 'shared/store/slices/profile';
import { goBack } from 'shared/navigation/root-navigator.config';
import { useUpdateFavoriteMusic } from 'shared/hooks/api';

const useSearchItem = () => {
  const dispatch = useTypedDispatch();
  const selectedItems = useSelector(profileSelectedMusicSelector);
  const is_favorite_select = useSelector(profileIsFavoriteSelector);
  const favorite_music = useSelector(profileFavoriteMusicSelector);
  const { editFavoriteMusic } = useUpdateFavoriteMusic();

  const onPressItem = (item: SpotifySearch, type_object: SpotifyMediaType) => () => {
    const convertItem: CustomMusicTrack = {
      id: 0,
      order_no: favorite_music.length + 1,
      object_spotify: {
        ...item,
        type_object,
        artist: item?.artist?.length ? item?.artist[0]?.name : '',
      },
    };

    if (is_favorite_select) {
      editFavoriteMusic({
        successCallback: (data) =>
          dispatch(profileActions.setFavoriteMusicList(data)),
        props: [...favorite_music, convertItem],
      });
    } else {
      dispatch(profileActions.setSelectedMusic({...convertItem, id: convertItem.object_spotify.id}));
    }
    if (is_favorite_select) {
      goBack();
    }
  };
  return { onPressItem, selectedItems, is_favorite_select };
};

export default useSearchItem;
