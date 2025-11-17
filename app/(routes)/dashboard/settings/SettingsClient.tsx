"use client";

import React, { useState } from "react";
import { User, Shield, Users, Component } from "lucide-react";
import AccountSettings from "./_components/AccountSettings";
import TeamSettings from "./_components/TeamSettings";
import PrivacySettings from "./_components/PrivacySettings";
import AppSettings from "./_components/AppSettings";

const SettingsDashboard = () => {
  const [activeTab, setActiveTab] = useState("account");

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "teams", label: "Teams", icon: Users },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "App", label: "App", icon: Component },
  ];

  return (
    <div className="min-h-screen bg-opacity-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="space-y-1 sticky top-10">
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

            {activeTab === "teams" && <TeamSettings />}

            {activeTab === "privacy" && <PrivacySettings />}

            {activeTab === "App" && <AppSettings />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsDashboard;
