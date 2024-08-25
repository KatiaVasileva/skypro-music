import { Track } from "./Track.types";

export type TrackItemProps = {
  track: Track;
  setCurrentTrack: (track: Track) => void;
  setIsPlaying: (isPlaying: boolean) => void;
};
