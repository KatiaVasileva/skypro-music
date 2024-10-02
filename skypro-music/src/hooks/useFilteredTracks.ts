import { useAppSelector } from "@/store/store";
import { Track } from "@/types/Track.types";
import { useMemo } from "react";

export const useFilteredTracks = ({ tracks }: { tracks: Array<Track> }) => {
  const { searchState, performerState, dateState, genreState } = useAppSelector(
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

    if (dateState[0] === "Сначала новые") {
      tracksToFilter = tracksToFilter.slice().sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
      );
    }

    if (dateState[0] === "Сначала старые") {
      tracksToFilter = tracksToFilter.slice().sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime()
      );
    }

    if (genreState.length > 0) {
      tracksToFilter = tracksToFilter.filter((track) => 
        track.genre.some((genre) => genreState.includes(genre))
      );
    }

    return tracksToFilter;
  }, [tracks, searchState, performerState, genreState, dateState]);

  return filteredTracks;
};
