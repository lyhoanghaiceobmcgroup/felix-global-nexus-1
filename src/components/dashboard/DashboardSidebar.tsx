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
  GraduationCap
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
];

export function DashboardSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          {!collapsed && <span className="font-semibold text-bni-red">Menu Dashboard</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Báo cáo</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={collapsed ? item.title : undefined}>
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
      
      <SidebarFooter className="border-t p-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => navigate("/")}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Thoát</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

