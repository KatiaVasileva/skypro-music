import Image from "next/image";
import styles from "./page.module.css";

export default function SignUp() {
  return (
    <body suppressHydrationWarning={true}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.block}>
            <form className={styles.formLogin}>
              <a href="../">
                <div className={styles.logo}>
                  <Image
                    className={styles.logoImage}
                    src="/img/logo_modal.png"
                    alt="logo"
                    priority
                    width={113.33}
                    height={43}
                  />
                </div>
              </a>
              <input
                className={styles.inputFirstChild}
                type="text"
                name="login"
                placeholder="Почта"
              />
              <input
                className={styles.input}
                type="password"
                name="password"
                placeholder="Пароль"
              />
              <input
                className={styles.input}
                type="password"
                name="password"
                placeholder="Повторите пароль"
              />
              <button className={styles.signupButton}>
                <a className={styles.signupButtonLink} href="">
                  Зарегистрироваться
                </a>
              </button>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
}
