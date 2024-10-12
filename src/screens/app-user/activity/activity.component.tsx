import React from 'react';
import { RefreshControl, SafeAreaView, SectionList, View } from 'react-native';
import { Title } from 'shared/ui-kit/title';
import { SIZE } from 'shared/constants';
import { Box } from 'shared/ui-kit/box';
import { ActivityItem } from './components/activity-item';
import { Section } from './activity.types';
import { LoadingIndicator } from './components/loading-indicator';
import { useStyles } from './activity.styles';
import useActivity from './activity.hook';
import { ActivityEmpty } from './components/activity-empty';

const Activity = () => {
  const styles = useStyles();
  const { loading, filteredSections, onRefresh, is_refreshing } = useActivity();

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <Box mt={SIZE.xl} mb={SIZE.md}>
      <Title text={section.title} />
    </Box>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        {loading && <LoadingIndicator />}
        {!loading && !filteredSections.length && <ActivityEmpty />}
        <SectionList
          refreshControl={
            <RefreshControl
              refreshing={is_refreshing}
              onRefresh={onRefresh}
            />
          }
          stickySectionHeadersEnabled={false}
          contentContainerStyle={styles.listContainer}
          sections={filteredSections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ActivityItem item={item} />}
          renderSectionHeader={renderSectionHeader}
        />
      </SafeAreaView>
    </View>
  );
};

export default Activity;
