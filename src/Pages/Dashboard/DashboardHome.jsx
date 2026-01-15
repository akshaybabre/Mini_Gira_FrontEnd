import React, { useEffect, useRef } from "react";
import {
  FolderKanban,
  CheckSquare,
  CalendarClock,
  Users,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import gsap from "gsap";

/* ------------------ STATS ------------------ */
const stats = [
  {
    title: "Total Projects",
    value: "4",
    icon: FolderKanban,
    gradient: "from-cyan-400/30 to-cyan-600/10",
  },
  {
    title: "Total Tasks",
    value: "12",
    icon: CheckSquare,
    gradient: "from-purple-400/30 to-purple-600/10",
  },
  {
    title: "Active Sprints",
    value: "2",
    icon: CalendarClock,
    gradient: "from-indigo-400/30 to-indigo-600/10",
  },
  {
    title: "Team Members",
    value: "5",
    icon: Users,
    gradient: "from-blue-400/30 to-blue-600/10",
  },
];

/* ------------------ CHART DATA ------------------ */
const activityData = [
  { day: "Mon", tasks: 30, sprints: 20 },
  { day: "Tue", tasks: 45, sprints: 28 },
  { day: "Wed", tasks: 38, sprints: 26 },
  { day: "Thu", tasks: 60, sprints: 40 },
  { day: "Fri", tasks: 55, sprints: 35 },
  { day: "Sat", tasks: 70, sprints: 50 },
  { day: "Sun", tasks: 65, sprints: 45 },
];

const DashboardHome = () => {
  const cardsRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    gsap.from(cardsRef.current.children, {
      opacity: 0,
      y: 40,
      stagger: 0.12,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(chartRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="relative z-10">
      {/* ---------------- HEADER ---------------- */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-white tracking-wide">
          Overview
        </h1>
        <p className="text-gray-400 mt-1">
          Project activity & performance
        </p>
      </div>

      {/* ---------------- CARDS ---------------- */}
      <div
        ref={cardsRef}
        className="
            grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4
            gap-6 mb-12
            items-stretch
          "
      >
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="
                    relative rounded-2xl p-6
                    min-h-[140px]
                    flex flex-col justify-between
                    bg-white/10 backdrop-blur-2xl
                    border border-white/15
                    overflow-hidden
                    shadow-[0_0_50px_rgba(0,0,0,0.6)]
                    hover:scale-[1.04]
                    transition-all duration-300
                  "
            >

              {/* Glow */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} pointer-events-none`}
              />
              <div className="relative z-10">
                <Icon className="text-white/90 mb-4" />
                <p className="text-sm text-gray-300">
                  {item.title}
                </p>
                <h3 className="text-3xl font-bold text-white mt-1">
                  {item.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- CHART ---------------- */}
      <div
        ref={chartRef}
        className="
          rounded-2xl p-6
          bg-white/10 backdrop-blur-2xl
          border border-white/15
          shadow-[0_0_70px_rgba(0,0,0,0.8)]
        "
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Weekly Performance
            </h2>
            <p className="text-sm text-gray-400">
              Tasks vs Sprint progress
            </p>
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-sm">
            <span className="flex items-center gap-2 text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Tasks
            </span>
            <span className="flex items-center gap-2 text-purple-300">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              Sprints
            </span>
          </div>
        </div>

        <div className="h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="tasksGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>

                <linearGradient id="sprintGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="day"
                stroke="#94a3b8"
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                cursor={{ stroke: "#38bdf8", strokeDasharray: "3 3" }}
                contentStyle={{
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "14px",
                  color: "#fff",
                }}
              />

              <Area
                type="monotone"
                dataKey="tasks"
                stroke="#38bdf8"
                strokeWidth={2}
                fill="url(#tasksGradient)"
              />

              <Area
                type="monotone"
                dataKey="sprints"
                stroke="#a855f7"
                strokeWidth={2}
                fill="url(#sprintGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;
