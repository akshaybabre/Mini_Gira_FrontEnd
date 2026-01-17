import React from "react";
import { User } from "lucide-react";
import { userDummy } from "../../data/Settings/userDummy";
import GlassContainer from "./GlassContainer";

const ProfileSettings = () => (
  <GlassContainer>
    <div className="flex items-center gap-3 mb-4">
      <User size={18} className="text-[#00D1FF]" />
      <h2 className="font-semibold">Profile Information</h2>
    </div>

    <div className="flex flex-col gap-3 text-sm">
      <input
        defaultValue={userDummy.name}
        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2"
      />
      <input
        defaultValue={userDummy.email}
        className="bg-white/5 border border-white/10 rounded-lg px-3 py-2"
      />
      <div className="text-xs text-gray-400">Role: {userDummy.role}</div>

      <button className="mt-3 px-3 py-1 text-sm bg-[#00D1FF]/20 text-[#00D1FF] rounded-lg">
        Save Changes
      </button>
    </div>
  </GlassContainer>
);

export default ProfileSettings;
