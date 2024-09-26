"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  getFavoriteTracks,
  getListOfTracks,
  getSelectedTracks,
  setSelectionId,
  setTrackState,
} from "@/store/features/trackSlice";
import CenterBlock from "@/components/CenterBlock/CenterBlock";

export default function SelectionPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedTracks, selectionName, trackState } = useAppSelector(
    (state) => state.track
  );
  const { access, refresh } = useAppSelector((state) => state.user.tokens);

  useEffect(() => {
    dispatch(setSelectionId(id));
    if (!access) {
      dispatch(getListOfTracks());
      dispatch(getSelectedTracks(id));
    }
    if (access) {
      dispatch(getListOfTracks());
      dispatch(getSelectedTracks(id));
      dispatch(
        getFavoriteTracks({
          access: access,
          refresh: refresh,
        })
      );
    }
  }, [access, dispatch, id, refresh, trackState]);

  return <CenterBlock allTracks={selectedTracks} title={selectionName} />;
}
