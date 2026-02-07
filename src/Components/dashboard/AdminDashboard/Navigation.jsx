import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CalendarCheck,
  CheckSquare,
  Settings,
  LogOut,
} from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    path: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    name: "Teams",
    path: "/dashboard/teams",
    icon: Users,
  },
  {
    name: "Tasks",
    path: "/dashboard/tasks",
    icon: CheckSquare,
  },
  {
    name: "Sprints",
    path: "/dashboard/sprints",
    icon: CalendarCheck,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "Logout",
    path: "/logout",
    icon: LogOut,
  },
];
