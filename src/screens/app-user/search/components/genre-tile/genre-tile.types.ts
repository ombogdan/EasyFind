import { SpotifyImage } from "shared/types";

export interface GenreTileProps {
  genreItem: {name: string, image: SpotifyImage[]};
  index: number;
}
