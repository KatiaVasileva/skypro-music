import { TrackContext } from "@/context/TrackContext";
import { useContext } from "react";

export function useTrackContext () {
    return useContext(TrackContext);
}