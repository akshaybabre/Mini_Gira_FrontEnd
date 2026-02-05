import React from "react";

import {
  LayoutDashboard,
  FolderKanban,
  CalendarCheck,
  CheckSquare,
  LogOut,
} from "lucide-react";

export const memberNavigation = [
  {
    name: "Dashboard",
    path: "/member",
    icon: LayoutDashboard,
  },
  {
    name: "View Projects",
    path: "/member/memberprojects",
    icon: FolderKanban,
  },
  {
    name: "View Sprints",
    path: "/member/membersprints",
    icon: CalendarCheck,
  },
  {
    name: "View Tasks",
    path: "/member/membertasks",
    icon: CheckSquare,
  },
  {
    name: "Logout",
    path: "/logout",
    icon: LogOut,
  },
];
