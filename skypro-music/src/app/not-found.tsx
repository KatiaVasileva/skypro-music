import Link from "next/link";
import styles from "./not-found.module.css";
import Nav from "@/components/Nav/Nav";
import Search from "@/components/Search/Search";
import Image from "next/image";
import Icon from "@/components/Icon/Icon";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.mainCenterBlock}>
            <Search />
            <div className={styles.boxContainer}>
              <div className={styles.box}>
                <div className={styles.code}>404</div>
                <div className={styles.notFoundBox}>
                  <p className={styles.notFoundBoxText}>Страница не найдена</p>
                  <Image
                    className={styles.image}
                    src="/img/crying.png"
                    alt="crying-smile"
                    width={52}
                    height={52}
                  />
                </div>
                <p className={styles.text}>
                  Возможно, она была удалена или перенесена на другой адрес
                </p>
                <button className={styles.mainPageButton}>
                  <Link href="/playlist" className={styles.mainPageButtonLink}>
                    Вернуться на главную
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.sidebar}>
            <Icon wrapperClass={styles.icon} name="logout" />
          </div>
        </main>
      </div>
    </div>
  );
}
