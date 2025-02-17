import axiosClient from "./axios.client";
export const csrf = () => axiosClient.get("/sanctum/csrf-cookie");
