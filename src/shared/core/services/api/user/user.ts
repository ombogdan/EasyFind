import { ReportType, SORTED_BY_FILTERS } from 'shared/types';
import { apiInstance } from '../apiInstance';
import { ReviewDataType } from './user.types';

export const createReport = (data: {
  review: number;
  message: string;
  type: ReportType;
}) => apiInstance.post(`/api/v1/spotify/reviews/report/`, data);

export const deleteAccount = () => apiInstance.delete(`/api/v1/user/me/`);

export const getAboutUs = () => apiInstance.get('/api/v1/user/about-us/');

export const getSpotifyRecommend = () =>
  apiInstance.get('/api/v1/spotify/recommend/');

export const getAuthUserActivity = (params: {
  limit: number;
  offset: number;
}) => apiInstance.get('/api/v1/spotify/activities/', { params });

export const updateUserPassword = (data: {
  password: string;
  new_password: string;
  new_password_confirm: string;
}) => apiInstance.patch('/api/v1/user/me/change-password/', data);

export const getSearchData = (data: {
  query_param: string;
  release_year?: number;
  sort_by?: SORTED_BY_FILTERS;
}) =>
  apiInstance.get('/api/v1/spotify/search/', {
    params: data,
  });

export const getSearchReviewData = (data: { query_param: string }) =>
  apiInstance.get('/api/v1/spotify/search/review/', {
    params: data,
  });

export const getSearchUsers = (data: {
  search: string;
  limit: number;
  offset: number;
}) =>
  apiInstance.get('/api/v1/user/search/', {
    params: data,
  });

export const getPopularReviews = (data: { limit: number; offset: number }) =>
  apiInstance.get('/api/v1/spotify/reviews/popular/', {
    params: data,
  });

export const getFollowingsReviews = (data: { limit: number; offset: number }) =>
  apiInstance.get('/api/v1/spotify/reviews/followings/', {
    params: data,
  });

export const getUserReviewsByUserId = (data: {
  limit: number;
  offset: number;
  user_id: number;
}) =>
  apiInstance.get(`/api/v1/spotify/${data.user_id}/reviews/`, {
    params: {
      limit: data.limit,
      offset: data.offset,
    },
  });

export const getSpotifyReleases = (params: { limit: number; offset: number }) =>
  apiInstance.get('/api/v1/spotify/new-releases/', { params });

export const getSpotifyPopulars = (params: { limit: number; offset: number }) =>
  apiInstance.get('/api/v1/spotify/populars/', { params });

export const getRecentActivity = (user_id?: number) =>
  apiInstance.get(
    `/api/v1/spotify/recent/activity${user_id ? `/${user_id}/` : '/'}`,
  );

export const getUserReviewRating = (user_id?: number) =>
  apiInstance.get(
    `/api/v1/spotify/rating/reviews/user${user_id ? `/${user_id}/` : '/'}`,
  );

export const getTracksByGenre = (data: {
  genre_seed: string;
  limit: number;
  offset: number;
}) =>
  apiInstance.get('/api/v1/spotify/list/tracks/', {
    params: data,
  });

export const getTrackDetail = (id: string) =>
  apiInstance.get(`/api/v1/spotify/tracks/${id}/`);

export const getAlbumDetail = (id: string) =>
  apiInstance.get(`/api/v1/spotify/albums/${id}/`);

export const getArtistsDetail = (id: string) =>
  apiInstance.get(`/api/v1/spotify/artists/${id}/`);

export const saveReview = (id: string, type: string, data: ReviewDataType) =>
  apiInstance.post(`/api/v1/spotify/reviews/${type}/${id}/`, data);

export const updateReview = (id: string, data: ReviewDataType) =>
  apiInstance.patch(`/api/v1/spotify/reviews/${id}/`, data);

export const getReviewsList = (id: string, type: string, limit: number, offset: number) =>
  apiInstance.get(`/api/v1/spotify/reviews/${type}/${id}/`, {params: {
    limit,
    offset
  }});

export const getMyReview = (id: string, type: string) =>
  apiInstance.get(`/api/v1/spotify/reviews/${type}/${id}/`, {
    params: { only_my: true },
  });

export const getReviewDetail = (id: number) =>
  apiInstance.get(`/api/v1/spotify/reviews/${id}/`);

export const deleteReview = (id: number) =>
  apiInstance.delete(`/api/v1/spotify/reviews/${id}/`);

export const changeLike = (id: number, data: { like: boolean | null }) =>
  apiInstance.patch(`/api/v1/spotify/reviews/like/${id}/`, data);

export const getComments = (data: {
  id: number;
  limit: number;
  offset: number;
}) =>
  apiInstance.get(`/api/v1/spotify/comments/`, {
    params: data,
  });

export const addNewComment = (data: { text: string; object_review: number }) =>
  apiInstance.post(`/api/v1/spotify/comments/`, data);

export const changeComment = (id: number, data: { text: string }) =>
  apiInstance.patch(`/api/v1/spotify/comments/${id}/`, data);

export const deleteComment = (id: number) =>
  apiInstance.delete(`/api/v1/spotify/comments/${id}/`);

export const likeComment = (id: number, data: { like: boolean | null }) =>
  apiInstance.patch(`/api/v1/spotify/comments/like/${id}/`, data);

