import { NavLink } from "react-router-dom";
import { 
  FileText, 
  Users, 
  UserCog, 
  Calendar,
  Megaphone,
  UserPlus,
  LayoutDashboard
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Tổng quan",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Báo cáo Chủ tịch",
    url: "/dashboard/president",
    icon: FileText,
  },
  {
    title: "Báo cáo Phó Chủ tịch",
    url: "/dashboard/vice-president",
    icon: UserCog,
  },
  {
    title: "Báo cáo Thư ký & Đào tạo",
    url: "/dashboard/secretary-training",
    icon: FileText,
  },
  {
    title: "Báo cáo Sự kiện",
    url: "/dashboard/events",
    icon: Calendar,
  },
  {
    title: "Báo cáo Truyền thông",
    url: "/dashboard/communications",
    icon: Megaphone,
  },
  {
    title: "Báo cáo Khách mời",
    url: "/dashboard/visitors",
    icon: UserPlus,
  },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-bni-red/10 text-bni-red font-medium"
                          : "hover:bg-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
