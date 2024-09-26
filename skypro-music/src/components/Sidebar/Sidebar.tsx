"use client";

import styles from "./Sidebar.module.css";
import Icon from "../Icon/Icon";
import { logout } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { getTracks, setMyPlaylistState } from "@/store/features/trackSlice";
import { Selection } from "@/types/Selection.types";
import SelectionItem from "../Selection/Selection";

function Sidebar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userState);
  const [name, setName] = useState("");

  const handleLogoutButton = () => {
    dispatch(logout());
    dispatch(getTracks());
    dispatch(setMyPlaylistState([]));
  };

  useEffect(() => {
    if (user) {
      setName(user.username);
    }
    dispatch(getTracks()).unwrap();
  }, [user, setName, dispatch]);

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
          {[1, 2, 3].map((selection) => (
            <SelectionItem id={selection.toString()} key={selection} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
