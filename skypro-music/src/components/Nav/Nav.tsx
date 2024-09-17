"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  getTracks,
  setIsMyPlaylistClicked,
  setPlaylistState,
} from "@/store/features/trackSlice";
import { getAccessTokenFromLocalStorage } from "@/utils/helpers";
import { logout } from "@/store/features/userSlice";

function Nav() {
  const dispatch = useAppDispatch();
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);
  const myPlaylistState = useAppSelector(
    (state) => state.track.myPlaylistState
  );
  const playlistState = useAppSelector((state) => state.track.playlistState);
  const user = useAppSelector((state) => state.user.userState);
  const access = getAccessTokenFromLocalStorage();

  const handleBurgerClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsBurgerClicked((prevState) => !prevState);
  };

  const handleMainClick: React.MouseEventHandler<HTMLAnchorElement> = (
    event
  ) => {
    event.preventDefault();
    dispatch(setIsMyPlaylistClicked(false));
    dispatch(getTracks()).unwrap();
    dispatch(setPlaylistState({ tracks: playlistState }));
  };

  const handleMyPlaylistClick: React.MouseEventHandler<
    HTMLAnchorElement
  > = async (event) => {
    event.preventDefault();
    if (!access || !user) {
      alert("Необходимо зарегистрироваться");
      return;
    }
    dispatch(setIsMyPlaylistClicked(true));
    dispatch(setPlaylistState({ tracks: myPlaylistState }));
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
                <a href="/" className={styles.menuLink} onClick={() => dispatch(logout())}>
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
