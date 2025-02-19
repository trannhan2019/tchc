import axios from "@/lib/axios";

const phongBanApiUrl = "/api/phong-ban"; // Cần cập nhật vào apiUrl

export const getManyPhongBan = async () => await axios.get(phongBanApiUrl);
