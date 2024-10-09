"use client";

import { useAppSelector } from "../../../store/store";
import { useRouter } from "next/navigation";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useFilteredTracks } from "@/hooks/useFilteredTracks";

export default function FavoritePage() {
  const myPlaylistState = useAppSelector(
    (state) => state.track.myPlaylistState
  );
  const user = useAppSelector((state) => state.user);
  const filteredTracks = useFilteredTracks({ tracks: myPlaylistState });

  const router = useRouter();

  if (!user) {
    router.push("/auth");
  }

  return <CenterBlock allTracks={filteredTracks} title={"Мои треки"} />;
}
