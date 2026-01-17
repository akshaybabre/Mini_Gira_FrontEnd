import React, { useEffect, useRef } from "react";
import ReactECharts from "echarts-for-react";
import gsap from "gsap";

const DonutChart = ({ title, percent }) => {
  const chartRef = useRef(null);

  const getColor = (percent) => {
    if (percent >= 80) return "#10b981";
    if (percent >= 60) return "#22d3ee";
    if (percent >= 40) return "#f59e0b";
    return "#ef4444";
  };

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c}%",
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: ["70%", "90%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#0f172a",
          borderWidth: 4,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 24,
            fontWeight: "bold",
            color: "#fff",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: percent,
            name: "Completed",
            itemStyle: {
              color: getColor(percent),
            },
          },
          {
            value: 100 - percent,
            name: "Remaining",
            itemStyle: {
              color: "#1e293b",
            },
          },
        ],
      },
    ],
  };

  useEffect(() => {
    gsap.from(chartRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <div className="gira-card bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold text-gray-300 mb-4">{title}</h3>
      <ReactECharts
        ref={chartRef}
        option={option}
        style={{ height: "200px", width: "100%" }}
        opts={{ renderer: "svg" }}
      />
      <div className="mt-6 text-center">
        <div
          className="text-4xl font-bold mb-2"
          style={{ color: getColor(percent) }}
        >
          {percent}%
        </div>
        <div className="text-sm text-gray-400">Completion Rate</div>
      </div>
    </div>
  );
};

export default DonutChart;