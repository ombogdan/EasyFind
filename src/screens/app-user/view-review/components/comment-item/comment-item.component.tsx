import React, { useState } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';
import { Box } from 'ui-kit/box';
import { AppIcon } from 'assets/index';
import { useTheme } from 'theme/ThemeProvider';
import { CommentType } from 'shared/types';
import {
  deleteComment,
  deleteReply,
  getReplies,
  likeComment,
  likeReply,
} from 'services/api/user/user';
import Lottie from 'lottie-react-native';
import { LOTTIE_BLACK_LOADER, SIZE } from 'shared/constants';
import { ProfilePicture } from 'shared/ui-kit/profile-picture';
import { navigate } from 'shared/navigation/root-navigator.config';
import { AppUserRoutes } from 'shared/navigation/app-user';
import { useStyles } from './comment-item.styles';
import { CommentItemProps } from './comment-item.types';
import { CommentDeleteModal } from '../comment-delete-modal';

const CommentItem = ({
  comment,
  onPressReply,
  user,
  onPressEditComment,
  deleteCallback,
  setCommentsData,
}: CommentItemProps) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const {
    id,
    user: userComment,
    text,
    user_liked,
    like,
    user_disliked,
    dislike,
    replycomment_set,
    total,
  } = comment;

  const [loadingMoreReplies, setLoadingMoreReplies] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<number | null>(
    null,
  );
  const [isShowDeleteComment, setIsShowDeleteComment] = useState<number | null>(
    null,
  );

  const [deleteItemId, setDeleteItemId] = useState(null);

  const handlePressDeleteComment = async (comment_id: number | null) => {
    if (!comment_id) return;
    setDeleteItemId(comment_id);
    try {
      setIsShowDeleteComment(null);
      await deleteComment(comment_id);
      setCommentsData((prevComments) =>
        prevComments.filter((com: CommentType) => com.id !== comment_id),
      );
      deleteCallback();
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
      console.log('error.response.data');
    } finally {
      setDeleteItemId(null);
    }
  };

  const handlePressDeleteReply = async (reply_id: number | null) => {
    if (!id) return;
    try {
      setIsShowDeleteModal(null);
      await deleteReply(reply_id);
      setCommentsData((prevComments) =>
        prevComments.map((com: CommentType) => {
          if (com.id === id) {
            return {
              ...com,
              total: com.total - 1,
              replycomment_set: com.replycomment_set.filter(
                (rep) => rep.id !== reply_id,
              ),
            };
          }
          return com;
        }),
      );
    } catch (error) {
      // @ts-ignore
      console.log(error?.response?.data);
      console.log('error.response.data');
    }
  };

  const fetchMoreReplyList = async () => {
    setLoadingMoreReplies(true);
    try {
      const { data } = await getReplies({
        id,
        limit: 10,
        offset: replycomment_set.length,
      });
      setCommentsData((prevComments) =>
        prevComments.map((com: CommentType) => {
          if (com.id === id) {
            return {
              ...com,
              replycomment_set: [...com.replycomment_set, ...data],
            };
          }
          return com;
        }),
      );
    } catch (error) {
      console.warn(error);
    } finally {
      setLoadingMoreReplies(false);
    }
  };

  const handlePressCommentLike = async () => {
    setCommentsData((prevComments) =>
      prevComments.map((com: CommentType) => {
        if (com.id === id) {
          return {
            ...com,
            like: !user_liked ? like + 1 : like - 1,
            user_liked: !user_liked,
            user_disliked: false,
            dislike: user_disliked ? dislike - 1 : dislike,
          };
        }
        return com;
      }),
    );
    await likeComment(id, { like: user_liked ? null : true });
  };

  const handlePressCommentDislike = async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setCommentsData((prevComments) =>
      prevComments.map((com: CommentType) => {
        if (com.id === id) {
          return {
            ...com,
            dislike: !user_disliked ? dislike + 1 : dislike - 1,
            user_disliked: !user_disliked,
            user_liked: false,
            like: user_liked ? like - 1 : like,
          };
        }
        return com;
      }),
    );
    await likeComment(id, { like: user_disliked ? null : false });
  };

  const handlePressReplyLike = async (replyId: number, userLiked: boolean) => {
    setCommentsData((prevComments) =>
      prevComments.map((com: CommentType) => {
        if (com.id === id) {
          // @ts-ignore
          const updatedReplies = com.replycomment_set.map(
            (reply: CommentType) => {
              if (reply.id === replyId) {
                return {
                  ...reply,
                  like: !reply.user_liked ? reply.like + 1 : reply.like - 1,
                  user_liked: !reply.user_liked,
                  user_disliked: false,
                  dislike: reply.user_disliked
                    ? reply.dislike - 1
                    : reply.dislike,
                };
              }
              return reply;
            },
          );
          return {
            ...com,
            replycomment_set: updatedReplies,
          };
        }
        return com;
      }),
    );
    await likeReply(replyId, { like: userLiked ? null : true });
  };

  const handlePressReplyDislike = async (
    replyId: number,
    userDisiked: boolean,
  ) => {
    setCommentsData((prevComments) =>
      prevComments.map((com: CommentType) => {
        if (com.id === id) {
          // @ts-ignore
          const updatedReplies = com.replycomment_set.map(
            (reply: CommentType) => {
              if (reply.id === replyId) {
                return {
                  ...reply,
                  dislike: !reply.user_disliked
                    ? reply.dislike + 1
                    : reply.dislike - 1,
                  user_disliked: !reply.user_disliked,
                  user_liked: false,
                  like: reply.user_liked ? reply.like - 1 : reply.like,
                };
              }
              return reply;
            },
          );
          return {
            ...com,
            replycomment_set: updatedReplies,
          };
        }
        return com;
      }),
    );
    await likeReply(replyId, { like: userDisiked ? null : false });
  };

  const goToUserProfile = (user_id: number) => () => {
    navigate(AppUserRoutes.PublicProfile, { user_id });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={userComment.id === user.id} activeOpacity={0.5} onPress={goToUserProfile(userComment.id)}>
        <View style={styles.headerContainer}>
          <Box mr={SIZE.sm}>
            <ProfilePicture uri={userComment?.avatar} width={28} height={28} />
          </Box>
          <Text
            style={[styles.username, { opacity: deleteItemId === id ? 0.5 : 1 }]}
          >
            {userComment?.username ?? 'ombogdan'}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={[
          styles.textContainer,
          {
            opacity: deleteItemId === id ? 0.5 : 1,
          },
        ]}
      >
        <Text style={styles.commentText}>{text}</Text>
      </View>
      <Box direction="row" justifyContent="space-between" fullWidth pt={8}>
        <Box direction="row">
          <TouchableOpacity
            style={styles.likeContainer}
            onPress={handlePressCommentLike}
          >
            <AppIcon name="likeFinger" color={user_liked ? 'dark' : 'gray'} />
            <Text style={styles.likeCount}>{like}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.likeContainer}
            onPress={handlePressCommentDislike}
          >
            <AppIcon name="dislike" color={user_disliked ? 'dark' : 'gray'} />
            <Text style={styles.likeCount}>{dislike}</Text>
          </TouchableOpacity>
        </Box>
        <Box direction="row" alignItems="center">
          {user.email === userComment.email && (
            <TouchableOpacity
              style={styles.buttonReplyContainer}
              onPress={() => {
                setIsShowDeleteComment(id);
              }}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          )}
          {user.email === userComment.email && (
            <TouchableOpacity
              style={styles.buttonReplyContainer}
              onPress={() => {
                onPressEditComment(id, text, false);
              }}
            >
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          )}
          {user.email !== userComment.email && (
            <TouchableOpacity
              onPress={() => {
                onPressReply(id, userComment);
              }}
            >
              <Text style={styles.replyText}>Reply</Text>
            </TouchableOpacity>
          )}
        </Box>
      </Box>
      {/* REPLY COMMENTS */}
      {replycomment_set.map((reply) => {
        const textReply = reply.text;
        const parts = textReply
          .split(/(@\w+)/)
          .filter((part) => part.length > 0);

        return (
          <Box pt={16} pl={36} pb={16} key={reply.id}>
            <TouchableOpacity disabled={reply.user.id === user.id} activeOpacity={0.5} onPress={goToUserProfile(reply.user.id)}>
              <View style={styles.headerContainer}>
                <Box mr={SIZE.sm}>
                  <ProfilePicture
                    uri={reply?.user?.avatar}
                    width={28}
                    height={28}
                  />
                </Box>
                <Text style={styles.username}>
                  {reply?.user?.username ?? 'ombogdan'}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.replyComment}>
                {parts.map((part) => (
                  <Text
                    key={part}
                    style={{
                      color: part.startsWith('@')
                        ? theme.palette.orange
                        : theme.palette.dark,
                    }}
                  >
                    {part}
                  </Text>
                ))}
              </Text>
            </View>
            <Box
              direction="row"
              justifyContent="space-between"
              fullWidth
              pt={8}
            >
              <Box direction="row">
                <TouchableOpacity
                  style={styles.likeContainer}
                  onPress={async () => {
                    await handlePressReplyLike(reply.id, reply.user_liked);
                  }}
                >
                  <AppIcon
                    name="likeFinger"
                    color={reply.user_liked ? 'dark' : 'gray'}
                  />
                  <Text style={styles.likeCount}>{reply.like}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.likeContainer}
                  onPress={async () => {
                    await handlePressReplyDislike(
                      reply.id,
                      reply.user_disliked,
                    );
                  }}
                >
                  <AppIcon
                    name="dislike"
                    color={reply.user_disliked ? 'dark' : 'gray'}
                  />
                  <Text style={styles.likeCount}>{reply.dislike}</Text>
                </TouchableOpacity>
              </Box>
              <Box direction="row">
                {user.email === reply.user.email && (
                  <TouchableOpacity
                    style={styles.buttonReplyContainer}
                    onPress={() => {
                      setIsShowDeleteModal(reply.id);
                    }}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                )}
                {user.email === reply.user.email && (
                  <TouchableOpacity
                    style={styles.buttonReplyContainer}
                    onPress={() => {
                      onPressEditComment(reply.id, textReply, true);
                    }}
                  >
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                )}
                {user.email !== reply.user.email && (
                  <TouchableOpacity
                    onPress={() => {
                      onPressReply(id, userComment);
                    }}
                  >
                    <Text style={styles.replyText}>Reply</Text>
                  </TouchableOpacity>
                )}
              </Box>
            </Box>
          </Box>
        );
      })}
      {/* MORE REPLIES */}
      {loadingMoreReplies && (
        <Box pl={36} pb={8}>
          <Lottie
            style={styles.loader}
            source={LOTTIE_BLACK_LOADER}
            autoPlay
            loop
          />
        </Box>
      )}
      {!loadingMoreReplies && total !== replycomment_set.length && (
        <Box pl={36} pb={8}>
          <TouchableOpacity onPress={fetchMoreReplyList}>
            <Text style={styles.viewAllComment}>
              View more replies
            </Text>
          </TouchableOpacity>
        </Box>
      )}
      <CommentDeleteModal
        variant="reply"
        isShowDeleteModal={Boolean(isShowDeleteModal)}
        onCloseModal={() => setIsShowDeleteModal(null)}
        handleConfirmDelete={() => handlePressDeleteReply(isShowDeleteModal)}
      />
      <CommentDeleteModal
        variant="comment"
        isShowDeleteModal={Boolean(isShowDeleteComment)}
        onCloseModal={() => setIsShowDeleteComment(null)}
        handleConfirmDelete={() =>
          handlePressDeleteComment(isShowDeleteComment)
        }
      />
    </View>
  );
};

export default CommentItem;
