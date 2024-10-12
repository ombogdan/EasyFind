import { CustomMusicList } from "shared/types";

export interface Props {
  item: CustomMusicList;
  handleUpdate: (item: CustomMusicList) => void;
}
