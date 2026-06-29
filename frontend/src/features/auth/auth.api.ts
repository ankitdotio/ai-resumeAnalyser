import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:8000`,
  withCredentials: true,
});

export const register = async ({
  userName,
  email,
  password,
}: {
  userName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post(`/api/auth/register`, {
      userName,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async ({ userName, password }) => {
  try {
    const response = await api.post(`/api/auth/login`, {
      userName,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const response = await api.post(`/api/auth/logout`, {});
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getme = async () => {
  try {
    const response = await api.get(
      `/api/auth/getme`,

      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
