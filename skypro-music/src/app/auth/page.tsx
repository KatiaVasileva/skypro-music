"use client"

import { useAppSelector } from "@/store/store";
import styles from "./page.module.css"
import SignIn from "@/components/SignIn/SignIn";
import SignUp from "@/components/SignUp/SignUp";

export default function LoginPage() {
  const isRegisterClicked = useAppSelector((state) => state.user.isRegisterClicked);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {isRegisterClicked ? <SignUp /> : <SignIn />}
      </div>
    </div>
  );
}
