import Image from "next/image";
import styles from "./Nav.module.css"

function Nav() {
  return (
    <nav className={styles.main}>
      <div className={styles.logo}>
        <Image
          className={styles.image}
          src="/img/logo.png"
          alt="logo"
          width={113.33}
          height={17}
        />
      </div>
      <div className={styles.burger}>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      <div className={styles.menu}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
              Главное
            </a>
          </li>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
              Мой плейлист
            </a>
          </li>
          <li className={styles.menuItem}>
            <a href="../signin.html" className={styles.menuLink}>
              Войти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
