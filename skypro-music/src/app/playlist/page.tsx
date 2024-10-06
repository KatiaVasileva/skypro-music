"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  getFavoriteTracks,
  getSelectedTracks,
  getTracks,
} from "@/store/features/trackSlice";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useFilteredTracks } from "@/hooks/useFilteredTracks";

function Main() {
  const { access, refresh } = useAppSelector((state) => state.user.tokens);
  const dispatch = useAppDispatch();
  const allTracks = useAppSelector((state) => state.track.playlistState);
  const selectionId = useAppSelector((state) => state.track.selectionIdState);
  const filteredTracks = useFilteredTracks({tracks: allTracks});

  useEffect(() => {
    if (!access) {
      dispatch(getTracks());
    }
    if (access) {
      dispatch(getTracks());
      dispatch(
        getFavoriteTracks({
          access: access,
          refresh: refresh,
        })
      );
    }
  }, [access, dispatch, refresh, selectionId]);

  return (
    <>
      <CenterBlock allTracks={filteredTracks} title="Треки" />
    </>
  );
}

export default Main;
