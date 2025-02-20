import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { themPhongBan } from "@/apis/phong-ban";

const initialState = {
  ten_phong_ban: "",
  ma_phong_ban: "",
  thu_tu_sap_xep: 0,
  trang_thai: true,
};

const schema = z.object({
  ten: z.string().min(1),
  ten_viet_tat: z.string().optional(),
  dia_chi: z.string().min(5),
  sdt: z.string().optional(),
  trang_thai: z.boolean(),
});

export default function AddForm({ open, setOpen }) {
  const queryClient = useQueryClient();

  const form =
    useForm <
    CongTyRequest >
    {
      resolver: zodResolver(schema),
      defaultValues: initialState,
    };

  const { mutate, isPending } = useMutation({
    mutationFn: (phongBan) => themPhongBan(phongBan),
  });

  const onSubmit = async (values: CongTyRequest) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Thêm công ty thành công");
        form.reset();
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["congties"] });
      },
      onError: () => {
        toast.error("Thêm công ty thất bại");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600">
          <PlusIcon className="h-4 w-4" />
          <span>Thêm</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Thêm công ty</DialogTitle>
              <DialogDescription></DialogDescription>
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="ten"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-x-4">
                        <FormLabel className="text-right">
                          Tên Công ty <span className="text-red-500">*</span>
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
                  name="ten_viet_tat"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">
                          Tên viết tắt
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
                  name="dia_chi"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">
                          Địa chỉ <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} className="col-span-3" />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sdt"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">
                          Số điện thoại
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
                  name="trang_thai"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="text-right">Trạng thái</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
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
