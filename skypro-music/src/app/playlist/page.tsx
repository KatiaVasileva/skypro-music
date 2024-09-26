"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  getFavoriteTracks,
  getSelectedTracks,
  getTracks,
} from "@/store/features/trackSlice";
import CenterBlock from "@/components/CenterBlock/CenterBlock";

function Main() {
  const {access, refresh} = useAppSelector((state) => state.user.tokens);
  const dispatch = useAppDispatch();
  const allTracks = useAppSelector((state) => state.track.playlistState);
  const selectionId = useAppSelector((state) => state.track.selectionIdState);

  useEffect(() => {
    if (!access) {
      dispatch(getTracks());
      if (selectionId) {
        dispatch(getSelectedTracks(selectionId));
      }
    }
    if (access) {
      dispatch(getTracks());
      dispatch(
        getFavoriteTracks({
          access: access,
          refresh: refresh,
        })
      );
      if (selectionId) {
        dispatch(getSelectedTracks(selectionId));
      }
    }
  }, [access, dispatch, refresh, selectionId]);

  return (
    <>
      <CenterBlock allTracks={allTracks} title="Треки" />
    </>
  );
}

export default Main;
