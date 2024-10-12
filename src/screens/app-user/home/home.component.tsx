import React from 'react';
import { HotRelease } from './components/hot-release';
import { LayoutContainer } from './components/layout-container';
import { RecommendedList } from './components/recommended-list';
import { TimelineReviews } from './components/timeline-reviews';

const Home = () => (
  <LayoutContainer>
    {/* HOT RELEASES */}
    <HotRelease />
    {/* RECOMMENDED LIST */}
    <RecommendedList />
    {/* TIMELINE REVIEWS */}
    <TimelineReviews />
  </LayoutContainer>
);

export default Home;
