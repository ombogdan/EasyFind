import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { Header } from "components/header";
import { AlbumTile } from "screens/app-user/search/components/album-tile";
import { Box } from "ui-kit/box";
import { getTracksByGenre } from "services/api/user/user";
import { Track } from "shared/types";
import { useStyles } from "./genre-detail.styles";

type AllAlbumsProps = {
  route: { params: { name: string } }
};

const GenreDetailScreen = ({ route }: AllAlbumsProps) => {
  const styles = useStyles();
  const { name } = route?.params ?? {};
  const [tracksData, setTracksData] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const fetchMoreTracks = async () => {
    setLoading(true);
    try {
      const data = await getTracksByGenre({ genre_seed: name.toLowerCase(), limit: 10, offset });
      if (data.data.tracks.length > 0) {
        setTracksData([...tracksData, ...data.data.tracks]);
        setOffset(offset + 10);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreTracks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header name={name} backButton />
      <FlatList
        data={tracksData}
        renderItem={({ item, index }) => (
          <Box ml={16} mr={16}>
            <AlbumTile album={item} key={item.id.toString()} index={index} isTrack/>
          </Box>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 20 }}
        onEndReached={fetchMoreTracks}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
    </SafeAreaView>
  );
};

export default GenreDetailScreen;
