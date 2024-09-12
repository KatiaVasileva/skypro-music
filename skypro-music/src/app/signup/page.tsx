"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { signup } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const router = useRouter();

  const errorMessage = useAppSelector((state) => state.user.errorMessage);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
    try {
      await dispatch(
        signup({
          email: formData.email,
          password: formData.password,
          username: formData.username,
        })
      ).unwrap();
      router.push("/signin");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
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
              name="username"
              value={formData.username}
              placeholder="Имя пользователя"
              onChange={handleOnChange}
              autoComplete="username"
            />
            <input
              className={styles.input}
              type="text"
              name="email"
              value={formData.email}
              placeholder="Почта"
              onChange={handleOnChange}
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
            <input
              className={styles.input}
              type="password"
              name="password"
              onChange={handleOnChange}
              placeholder="Повторите пароль"
              autoComplete="current-password"
            />
            {errorMessage && (
              <div className={styles.errorBox}>
                <p className={styles.error}>{errorMessage}</p>
              </div>
            )}
            <button className={styles.signupButton} onClick={handleSignUp}>
              <a className={styles.signupButtonLink} href="">
                Зарегистрироваться
              </a>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
