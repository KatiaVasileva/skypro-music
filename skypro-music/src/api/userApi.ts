const baseHost = "https://webdev-music-003b5b991590.herokuapp.com";

export type RegisterProps = {
  email: string;
  password: string;
  username: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

// Зарегистрироваться
export async function register({ email, password, username }: RegisterProps) {
  const response = await fetch(baseHost + "/user/signup/", {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.status === 412) {
    throw new Error("Данные в неверном формате");
  }
  if (response.status === 403) {
    throw new Error("Введенный Email уже занят");
  }
  if (response.status === 500) {
    throw new Error("Ошибка при получении данных");
  }

  const data = await response.json();

  return data.data;
}

// Войти
export async function login({ email, password }: LoginProps) {
  const response = await fetch(baseHost + "/user/login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.status === 412) {
    throw new Error("Данные в неверном формате");
  }
  if (response.status === 401) {
    throw new Error("Пользователь с таким email или паролем не найден");
  }
  if (response.status === 500) {
    throw new Error("Ошибка при получении данных");
  }

  const data = await response.json();

  return data;
}

export type GetTokenProps = {
  email: string;
  password: string;
};

// export type FetchWithAuthProps = {
//   url: string;
//   options: {
//     headers: HeadersInit;
//   };
//   refresh: string;
// };

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

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}

// Получить токен
export async function getToken({ email, password }: GetTokenProps) {
  const response = await fetch(baseHost + "/user/token/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "content-type": "application/json",
    },
  });

  if (response.status === 412) {
    throw new Error("Данные в неверном формате");
  }
  if (response.status === 401) {
    throw new Error("Пользователь с таким email или паролем не найден");
  }
  if (response.status === 500) {
    throw new Error("Ошибка при получении данных");
  }

  const data = await response.json();
  return data;
}

// Обновить токен
export async function refreshToken(refresh: string) {
  const response = await fetch(baseHost + "/user/token/refresh/", {
    method: "POST",
    body: JSON.stringify(refresh),
    headers: {
      "content-type": "application/json",
    },
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
