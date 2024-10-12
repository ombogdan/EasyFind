import React, { useState } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';
import { Box } from 'ui-kit/box';
import { AppIcon } from 'assets/index';
import { useTheme } from 'theme/ThemeProvider';
import { LoadingType } from 'shared/types';
import {
  useDeleteCommentCustomMusic,
  useUpdateCustomMusicCommentLike,
} from 'shared/hooks/api';
import { AppUserRoutes, useAppRoute } from 'shared/navigation/app-user';
import { ProfilePicture } from 'shared/ui-kit/profile-picture';
import { SIZE } from 'shared/constants';
import { navigate } from 'shared/navigation/root-navigator.config';
import { useStyles } from './comment-item.styles';
import { CommentItemProps } from './comment-item.types';
import { CommentDeleteModal } from '../comment-delete-modal';

const CommentItem = ({
  comment,
  onPressReply,
  user,
  onPressEditComment,
  deleteCommentCallback,
  handleUpdateComment,
}: CommentItemProps) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const {
    id,
    user: userComment,
    content,
    user_liked,
    likes_count,
    dislikes_count,
    user_disliked,
  } = comment;

  const [isShowDeleteModal, setIsShowDeleteModal] = useState<number | null>(
    null,
  );
  const [isShowDeleteComment, setIsShowDeleteComment] = useState<number | null>(
    null,
  );
  const { params } = useAppRoute<AppUserRoutes.CustomListDetails>();
  const { updateCommentLike } = useUpdateCustomMusicCommentLike();

  const { loading: loadingDelete, deleteComment } =
    useDeleteCommentCustomMusic();

  const handlePressDeleteComment = async () => {
    setIsShowDeleteComment(null);
    await deleteComment({
      successCallback: deleteCommentCallback,
      props: {
        id: params.item.id, // id of custom list
        comment_id: comment.id,
      },
    });
  };

  const handlePressDeleteReply = (reply_id: number | null) => {
    setIsShowDeleteModal(null);
    if (!reply_id) return;
    deleteComment({
      successCallback: () => {
        handleUpdateComment({
          ...comment,
          replies: comment.replies.filter((i) => i.id !== reply_id),
        });
      },
      props: {
        id: params.item.id, // id of custom list
        comment_id: reply_id,
      },
    });
  };

  const onPressLike = (variant: 'like' | 'dislike') => () => {
    const isLike = variant === 'like';
    const userKey = isLike ? 'user_liked' : 'user_disliked';
    const countKey = isLike ? 'likes_count' : 'dislikes_count';

    const updatedItem = {
      ...comment,
      [userKey]: !comment[userKey],
      [countKey]: comment[userKey]
        ? comment[countKey] - 1
        : comment[countKey] + 1,
      ...(isLike && {
        user_disliked: comment.user_disliked ? false : comment.user_disliked,
        dislikes_count: comment.user_disliked
          ? comment.dislikes_count - 1
          : comment.dislikes_count,
      }),
      ...(!isLike && {
        user_liked: comment.user_liked ? false : comment.user_liked,
        likes_count: comment.user_liked
          ? comment.likes_count - 1
          : comment.likes_count,
      }),
    };
    updateCommentLike({
      successCallback: () => handleUpdateComment(updatedItem),
      props: {
        id: params.item.id,
        comment_id: comment.id,
        like: isLike,
      },
    });
  };

  const onPressReplyLike =
    (reply_id: number, variant: 'like' | 'dislike') => () => {
      const currentReply = comment.replies.find((i) => i.id === reply_id);
      if (!currentReply) return;
      const isLike = variant === 'like';
      const userKey = isLike ? 'user_liked' : 'user_disliked';
      const countKey = isLike ? 'likes_count' : 'dislikes_count';

      const updatedItem = {
        ...currentReply,
        [userKey]: !currentReply[userKey],
        [countKey]: currentReply[userKey]
          ? currentReply[countKey] - 1
          : currentReply[countKey] + 1,
        ...(isLike && {
          user_disliked: currentReply.user_disliked
            ? false
            : currentReply.user_disliked,
          dislikes_count: currentReply.user_disliked
            ? currentReply.dislikes_count - 1
            : currentReply.dislikes_count,
        }),
        ...(!isLike && {
          user_liked: currentReply.user_liked ? false : currentReply.user_liked,
          likes_count: currentReply.user_liked
            ? currentReply.likes_count - 1
            : currentReply.likes_count,
        }),
      };

      updateCommentLike({
        successCallback: () => {
          handleUpdateComment({
            ...comment,
            replies: comment.replies.map((i) => {
              if (i.id !== reply_id) {
                return i;
              }
              return updatedItem;
            }),
          });
        },
        props: {
          id: params.item.id,
          comment_id: reply_id,
          like: isLike,
        },
      });
    };

  const goToUserProfile = (user_id: number) => () => {
    navigate(AppUserRoutes.PublicProfile, { user_id });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity disabled={comment.user.id === user.id} activeOpacity={0.5} onPress={goToUserProfile(comment.user.id)}>
        <View style={styles.headerContainer}>
          {/* PICTURE */}
          <Box mr={SIZE.sm}>
            <ProfilePicture uri={comment.user.avatar} height={28} width={28} />
          </Box>
          <Text
            style={[
              styles.username,
              { opacity: loadingDelete === LoadingType.FETCH ? 0.5 : 1 },
            ]}
          >
            {comment.user.username}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.commentText}>{content}</Text>
      </View>
      <Box direction="row" justifyContent="space-between" fullWidth pt={8}>
        <Box direction="row">
          <TouchableOpacity
            style={styles.likeContainer}
            onPress={onPressLike('like')}
          >
            <AppIcon name="likeFinger" color={user_liked ? 'dark' : 'gray'} />
            <Text style={styles.likeCount}>{likes_count}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.likeContainer}
            onPress={onPressLike('dislike')}
          >
            <AppIcon name="dislike" color={user_disliked ? 'dark' : 'gray'} />
            <Text style={styles.likeCount}>{dislikes_count}</Text>
          </TouchableOpacity>
        </Box>
        <Box direction="row" alignItems="center">
          {user.id === userComment.id && (
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
                onPressEditComment(id, content, false);
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
      {comment.replies.map((reply) => {
        const textReply = reply.content;
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
                    height={28}
                    width={28}
                  />
                </Box>
                <Text style={styles.username}>{reply?.user?.username}</Text>
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
                  onPress={onPressReplyLike(reply.id, 'like')}
                >
                  <AppIcon
                    name="likeFinger"
                    color={reply.user_liked ? 'dark' : 'gray'}
                  />
                  <Text style={styles.likeCount}>{reply.likes_count}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.likeContainer}
                  onPress={onPressReplyLike(reply.id, 'dislike')}
                >
                  <AppIcon
                    name="dislike"
                    color={reply.user_disliked ? 'dark' : 'gray'}
                  />
                  <Text style={styles.likeCount}>{reply.dislikes_count}</Text>
                </TouchableOpacity>
              </Box>
              <Box direction="row">
                {user.id === reply.user.id && (
                  <TouchableOpacity
                    style={styles.buttonReplyContainer}
                    onPress={() => {
                      setIsShowDeleteModal(reply.id);
                    }}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                )}
                {user.id === reply.user.id && (
                  <TouchableOpacity
                    style={styles.buttonReplyContainer}
                    onPress={() => {
                      onPressEditComment(reply.id, textReply, true, comment.id);
                    }}
                  >
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                )}
                {user.id !== reply.user.id && (
                  <TouchableOpacity
                    onPress={() => {
                      onPressReply(id, reply.user);
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
        handleConfirmDelete={handlePressDeleteComment}
      />
    </View>
  );
};

export default CommentItem;
