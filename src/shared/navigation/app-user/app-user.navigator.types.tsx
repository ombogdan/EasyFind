import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { CustomMusicList, FollowerParamActionType, SpotifyMediaType, Track } from 'shared/types';
import { ViewReviewProps } from 'screens/app-user/view-review/view-review.types';
import { RateTrackProps } from 'screens/app-user/rate-track/rate-track.types';
import { AppUserRoutes } from './app-user.navigator.enums';

export type AppUserRoutesParamList = {
  [AppUserRoutes.HomeTabNavigation]: {} | undefined;
  [AppUserRoutes.Home]: {} | undefined;
  [AppUserRoutes.EnterYourNickname]: {} | undefined;
  [AppUserRoutes.SearchFilters]: {} | undefined;
  [AppUserRoutes.AllAlbums]: { tracksData: Track[] };
  [AppUserRoutes.TrackDetail]: { trackId: string };
  [AppUserRoutes.GenreDetailScreen]: { name: string; genreId: string };
  [AppUserRoutes.RateTrack]: RateTrackProps;
  [AppUserRoutes.ArtistDetail]: { artistId: string };
  [AppUserRoutes.ViewReview]: ViewReviewProps;
  [AppUserRoutes.Settings]: {} | undefined;
  [AppUserRoutes.ListForm]: { item: CustomMusicList } | undefined;
  [AppUserRoutes.SearchMusic]: {} | undefined;
  [AppUserRoutes.SearchViewAllMusic]: {search: string, tracksData: any[], type_object?: SpotifyMediaType} | undefined;
  [AppUserRoutes.CustomListMusic]: {user_id: number} | undefined;
  [AppUserRoutes.PinnedList]: {public_user_id?: number, recommended?: boolean} | undefined;
  [AppUserRoutes.EditProfile]: {} | undefined;
  [AppUserRoutes.CustomListDetails]: {item: CustomMusicList};
  [AppUserRoutes.PublicProfile]: {user_id: number, username: string};
  [AppUserRoutes.Followers]: {user_id: number, username: string, action: FollowerParamActionType};
  [AppUserRoutes.Report]: {review_id: number};
  [AppUserRoutes.HelpAndSupport]: undefined;
  [AppUserRoutes.ChangePassword]: undefined;
  [AppUserRoutes.AboutUs]: undefined;
  [AppUserRoutes.TrackReviewList]: {music_id: string, type: SpotifyMediaType};
};

export type AppUserRoutesNavigationProps =
  StackNavigationProp<AppUserRoutesParamList>;

export type AppUserRouteProps<RouteName extends keyof AppUserRoutesParamList> =
  RouteProp<AppUserRoutesParamList, RouteName>;
