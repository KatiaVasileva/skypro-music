import { Track } from "@/types/Track.types";
import { fetchWithAuth } from "./userApi";

const baseHost = "https://webdev-music-003b5b991590.herokuapp.com";

// Получить все треки
export async function getAllTracks(): Promise<Array<Track>> {
  const response = await fetch(baseHost + "/catalog/track/all", {
    method: "GET",
  });

  if (response.status === 500) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await response.json();
  return data.data;
}

type AddFavoriteProps = {
  id: number | undefined;
  access: string;
  refresh: string;
};

// Добавить трек в избранное по id
export async function addFavorite({ id, access, refresh }: AddFavoriteProps) {
  const response = await fetchWithAuth(
    baseHost + "/catalog/track/" + id + "/favorite/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
    refresh
  );

  if (response.status === 401) {
    throw new Error("Ошибка авторизации");
  }
  if (response.status === 500) {
    throw new Error("Ошибка при получении данных");
  }

  const data = await response.json();
  return data;
}
