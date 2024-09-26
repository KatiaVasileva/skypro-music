"use client";

import Nav from "@/components/Nav/Nav";
import styles from "./page.module.css";
import Bar from "@/components/Bar/Bar";
import Footer from "@/components/Footer/Footer";
import Search from "@/components/Search/Search";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function PlaylistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterBlock}>
            <Search />
            {children}
          </div>
          <Sidebar />
        </main>
        <Bar />
        <Footer />
      </div>
    </div>
  );
}
