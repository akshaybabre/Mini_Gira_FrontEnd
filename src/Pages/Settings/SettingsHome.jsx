import React from "react";
import { useState } from "react";
import SettingsTabs from "../../Components/Settings/SettingsTabs";
import ProfileSettings from "../../Components/Settings/ProfileSettings";
import SecuritySettings from "../../Components/Settings/SecuritySettings";
import NotificationSettings from "../../Components/Settings/NotificationSettings";
import PreferenceSettings from "../../Components/Settings/PreferenceSettings";

const SettingsHome = () => {
  const [active, setActive] = useState("Profile");

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Account Settings</h1>

      <SettingsTabs active={active} setActive={setActive} />

      {active === "Profile" && <ProfileSettings />}
      {active === "Security" && <SecuritySettings />}
      {active === "Notifications" && <NotificationSettings />}
      {active === "Preferences" && <PreferenceSettings />}
    </div>
  );
};

export default SettingsHome;
