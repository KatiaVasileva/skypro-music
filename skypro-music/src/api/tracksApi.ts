const baseHost = "https://webdev-music-003b5b991590.herokuapp.com";

// Получить все треки
export async function getAllTracks() {
  const response = await fetch(baseHost + "/catalog/track/all", {
    method: "GET",
  });

  if (response.status === 500) {
    throw new Error ("Ошибка при получении данных");
  }

  return await response.json();
}

