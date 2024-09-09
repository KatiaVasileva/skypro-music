import { Track } from "@/types/Track.types";

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
