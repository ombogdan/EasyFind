import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { navigate } from 'shared/navigation/root-navigator.config';
import { searchActiveTabSelector, searchMusicEmptyResultSelector, searchMusicSelector } from 'shared/store/slices/search';
import { SearchTab } from 'shared/types';
import { Box } from 'shared/ui-kit/box';
import { AlbumTile } from '../album-tile';
import { SearchEmpty } from '../search-empty';
import { useStyles } from './music-tab.styles';

const MusicTab = () => {
  const styles = useStyles();
  const searchData = useSelector(searchMusicSelector);
  const active_tab = useSelector(searchActiveTabSelector);
  const is_empty_result = useSelector(searchMusicEmptyResultSelector);

  const handleViewAllAlbums = () => {
    navigate(AppUserRoutes.AllAlbums, {
      tracksData: searchData?.albums ?? [],
    });
  };

  const handleViewAllTracks = () => {
    navigate(AppUserRoutes.AllAlbums, {
      tracksData: searchData?.tracks ?? [],
    });
  };

  const handleViewAllArtists = () => {
    navigate(AppUserRoutes.AllAlbums, {
      tracksData: searchData?.artists ?? [],
      artist: true,
    });
  };

  if (active_tab !== SearchTab.MUSIC) {
    return null;
  }

  return (
    <Box pt={16}>
      {(searchData?.albums ?? []).length > 0 && (
        <>
          <Text style={styles.titleText}>Albums</Text>
          <Box pt={8}>
            {(searchData?.albums ?? []).slice(0, 4).map((album, index) => (
              <AlbumTile
                album={album}
                key={album.id}
                index={index}
                isTrack={false}
              />
            ))}
            {(searchData?.albums ?? []).length > 4 && (
              <TouchableOpacity
                onPress={handleViewAllAlbums}
                style={{ marginTop: 20, marginBottom: 36 }}
              >
                <Text style={styles.viewAllAlbums}>View All Albums</Text>
              </TouchableOpacity>
            )}
          </Box>
        </>
      )}
      {(searchData?.tracks ?? []).length > 0 && (
        <>
          <Text style={styles.titleText}>Tracks</Text>
          <Box pt={8}>
            {(searchData?.tracks ?? []).slice(0, 4).map((track, index) => (
              <AlbumTile album={track} key={track.id} index={index} isTrack />
            ))}
            {(searchData?.tracks ?? []).length > 4 && (
              <TouchableOpacity
                onPress={handleViewAllTracks}
                style={{ marginTop: 20 }}
              >
                <Text style={styles.viewAllAlbums}>View All Tracks</Text>
              </TouchableOpacity>
            )}
          </Box>
        </>
      )}
      {(searchData?.artists ?? []).length > 0 && (
        <Box pt={36}>
          <Text style={styles.titleText}>Artists</Text>
          <Box pt={8}>
            {(searchData?.artists ?? []).slice(0, 4).map((track, index) => (
              <AlbumTile album={track} key={track.id} index={index} isArtist />
            ))}
            {(searchData?.artists ?? []).length > 4 && (
              <TouchableOpacity
                onPress={handleViewAllArtists}
                style={{ marginTop: 20 }}
              >
                <Text style={styles.viewAllAlbums}>View All Artists</Text>
              </TouchableOpacity>
            )}
          </Box>
        </Box>
      )}
      {is_empty_result && <SearchEmpty />}
    </Box>
  );
};

export default MusicTab;
