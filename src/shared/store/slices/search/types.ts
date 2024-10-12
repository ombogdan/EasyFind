import {
  AuthData,
  LoadingType,
  ReviewType,
  SORTED_BY_FILTERS,
  SearchTab,
  SpotifyAlbum,
  SpotifyImage,
  SpotifySearchResponse,
} from 'shared/types';

export interface SearchState {
  search_value: string;
  active_tab: SearchTab | null;
  is_loading: LoadingType;
  sorted_by_filter: SORTED_BY_FILTERS | null;
  years_filter: number | null;
  music: SpotifySearchResponse;
  reviews: ReviewType[];
  users: AuthData[];
  recommended: {
    genre: { image: SpotifyImage[]; name: string }[];
    most_popular: Omit<SpotifyAlbum, 'averageRating'>[];
  };
}
