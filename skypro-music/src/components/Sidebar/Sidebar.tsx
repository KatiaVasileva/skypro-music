import Image from "next/image";
import styles from "./Sidebar.module.css";
import Icon from "../Icon/Icon";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.personal}>
        <p className={styles.personalName}>Sergey.Ivanov</p>
        <Icon wrapperClass={styles.icon} name="logout" />
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
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
