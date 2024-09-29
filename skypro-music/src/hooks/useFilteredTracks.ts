import { useAppSelector } from "@/store/store";
import { Track } from "@/types/Track.types";
import { useMemo } from "react";

export const useFilteredTracks = ({ tracks }: { tracks: Array<Track> }) => {
  const { searchState } = useAppSelector((state) => state.filter);

  const filteredTracks = useMemo(() => {
    let tracksToFilter = tracks;

    if (searchState) {
      tracksToFilter = tracksToFilter.filter((track) =>
        track.name.toLowerCase().includes(searchState.toLowerCase())
      );
    }

    return tracksToFilter;
  }, [tracks, searchState]);

  return filteredTracks;
};
