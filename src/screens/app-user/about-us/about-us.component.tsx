import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { Header } from "shared/components/header";
import { useFetchAboutUs } from "shared/hooks/api";
import { Box } from "shared/ui-kit/box";
import { LoadingType } from "shared/types";
import { FullScreenLoader } from "shared/ui-kit/full-screen-loader";
import { useStyles } from "./about-us.styles";

const AboutUs = () => {
  const styles = useStyles();
  const {loading, content, fetchAboutUs} = useFetchAboutUs();

  useEffect(() => {
    fetchAboutUs();
  }, [])

  return (
    <Box flex={1}>
      <SafeAreaView style={styles.container}>
        <Header name="About Us" backButton />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.text}>
            {content}
          </Text>
        </ScrollView>
      </SafeAreaView>
      {loading === LoadingType.FETCH && <FullScreenLoader />}
    </Box>
  );
};

export default AboutUs;
