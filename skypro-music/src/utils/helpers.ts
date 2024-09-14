import { Track } from "@/types/Track.types";
import { User } from "@/types/User.types";

export function formatTime(time: number): string {
  let minutes = Math.floor(time / 60);
  let seconds =
    Math.floor(time % 60) < 10
      ? "0" + Math.floor(time % 60)
      : Math.floor(time % 60);
  return `${minutes}:${seconds}`;
}

export function saveUserToLocalStorage(user: User) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage() {
  try {
    const user = window.localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
  } catch (error) {
      if (error instanceof Error) {
        console.error(error);      }
  }
}

export function removeUserFromLocalStorage() {
  window.localStorage.removeItem("user");
}

export function saveAccessTokenToLocalStorage(access: string) {
  window.localStorage.setItem("access", JSON.stringify(access));
}

export function getAccessTokenFromLocalStorage() {
  try {
    const access = window.localStorage.getItem("access");
    if (access) {
      return JSON.parse(access);
    }
  } catch (error) {
      if (error instanceof Error) {
        console.error(error);      }
  }
}

export function removeAccessTokenFromLocalStorage() {
  window.localStorage.removeItem("access");
}

