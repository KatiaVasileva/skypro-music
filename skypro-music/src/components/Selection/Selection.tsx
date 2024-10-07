"use client";

import Image from "next/image";
import styles from "./Selection.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setTrackState } from "@/store/features/trackSlice";
import { resetFilters } from "@/store/features/filterSlice";
import Link from "next/link";

function SelectionItem({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const trackState = useAppSelector((state) => state.track.trackState);

  const handleSelectionClick: React.MouseEventHandler<HTMLElement> = () => {
    dispatch(setTrackState(trackState));
    dispatch(resetFilters());
  };

  return (
    <div className={styles.item} key={id}>
      <Link
        legacyBehavior
        href={`/playlist/selection/${id}`}
        className={styles.link}
      >
        <a onClick={handleSelectionClick}>
          <Image
            className={styles.img}
            src={`/img/playlist0${id}.png`}
            alt="day's playlist"
            width={250}
            height={150}
            priority
          />
        </a>
      </Link>
    </div>
  );
}

export default SelectionItem;
