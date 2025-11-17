import React from "react";
import { LogOut, ChevronRight, Download } from "lucide-react";

const PrivacySettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Privacy & Security</h1>
        <p className="opacity-60 text-sm">
          Manage your privacy settings and security preferences
        </p>
      </div>

      <div className="border rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold">Data & Privacy</h2>

        <div className="space-y-4">
          <button className="w-full px-4 py-3 border rounded-lg text-left font-medium hover:opacity-80 transition-opacity flex items-center justify-between">
            <span className="text-sm">Download Your Data</span>
            <Download size={18} />
          </button>
          <button className="w-full px-4 py-3 border rounded-lg text-left font-medium hover:opacity-80 transition-opacity flex items-center justify-between">
            <span className="text-sm">Request Data Deletion</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="border rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-red-600 opacity-80">
          <LogOut size={20} />
          Account Management
        </h2>

        <button className="w-full px-4 py-3 border border-red-500 border-opacity-30 rounded-lg font-medium text-red-600 opacity-80 hover:opacity-100 transition-opacity">
          Delete yout Account
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;
