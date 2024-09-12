const baseHost = "https://webdev-music-003b5b991590.herokuapp.com";

export type RegisterProps = {
    email: string;
    password: string;
    username: string;
};

export type LoginProps = {
    email: string;
    password: string;
}

export async function register({email, password, username}: RegisterProps) {
    const response = await fetch(baseHost + "/user/signup/", {
        method: "POST",
        body: JSON.stringify({email, password, username}),
        headers: {
            "content-type": "application/json",
        },
    });

    if (response.status === 412) {
        throw new Error("Необходимо ввести все данные")
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

export async function login({email, password}: LoginProps) {
    const response = await fetch(baseHost + "/user/login/", {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
            "content-type": "application/json",
        }
    });

    if (response.status === 412) {
        throw new Error("Необходимо ввести все данные")
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