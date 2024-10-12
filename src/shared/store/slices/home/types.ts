import { LoadingType, SpotifyEntity } from 'shared/types';

export interface HomeState {
  loading: LoadingType;
  popular: SpotifyEntity[];
  releases: SpotifyEntity[];
}
