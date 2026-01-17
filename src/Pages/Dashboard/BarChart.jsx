import React from "react";
import ReactECharts from "echarts-for-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const BarChart = () => {
  const chartRef = useRef(null);

  const option = {
    backgroundColor: "transparent",
    tooltip: {},
    xAxis: { type: "category", data: ["A", "B", "C", "D"] },
    yAxis: { type: "value" },
    series: [
      {
        data: [15, 30, 45, 60],
        type: "bar",
        itemStyle: { color: "#22d3ee" },
        barWidth: "40%",
      },
    ],
  };

  useEffect(() => {
    gsap.from(chartRef.current, { opacity: 0, y: 20, duration: 1 });
    const instance = chartRef.current?.getEchartsInstance?.();
    setTimeout(() => instance?.resize(), 300);
  }, []);

  return (
    <div ref={chartRef} className="gira-card bg-[#020617] backdrop-blur-xl border border-white/10 rounded-xl p-4">
      <h3 className="text-cyan-300 mb-2">Comparisons</h3>
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ height: 300 }}
        opts={{ renderer: "svg" }}
      />
    </div>
  );
};

export default BarChart;
