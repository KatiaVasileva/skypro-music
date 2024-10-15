"use client";

import Image from "next/image";
import styles from "./SignIn.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import {
  setIsRegisterClicked,
  setTokens,
  setUser,
  signin,
  token,
} from "@/store/features/userSlice";
import { useRouter } from "next/navigation";
import {
  saveAccessTokenToLocalStorage,
  saveUserToLocalStorage,
} from "@/utils/helpers";

export default function SignIn() {
  const dispatch = useAppDispatch();

  const requestError = useAppSelector((state) => state.user.errorMessage);
  const [error, setError] = useState("");
  const errorMessage = error ? error : requestError;

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setError("");
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

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

    try {
      const user = await dispatch(
        signin({ email: formData.email, password: formData.password })
      ).unwrap();
      dispatch(setUser(user));
      if (typeof window !== "undefined") {
        saveUserToLocalStorage(user);
      }
      router.push("/playlist");
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
    if (typeof window !== "undefined") {
      saveAccessTokenToLocalStorage(tokens.access);
    }
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
              <a
                className={styles.signupButtonLink}
                onClick={() => dispatch(setIsRegisterClicked(true))}
              >
                Зарегистрироваться
              </a>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
