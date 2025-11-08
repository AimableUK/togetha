import React from "react";

const PreferenciesSettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Preferences</h1>
        <p className="opacity-60 text-sm">Customize your Togetha experience</p>
      </div>

      <div className="border rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold">Display Settings</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-sm">Theme</p>
              <p className="text-xs opacity-60 mt-1">
                Choose your preferred theme
              </p>
            </div>
            <select className="border rounded px-3 py-1 text-sm opacity-80 focus:outline-none">
              <option>System Default</option>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferenciesSettings;
