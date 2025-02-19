import { getManyPhongBan } from "@/apis/phong-ban";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function DanhSachPhongBan() {
  const { data: dsPhongBan } = useQuery({
    queryKey: ["phong-ban"],
    queryFn: () => getManyPhongBan(),
    placeholderData: keepPreviousData,
    retry: false,
  });

  return <div>DanhSachPhongBan</div>;
}
