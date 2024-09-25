"use client";

import styles from "./page.module.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  getAllSelections,
  getFavoriteTracks,
  getListOfTracks,
  getSelectedTracks,
  getTracks,
  setSelectedTracks,
} from "@/store/features/trackSlice";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import Sidebar from "@/components/Sidebar/Sidebar";

function Main() {
  const access = useAppSelector((state) => state.user.tokens.access);
  const dispatch = useAppDispatch();
  const refreshToken = useAppSelector((state) => state.user.tokens.refresh);
  const allTracks = useAppSelector((state) => state.track.playlistState);
  const allSelections = useAppSelector(
    (state) => state.track.allSelectionsState
  );
  const selectionIdState = useAppSelector(
    (state) => state.track.selectionIdState
  );
  const isMyPlaylistClicked = useAppSelector(
    (state) => state.track.isMyPlaylistClicked
  );

//   useEffect(() => {
//     if (!access) {
//       dispatch(getTracks());
//       dispatch(getListOfTracks());
//       dispatch(getAllSelections());
//       dispatch(getSelectedTracks(selectionIdState));
//     }
//     if (access) {
//       dispatch(getTracks());
//       dispatch(
//         getFavoriteTracks({
//           access: access,
//           refresh: refreshToken,
//         })
//       );
//       dispatch(getListOfTracks());
//       dispatch(getAllSelections());
//       dispatch(getSelectedTracks(selectionIdState));
//     }
//   }, [dispatch, access, refreshToken, isMyPlaylistClicked, selectionIdState]);

  return (
    <>
      <CenterBlock allTracks={allTracks} title="Треки"/>
    </>
  );
}

export default Main;
