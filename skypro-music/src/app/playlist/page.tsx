"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getFavoriteTracks, getTracks } from "@/store/features/trackSlice";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useFilteredTracks } from "@/hooks/useFilteredTracks";
import {
  getAccessTokenFromLocalStorage,
  getUserFromLocalStorage,
} from "@/utils/helpers";
import { setTokens, setUser } from "@/store/features/userSlice";

function Main() {
  const { access, refresh } = useAppSelector((state) => state.user.tokens);
  const dispatch = useAppDispatch();
  const allTracks = useAppSelector((state) => state.track.playlistState);
  const selectionId = useAppSelector((state) => state.track.selectionIdState);
  const filteredTracks = useFilteredTracks({ tracks: allTracks });

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = getUserFromLocalStorage();
      dispatch(setUser(user));
      const accessToken = getAccessTokenFromLocalStorage();
      dispatch(setTokens({ access: accessToken, refresh: refresh }));
    }
  }, [dispatch, refresh]);

  return (
    <>
      <CenterBlock allTracks={filteredTracks} title="Треки" />
    </>
  );
}

export default Main;
