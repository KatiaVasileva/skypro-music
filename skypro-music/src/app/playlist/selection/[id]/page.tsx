"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { getSelectedTracks, setSelectionId } from "@/store/features/trackSlice";
import CenterBlock from "@/components/CenterBlock/CenterBlock";

export default function SelectionPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedTracks, selectionName, selectionState } = useAppSelector(
    (state) => state.track
  );

  useEffect(() => {
    dispatch(setSelectionId(id));
    const getData = async () => {
      try {
        await dispatch(getSelectedTracks(id)).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [dispatch, id]);

  return <CenterBlock allTracks={selectedTracks} title={selectionName} />;
}