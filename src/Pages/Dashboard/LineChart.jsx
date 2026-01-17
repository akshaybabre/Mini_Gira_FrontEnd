import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import gsap from "gsap";

const LineChart = () => {
  const chartRef = useRef(null);

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(15, 23, 42, 0.9)",
      borderColor: "#22d3ee",
      textStyle: { color: "#fff" },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "12%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLine: { lineStyle: { color: "#475569" } },
      axisLabel: { color: "#94a3b8" },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#475569" } },
      axisLabel: { color: "#94a3b8" },
      splitLine: { lineStyle: { color: "#1e293b" } },
    },
    series: [
      {
        name: "Active Users",
        type: "line",
        smooth: true,
        lineStyle: {
          width: 4,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: "#22d3ee" },
              { offset: 1, color: "#a855f7" },
            ],
          },
        },
        symbol: "circle",
        symbolSize: 8,
        itemStyle: {
          color: "#fff",
          borderColor: "#22d3ee",
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(34, 211, 238, 0.4)" },
              { offset: 1, color: "rgba(34, 211, 238, 0.05)" },
            ],
          },
        },
        data: [1200, 1800, 1500, 2400, 2000, 2800, 3200],
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current?.getEchartsInstance?.();
    if (chart) {
      setTimeout(() => chart.resize(), 300);
    }
  }, []);

  return (
    <div className="gira-card bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Performance Trend</h3>
        <span className="text-sm text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
          +24.5% this week
        </span>
      </div>
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ height: "320px", width: "100%" }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
};

export default LineChart;