import { AuthData, CustomMusicListComment } from "shared/types";

export interface CommentItemProps {
  comment: CustomMusicListComment;
  onPressReply: (id: number, user: { id: number; username: string }) => void;
  user: AuthData;
  onPressEditComment: (id: number, text: string, reply: boolean, parent_id?: number) => void;
  deleteCommentCallback: (comment_id: number) => void;
  handleUpdateComment: (comment: CustomMusicListComment) => void;
}
