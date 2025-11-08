import { TeamContext } from "@/app/FilesListContext";
import { format } from "date-fns";
import { User } from "lucide-react";
import React, { useContext } from "react";

const AccountSettings = () => {
  const { userDetails_ } = useContext(TeamContext);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Account Settings</h1>
        <p className="opacity-60 text-sm">
          Manage your profile and account preferences
        </p>
      </div>

      {/* Profile Section */}
      <div className="border rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <User size={20} />
          Profile Information
        </h2>

        <div className="space-y-6">
          {/* google name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={userDetails_?.name}
                disabled
                className="flex-1 px-4 py-2 border rounded-lg opacity-50 cursor-not-allowed"
              />
            </div>
            <p className="text-xs opacity-50 mt-2">
              Name from your Google account
            </p>
          </div>
          {/* Google Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={userDetails_?.email}
                disabled
                className="flex-1 px-4 py-2 border rounded-lg opacity-50 cursor-not-allowed"
              />
              <span className="px-3 py-2 text-xs font-medium opacity-60 whitespace-nowrap">
                Google Connected
              </span>
            </div>
            <p className="text-xs opacity-50 mt-2">
              Linked to your Google account
            </p>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className="border rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-semibold">Account Details</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <p className="text-sm opacity-60">Member Since</p>
              <p className="font-medium">
                {format(
                  new Date(userDetails_?._creationTime ?? 0),
                  "MMM d, yyyy"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
