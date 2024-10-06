"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import {
  getFavoriteTracks,
  getListOfTracks,
  getSelectedTracks,
  setSelectionId,
} from "@/store/features/trackSlice";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useFilteredTracks } from "@/hooks/useFilteredTracks";

export default function SelectionPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedTracks, selectionName, trackState } = useAppSelector(
    (state) => state.track
  );
  const { access, refresh } = useAppSelector((state) => state.user.tokens);
  const filteredTracks = useFilteredTracks({tracks: selectedTracks});


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

  return <CenterBlock allTracks={filteredTracks} title={selectionName} />;
}
