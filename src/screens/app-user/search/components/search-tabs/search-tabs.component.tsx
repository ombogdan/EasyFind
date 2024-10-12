import React from 'react';
import { useSelector } from 'react-redux';
import { OutlineTabs } from 'shared/components/outline-tabs';
import { useTypedDispatch } from 'shared/store';
import {
  searchActions,
  searchActiveTabSelector,
} from 'shared/store/slices/search';
import { SearchTab } from 'shared/types';
import { SearchTabsData } from '../../search.types';

const SearchTabs = () => {
  const dispatch = useTypedDispatch();
  const active_tab = useSelector(searchActiveTabSelector);

  const handleChangeTab = (activeTab: number | string) => {
    dispatch(searchActions.setSearchActiveTab(activeTab as number));
  };

  return (
    <OutlineTabs
      actions={SearchTabsData}
      activeTab={active_tab || SearchTab.MUSIC}
      onChangeTab={handleChangeTab}
    />
  );
};

export default SearchTabs;
