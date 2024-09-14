"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { setTokens, setUser, signin, token } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const errorMessage = useAppSelector((state) => state.user.errorMessage);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    try {
      const user = await dispatch(
        signin({ email: formData.email, password: formData.password })
      ).unwrap();
      dispatch(setUser(user));
      router.push("/");
      setFormData({ email: "", password: "" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(errorMessage);
      }
    }
    const tokens = await dispatch(
      token({ email: formData.email, password: formData.password })
    ).unwrap();
    dispatch(setTokens(tokens));
  };

  return (
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
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="Почта"
              autoComplete="email"
            />
            <input
              className={styles.input}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="Пароль"
              autoComplete="current-password"
            />
            {errorMessage && (
              <div className={styles.errorBox}>
                <p className={styles.error}>{errorMessage}</p>
              </div>
            )}

            <button className={styles.enterButton} onClick={handleSignIn}>
              <a className={styles.enterButtonLink}>Войти</a>
            </button>
            <button className={styles.signupButton}>
              <a className={styles.signupButtonLink} href="/signup">
                Зарегистрироваться
              </a>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
