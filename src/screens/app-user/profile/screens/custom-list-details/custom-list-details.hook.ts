import { useCallback, useEffect, useRef, useState } from 'react';
import { AppUserRoutes, useAppRoute } from 'shared/navigation/app-user';
import { useTypedSelector } from 'shared/store';
import { TextInput } from 'react-native-gesture-handler';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  useDeleteCustomMusic,
  useFetchCustomMusicComments,
  useUpdateCustomMusicComment,
} from 'shared/hooks/api';
import useCreateCustomMusicComments from 'shared/hooks/api/music-list/useCreateCustomMusicComments';
import { CustomMusicListComment, LoadingType } from 'shared/types';
import { goBack, navigate } from 'shared/navigation/root-navigator.config';
import { userDataSelector } from 'shared/store/slices/user';

const useCustomListDetails = () => {
  const { params } = useAppRoute<AppUserRoutes.CustomListDetails>();
  const inputRef = useRef<TextInput>(null);
  const user = useTypedSelector(userDataSelector);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyUserId, setReplyUserId] = useState<number | null>(null);
  const [replyUsername, setReplyUsername] = useState<string>('');
  const [replyCommentId, setReplyCommentId] = useState<number>(0);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editReplyId, setEditReplyId] = useState<number | null>(null);

  const [parentId, setParentId] = useState<number | null | undefined>(null);
  const [totalComments, setTotalComments] = useState(0);
  const [commentList, setCommentList] = useState<CustomMusicListComment[]>([]);

  // api hooks
  const { removeCustomMusic } = useDeleteCustomMusic();
  const { loading: loadingComments, fetchComments } =
    useFetchCustomMusicComments();
  const { createComment, loading: loadingCreate } =
    useCreateCustomMusicComments();
  const { updateComment, loading: loadingUpdate } =
    useUpdateCustomMusicComment();


  const isLoading =
    loadingCreate === LoadingType.FETCH || loadingUpdate === LoadingType.FETCH;
  
  useEffect(() => {
    fetchComments({
      id: params.item.id,
      successCallback: (data) => {
        setCommentList(data.results);
        setTotalComments(data.count);
      },
    });
  }, [params]);

  const onPressEdit = () => {
    bottomSheetModalRef.current?.close();
    navigate(AppUserRoutes.ListForm, { item: params.item });
  };

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

  const handleDelete = () => {
    bottomSheetModalRef.current?.close();
    setIsShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsShowDeleteModal(false);
    removeCustomMusic({ id: params.item.id, successCallback: goBack });
  };

  const fetchMoreComments = async () => {
    fetchComments({
      offset: commentList.length,
      loading_type: LoadingType.FETCH_MORE,
      id: params.item.id,
      successCallback: (data) => {
        setCommentList((prev) => [...prev, ...data.results]);
        setTotalComments(data.count);
      },
    });
  };

  const sendComment = async () => {
    createComment({
      successCallback: (data) => {
        setCommentList((prev) => [
          {
            ...data,
            dislikes_count: 0,
            likes_count: 0,
            replies: [],
            user,
            user_disliked: false,
            user_liked: false,
          },
          ...prev,
        ]);
        setTotalComments((prev) => prev + 1);
        setNewComment('')
      },
      props: {
        content: newComment,
        id: params.item.id,
        parent: null,
        list_music: params.item.id,
        user: user.id,
      },
    });
  };

  const sendCommentReply = async () => {
    createComment({
      successCallback: (data) => {
        setNewComment('');
        setCommentList((prev) =>
          prev.map((i) => {
            if (i.id !== replyCommentId) {
              return i;
            }
            return {
              ...i,
              replies: [
                {
                  ...data,
                  dislikes_count: 0,
                  likes_count: 0,
                  replies: [],
                  user,
                  user_disliked: false,
                  user_liked: false,
                },
                ...i.replies,
              ],
            };
          }),
        );
      },
      props: {
        content: newComment,
        id: params.item.id,
        parent: replyCommentId,
        list_music: params.item.id,
        user: user.id,
      },
    });
  };

  const editComment = async () => {
    updateComment({
      successCallback: (data) => {
        setCommentList((prev) =>
          prev.map((i) => {
            if (i.id !== editCommentId) {
              return i;
            }
            return {
              ...i,
              content: data.content,
            };
          }),
        );
        setEditCommentId(null);
        setReplyUserId(null);
        setReplyUsername('');
        setNewComment('');
      },
      props: {
        id: params.item.id,
        comment_id: editCommentId as number,
        content: newComment,
      },
    });
  };

  const editReply = async () => {
    updateComment({
      successCallback: (data) => {
        setCommentList((prev) =>
          prev.map((i) => {
            if (i.id !== parentId) {
              return i;
            }
            return {
              ...i,
              replies: i.replies.map((rep) => {
                if (editReplyId !== rep.id) {
                  return rep;
                }
                return {
                  ...rep,
                  content: data.content,
                };
              }),
            };
          }),
        );
        setParentId(null);
        setEditReplyId(null);
        setNewComment('');
        setReplyUserId(null);
        setReplyUsername('');
      },
      props: {
        id: params.item.id,
        comment_id: editReplyId as number,
        content: newComment,
      },
    });
  };

  const focusOnInput = () => {
    inputRef?.current?.focus();
  };

  const blurOnInput = () => {
    inputRef?.current?.blur();
  };

  const handleSendMessage = async () => {
    blurOnInput();
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
        sendCommentReply();
      } else {
        await sendComment();
      }
      // setNewComment('');
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

  const handlePressEditComment = (
    id: number,
    text: string,
    reply: boolean,
    parent_id?: number,
  ) => {
    setNewComment(text);
    if (reply) {
      setParentId(parent_id);
      setEditReplyId(id);
    } else {
      setEditCommentId(id);
    }
    focusOnInput();
  };

  const handleDeleteComment = (comment_id: number) => {
    setCommentList((prev) => prev.filter((i) => i.id !== comment_id));
    setTotalComments((prev) => prev - 1);
  };

  const handleUpdateComment = (comment: CustomMusicListComment) => {
    setCommentList((prev) =>
      prev.map((i) => {
        if (comment.id !== i.id) {
          return i;
        }
        return {
          ...comment,
        };
      }),
    );
  };

  const onChangeComment = (text: string) => {
    setNewComment(text)
  }

  const onCloseDeleteModal = () => setIsShowDeleteModal(false);

  return {
    handleUpdateComment,
    handleDeleteComment,
    handlePressEditComment,
    handlePressReply,
    handleSendMessage,
    handleSheetChanges,
    handleDelete,
    handleConfirmDelete,
    fetchMoreComments,
    isLoading,
    onPressEdit,
    handleOpenSheet,
    totalComments,
    commentList,
    loadingComments,
    newComment,
    onChangeComment,
    isBottomSheetOpen,
    bottomSheetModalRef,
    user,
    isShowDeleteModal,
    onCloseDeleteModal,
    inputRef,
    item_name: params.item.name
  };
};

export default useCustomListDetails;
