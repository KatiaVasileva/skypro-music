import { TrackContext } from "@/context/TrackContext";
import { useContext } from "react";

export function useTrackContext () {
    const context = useContext(TrackContext);

    if (!context) {
        throw new Error("Нет контекста")
    }

    return context;
}