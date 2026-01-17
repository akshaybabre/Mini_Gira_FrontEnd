import React from "react";

const KPIWidget = ({ title, value, change, icon: Icon }) => {
  return (
    <div className="group relative rounded-xl p-5 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-white/10 rounded-lg">
            {Icon && <Icon className="text-white/90" size={20} />}
          </div>
          {change && (
            <span className="text-sm font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
              {change}
            </span>
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-1">{value}</h2>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </div>
  );
};

export default KPIWidget;