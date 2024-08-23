const baseHost = "https://webdev-music-003b5b991590.herokuapp.com";

// Получить все треки
export async function getAllTracks() {
  const response = await fetch(baseHost + "/catalog/track/all", {
    method: "GET",
  });

  if (response.status === 500) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await response.json();
  return data.data;
}

// Получить треки по id
export async function getTrackById({id}: {id: number}) {
  const response = await fetch(baseHost + "/catalog/track/" + id, {
    method: "GET",
  });

  if (response.status === 500) {
    throw new Error("Ошибка при получении данных");
  } 

  if (response.status === 404) {
    throw new Error("Трек не найден");
  }
  const data = await response.json();
  return data.data;
}
