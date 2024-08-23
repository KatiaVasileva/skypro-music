import Main from "@/components/Main/Main";
import styles from "./page.module.css";
import Bar from "@/components/Bar/Bar";
import Footer from "@/components/Footer/Footer";
import TrackProvider from "@/context/TrackContext";

export default function Home() {
  return (
    <TrackProvider>
      <body suppressHydrationWarning={true}>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <Main />
            <Bar />
            <Footer />
          </div>
        </div>
      </body>
    </TrackProvider>
  );
}
