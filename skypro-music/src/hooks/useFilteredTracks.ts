import { useAppSelector } from "@/store/store";
import { Track } from "@/types/Track.types";
import { useMemo } from "react";

export const useFilteredTracks = ({ tracks }: { tracks: Array<Track> }) => {
  const { searchState, performerState, genreState } = useAppSelector(
    (state) => state.filter
  );

  const filteredTracks = useMemo(() => {
    let tracksToFilter = tracks;

    if (searchState) {
      tracksToFilter = tracksToFilter.filter((track) =>
        track.name.toLowerCase().includes(searchState.toLowerCase())
      );
    }

    if (performerState.length > 0) {
      tracksToFilter = tracksToFilter.filter((track) =>
        performerState.includes(track.author)
      );
    }

    if (genreState.length > 0) {
      tracksToFilter = tracksToFilter.filter((track) =>
        track.genre.some((genre) => genreState.includes(genre))
      );
    }

    console.log(genreState.length);
    console.log(tracksToFilter);

    return tracksToFilter;
  }, [tracks, searchState, performerState, genreState]);

  return filteredTracks;
};
