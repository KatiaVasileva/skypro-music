import { FavoriteRequestProps } from "@/types/FavoriteRequestProps.types";
import { Selection } from "@/types/Selection.types";
import { Track } from "@/types/Track.types";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

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

// Добавить трек в избранное по id
export async function addFavorite({
  id,
  access,
  refresh,
}: FavoriteRequestProps) {
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

// Удалить трек из избранного по id
export async function removeFavorite({
  id,
  access,
  refresh,
}: FavoriteRequestProps) {
  const response = await fetchWithAuth(
    baseHost + "/catalog/track/" + id + "/favorite/",
    {
      method: "DELETE",
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

// Посмотреть избранное
export async function getFavorite({
  access,
  refresh,
}: {
  access: string;
  refresh: string;
}) {
  const response = await fetchWithAuth(
    baseHost + "/catalog/track/favorite/all/",
    {
      method: "GET",
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
  return data.data;
}

// Просмотреть подборки
export async function getSelections(): Promise<Array<Selection>> {
  const response = await fetch(baseHost + "/catalog/selection/all", {
    method: "GET",
  });

  if (response.status === 500) {
    throw new Error("Ошибка при получении данных");
  }

  const data = await response.json();
  return data.data;
}

// Просмотреть подборку по id
export async function getSelectionById(id: string): Promise<Selection> {
  const selectionId = Number(id) + 1;
  const response = await fetch(`${baseHost}/catalog/selection/${selectionId}/`, {
    method: "GET",
  });

  if (response.status === 500) {
    throw new Error("Ошибка при получении данных");
  }

  const data = await response.json();
  return data.data;
 }
