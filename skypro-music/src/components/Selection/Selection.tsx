"use client";

import Image from "next/image";
import styles from "./Selection.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setTrackState } from "@/store/features/trackSlice";
import { useRouter } from "next/navigation";

function SelectionItem({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const trackState = useAppSelector((state) => state.track.trackState);
  const router = useRouter();

  const handleSelectionClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    console.log(trackState);
    dispatch(setTrackState(trackState));
    router.push(`/playlist/selection/${id}`);

  }
 
  return (
    <div
      className={styles.item}
      key={id}
    >
      <a
        className={styles.link}
        // href={`/playlist/selection/${id}`}
        onClick={handleSelectionClick}
      >
        <Image
          className={styles.img}
          src={`/img/playlist0${id}.png`}
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
