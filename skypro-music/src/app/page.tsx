import Main from "@/components/Main/Main";
import styles from "./page.module.css";
import Bar from "@/components/Bar/Bar";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Main />
        <Bar />
        <Footer />
      </div>
    </div>
  );
}
