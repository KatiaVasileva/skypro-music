"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  getFavoriteTracks,
  getTracks,
} from "@/store/features/trackSlice";
import CenterBlock from "@/components/CenterBlock/CenterBlock";

function Main() {
  const access = useAppSelector((state) => state.user.tokens.access);
  const dispatch = useAppDispatch();
  const refreshToken = useAppSelector((state) => state.user.tokens.refresh);
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
          refresh: refreshToken,
        })
      );
    }
  }, [access, dispatch, refreshToken]);

  return (
    <>
      <CenterBlock allTracks={allTracks} title="Треки" />
    </>
  );
}

export default Main;
