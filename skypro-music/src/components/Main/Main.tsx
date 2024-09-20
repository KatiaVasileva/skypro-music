"use client";

import Nav from "../Nav/Nav";
import styles from "./Main.module.css";
import CenterBlock from "../CenterBlock/CenterBlock";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getAllSelections, getFavoriteTracks, getListOfTracks, getSelectedTracks, getTracks, setSelectedTracks } from "@/store/features/trackSlice";

function Main() {
  const access = useAppSelector((state) => state.user.tokens.access);
  const dispatch = useAppDispatch();
  const refreshToken = useAppSelector((state) => state.user.tokens.refresh);
  const allTracks = useAppSelector((state) => state.track.playlistState);
  const allSelections = useAppSelector(
    (state) => state.track.allSelectionsState
  );
  const selectionIdState = useAppSelector((state) => (state.track.selectionIdState));

  useEffect(() => {
    if (!access) {
      dispatch(getTracks());
      dispatch(getListOfTracks());
      dispatch(getAllSelections());
      dispatch(getSelectedTracks(selectionIdState));
    }
    if (access) {
      dispatch(getTracks());
      dispatch(
        getFavoriteTracks({ 
          access: access,
          refresh: refreshToken,
        })
      );
      dispatch(getListOfTracks());
      dispatch(getAllSelections());
      dispatch(getSelectedTracks(selectionIdState));
    }
  }, [dispatch, access, refreshToken]);

  return (
    <main className={styles.main}>
      <Nav />
      <CenterBlock allTracks={allTracks} />
      <Sidebar allSelections={allSelections} />
    </main>
  );
}

export default Main;
