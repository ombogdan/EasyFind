import { AuthData } from 'shared/types';

interface CommentParams {
  user: AuthData;
  comment: {
    create_at: string;
    updated_at: string;
    id: number;
    text: string;
    object_review: number;
  };
}

interface ReplyParams {
  user: AuthData;
  comment: {
    create_at: string;
    updated_at: string;
    id: number;
    text: string;
    object_comment: number;
    user_tag: number
  };
}

export const createCommentStructure = ({ user, comment }: CommentParams) => ({
  ...comment,
  user,
  dislike: 0,
  like: 0,
  replycomment_set: [],
  total: 0,
  user_disliked: false,
  user_liked: false,
});

export const createReplyStructure = ({ user, comment }: ReplyParams) => ({
  ...comment,
  dislike: 0,
  like: 0,
  user,
  user_disliked: false,
  user_liked: false,
});
