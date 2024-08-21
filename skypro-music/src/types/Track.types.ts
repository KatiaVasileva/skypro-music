import { Key } from "react";

export type Track = {
  _id: Key;
  name: string;
  author: string;
  album: string;
  duration_in_seconds: number;
  release_date: Date;
  genre: Array<string>;
};