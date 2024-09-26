"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  getFavoriteTracks,
  getTracks,
  setIsMyPlaylistClicked,
  setisTrackClicked,
  setIsSelectionClicked,
  setMyPlaylistState,
  setPlaylistState,
  setTrackState,
  setIsMainClicked,
} from "@/store/features/trackSlice";
import { logout } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";

function Nav() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
  const trackState = useAppSelector((state) => state.track.trackState);
  const user = useAppSelector((state) => state.user.userState);
  const access = useAppSelector((state) => state.user.tokens.access);

  const handleBurgerClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsBurgerClicked((prevState) => !prevState);
  };

  const handleMainClick: React.MouseEventHandler<HTMLAnchorElement> = (
    event
  ) => {
    event.preventDefault();
    dispatch(setTrackState(trackState));
    router.push("/playlist")
  };

  const handleMyPlaylistClick: React.MouseEventHandler<
    HTMLAnchorElement
  > = async (event) => {
    event.preventDefault();
    if (!access || !user) {
      alert("Необходимо зарегистрироваться");
      return;
    }
    dispatch(setTrackState(trackState));
    router.push("/playlist/favorite")
  };

  return (
    <nav className={styles.main}>
      <div className={styles.logo}>
        <Image
          className={styles.image}
          src="/img/logo.png"
          alt="logo"
          width={113.33}
          height={43}
        />
      </div>
      <div className={styles.burger} onClick={handleBurgerClick}>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      {isBurgerClicked && (
        <div className={styles.menu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink} onClick={handleMainClick}>
                Главное
              </a>
            </li>
            <li className={styles.menuItem}>
              <a
                href=""
                className={styles.menuLink}
                onClick={handleMyPlaylistClick}
              >
                Мой плейлист
              </a>
            </li>
            <li className={styles.menuItem}>
              {!user && (
                <a href="/signin" className={styles.menuLink}>
                  Войти
                </a>
              )}
              {user && (
                <a
                  href="/"
                  className={styles.menuLink}
                  onClick={(event) => {
                    event.preventDefault();
                    router.push("/playlist");
                    dispatch(logout());
                    dispatch(getTracks());
                    dispatch(setMyPlaylistState([]));
                  }}
                >
                  Выйти
                </a>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Nav;
