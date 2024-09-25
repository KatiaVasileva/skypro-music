"use client"

import Nav from "@/components/Nav/Nav";
import styles from "./page.module.css";
import Bar from "@/components/Bar/Bar";
import Footer from "@/components/Footer/Footer";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";
import { getTracks } from "@/store/features/trackSlice";
import Search from "@/components/Search/Search";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function PlaylistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(getTracks()).unwrap();
      } catch (error: unknown) {
        console.log(error);
      }
    };

    getData();
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterBlock}>
            <Search />
            {children}
          </div>
          {/* <Sidebar /> */}
        </main>
        <Bar />
        <Footer />
      </div>
    </div>
  );
}
