import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MainSidebar } from "./main-sidebar";

export default function MainLayout({ children }) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
