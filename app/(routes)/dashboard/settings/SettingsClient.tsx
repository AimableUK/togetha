"use client";

import React, { useState } from "react";
import { Settings, User, Bell, Shield, Users } from "lucide-react";
import AccountSettings from "./_components/AccountSettings";
import NotificationSettings from "./_components/NotificationSettings";
import TeamSettings from "./_components/TeamSettings";
import PrivacySettings from "./_components/PrivacySettings";
import PreferenciesSettings from "./_components/PreferenciesSettings";

const SettingsDashboard = () => {
  const [activeTab, setActiveTab] = useState("account");

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "teams", label: "Teams", icon: Users },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-opacity-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="space-y-1 sticky top-24">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 trans ${
                      activeTab === tab.id
                        ? "font-semibold opacity-100 border-l-2 border-current"
                        : "opacity-60 hover:opacity-80 border-l-2 border-transparent"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-4 space-y-8">
            {activeTab === "account" && <AccountSettings />}

            {activeTab === "notifications" && <NotificationSettings />}

            {activeTab === "teams" && <TeamSettings />}

            {activeTab === "privacy" && <PrivacySettings />}

            {activeTab === "preferences" && <PreferenciesSettings />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsDashboard;
