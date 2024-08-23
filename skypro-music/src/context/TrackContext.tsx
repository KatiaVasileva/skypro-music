"use client"

import { Track } from "@/types/Track.types";
import React, { createContext, useState } from "react";

export type TrackContextType = {
  currentTrack?: Track;
  setCurrentTrack: (track: Track) => void;
};

export const TrackContext = React.createContext<TrackContextType | null>(null);

const TrackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTrack, setCurrentTrack] = React.useState<Track>({
    _id: 0,
    name: "",
    author: "",
    album: "",
    duration_in_seconds: 0,
    release_date: "",
    genre: [],
    track_file: "",
  });

  return (
    <TrackContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </TrackContext.Provider>
  );
};

export default TrackProvider;
