import React from "react";
import { SafeAreaView, Text } from "react-native";
import { Box } from "ui-kit/box";
import { useStyles } from "./home.styles";
import { SearchBar } from "./components/search-bar";

const Home = () => {
  const styles = useStyles();

  const handleOpenSearch = () => {

  };

  return (
    <SafeAreaView style={styles.container}>
      <Box pl={16} pr={16}>
      <SearchBar onPress={handleOpenSearch} />
      </Box>
    </SafeAreaView>
  );
};

export default Home;
