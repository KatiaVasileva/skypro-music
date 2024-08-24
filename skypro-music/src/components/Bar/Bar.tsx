"use client"

import { useTrackContext } from "@/hooks/useTrackContext";
import Player from "../Player/Player";
import { TrackContextType } from "@/context/TrackContext";

function Bar() {
  const { currentTrack } = useTrackContext() as TrackContextType;

  return <>{currentTrack && <Player />}</>;
}

export default Bar;
