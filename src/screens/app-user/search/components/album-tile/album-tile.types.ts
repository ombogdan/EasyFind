import { Track } from "shared/types";

export interface GenreTileProps {
  album: Track;
  index: number;
  isTrack?: boolean;
  isArtist?: boolean;
  review?: boolean;
}
