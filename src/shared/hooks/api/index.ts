import useFetchReleases from './spotify/useFetchReleases';
import useFetchPopular from './spotify/useFetchPopular';
import useGetActivity from './useGetActivity';
import useGetUserReviewsRating from './useGetUserReviewsRating';
import useGetUserReviews from './useGetUserReviews';
import useSearchMusic from './spotify/useSearchMusic';
import useGetMusicList from './music-list/useGetMusicList';
import useCreateCustomMusic from './music-list/useCreateCustomMusic';
import useUpdateCustomMusic from './music-list/useUpdateCustomMusic';
import useDeleteCustomMusic from './music-list/useDeleteCustomMusic';
import useUpdateCustomMusicTracks from './music-list/useUpdateCustomMusicTracks';
import useUpdateCustomMusicLike from './music-list/useUpdateCustomMusicLike';
import useUpdateProfile from './profile/useUpdateProfile';
import useUpdateAvatar from './profile/useUpdateAvatar';
import useDeleteAvatar from './profile/useDeleteAvatar';
import useFetchProfile from './profile/useFetchProfile';
import useUpdateFavoriteMusic from './profile/useUpdateFavoriteMusic';
import useFetchFavoriteMusic from './profile/useFetchFavoriteMusic';
import useFetchCustomMusicComments from './music-list/useFetchCustomMusicComments';
import useFetchCustomMusicById from './music-list/useFetchCustomMusicById';
import useDeleteCommentCustomMusic from './music-list/useDeleteCommentCustomMusic';
import useUpdateCustomMusicComment from './music-list/useUpdateCustomMusicComment';
import useUpdateCustomMusicCommentLike from './music-list/useUpdateCustomMusicCommentLike';
import useFetchUserStats from './profile/useFetchUserStats';
import useFetchUserInfo from './profile/useFetchUserInfo';
import useCreateFollower from './following/useCreateFollower';
import useDeleteFollower from './following/useDeleteFollower';
import useFetchFollowers from './following/useFetchFollowers';
import useFetchPopularReviews from './reviews/useFetchPopularReviews';
import useFetchFollowingsReviews from './reviews/useFetchFollowingsReviews';
import useFetchReviewsByMusicId from './reviews/useFetchReviewsByMusicId';
import useCreateReport from './useCreateReport';
import useUpdatePassword from './profile/useUpdatePassword';
import useDeleteAccount from './profile/useDeleteAccount';
import useFetchAboutUs from './useFetchAboutUs';
import useFetchAuthActivity from './activity/useFetchAuthActivity';
import useSignUpApple from './auth/useSignUpApple';

export {
  useFetchAuthActivity,
  useGetActivity,
  useCreateReport,
  useGetUserReviewsRating,
  useSearchMusic,
  useFetchAboutUs,
  // SPOTIFY
  useFetchReleases,
  useFetchPopular,
  // MUSIC LIST
  useGetMusicList,
  useCreateCustomMusic,
  useUpdateCustomMusic,
  useDeleteCustomMusic,
  useUpdateCustomMusicTracks,
  useUpdateCustomMusicLike,
  useFetchCustomMusicById,
  useFetchCustomMusicComments,
  useDeleteCommentCustomMusic,
  useUpdateCustomMusicComment,
  useUpdateCustomMusicCommentLike,
  // USER PROFILE
  useDeleteAvatar,
  useUpdateAvatar,
  useUpdateProfile,
  useFetchProfile,
  useUpdateFavoriteMusic,
  useFetchFavoriteMusic,
  useFetchUserStats,
  useFetchUserInfo,
  useUpdatePassword,
  useDeleteAccount,
  // FOLLOWING
  useCreateFollower,
  useDeleteFollower,
  useFetchFollowers,
  // REVIEWS
  useFetchPopularReviews,
  useFetchFollowingsReviews,
  useGetUserReviews,
  useFetchReviewsByMusicId,
  // AUTH
  useSignUpApple
};
