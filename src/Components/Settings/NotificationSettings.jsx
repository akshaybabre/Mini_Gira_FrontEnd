import React from "react";
import { Bell } from "lucide-react";
import GlassContainer from "./GlassContainer";

const NotificationSettings = () => (
  <GlassContainer>
    <div className="flex items-center gap-3 mb-4">
      <Bell size={18} className="text-[#00D1FF]" />
      <h2 className="font-semibold">Notifications</h2>
    </div>

    <div className="flex flex-col gap-2 text-sm">
      {["Task Assigned Alerts", "Sprint Updates", "Email Notifications"].map(
        (item) => (
          <label key={item} className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            {item}
          </label>
        )
      )}
    </div>
  </GlassContainer>
);

export default NotificationSettings;
