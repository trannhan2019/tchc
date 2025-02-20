import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useQueryParams } from "@/hooks/use-query-params";
import { useForm } from "react-hook-form";
import { Form, FormField } from "./ui/form";

export function SearchForm({ setOpen }) {
  const { queryObject, updateQueryParams } = useQueryParams();

  const form = useForm({
    defaultValues: {
      search: queryObject.search || "",
    },
  });

  //them 1 button clear search
  const handleClearSearch = () => {
    form.reset();
    updateQueryParams({ search: null });
    form.setValue("search", "");
  };

  const onSubmit = (value) => {
    updateQueryParams({ ...queryObject, page: "1", search: value.search });
  };

  return (
    <div className="mb-3 flex justify-between">
      <div className="flex items-center ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center min-w-80">
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <div className="relative w-full">
                    <Input
                      {...field}
                      placeholder="Tìm kiếm theo tên hoặc tên viết tắt"
                    />
                    {form.getValues("search") && (
                      <Button
                        variant="ghost"
                        type="button"
                        onClick={handleClearSearch}
                        className="absolute right-0 top-0"
                      >
                        <X color="red" />
                      </Button>
                    )}
                  </div>
                )}
              />

              <Button
                type="submit"
                variant="secondary"
                className="ml-1 cursor-pointer"
              >
                Tìm kiếm
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div>
        <Button className="cursor-pointer" onClick={() => setOpen(true)}>
          <Plus /> Thêm mới
        </Button>
      </div>
    </div>
  );
}
