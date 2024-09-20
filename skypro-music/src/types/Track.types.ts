export type Track = {
  _id: number;
  name: string;
  author: string;
  album: string;
  duration_in_seconds: number;
  release_date: string;
  genre: Array<string>;
  track_file: string;
};