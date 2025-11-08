import { Bell, Mail } from "lucide-react";
import React from "react";

const NotificationSettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Notification Settings</h1>
        <p className="opacity-60 text-sm">
          Control how you receive updates and alerts
        </p>
      </div>

      <div className="border rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Mail size={20} />
          Email Notifications
        </h2>

        <div className="space-y-4">
          {[
            {
              label: "Team Invitations",
              desc: "When you're invited to join a team",
            },
            {
              label: "Security Alerts",
              desc: "Important security notifications",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b last:border-0"
            >
              <div>
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-xs opacity-60 mt-1">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 border rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:transition-all after:opacity-40"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bell size={20} />
          In-App Notifications
        </h2>

        <div className="space-y-4">
          {[
            {
              label: "Real-time Updates",
              desc: "Live notifications while using Togetha",
            },
            {
              label: "Desktop Notifications",
              desc: "Browser notifications when away from tab",
            },
            {
              label: "Sound Alerts",
              desc: "Audio notification for important events",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b last:border-0"
            >
              <div>
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-xs opacity-60 mt-1">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 border rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:transition-all after:opacity-40"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
