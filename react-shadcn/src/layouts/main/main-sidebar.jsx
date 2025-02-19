import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Group, Home } from "lucide-react";

import LogoImage from "@/assets/logo.png";
import { Link, useLocation } from "react-router";

//This is data item admin menu
const menus = [
  {
    title: "Home",
    url: "#",
    items: [
      {
        title: "Theo dõi BHXH",
        url: "/bhxh",
        icon: Home,
      },
    ],
  },
  {
    title: "Quản lý",
    items: [
      {
        title: "Phòng Ban",
        url: "/phong-ban",
        icon: Group,
      },
    ],
  },
];

export function MainSidebar({ ...props }) {
  let location = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <img
          className="w-[65%] object-cover h-auto"
          src={LogoImage}
          alt="LOGO"
        />
      </SidebarHeader>
      <SidebarContent>
        {menus.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                      className="data-[active=true]:text-primary"
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
