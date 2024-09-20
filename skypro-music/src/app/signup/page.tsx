import styles from "./page.module.css";
import SignUp from "@/components/SignUp/SignUp";

export default function RegisterPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <SignUp />
      </div>
    </div>
  );
}
