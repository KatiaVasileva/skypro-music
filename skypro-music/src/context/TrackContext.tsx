"use client"

import { Track } from "@/types/Track.types";
import React, { createContext, useState } from "react";

export type TrackContextType = {
  currentTrack?: Track;
  setCurrentTrack: (track: Track) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean | ((prevState: boolean) => boolean)) => void;
};

export const TrackContext = React.createContext<TrackContextType | null>(null);

const TrackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTrack, setCurrentTrack] = React.useState<Track | undefined>(undefined);
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <TrackContext.Provider value={{ currentTrack, setCurrentTrack, isPlaying, setIsPlaying }}>
      {children}
    </TrackContext.Provider>
  );
};

export default TrackProvider;
