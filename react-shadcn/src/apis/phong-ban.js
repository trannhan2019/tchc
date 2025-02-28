import axios from "@/lib/axios";
import { csrf } from "@/lib/utils";

const phongBanApiUrl = "/api/phong-ban"; // Cần cập nhật vào apiUrl

export const getManyPhongBan = async ({ search }) =>
  await axios.get(phongBanApiUrl, { params: { search } });

export const themPhongBan = async (phongBan) => {
  await csrf();
  return axios.post(phongBanApiUrl, phongBan);
};

export const suaPhongBan = async (phongBan, id) => {
  await csrf();
  return axios.put(`${phongBanApiUrl}/${id}`, phongBan);
};

export const deletePhongBan = async (id) => {
  await csrf();
  return axios.delete(`${phongBanApiUrl}/${id}`);
};

export const deleteCongtys = async (ids) => {
  await csrf();
  return axios.delete(`${phongBanApiUrl}/${ids}`);
};
