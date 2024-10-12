export enum ReportType {
  this_is_spam = 'this_is_spam',
  abusive_or_harmful = 'abusive_or_harmful',
  hateful_speech = 'hateful_speech',
  contains_false_information = 'contains_false_information',
  expresses_thoughts_self_harm = 'expresses_thoughts_self_harm',
  advocates_violence = 'advocates_violence',
  other = 'other',
}

export enum SORTED_BY_FILTERS {
  hight_rate = 'Highest Rated',
  new_releases = 'New Releases',
  popular_all_time = 'Most Popular (All Time)',
  popular_this_week = 'Most Popular (This Week)',
}

export enum SearchTab {
  MUSIC = 1,
  REVIEWS = 2,
  USERS = 3,
}

export type Track = {
  album?: {
    id: string;
  }
  id: string;
  name: string;
  icon: string;
  image: { url: string }[];
  artist: { name: string; href: string }[];
};

export enum FollowerParamActionType {
  FOLLOWERS = 'followers',
  FOLLOWING = 'following',
}

export type SpotifyMediaType = 'artists' | 'albums' | 'tracks';

export enum LoadingType {
  FETCH,
  REFRESH,
  FETCH_MORE,
  COMPLETE,
}

export type SpotifyImage = {
  height: number;
  url: string;
  width: number;
};

export type SpotifySearch = {
  id: string;
  name: string;
  image: SpotifyImage[];
  artist?: {
    id: string;
    name: string;
  }[];
};

export interface SpotifySearchResponse {
  albums: SpotifySearch[];
  artists: SpotifySearch[];
  tracks: SpotifySearch[];
}

export interface SpotifyAlbum {
  artist: any[];
  id: string;
  image: SpotifyImage;
  name: string;
  averageRating: number;
}

export interface SpotifyEntity extends Omit<SpotifyAlbum, 'artist' | 'image'> {
  artist: string;
  image: SpotifyImage[];
  type_object: SpotifyMediaType;
}

export type RecentActivity = {
  artists_obj: any[];
  id: string;
  photo: SpotifyImage;
  name: string;
  type_obj: SpotifyMediaType;
  averageRating: number;
};

export type TrackDetailType = {
  artists: {
    name: string;
    photo: { url: string };
    id: string;
    genres: string[];
  }[];
  averageRating: number;
  totalRating: number;
  yourRating: number;
  yourReviewId: number | null;
  friendsRating: {}[];
  ratings: number[];
  id: string;
  information: {
    duration: number[];
    dataRelease?: string;
    type?: string;
  };
  listsWith: {}[];
  name: string;
  photo: { url: string };
  topReviews: {}[];
};

export type ArtistDetailType = {
  averageRating: number;
  describe: string;
  friendsRating: {}[];
  genres: string[];
  id: string;
  listsWith: {}[];
  name: string;
  photo: { url: string };
  topReviews: {}[];
  totalRating: number;
  yourRating: number;
  yourReviewId: number | null;
  most_popular: TrackDetailType[];
  ratings: number[];
};

export type ReviewType = {
  id: number;
  rate: number;
  text: string;
  title: string;
  user: { email: string; full_name: string; id: number, avatar: string | null };
  create_at: string;
  like: number;
  dislike: number;
  user_liked: boolean;
  user_disliked: boolean;
  object_type: string;
  object_name: string;
  object_spotify: SpotifyEntity;
  total: number;
};

export type CommentType = {
  dislike: number;
  id: number;
  like: number;
  text: string;
  user: { email: string; id: number; username: string, avatar: string | null };
  user_disliked: boolean;
  user_liked: boolean;
  user_tag: number;
  total: number;
  replycomment_set: {
    dislike: number;
    id: number;
    like: number;
    text: string;
    user: { email: string; id: number; username: string };
    user_disliked: boolean;
    user_liked: boolean;
    user_tag: number;
  }[];
};

// SEARCH
export enum SearchActiveTab {
  MUSIC,
  USERS,
  REVIEWS,
}

// CUSTOM MUSIC
export type CustomMusicTrackItem = SpotifySearch & {
  type_object: SpotifyMediaType;
  artist: string;
};

export type CustomMusicTrack = {
  id: number | string;
  object_spotify: CustomMusicTrackItem;
  order_no: number;
};

export type CustomMusicList = {
  id: number;
  name: string;
  describe: string;
  user?: {
    email: string;
    full_name: string;
    id: number;
    username: string;
    avatar: string | null;
  };
  create_at: string;
  updated_at: string;
  list_music: CustomMusicTrack[];
  likes_count: number;
  dislikes_count: number;
  user_liked: boolean;
  user_disliked: boolean;
  make_public: boolean;
  pinned: boolean;
};

export type CustomMusicListComment = {
  content: string;
  create_at: string;
  dislikes_count: number;
  id: number;
  likes_count: number;
  list_music: number;
  replies: CustomMusicListComment[];
  updated_at: string;
  user: Omit<AuthData, 'bio' | 'instagram_link'>;
  user_disliked: boolean;
  user_liked: boolean;
};

export interface AuthData {
  id: number;
  avatar: string | null;
  bio: string;
  email: string;
  full_name: string;
  instagram_link: string | null;
  username: string;
  is_followed_by_me: boolean;
  is_following_me: boolean;
  auth_type: 'email' | 'google' | 'apple'
}

export enum ActivityType {
  following_you = 'following_you',
  liked_custom_list = 'liked_custom_list',
  liked_review = 'liked_review',
  liked_comment_review = 'liked_comment_review',
  liked_comment_custom_list = 'liked_comment_custom_list',
  replied_comment_custom_list = 'replied_comment_custom_list',
  replied_comment_review = 'replied_comment_review',
  commented_custom_list = 'commented_custom_list',
  commented_review = 'commented_review',
  liked_replied_comment_review = 'liked_replied_comment_review',
}

export type Activity = {
  id: number; // event id
  receiver: AuthData;
  recipient: number; // auth user
  event_type: ActivityType;
  created_at: string;
  custom_list: CustomMusicList | null;
  review: ReviewType | null;
  reply_comment_review: {
    content: string;
    object_comment: {object_review: ReviewType};
  } | null;
  comment_review: {
    content: string;
    object_review: ReviewType;
  } | null;
  custom_list_comment: {
    content: string;
    list_music: CustomMusicList;
  } | null;
};
