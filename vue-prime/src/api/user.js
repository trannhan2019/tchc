import axiosClient from "@/lib/axios.client";

export const getInfo = () => axiosClient.get("/api/user");
