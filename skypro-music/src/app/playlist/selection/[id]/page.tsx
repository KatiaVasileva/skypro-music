"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { getFavoriteTracks, getSelectedTracks, setSelectionId, setTrackState } from "@/store/features/trackSlice";
import CenterBlock from "@/components/CenterBlock/CenterBlock";

export default function SelectionPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedTracks, selectionName, trackState } = useAppSelector(
    (state) => state.track
  );
  const {access, refresh } = useAppSelector((state) => state.user.tokens)

  useEffect(() => {
    dispatch(setSelectionId(id));
    if (!access) {
      dispatch(getSelectedTracks(id));
    }
    if (access) {
      dispatch(getSelectedTracks(id));
      dispatch(
        getFavoriteTracks({
          access: access,
          refresh: refresh,
        })
      );
      dispatch(setTrackState(trackState));
    }
  }, [access, dispatch, id, refresh, trackState]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       await dispatch(getSelectedTracks(id)).unwrap();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getData();
  // }, [dispatch, id]);

  return <CenterBlock allTracks={selectedTracks} title={selectionName} />;
}