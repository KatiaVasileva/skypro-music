"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  getTracks,
  setMyPlaylistState,
  setTrackState,
} from "@/store/features/trackSlice";
import { logout } from "@/store/features/userSlice";
import { resetFilters } from "@/store/features/filterSlice";
import Link from "next/link";
import { removeAccessTokenFromLocalStorage, removeUserFromLocalStorage } from "@/utils/helpers";

function Nav() {

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
    dispatch(setTrackState(trackState));
    dispatch(resetFilters());
  };

  const handleMyPlaylistClick: React.MouseEventHandler<
    HTMLAnchorElement
  > = () => {
    if (!access || !user) {
      alert("Необходимо зарегистрироваться");
      return;
    }
    dispatch(setTrackState(trackState));
    dispatch(resetFilters());
  };

  const handleExitClick: React.MouseEventHandler<HTMLAnchorElement> = (
    event
  ) => {
    event.preventDefault();
    dispatch(logout());
    dispatch(getTracks());
    dispatch(setMyPlaylistState([]));
    if (typeof window !== "undefined") {
      removeUserFromLocalStorage();
      removeAccessTokenFromLocalStorage();
    }
  };

  return (
    <nav className={styles.main}>
      <div className={styles.logo}>
        <Link legacyBehavior href="/playlist">
          <a>
            <Image
              className={styles.image}
              src="/img/logo.png"
              alt="logo"
              width={113.33}
              height={43}
              priority
            />
          </a>
        </Link>
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
              <Link legacyBehavior href="/playlist">
                <a className={styles.menuLink} onClick={handleMainClick}>
                  Главное
                </a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link
                legacyBehavior
                href={user ? "/playlist/favorite" : "/playlist"}
              >
                <a className={styles.menuLink} onClick={handleMyPlaylistClick}>
                  Мой плейлист
                </a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              {!user && (
                <Link href="/auth" className={styles.menuLink}>
                  Войти
                </Link>
              )}
              {user && (
                <Link
                  className={styles.menuLink}
                  href="/playlist"
                  onClick={handleExitClick}
                >
                  Выйти
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Nav;
