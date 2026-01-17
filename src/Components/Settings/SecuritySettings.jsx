import React from "react";
import { Lock } from "lucide-react";
import GlassContainer from "./GlassContainer";

const SecuritySettings = () => (
  <GlassContainer>
    <div className="flex items-center gap-3 mb-4">
      <Lock size={18} className="text-[#00D1FF]" />
      <h2 className="font-semibold">Change Password</h2>
    </div>

    <div className="flex flex-col gap-3 text-sm">
      <input type="password" placeholder="Old Password" className="input" />
      <input type="password" placeholder="New Password" className="input" />
      <input type="password" placeholder="Confirm Password" className="input" />

      <button className="mt-3 px-3 py-1 text-sm bg-[#00D1FF]/20 text-[#00D1FF] rounded-lg">
        Update Password
      </button>
    </div>
  </GlassContainer>
);

export default SecuritySettings;
