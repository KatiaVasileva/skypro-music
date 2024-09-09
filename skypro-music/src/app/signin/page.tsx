import Image from "next/image";
import styles from "./page.module.css";
import { useAppDispatch } from "@/store/store";
import { signin } from "@/api/userApi";

export default function SignIn() {
  const dispatch = useAppDispatch();

  const handleSignIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await dispatch(signin({ email, password })).unwrap();
      console.log("Успешно!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <body suppressHydrationWarning={true}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.block}>
            <form className={styles.formLogin} action="#">
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
              <button className={styles.enterButton}>
                <a className={styles.enterButtonLink} href="">
                  Войти
                </a>
              </button>
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
