import Cookies from "universal-cookie";

const cookies = new Cookies();
const TOKEN_KEY = "token";

export const getToken = (): string => cookies.get(TOKEN_KEY);

export const setToken = (token: string) => {
  cookies.set(TOKEN_KEY, token, { path: "/" });
};

export const removeToken = () => {
  cookies.remove(TOKEN_KEY, { path: "/" });
};


const USER_KEY = "user";

export const getUser = (): string => cookies.get(USER_KEY);

export const setUser = (token: string) => {
  cookies.set(USER_KEY, token, { path: "/" });
};
