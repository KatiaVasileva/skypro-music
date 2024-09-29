import styles from "./page.module.css"
import SignIn from "@/components/SignIn/SignIn";

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <SignIn />
      </div>
    </div>
  );
}
