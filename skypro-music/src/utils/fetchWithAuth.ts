export async function fetchWithAuth(
    url: string,
    options: {
      method: string,
      headers: HeadersInit;
    },
    refresh: string
  ) {
    let response = await fetch(url, options);
  
    if (response.status === 401) {
      const newAccessToken = await refreshToken(refresh);
  
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
      response = await fetch(url, options);
    }
  
    if (response.status === 500) {
      throw new Error(response.statusText);
    }
  
    return response;
  }

  // Обновить токен
export async function refreshToken(refresh: string) {
    const response = await fetch("https://webdev-music-003b5b991590.herokuapp.com/user/token/refresh/", {
      method: "POST",
      body: JSON.stringify(refresh),
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      mode: 'no-cors',
    });
  
    if (response.status === 400) {
      throw new Error("Токен недействителен или просрочен");
    }
    if (response.status === 401) {
      throw new Error("В теле запроса не передан refresh токен");
    }
    if (response.status === 500) {
      throw new Error("Ошибка при получении данных");
    }
  
    const data = await response.json();
    return data;
  }