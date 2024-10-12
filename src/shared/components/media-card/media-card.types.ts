import { SpotifyMediaType } from "shared/types";

export interface Props {
  uri: string | null;
  title: string;
  name?: string;
  type?: SpotifyMediaType;
  is_user?: boolean;
}
