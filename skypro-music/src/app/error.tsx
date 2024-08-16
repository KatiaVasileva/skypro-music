"use client";

import { useEffect } from "react";
import styles from "./error.module.css";
import Link from "next/link";

function Error({
  error,
  reset,
}: {
  error: string;
  reset: React.MouseEventHandler<HTMLButtonElement>;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2 className={styles.text}>Что-то пошло не так!</h2>
      <button className={styles.button} onClick={reset}>Попробовать снова</button>
    </div>
  );
}

export default Error;
