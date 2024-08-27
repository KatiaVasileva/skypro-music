export function formatTime(time: number): string {
  let minutes = Math.floor(time / 60);
  let seconds =
    Math.floor(time % 60) < 10
      ? "0" + Math.floor(time % 60)
      : Math.floor(time % 60);
  return `${minutes}:${seconds}`;
}
