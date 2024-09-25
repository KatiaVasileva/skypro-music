"use client";

import { useAppSelector } from "../../../store/store";
import { useRouter } from "next/navigation";
import CenterBlock from "@/components/CenterBlock/CenterBlock";

export default function FavoritePage() {
  const myPlaylistState = useAppSelector((state) => state.track.myPlaylistState);
  const user = useAppSelector((state) => state.user);

  const router = useRouter();

  if (!user) {
    router.push("/signin");
  }

  return <CenterBlock allTracks={myPlaylistState} title={"Мои треки"} />;
}   