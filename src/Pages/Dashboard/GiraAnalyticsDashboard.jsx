import React, { useEffect, useRef, useCallback } from 'react';
import ReactECharts from 'echarts-for-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingBag,
  Activity,
  Target,
  Clock,
  Zap,
  Cpu,
  Database,
  Shield,
  BarChart3,
  PieChart,
  LineChart as LineChartIcon,
  Globe,
} from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const GiraAnalyticsDashboard = () => {
  const dashboardRef = useRef(null);
  const cardsRef = useRef(null);
  const chartsRef = useRef([]);
  
  // Initialize charts refs
  chartsRef.current = [];

  // Add chart to refs
  const addToChartsRefs = (el) => {
    if (el && !chartsRef.current.includes(el)) {
      chartsRef.current.push(el);
    }
  };

  // Dashboard initialization animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dashboard header entrance
      gsap.from('.dashboard-header', {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: 'power3.out',
      });

      // KPI cards staggered entrance
      gsap.from('.kpi-card', {
        opacity: 0,
        y: 40,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.kpi-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Chart cards entrance
      gsap.from('.chart-card', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.charts-grid',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate progress rings on view
      gsap.utils.toArray('.progress-ring').forEach((ring, i) => {
        gsap.from(ring, {
          strokeDashoffset: 440,
          duration: 2,
          delay: i * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ring,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Subtight floating animation for cards
      gsap.to('.kpi-card', {
        y: -4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.1,
      });

    }, dashboardRef);

    return () => ctx.revert();
  }, []);

  // Chart animation on hover
  const handleChartHover = useCallback((chartIndex) => {
    const chart = chartsRef.current[chartIndex];
    if (chart) {
      const instance = chart.getEchartsInstance();
      gsap.to(chart, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, []);

  const handleChartLeave = useCallback((chartIndex) => {
    const chart = chartsRef.current[chartIndex];
    if (chart) {
      gsap.to(chart, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, []);

  // Performance Chart Options
  const performanceChartOptions = {
    backgroundColor: 'transparent',
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '12%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: '#22d3ee',
      borderWidth: 1,
      textStyle: { color: '#fff' },
      formatter: (params) => {
        return `<div class="p-2">
          <div class="font-semibold text-cyan-400">${params[0].name}</div>
          <div class="text-white">${params[0].seriesName}: ${params[0].value}</div>
        </div>`;
      },
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: '#94a3b8' },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        name: 'Active Users',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 4,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#22d3ee' },
              { offset: 0.5, color: '#06b6d4' },
              { offset: 1, color: '#3b82f6' },
            ],
          },
        },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: {
          color: '#fff',
          borderColor: '#22d3ee',
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(34, 211, 238, 0.3)' },
              { offset: 1, color: 'rgba(34, 211, 238, 0.01)' },
            ],
          },
        },
        data: [4200, 5800, 5200, 7100, 8400, 7900, 9200],
        animationEasing: 'cubicInOut',
        animationDuration: 2000,
      },
    ],
  };

  // Revenue Comparison Chart
  const revenueChartOptions = {
    backgroundColor: 'transparent',
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '12%',
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: '#a855f7',
    },
    xAxis: {
      type: 'category',
      data: ['Q1', 'Q2', 'Q3', 'Q4'],
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: '#94a3b8', fontWeight: 'bold' },
    },
    yAxis: {
      type: 'value',
      name: 'Revenue (in K)',
      nameTextStyle: { color: '#94a3b8' },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: '#94a3b8' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
    },
    series: [
      {
        name: 'Revenue',
        type: 'bar',
        barWidth: '40%',
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#8b5cf6' },
              { offset: 1, color: '#a855f7' },
            ],
          },
          borderRadius: [6, 6, 0, 0],
          shadowColor: 'rgba(168, 85, 247, 0.5)',
          shadowBlur: 10,
        },
        data: [320, 480, 560, 720],
        animationDuration: 1800,
        animationEasing: 'elastic.out',
      },
    ],
  };

  // Market Share Donut Chart
  const marketShareOptions = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}%',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: '#10b981',
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { color: '#94a3b8' },
    },
    series: [
      {
        name: 'Market Share',
        type: 'pie',
        radius: ['60%', '85%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#0f172a',
          borderWidth: 4,
        },
        label: {
          show: false,
          position: 'center',
          color: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        labelLine: { show: false },
        data: [
          { value: 42, name: 'Gira', itemStyle: { color: '#22d3ee' } },
          { value: 28, name: 'Competitor A', itemStyle: { color: '#8b5cf6' } },
          { value: 18, name: 'Competitor B', itemStyle: { color: '#10b981' } },
          { value: 12, name: 'Others', itemStyle: { color: '#f59e0b' } },
        ],
        animationType: 'scale',
        animationEasing: 'elastic.out',
        animationDelay: (idx) => idx * 200,
      },
    ],
  };

  // Performance Metrics Data
  const performanceMetrics = [
    { label: 'CPU Usage', value: 78, color: '#22d3ee', icon: Cpu },
    { label: 'Memory', value: 65, color: '#8b5cf6', icon: Database },
    { label: 'Response Time', value: 92, color: '#10b981', icon: Zap },
    { label: 'Uptime', value: 99.9, color: '#f59e0b', icon: Shield },
  ];

  // KPI Metrics
  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$4.28M',
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-emerald-500/20 to-cyan-500/20',
    },
    {
      title: 'Active Users',
      value: '18.4K',
      change: '+8.2%',
      icon: Users,
      color: 'from-blue-500/20 to-purple-500/20',
    },
    {
      title: 'Conversion Rate',
      value: '4.8%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'from-cyan-500/20 to-blue-500/20',
    },
    {
      title: 'Avg. Order Value',
      value: '$248',
      change: '+5.7%',
      icon: ShoppingBag,
      color: 'from-violet-500/20 to-pink-500/20',
    },
  ];

  return (
    <div
      ref={dashboardRef}
      className="min-h-screen bg-gradient-to-br from-[#0a0f1f] via-[#0f172a] to-[#020617] text-white p-4 md:p-4 lg:p-4"
    >
      {/* Dashboard Header */}
      <div className="dashboard-header mb-8 md:mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Gira Analytics
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
              Real-time performance insights & metrics
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm">Live Data</span>
            </div>
            <Clock className="text-gray-400" size={20} />
            <span className="text-gray-400 text-sm">Updated just now</span>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="kpi-grid mb-8 md:mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.title}
                className="kpi-card group relative rounded-2xl p-5 md:p-6 overflow-hidden"
              >
                {/* Glassmorphism Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl" />
                
                {/* Animated Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${kpi.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-2xl`}
                />
                
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-white/10 rounded-xl">
                      <Icon className="text-white/90" size={24} />
                    </div>
                    <span className="text-sm font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
                      {kpi.change}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {kpi.value}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base">
                    {kpi.title}
                  </p>
                  
                  {/* Progress Indicator */}
                  <div className="mt-4 md:mt-6">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${(index + 1) * 25}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="charts-grid mb-8 md:mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <div
            className="chart-card group relative rounded-2xl overflow-hidden"
            onMouseEnter={() => handleChartHover(0)}
            onMouseLeave={() => handleChartLeave(0)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl" />
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            
            <div className="relative z-10 p-5 md:p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <LineChartIcon className="text-cyan-400" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Performance Trends
                  </h3>
                </div>
                <div className="text-sm text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">
                  Last 7 days
                </div>
              </div>
              <ReactECharts
                ref={addToChartsRefs}
                option={performanceChartOptions}
                style={{ height: '320px', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            </div>
          </div>

          {/* Revenue Chart */}
          <div
            className="chart-card group relative rounded-2xl overflow-hidden"
            onMouseEnter={() => handleChartHover(1)}
            onMouseLeave={() => handleChartLeave(1)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl" />
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            
            <div className="relative z-10 p-5 md:p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <BarChart3 className="text-purple-400" size={20} />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Revenue Comparison
                  </h3>
                </div>
                <div className="text-sm text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full">
                  Quarterly
                </div>
              </div>
              <ReactECharts
                ref={addToChartsRefs}
                option={revenueChartOptions}
                style={{ height: '320px', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Donut Chart & Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Market Share Donut */}
        <div className="chart-card group relative rounded-2xl overflow-hidden lg:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl" />
          <div className="relative z-10 p-5 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <PieChart className="text-emerald-400" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Market Share Distribution
                </h3>
              </div>
              <Globe className="text-gray-400" size={20} />
            </div>
            <ReactECharts
              ref={addToChartsRefs}
              option={marketShareOptions}
              style={{ height: '300px', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl" />
          <div className="relative z-10 p-5 md:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Activity className="text-amber-400" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white">
                System Performance
              </h3>
            </div>
            
            <div className="space-y-5">
              {performanceMetrics.map((metric, index) => {
                const Icon = metric.icon;
                const radius = 40;
                const circumference = 2 * Math.PI * radius;
                const strokeDashoffset = circumference - (metric.value / 100) * circumference;

                return (
                  <div
                    key={metric.label}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${metric.color}20` }}>
                        <Icon style={{ color: metric.color }} size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-white">{metric.label}</p>
                        <p className="text-sm text-gray-400">Current usage</p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          strokeWidth="8"
                          stroke="rgba(255,255,255,0.1)"
                          fill="none"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          strokeWidth="8"
                          stroke={metric.color}
                          fill="none"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          className="progress-ring transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold" style={{ color: metric.color }}>
                          {metric.value}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Footer */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Target className="text-cyan-400" size={18} />
            <span className="text-sm text-gray-400">
              Real-time data streaming • 99.9% uptime • Enterprise-grade security
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Gira Analytics Dashboard v2.0 • Updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiraAnalyticsDashboard;