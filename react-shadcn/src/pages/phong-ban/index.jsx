import { useState } from "react";
import { DanhSachPhongBan } from "./danh-sach";
import { SearchForm } from "@/components/search-form";
import { AddEditForm } from "./add-edit-form";

export default function PhongBan() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [type, setType] = useState("add");
  const [phongBan, setPhongBan] = useState({});

  return (
    <div className="relative p-4">
      <div className="mb-3">
        <h3 className="text-lg font-medium">Danh sách Phòng Ban</h3>
      </div>
      <SearchForm setOpen={setOpenAddForm} setType={setType} />
      <DanhSachPhongBan
        setOpen={setOpenAddForm}
        setPhongBan={setPhongBan}
        setType={setType}
      />

      <AddEditForm
        open={openAddForm}
        setOpen={setOpenAddForm}
        type={type}
        setType={setType}
        phongBan={phongBan}
      />
    </div>
  );
}
