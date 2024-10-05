"use client";

import Image from "next/image";
import styles from "./SignUp.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { signup } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    passwordRepeat: "",
  });

  const requestError = useAppSelector((state) => state.user.errorMessage);
  const [error, setError] = useState("");
  const errorMessage = error ? error : requestError;

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setError("");
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    console.log(formData.password);
    console.log(formData.passwordRepeat);
    console.log(formData.password !== formData.passwordRepeat);

    if (!formData.username.trim()) {
      setError("Введите имя");
      return;
    }

    if (formData.username.length < 3) {
      setError("Имя пользователя должно быть более 3 символов");
      return;
    }

    if (!formData.email.trim()) {
      setError("Введите почту");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Неверный формат почты");
      return;
    }

    if (!formData.password.trim()) {
      setError("Введите пароль");
      return;
    }

    if (formData.password.length < 6) {
      setError("Пароль должен быть более 6 символов");
      return;
    }

    if (formData.password !== formData.passwordRepeat) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      await dispatch(
        signup({
          email: formData.email,
          password: formData.password,
          username: formData.username,
        })
      ).unwrap();
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
              name="passwordRepeat"
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
              <Link className={styles.signupButtonLink} href="/signin">
                Зарегистрироваться
              </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
