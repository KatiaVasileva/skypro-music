"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  getFavoriteTracks,
  getTracks,
} from "@/store/features/trackSlice";
import CenterBlock from "@/components/CenterBlock/CenterBlock";

function Main() {
  const {access, refresh} = useAppSelector((state) => state.user.tokens);
  const dispatch = useAppDispatch();
  const allTracks = useAppSelector((state) => state.track.playlistState);

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
  }, [access, dispatch, refresh]);

  return (
    <>
      <CenterBlock allTracks={allTracks} title="Треки" />
    </>
  );
}

export default Main;
