import { getManyPhongBan, deletePhongBan } from "@/apis/phong-ban";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  AlertCircle,
  CheckIcon,
  EllipsisIcon,
  Pencil,
  Trash2,
  XIcon,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useQueryParams } from "@/hooks/use-query-params";
import { Loading } from "@/components/loading";
import { useState } from "react";
import DeleteAlert from "@/components/delete-alert";
import toast from "react-hot-toast";

export function DanhSachPhongBan({ setOpen, setPhongBan, setType }) {
  const { queryObject } = useQueryParams();
  const search = queryObject.search || null;

  const [openDel, setOpenDel] = useState(false);
  const [phongBanId, setPhongBanId] = useState(null);

  const {
    data: dsPhongBan,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["phong-ban", search],
    queryFn: () => getManyPhongBan({ search }),
    placeholderData: keepPreviousData,
    retry: false,
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => deletePhongBan(phongBanId),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Alert
        variant="destructive"
        className="absolute top-1.5 right-1.5 max-w-sm"
      >
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    );
  }

  const handleOpenEdit = (value) => {
    setOpen(true);
    setType("edit");
    setPhongBan(value);
  };

  const handleOpenDelete = (id) => {
    setOpenDel(true);
    setPhongBanId(id);
  };

  const handleDelete = () => {
    mutate({
      onSuccess: () => {
        toast.success("Xóa phòng ban thành công");
        queryClient.invalidateQueries(["phong-ban"]);
        setOpenDel(false);
      },
      onError: () => {
        toast.error("Xóa phòng ban thất bại !");
      },
    });
  };

  return (
    <>
      <DeleteAlert
        open={openDel}
        setOpen={setOpenDel}
        handleDelete={handleDelete}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-5">
              {/* <CheckboxTable
                checked={isSelectedAll}
                updateValue={handleSelectAll}
              /> */}
            </TableHead>
            <TableHead className="w-5">STT</TableHead>
            <TableHead className="w-[50%] lg:w-[70%]">Tên phòng ban</TableHead>
            <TableHead>Tên viết tắt</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {dsPhongBan !== undefined && dsPhongBan.data?.length > 0 ? (
            dsPhongBan?.data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-sm text-gray-800">
                  {/* <CheckboxTable
                    checked={isSelected(congTy.id)}
                    updateValue={(value) => handleSelect(value, congTy.id)}
                  /> */}
                </TableCell>
                <TableCell className="text-sm text-gray-800">
                  {item.thu_tu_sap_xep}
                </TableCell>
                <TableCell className="text-sm text-gray-800">
                  {item.ten_phong_ban}
                </TableCell>
                <TableCell className="text-sm text-gray-800">
                  {item.ma_phong_ban}
                </TableCell>
                <TableCell className="text-center">
                  {item.trang_thai ? (
                    <CheckIcon color="green" className="h-4 w-4 text-center" />
                  ) : (
                    <XIcon color="red" className="h-4 w-4" />
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 cursor-pointer"
                      >
                        <EllipsisIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleOpenEdit(item)}>
                        <Pencil />
                        <span className="ml-4 text-sm">Sửa</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleOpenDelete(item.id)}
                      >
                        <Trash2 color="red" />
                        <span className="ml-4 text-sm">Xóa</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-sm text-gray-500"
              >
                Không có dữ liệu
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
