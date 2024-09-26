"use client";

import Image from "next/image";
import styles from "./Selection.module.css";

function SelectionItem({ id }: { id: string }) {
 
  return (
    <div
      className={styles.item}
      key={id}
    >
      <a
        className={styles.link}
        href={`/playlist/selection/${id}`}
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
