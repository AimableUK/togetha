import { Archive, MoreVertical, Plus, Trash2, Users } from "lucide-react";
import React, { useState } from "react";

const TeamSettings = () => {
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Design Team",
      members: 5,
      role: "Owner",
      files: 12,
      createdAt: "Jan 15, 2024",
    },
    {
      id: 2,
      name: "Product",
      members: 3,
      role: "Admin",
      files: 8,
      createdAt: "Feb 3, 2024",
    },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Teams & Workspaces</h1>
          <p className="opacity-60 text-sm">
            Create and manage your teams and collaborative spaces
          </p>
        </div>
        <button className="px-4 py-2 border rounded-lg font-medium hover:opacity-80 transition-opacity flex items-center gap-2">
          <Plus size={18} />
          Create Team
        </button>
      </div>

      <div className="space-y-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="border rounded-lg p-6 hover:opacity-95 transition-opacity"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg border-2 opacity-30 flex items-center justify-center text-lg">
                    👥
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{team.name}</h3>
                    <p className="text-xs opacity-60">Role: {team.role}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-60 hover:opacity-100">
                <button className="p-2 hover:opacity-80 transition-opacity">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-y mb-4">
              <div>
                <p className="text-xs opacity-60 mb-1">Members</p>
                <p className="font-semibold text-lg">{team.members}</p>
              </div>
              <div>
                <p className="text-xs opacity-60 mb-1">Files</p>
                <p className="font-semibold text-lg">{team.files}</p>
              </div>
              <div>
                <p className="text-xs opacity-60 mb-1">Created</p>
                <p className="font-semibold text-sm">{team.createdAt}</p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2">
                <Users size={16} />
                Manage Members
              </button>
              <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:opacity-80 transition-opacity flex items-center gap-2">
                <Archive size={16} />
                Archive
              </button>
              <button
                className="px-4 py-2 border opacity-40 rounded-lg text-sm font-medium hover:opacity-60 transition-opacity flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {teams.length === 0 && (
        <div className="border-2 border-dashed rounded-lg p-12 text-center">
          <Users size={40} className="mx-auto opacity-30 mb-4" />
          <h3 className="font-semibold mb-2">No teams yet</h3>
          <p className="opacity-60 text-sm mb-4">
            Create your first team to start collaborating
          </p>
          <button className="px-6 py-2 border rounded-lg font-medium hover:opacity-80 transition-opacity inline-flex items-center gap-2">
            <Plus size={18} />
            Create Team
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamSettings;