export const getReplies = (data: {
  id: number;
  limit: number;
  offset: number;
}) =>
  apiInstance.get(`/api/v1/spotify/reply/`, {
    params: data,
  });

export const addNewReplies = (data: {
  user_tag: number;
  text: string;
  object_comment: number;
}) => apiInstance.post(`/api/v1/spotify/reply/`, data);

export const changeReply = (id: number, data: { text: string }) =>
  apiInstance.patch(`/api/v1/spotify/reply/${id}/`, data);

export const deleteReply = (id: number) =>
  apiInstance.delete(`/api/v1/spotify/reply/${id}/`);

export const likeReply = (id: number, data: { like: boolean | null }) =>
  apiInstance.patch(`/api/v1/spotify/reply/like/${id}/`, data);

// CUSTOM MUSIC LIST
export const getUserMusicList = (data: {
  is_pinned?: boolean;
  is_me?: boolean;
  limit: number;
  offset: number;
  user_id?: number;
  recommended?: boolean;
}) =>
  apiInstance.get(
    `/api/v1/spotify${
      data.user_id ? `/${data.user_id}/` : '/'
    }list/custom/music/`,
    {
      params: data,
    },
  );

export const getCustomMusicById = (id: number) =>
  apiInstance.get(`/api/v1/spotify/list/custom/music/${id}/`);

export const createCustomMusic = (data: {
  name: string;
  describe: string;
  make_public: boolean;
  pinned: boolean;
}) => apiInstance.post(`/api/v1/spotify/list/custom/music/`, data);

export const createCustomMusicComment = (
  id: number,
  data: {
    id: number;
    list_music: number; // list_music === id
    user: number;
    content: string;
    parent: number | null;
  },
) =>
  apiInstance.post(`/api/v1/spotify/list/custom/music/${id}/comments/`, data);

export const updateCustomMusicComment = (params: {
  id: number;
  comment_id: number;
  content: string;
}) =>
  apiInstance.patch(
    `/api/v1/spotify/list/custom/music/${params.id}/comments/${params.comment_id}/`,
    { content: params.content },
  );

export const updateCustomMusicCommentLike = (params: {
  id: number;
  comment_id: number;
  like: boolean;
}) =>
  apiInstance.patch(
    `/api/v1/spotify/list/custom/music/${params.id}/comments/${params.comment_id}/likes/`,
    { like: params.like },
  );

export const deleteCustomMusicComment = (id: number, comment_id: number) =>
  apiInstance.delete(
    `/api/v1/spotify/list/custom/music/${id}/comments/${comment_id}/`,
  );

export const getCustomMusicComments = (
  id: number,
  params: {
    limit: number;
    offset: number;
  },
) =>
  apiInstance.get(`/api/v1/spotify/list/custom/music/${id}/comments/`, {
    params,
  });

export const updateCustomMusic = (
  id: number,
  data: {
    name: string;
    describe: string;
    make_public: boolean;
    pinned: boolean;
  },
) => apiInstance.patch(`/api/v1/spotify/list/custom/music/${id}/`, data);

export const deleteCustomMusic = (id: number) =>
  apiInstance.delete(`/api/v1/spotify/list/custom/music/${id}/`);

export const setCustomMusicTracks = (id: number, data: {}) =>
  apiInstance.put(`/api/v1/spotify/list/custom/music/${id}/tracks/`, data);

export const updateCustomMusicLike = (id: number, like: boolean) =>
  apiInstance.patch(`/api/v1/spotify/list/custom/music/${id}/likes/`, { like });

// USER PROFILE
export const updateUserProfile = (data: {
  username: string;
  full_name: string;
  bio: string;
  instagram_link: string;
}) => apiInstance.put(`/api/v1/user/me/`, data);

export const addUserAvatar = (avatar: FormData) =>
  apiInstance.patch(`/api/v1/user/avatars/`, avatar, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const deleteUserAvatar = () =>
  apiInstance.delete(`/api/v1/user/avatars/`);

export const getUserProfile = () => apiInstance.get('/api/v1/user/me/');

export const updateFavoriteMusic = (data: any) =>
  apiInstance.put('/api/v1/spotify/favorite-albums/', data);

export const getFavoriteMusic = (user_id?: number) =>
  apiInstance.get(
    `/api/v1/spotify/favorite-albums${user_id ? `/${user_id}/` : '/'}`,
  );

export const getUserStats = (user_id: number) =>
  apiInstance.get(`/api/v1/user/stats/${user_id}/`);

export const getUserInfo = (user_id: number) =>
  apiInstance.get(`/api/v1/user/${user_id}/`);

// FOLLOWERS
export const createFollower = (
  user_id: number, // auth user id
  params: {
    author: number; // user_id to which we subscribe
    follower: number; // auth user id
  },
) => apiInstance.post(`/api/v1/user/${user_id}/followers/`, params);

export const deleteFollower = (user_id: number, author_id: number) =>
  apiInstance.delete(`/api/v1/user/${user_id}/unfollow/${author_id}/`);

export const getFollowers = (
  user_id: number,
  params: {
    limit: number;
    offset: number;
  },
) => apiInstance.get(`/api/v1/user/${user_id}/followers/`, { params });

export const getFollowing = (
  user_id: number,
  params: {
    limit: number;
    offset: number;
  },
) => apiInstance.get(`/api/v1/user/${user_id}/following/`, { params });
