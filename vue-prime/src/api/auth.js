import axiosClient from "@/lib/axios.client";
import { csrf } from "@/lib/utils";

export const login = async (values) => {
  await csrf();
  return axiosClient.post("/login", {
    email: values.email,
    password: values.password,
  });
};

export const logout = async () => {
  await csrf();
  return axiosClient.post("/logout");
};
