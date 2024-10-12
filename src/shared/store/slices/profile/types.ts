import { CustomMusicTrack } from "shared/types";

export interface ProfileState {
  selected_music: CustomMusicTrack[];
  favorite_music: CustomMusicTrack[];
  is_select_favorite: boolean;
  custom_list_update_id: number | string | null;
}