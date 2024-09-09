import { User } from "@/types/User.types";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseHost = "https://webdev-music-003b5b991590.herokuapp.com";

export const signin = createAsyncThunk(
  "user/signin",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch(baseHost + "/user/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = response.json();

    if (response.status === 400) {
      throw new Error("Не указан пароль или логин");
    }
    if (response.status === 401) {
      throw new Error("Пользователь с таким email или паролем не найден");
    }
    if (response.status === 500) {
      throw new Error("Ошибка при получении данных");
    }

    return json;
  }
);
