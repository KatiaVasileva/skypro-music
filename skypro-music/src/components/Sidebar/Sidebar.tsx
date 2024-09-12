"use client";

import Image from "next/image";
import styles from "./Sidebar.module.css";
import Icon from "../Icon/Icon";
import { logout } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";

function Sidebar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userState);
  const [name, setName] = useState("");

  const handleLogoutButton = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (user) {
      setName(user.username);
    }
  }, [user, setName]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.personal}>
        <p className={styles.personalName}>{user ? name : ""}</p>
        <Icon
          wrapperClass={styles.icon}
          name="logout"
          onClick={handleLogoutButton}
        />
      </div>
      <div className={styles.block}>
        <div className={styles.list}>
          <div className={styles.item}>
            <a className={styles.link} href="#">
              <Image
                className={styles.img}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
                priority
              />
            </a>
          </div>
          <div className={styles.item}>
            <a className={styles.link} href="#">
              <Image
                className={styles.img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
                priority
              />
            </a>
          </div>
          <div className={styles.item}>
            <a className={styles.link} href="#">
              <Image
                className={styles.img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
                priority
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
