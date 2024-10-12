import React from "react";
import { Header } from "components/header";
import { FlatList, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { AlbumTile } from "screens/app-user/search/components/album-tile";
import { searchValueSelector } from "shared/store/slices/search";
import { Track } from "shared/types";
import { Box } from "ui-kit/box";
import { useStyles } from "./all-albums.styles";

type AllAlbumsProps = {
  route: { params: { tracksData: Track[] } }
}
const AllAlbumsScreen = ({ route }: AllAlbumsProps) => {
  const styles = useStyles();
  const { tracksData } = route?.params ?? {};
  const search = useSelector(searchValueSelector);

  return (
    <SafeAreaView style={styles.container}>
      <Header name={search} backButton />
      <FlatList
        data={tracksData}
        renderItem={({ item, index }) => (
          <Box ml={16} mr={16}>
            <AlbumTile album={item} key={item.id} index={index} />
          </Box>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 20 }}
      />
    </SafeAreaView>
  );
};

export default AllAlbumsScreen;
