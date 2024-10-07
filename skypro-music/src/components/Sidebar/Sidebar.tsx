"use client";

import styles from "./Sidebar.module.css";
import Icon from "../Icon/Icon";
import { logout } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { setMyPlaylistState } from "@/store/features/trackSlice";
import SelectionItem from "../Selection/Selection";
import Skeleton from "react-loading-skeleton";
import { removeAccessTokenFromLocalStorage, removeUserFromLocalStorage } from "@/utils/helpers";

function Sidebar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.userState);
  const isLoading = useAppSelector((state) => state.track.isLoading);
  const [name, setName] = useState("");

  const handleLogoutButton = () => {
    dispatch(logout());
    dispatch(setMyPlaylistState([]));
    if (typeof window !== "undefined") {
      removeUserFromLocalStorage();
      removeAccessTokenFromLocalStorage();
    }
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
          {isLoading && (
            <Skeleton
              count={3}
              width={250}
              height={150}
              className={styles.skeleton}
            />
          )}
          {!isLoading && (
            <>
              {[1, 2, 3].map((selection) => (
                <SelectionItem id={selection.toString()} key={selection} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
