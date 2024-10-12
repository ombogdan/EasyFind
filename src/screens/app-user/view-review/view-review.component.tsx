import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  addNewComment,
  addNewReplies,
  changeComment,
  changeLike,
  changeReply,
  deleteReview,
  getAlbumDetail,
  getArtistsDetail,
  getComments,
  getReviewDetail,
  getTrackDetail,
} from 'services/api/user/user';
import { Header } from 'components/header';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { AppIcon } from 'assets/index';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box } from 'ui-kit/box';
import { CommentType, ReviewType, Track } from 'shared/types';
import { format, parseISO } from 'date-fns';
import Lottie from 'lottie-react-native';
import { LOTTIE_BLACK_LOADER } from 'constants/index';
import { goBack, navigate } from 'shared/navigation/root-navigator.config';
import CustomInput from 'ui-kit/custom-input/custom-input.component';
import { useScale } from 'hooks/useScale';
import { CommentItem } from 'screens/app-user/view-review/components/comment-item';
import { useTypedSelector } from 'store/index';
import { selectUserMe } from 'store/selectors/user';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { AlbumTile } from 'screens/app-user/search/components/album-tile';
import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {
  ActionIcon,
  ActionType,
  AuthReviewActions,
  ReviewActions,
  ViewReviewProps,
} from './view-review.types';
import { useStyles } from './view-review.styles';
import RateStars from '../rate-track/components/rate-stars/rate-stars.component';
import { CommentDeleteModal } from './components/comment-delete-modal';
import {
  createCommentStructure,
  createReplyStructure,
} from './view-review.utils';

type ViewReviewType = {
  route: { params: ViewReviewProps };
};

