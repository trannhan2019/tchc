import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { themPhongBan, suaPhongBan } from "@/apis/phong-ban";
import toast from "react-hot-toast";
import { useEffect } from "react";

const initialState = {
  ten_phong_ban: "",
  ma_phong_ban: "",
  thu_tu_sap_xep: 1,
  trang_thai: true,
};

const schema = z.object({
  ten_phong_ban: z.string().min(1),
  ma_phong_ban: z.string().min(1),
  thu_tu_sap_xep: z.number(),
  trang_thai: z.boolean(),
});

export function AddEditForm({ open, setOpen, type, phongBan }) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (type === "edit") {
      form.setValue("ten_phong_ban", phongBan.ten_phong_ban);
      form.setValue("ma_phong_ban", phongBan.ma_phong_ban);
      form.setValue("thu_tu_sap_xep", phongBan.thu_tu_sap_xep);
      form.setValue("trang_thai", Boolean(phongBan.trang_thai));
    } else {
      form.reset();
    }
  }, [phongBan, type, open]);

  const form = useForm({
    defaultValues: initialState,
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values) =>
      type === "add" ? themPhongBan(values) : suaPhongBan(values, phongBan.id),
  });

  const onSubmit = async (values) => {
    mutate(values, {
      onSuccess: () => {
        form.reset();
        setOpen(false);

        toast.success("Lưu phòng ban thành công !");
        queryClient.invalidateQueries({ queryKey: ["phong-ban"] });
      },
      onError: (error) => {
        if (error.response.status === 422) {
          toast.error("Tên phòng ban đã tồn tại !");
        } else {
          toast.error("Thêm phòng ban thất bại !");
        }
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Thêm Phòng Ban</DialogTitle>
              <DialogDescription></DialogDescription>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="ten_phong_ban"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-x-3">
                        <FormLabel className="text-right">
                          Tên Phòng Ban <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="col-span-3" />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ma_phong_ban"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-x-3">
                        <FormLabel className="text-right">
                          Tên viết tắt <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} className="col-span-3" />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thu_tu_sap_xep"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-x-3">
                        <FormLabel className="text-right">
                          Thứ tự sắp xếp <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            className="col-span-3"
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trang_thai"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-x-3">
                        <FormLabel className="text-right">Trạng thái</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Hủy</Button>
              </DialogClose>
              <Button disabled={isPending} type="submit">
                {isPending ? <Loader2 className="animate-spin" /> : "Lưu"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
