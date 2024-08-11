import Image from "next/image";
import playlist01 from "./img/playlist01.png";
import playlist02 from "./img/playlist02.png";
import playlist03 from "./img/playlist03.png";
import styles from "./Sidebar.module.css";
import Sprite from "@/public/Icon/IconSearch";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.personal}>
        <p className={styles.personalName}>Sergey.Ivanov</p>
        <Sprite />
        <div className={styles.icon}>
          <svg>
            <use href="#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.list}>
          <div className={styles.item}>
            <a className={styles.link} href="#">
              <Image
                className={styles.img}
                src={playlist01}
                alt="day's playlist"
                width={250}
                height={150}
              />
            </a>
          </div>
          <div className={styles.item}>
            <a className={styles.link} href="#">
              <Image
                className={styles.img}
                src={playlist02}
                alt="day's playlist"
                width={250}
                height={150}
              />
            </a>
          </div>
          <div className={styles.item}>
            <a className={styles.link} href="#">
              <Image
                className={styles.img}
                src={playlist03}
                alt="day's playlist"
                width={250}
                height={150}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
