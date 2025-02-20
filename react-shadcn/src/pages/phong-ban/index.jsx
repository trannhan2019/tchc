import { useState } from "react";
import { DanhSachPhongBan } from "./danh-sach";
import { SearchForm } from "@/components/search-form";
import { AddForm } from "./add-form";

export default function PhongBan() {
  const [openAddForm, setOpenAddForm] = useState(false);

  return (
    <div className="relative p-4">
      <div className="mb-3">
        <h3 className="text-lg font-medium">Danh sách Phòng Ban</h3>
      </div>
      <SearchForm setOpen={setOpenAddForm} />
      <DanhSachPhongBan />

      <AddForm open={openAddForm} setOpen={setOpenAddForm} />
    </div>
  );
}
