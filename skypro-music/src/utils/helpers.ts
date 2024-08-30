import { Track } from "@/types/Track.types";

export function formatTime(time: number): string {
  let minutes = Math.floor(time / 60);
  let seconds =
    Math.floor(time % 60) < 10
      ? "0" + Math.floor(time % 60)
      : Math.floor(time % 60);
  return `${minutes}:${seconds}`;
}

type GetIndexProps = {
  isShuffleActive: boolean;
  playlist: Track[];
  trackIndex: number;
};

export function getRandomOrNextTrackIndex({
  isShuffleActive,
  playlist,
  trackIndex,
}: GetIndexProps): number {
  return isShuffleActive
    ? Math.floor(Math.random() * playlist.length)
    : trackIndex < playlist.length - 1
    ? trackIndex + 1
    : 0;
}

export function getRandomOrPrevTrackIndex({
  isShuffleActive,
  playlist,
  trackIndex,
}: GetIndexProps): number {
  return isShuffleActive
    ? Math.floor(Math.random() * playlist.length)
    : trackIndex > 0
    ? trackIndex - 1
    : 0;
}
