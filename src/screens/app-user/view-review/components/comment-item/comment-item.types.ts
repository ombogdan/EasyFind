import { AuthData, CommentType } from "shared/types";

export interface CommentItemProps {
  comment: CommentType;
  onPressReply: (id: number, user: { id: number; username: string }) => void;
  user: AuthData;
  onPressEditComment: (id: number, text: string, reply: boolean) => void;
  // @ts-ignore
  setCommentsData: (data: (prevComments) => any) => void;
  deleteCallback: () => void;
}
