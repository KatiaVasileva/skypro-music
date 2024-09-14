"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setIsMyPlaylistClicked } from "@/store/features/trackSlice";
import { getFavorite } from "@/api/tracksApi";

function Nav() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userState);
  const tokens = useAppSelector((state) => state.user.tokens);
  const [isBurgerClicked, setIsBurgerClicked] = useState(false);

  const handleBurgerClick: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsBurgerClicked((prevState) => !prevState);
  };

  const handleMyPlaylistClick: React.MouseEventHandler<
    HTMLAnchorElement
  > = async (event) => {
    event.preventDefault();
    dispatch(setIsMyPlaylistClicked(true));
    const data = await getFavorite({
      access: tokens!.access,
      refresh: tokens!.refresh,
    });
    console.log(data);
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
              <a href="#" className={styles.menuLink}>
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
              <a href="/signin" className={styles.menuLink}>
                {/* {user ? "Выйти" : "Войти"} */}
                Войти
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Nav;
