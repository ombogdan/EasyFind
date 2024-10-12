import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { AppIcon } from 'shared/assets';
import { BUTTON_VARIANTS, SIZE } from 'shared/constants';
import { SORTED_BY_FILTERS } from 'shared/types';
import { Box } from 'shared/ui-kit/box';
import { CustomButton } from 'shared/ui-kit/custom-button';
import { FilterItem } from './components/filter-item';
import { getYears } from './data';
import useSearchFilters from './search-filters.hook';
import { useStyles } from './search-filters.styles';

const SearchFilters = () => {
  const styles = useStyles();
  const {
    onPressApply,
    onPressClearAll,
    onPressFilterTitle,
    onPressYearFilter,
    onPressCancel,
    onPressSortedByFilter,
    visibleFilters,
    selectedYear,
    sortedByFilters,
  } = useSearchFilters();

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        {/* CANCELL BUTTON */}
        <TouchableOpacity onPress={onPressCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Filter</Text>
        {/* CLEAR BUTTON */}
        <TouchableOpacity onPress={onPressClearAll}>
          <Text style={styles.buttonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      {/* FILTERS */}
      <Box flex={1} pl={SIZE.md} pr={SIZE.md} pt={SIZE.xl}>
        <Box style={styles.border} />
        {/* SORTED BY */}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressFilterTitle('sorted_by')}
        >
          <View style={styles.filterTitleContainer}>
            <Text style={styles.filterTitle}>Sorted by</Text>
            {/* ARROW */}
            <View style={styles.arrowContainer}>
              <View
                style={{
                  transform: [
                    { rotate: visibleFilters.sorted_by ? '0deg' : '90deg' },
                  ],
                }}
              >
                <AppIcon name="arrow_right_small" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {/* SORTED BY ITEMS */}
        {visibleFilters.sorted_by && (
          <Box
            pl={SIZE.sm}
            pb={SIZE.md}
            direction="row"
            style={{
              flexWrap: 'wrap',
              gap: SIZE.sm,
            }}
          >
            {Object.values(SORTED_BY_FILTERS).map((filter) => (
              <TouchableOpacity
                onPress={onPressSortedByFilter(filter)}
                key={filter}
                activeOpacity={0.5}
              >
                <FilterItem
                  value={filter}
                  is_selected={sortedByFilters === filter}
                />
              </TouchableOpacity>
            ))}
          </Box>
        )}
        <Box style={styles.border} />
        {/* RELEASE YEAR */}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPressFilterTitle('release_year')}
        >
          <View style={styles.filterTitleContainer}>
            <Text style={styles.filterTitle}>Release Year</Text>
            {/* ARROW */}
            <View style={styles.arrowContainer}>
              <View
                style={{
                  transform: [
                    {
                      rotate: visibleFilters.release_year ? '0deg' : '90deg',
                    },
                  ],
                }}
              >
                <AppIcon name="arrow_right_small" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {/* RELEASE YEAR ITEMS */}
        {visibleFilters.release_year && (
          <Box
            pl={SIZE.sm}
            pb={SIZE.md}
            direction="row"
            style={{
              flexWrap: 'wrap',
              gap: SIZE.sm,
            }}
          >
            {getYears().map((year) => (
              <TouchableOpacity
                onPress={onPressYearFilter(year)}
                key={year}
                activeOpacity={0.5}
              >
                <FilterItem value={year} is_selected={selectedYear === year} />
              </TouchableOpacity>
            ))}
          </Box>
        )}
        <Box style={styles.border} />
      </Box>
      {/* APPLY BUTTON */}
      <Box pl={SIZE.md} pr={SIZE.md} pb={SIZE.md}>
        <CustomButton
          variant={BUTTON_VARIANTS.primary}
          onPress={onPressApply}
          title="Apply Filters"
        />
      </Box>
    </SafeAreaView>
  );
};

export default SearchFilters;
