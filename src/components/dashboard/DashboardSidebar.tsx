import { NavLink, useNavigate } from "react-router-dom";
import { 
  FileText, 
  Users, 
  UserCog, 
  Calendar,
  Megaphone,
  UserPlus,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  LogOut,
  GraduationCap,
  Globe
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
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Tổng quan",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Danh sách thành viên",
    url: "/dashboard/member-slideshow",
    icon: Users,
  },
  {
    title: "Báo cáo Chủ tịch",
    url: "/dashboard/president",
    icon: UserCog,
  },
  {
    title: "Báo cáo Phó Chủ tịch",
    url: "/dashboard/vice-president",
    icon: Users,
  },
  {
    title: "Báo cáo Thư ký & Đào tạo",
    url: "/dashboard/secretary-training",
    icon: GraduationCap,
  },
  {
    title: "Báo cáo Sự kiện & Truyền thông",
    url: "/dashboard/events-communications",
    icon: Calendar,
  },
  {
    title: "Báo cáo Khách mời",
    url: "/dashboard/visitors",
    icon: UserPlus,
  },
  {
    title: "Quản trị Website",
    url: "/dashboard/website-admin",
    icon: Globe,
  },
];

export function DashboardSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  return (
    <Sidebar className={collapsed ? "w-16" : "w-56 sm:w-64"} collapsible="icon" variant="sidebar">
      <SidebarHeader className="border-b p-2 sm:p-3">
        <div className="flex items-center justify-between">
          {!collapsed && <span className="font-semibold text-sm sm:text-base text-bni-red">Menu</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-7 w-7 sm:h-8 sm:w-8"
          >
            {collapsed ? (
              <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            ) : (
              <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            )}
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-1 sm:p-2">
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-xs px-2">Báo cáo</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={collapsed ? item.title : undefined} className="h-9 sm:h-10">
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-bni-red/10 text-bni-red font-medium"
                          : "hover:bg-accent/50"
                      }
                    >
                      <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      {!collapsed && <span className="text-xs sm:text-sm truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-1.5 sm:p-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 h-8 sm:h-9 text-xs sm:text-sm"
          onClick={() => navigate("/")}
        >
          <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          {!collapsed && <span>Thoát</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

