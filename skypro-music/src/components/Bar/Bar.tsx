"use client"

import Player from "../Player/Player";
import { useAppSelector } from "@/store/store";

function Bar() {
  const trackState = useAppSelector((state) => state.track.trackState);

  return <>{trackState && <Player />}</>;
}

export default Bar;
