"use client"

import Image from "next/image";
import styles from "./Selection.module.css";
import { imageUrls } from "@/utils/data";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Selection } from "@/types/Selection.types";
import { getSelectedTracks, getTracks, setIsMyPlaylistClicked, setisTrackClicked, setIsSelectionClicked, setPlaylistState, setSelectedTracks, setSelectionId, setTrackState, setTrackCurrentTime } from "@/store/features/trackSlice";
import { useEffect } from "react";

type SelectionItemProps = {
  selection: Selection;
};

function SelectionItem({ selection }: SelectionItemProps) {
  const dispatch = useAppDispatch();
  const selectedTracks = useAppSelector((state) => state.track.selectedTracks);
  const imageUrl: string | undefined = imageUrls.get(selection._id);
  const trackState = useAppSelector((state) => state.track.trackState);

  const handleSelectionClick = () => {
    dispatch(setSelectionId(selection._id));
    dispatch(setSelectedTracks(selection));
    dispatch(setPlaylistState({tracks: selectedTracks}));
    dispatch(setIsSelectionClicked(true));
    dispatch(getSelectedTracks(selection._id));
    dispatch(setIsMyPlaylistClicked(false));
    dispatch(setTrackState(trackState));
    dispatch(setisTrackClicked(false));
  };

  return (
    <div
      className={styles.item}
      key={selection._id}
      onClick={handleSelectionClick}
    >
      <a className={styles.link} href="#">
        <Image
          className={styles.img}
          src={imageUrl ? imageUrl : ""}
          alt="day's playlist"
          width={250}
          height={150}
          priority
        />
      </a>
    </div>
  );
}

export default SelectionItem;
