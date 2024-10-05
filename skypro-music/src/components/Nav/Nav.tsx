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
import { useRouter } from "next/navigation";
import { resetFilters } from "@/store/features/filterSlice";
import Link from "next/link";

function Nav() {
  // const router = useRouter();

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
    // router.push("/playlist");
    dispatch(resetFilters());
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
    // router.push("/playlist/favorite");
    dispatch(resetFilters());
  };

  const handleExitClick: React.MouseEventHandler<HTMLAnchorElement> = (
    event
  ) => {
    event.preventDefault();
    // router.push("/playlist");
    dispatch(logout());
    dispatch(getTracks());
    dispatch(setMyPlaylistState([]));
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
              <Link legacyBehavior href="/playlist" onClick={handleMainClick}>
                <a className={styles.menuLink}>Главное</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link
                legacyBehavior
                href="/playlist/favorite"
                onClick={handleMyPlaylistClick}
              >
                <a className={styles.menuLink}>Мой плейлист</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              {!user && (
                <Link href="/signin" className={styles.menuLink}>
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
