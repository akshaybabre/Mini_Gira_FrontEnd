import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import LeftMenu from "./LeftMenu";
import Header from "./Header";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0a0f1f] via-[#0f172a] to-[#020617]">
      <LeftMenu open={open} onClose={() => setOpen(false)} />

      <div className="flex-1 flex flex-col">
        <Header toggle={() => setOpen(true)} />

        <main className="p-6 md:p-8 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
