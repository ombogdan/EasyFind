import { ReviewType } from "shared/types";

export interface Props {
  review: ReviewType;
  handleUpdateReview: (item: ReviewType) => void;
}
