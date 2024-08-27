"use client"

import { useTrackContext } from "@/hooks/useTrackContext";
import Player from "../Player/Player";

function Bar() {
  const { currentTrack } = useTrackContext();

  return <>{currentTrack && <Player />}</>;
}

export default Bar;
