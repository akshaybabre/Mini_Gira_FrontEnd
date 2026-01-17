import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import KPIWidget from "./KPIWidget";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";

const GiraDashboard = () => {
  const dashboardRef = useRef(null);

  useEffect(() => {
    const cards = dashboardRef.current.querySelectorAll(".gira-card");

    gsap.from(cards, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
    });
  }, []);

  return (
    <div
      ref={dashboardRef}
      className="w-full bg-gradient-to-br from-[#020617] to-[#0f172a] text-white p-4 md:p-6"
    >
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-cyan-400">
        Gira Analytics Dashboard
      </h1>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPIWidget title="Revenue" value="₹4.2M" />
        <KPIWidget title="Growth" value="+12.5%" />
        <KPIWidget title="Users" value="18,430" />
        <KPIWidget title="Orders" value="3,190" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart />
        <BarChart />
        <DonutChart title="Market Share" percent={75} />
        <DonutChart title="Completion Rate" percent={64} />
      </div>
    </div>
  );
};

export default GiraDashboard;