const ViewReview = ({ route }: ViewReviewType) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles({ insets });
  const navigation = useNavigation();
  const scale = useScale();
  const snapPoints = useMemo(() => ['30%', '30%'], []);
  const authSnapPoints = useMemo(() => ['30%', '30%'], []);
  const inputRef = useRef<TextInput>(null);
  const user = useTypedSelector(selectUserMe);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);
  const [review, setReview] = useState<ReviewType>({
    create_at: '',
    dislike: 0,
    id: 0,
    like: 0,
    object_type: '',
    object_spotify: '',
    rate: 0,
    text: '',
    title: '',
    user: { email: '', full_name: '', id: '' },
    user_disliked: false,
    user_liked: false,
    total: 0,
  });
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [commentsData, setCommentsData] = useState<CommentType[]>([]);

  const [replyUserId, setReplyUserId] = useState<number | null>(null);
  const [replyUsername, setReplyUsername] = useState<string>('');
  const [replyCommentId, setReplyCommentId] = useState<number>(0);
  const [reviewObject, setReviewObject] = useState<Track>({
    artist: [],
    icon: '',
    id: '',
    image: [],
    name: '',
  });
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editReplyId, setEditReplyId] = useState<number | null>(null);
  const [loadindSendMsg, setLoadindSendMsg] = useState(false);

  const { reviewId } = route?.params ?? {};

  const handleGetReview = async () => {
    try {
      const { data } = await getReviewDetail(reviewId);
      setReview(data);
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetReview();
    }, []),
  );

  const handleGetReviewObject = async () => {
    try {
      const { object_spotify, object_type } = review;
      if (object_type === 'tracks') {
        const { data } = await getTrackDetail(object_spotify);
        const reviewItemData = {
          id: data.id,
          name: data.name,
          image: [{ url: data.photo?.url ?? '' }],
          artist: data.artists,
          album: data?.album,
        };
        // @ts-ignore
        setReviewObject(reviewItemData);
      }
      if (object_type === 'albums') {
        const { data } = await getAlbumDetail(object_spotify);
        const reviewItemData = {
          id: data.id,
          name: data.name,
          image: [{ url: data.photo?.url ?? '' }],
          artist: data.artists,
        };
        // @ts-ignore
        setReviewObject(reviewItemData);
      }
      if (object_type === 'artists') {
        const { data } = await getArtistsDetail(object_spotify);
        const reviewItemData = {
          id: data.id,
          name: data.name,
          artist: data.artists,
          image: [{ url: data.photo?.url ?? '' }],
        };
        // @ts-ignore
        setReviewObject(reviewItemData);
      }
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    handleGetReviewObject();
  }, [review]);

  const handleOpenSheet = () => {
    if (isBottomSheetOpen) {
      setIsBottomSheetOpen(!isBottomSheetOpen);
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  };

  const handleSheetChanges = useCallback((index: number) => {
    setIsBottomSheetOpen(index === -1);
  }, []);

  const parseDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'MMMM d, yyyy');
  };

  const handleEditReview = () => {
    bottomSheetModalRef.current?.close();
    navigate(AppUserRoutes.RateTrack, {
      id: review.object_spotify,
      type: review.object_type,
      reviewItem: reviewObject,
    });
  };

  const handleDeleteReview = () => {
    bottomSheetModalRef.current?.close();
    setIsShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteReview(reviewId);
      goBack();
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
    }
    setIsShowDeleteModal(false);
  };

  const fetchComments = async () => {
    setLoading(true);
    try {
      const { data } = await getComments({
        id: reviewId,
        limit: 10,
        offset: 0,
      });
      setCommentsData(data);
    } catch (error) {
      // @ts-ignore
      console.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreComments = async () => {
    setLoading(true);
    try {
      const { data } = await getComments({
        id: reviewId,
        limit: 10,
        offset: commentsData.length,
      });
      setCommentsData([...commentsData, ...data]);
    } catch (error) {
      // @ts-ignore
      console.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const sendComment = async () => {
    try {
      const { data } = await addNewComment({
        text: newComment,
        object_review: reviewId,
      });
      setReview({
        ...review,
        total: review.total + 1,
      });
      const item = createCommentStructure({ user, comment: data });
      setCommentsData([item, ...commentsData]);
    } catch (error) {
      // @ts-ignore
      console.error(error.response.data);
    }
  };

  const editComment = async () => {
    try {
      if (editCommentId) {
        await changeComment(editCommentId, {
          text: newComment,
        });
        setEditCommentId(null);
        setNewComment('');
        setReplyUserId(null);
        setReplyUsername('');
        setCommentsData((prev) =>
          prev.map((i) => {
            if (editCommentId !== i.id) return i;
            return {
              ...i,
              text: newComment,
            };
          }),
        );
      }
    } catch (error) {
      // @ts-ignore
      console.error(error.response.data);
    } finally {
      setLoadindSendMsg(false);
    }
  };

  const editReply = async () => {
    try {
      if (editReplyId) {
        await changeReply(editReplyId, {
          text: newComment,
        });
        setEditReplyId(null);
        setNewComment('');
        setReplyUserId(null);
        setReplyUsername('');
        setLoadindSendMsg(false);
        fetchComments();
      }
    } catch (error) {
      // @ts-ignore
      console.error(error.response.data);
    }
  };

  const sendReply = async () => {
    try {
      if (replyUserId) {
        const { data } = await addNewReplies({
          text: newComment,
          object_comment: replyCommentId,
          user_tag: replyUserId,
        });
        const createReply = createReplyStructure({user, comment: data});
        setCommentsData((prev) =>
          prev.map((i) => {
            if (replyCommentId !== i.id) return i;
            return {
              ...i,
              total: i.total + 1,
              replycomment_set: [createReply, ...i.replycomment_set],
            };
          }),
        );
      }
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
    }
  };

  const focusOnInput = () => {
    inputRef?.current?.focus();
  };

  const blurOnInput = () => {
    inputRef?.current?.blur();
  };

  const handleSendMessage = async () => {
    blurOnInput();
    setLoadindSendMsg(true);
    if (newComment !== '') {
      if (editCommentId) {
        await editComment();
        return;
      }
      if (editReplyId) {
        await editReply();
        return;
      }
      if (
        replyUsername &&
        newComment.toLowerCase().includes(`@${replyUsername}`.toLowerCase())
          ? replyUserId || false
          : false
      ) {
        await sendReply();
      } else {
        await sendComment();
      }
      setNewComment('');
      setReplyUserId(null);
      setReplyUsername('');
      setLoadindSendMsg(false);
    }
  };

  const handlePressReply = (
    id: number,
    userComment: { id: number; username: string },
  ) => {
    const { username, id: userId } = userComment;
    setNewComment(`@${username} `);
    setReplyCommentId(id);
    setReplyUserId(userId);
    setReplyUsername(username);
    focusOnInput();
  };

  const handlePressEditComment = (id: number, text: string, reply: boolean) => {
    setNewComment(text);
    if (reply) {
      setEditReplyId(id);
    } else {
      setEditCommentId(id);
    }
    focusOnInput();
  };

  const handlePressLike = async () => {
    try {
      const { user_liked, user_disliked } = review;
      setReview({
        ...review,
        like: !user_liked ? review.like + 1 : review.like - 1,
        user_liked: !user_liked,
        user_disliked: false,
        dislike: user_disliked ? review.dislike - 1 : review.dislike,
      });
      await changeLike(review.id, { like: user_liked ? null : true });
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
    }
  };

  const handlePressDislike = async () => {
    try {
      const { user_disliked, user_liked } = review;
      setReview({
        ...review,
        dislike: !user_disliked ? review.dislike + 1 : review.dislike - 1,
        user_disliked: !user_disliked,
        user_liked: false,
        like: user_liked ? review.like - 1 : review.like,
      });
      await changeLike(review.id, { like: user_disliked ? null : false });
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
    }
  };

  const onPressReport = () => {
    bottomSheetModalRef.current?.close();
    navigate(AppUserRoutes.Report, { review_id: review.id });
  };

  const onPressGoToAlbum = () => {
    if (reviewObject?.album) {
      bottomSheetModalRef.current?.close();
      navigation.dispatch(
        StackActions.push(AppUserRoutes.TrackDetail, {
          id: reviewObject.album.id,
        }),
      );
    }
  };

  const onPressMenuItem = (key: string) => () => {
    switch (key) {
      case ActionType.EDIT:
        return handleEditReview();
      case ActionType.DELETE:
        return handleDeleteReview();
      case ActionType.REPORT:
        return onPressReport();
      case ActionType.GO_ALBUM:
        return onPressGoToAlbum();
      default:
        break;
    }
  };

  const updateReviewTotal = () => {
    setReview({
      ...review,
      total: review.total - 1,
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -scale(25) : 0}
    >
      <SafeAreaView style={styles.container}>
        <Header
          backButton
          leftIcon="dots"
          onPressLeftButton={handleOpenSheet}
        />
        {review.id ? (
          <ScrollView keyboardShouldPersistTaps="handled">
            <Box pl={16} pr={16} pt={16}>
              <Box>
                <Box mr={4}>
                  <AlbumTile album={reviewObject} index={0} review />
                </Box>
                <Box pt={16} direction="row" justifyContent="space-between">
                  <Box>
                    <Text style={styles.authorName}>
                      {review?.user?.full_name ?? ''}
                    </Text>
                  </Box>
                  <Text style={styles.dateReview}>
                    {parseDate(review.create_at)}
                  </Text>
                </Box>
                <Box pt={16}>
                  <Text style={styles.titleReview}>{review.title}</Text>
                </Box>
                <Box pt={8}>
                  <RateStars rating={review.rate} iconSize={18} />
                </Box>
                <Box pt={16}>
                  <Text style={styles.textReview}>{review.text}</Text>
                </Box>
                <Box
                  pt={16}
                  fullWidth
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box direction="row" justifyContent="space-between" fullWidth>
                    <Box direction="row">
                      <TouchableOpacity
                        style={styles.likeContainer}
                        onPress={handlePressLike}
                      >
                        <AppIcon
                          name="likeFinger"
                          color={review.user_liked ? 'dark' : 'gray'}
                        />
                        <Text style={styles.likeCount}>{review.like}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.likeContainer}
                        onPress={handlePressDislike}
                      >
                        <AppIcon
                          name="dislike"
                          color={review.user_disliked ? 'dark' : 'gray'}
                        />
                        <Text style={styles.likeCount}>{review.dislike}</Text>
                      </TouchableOpacity>
                    </Box>
                  </Box>
                </Box>
                <View style={styles.grayLine} />
              </Box>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={commentsData}
                renderItem={({ item }) => (
                  <CommentItem
                    user={user}
                    key={item.id}
                    comment={item}
                    deleteCallback={updateReviewTotal}
                    setCommentsData={setCommentsData}
                    onPressReply={handlePressReply}
                    onPressEditComment={handlePressEditComment}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingTop: 20 }}
                ListFooterComponent={
                  <>
                    {loading ? <ActivityIndicator size="large" /> : null}
                    {!loading && review.total !== commentsData.length && (
                      <Box pb={30}>
                        <TouchableOpacity onPress={fetchMoreComments}>
                          <Text style={styles.viewAllComment}>
                            Load more comments
                          </Text>
                        </TouchableOpacity>
                      </Box>
                    )}
                  </>
                }
              />
            </Box>
          </ScrollView>
        ) : (
          <View style={styles.loaderContainer}>
            <Lottie
              style={styles.loader}
              source={LOTTIE_BLACK_LOADER}
              autoPlay
              loop
            />
          </View>
        )}
        {/* MORE MENU */}
        <BottomSheetModalProvider>
          <Pressable
            onPress={() => {
              bottomSheetModalRef.current?.close();
            }}
            style={[
              styles.containerBottomSheet,
              isBottomSheetOpen ? styles.dimBackground : null,
            ]}
          >
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={
                user.id === review.user.id ? authSnapPoints : snapPoints
              }
              onChange={handleSheetChanges}
            >
              <BottomSheetView style={styles.contentContainer}>
                {(user.id === review.user.id
                  ? AuthReviewActions
                  : ReviewActions
                )
                  .filter((i) =>
                    reviewObject.album ? true : i.key !== ActionType.GO_ALBUM,
                  )
                  .map((i) => (
                    <TouchableOpacity
                      key={i.key}
                      onPress={onPressMenuItem(i.key)}
                      style={styles.sheetItemContainer}
                    >
                      <Text style={styles.sheetButtonText}>{i.label}</Text>
                      <AppIcon
                        name={ActionIcon[i.key].name}
                        size={ActionIcon[i.key].size}
                      />
                    </TouchableOpacity>
                  ))}
              </BottomSheetView>
            </BottomSheetModal>
          </Pressable>
        </BottomSheetModalProvider>
        {/* DELETE MODAL */}
        <CommentDeleteModal
          variant="review"
          isShowDeleteModal={isShowDeleteModal}
          onCloseModal={() => setIsShowDeleteModal(false)}
          handleConfirmDelete={handleConfirmDelete}
        />
      </SafeAreaView>
      {/* ADD COMMENT */}
      {isBottomSheetOpen && (
        <View style={styles.inputContainer}>
          <View
            style={{
              flex: 1,
            }}
          >
            {loadindSendMsg && (
              <View
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  right: 0,
                }}
              >
                <Lottie
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={LOTTIE_BLACK_LOADER}
                  autoPlay
                  loop
                />
              </View>
            )}
            <CustomInput
              ref={inputRef}
              value={newComment}
              onChangeValue={(comment) => {
                setNewComment(comment);
              }}
              // styleContainer={{ width: newComment ? '88%' : '100%' }}
              styleInput={styles.styleInput}
              maxLength={1024}
              placeholder="Add comment"
            />
          </View>
          <TouchableOpacity
            disabled={loadindSendMsg}
            style={styles.sendTextContainer}
            onPress={handleSendMessage}
          >
            {newComment && <Text style={styles.sendText}>Send</Text>}
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ViewReview;
