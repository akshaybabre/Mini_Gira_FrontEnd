import React from "react";
import { Settings } from "lucide-react";
import GlassContainer from "./GlassContainer";

const PreferenceSettings = () => (
  <GlassContainer>
    <div className="flex items-center gap-3 mb-4">
      <Settings size={18} className="text-[#00D1FF]" />
      <h2 className="font-semibold">App Preferences</h2>
    </div>

    <div className="flex flex-col gap-3 text-sm">
      <select className="input">
        <option className="bg-[#0B1220] text-white">Dark</option>
        <option className="bg-[#0B1220] text-white">Light</option>
      </select>

      <select className="input">
        <option className="bg-[#0B1220] text-white">English</option>
        <option className="bg-[#0B1220] text-white">Hindi</option>
      </select>

      <button className="px-3 py-1 bg-[#00D1FF]/20 text-[#00D1FF] rounded-lg">
        Save Preferences
      </button>
    </div>
  </GlassContainer>
);

export default PreferenceSettings;
