import styles from "./page.module.css";
import Bar from "@/components/Bar/Bar";
import Footer from "@/components/Footer/Footer";
import Favorite from "@/components/Favorite/Favorite";

export default function MyTracks() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Favorite />
        <Bar />
        <Footer />
      </div>
    </div>
  );
}