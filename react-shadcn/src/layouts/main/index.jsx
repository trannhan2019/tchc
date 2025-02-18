import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { MainSidebar } from "./main-sidebar";
import { MainHeader } from "./main-header";
import { Outlet } from "react-router";

export default function Page() {
  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <MainHeader />
        <main className="flex flex-1 bg-muted/50 p-4">
          <div className="aspect-video w-full h-full rounded-xl bg-white">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
