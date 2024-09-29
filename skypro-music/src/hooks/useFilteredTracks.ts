import { useAppSelector } from "@/store/store";
import { Track } from "@/types/Track.types";
import { useMemo } from "react";

export const useFilteredTracks = ({ tracks }: { tracks: Array<Track> }) => {
  const { searchState, performerState } = useAppSelector((state) => state.filter);

  const filteredTracks = useMemo(() => {
    let tracksToFilter = tracks;

    if (searchState) {
      tracksToFilter = tracksToFilter.filter((track) =>
        track.name.toLowerCase().includes(searchState.toLowerCase())
      );
    }

    if (performerState.length > 0) {
        tracksToFilter = tracksToFilter.filter((track) => performerState.includes(track.author));
    }

    return tracksToFilter;
  }, [tracks, searchState, performerState]);

  return filteredTracks;
};
