import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TeamTabs from "../../Components/Teams/TeamTabs";

const badgeColor = {
  Active: "bg-blue-500/20 text-blue-400",
  Archived: "bg-gray-500/20 text-gray-300",
};

const TeamDetails = () => {
  const { id } = useParams();
  const { teams } = useSelector((state) => state.teams);
  const team = teams.find((t) => t._id === id);

  const [active, setActive] = useState("Overview");

  if (!team)
    return <div className="p-6 text-white">Team not found</div>;

  return (
    <div className="p-6 text-white space-y-6">

      {/* ===== TITLE SECTION ===== */}
      <div>
        <h1 className="text-2xl font-bold">{team.name}</h1>
        <p className="text-gray-400 text-sm mt-1">{team.description}</p>
      </div>

      {/* ===== META INFO (Grid like Project) ===== */}
      <div className="grid md:grid-cols-2 gap-4 text-sm">

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Team Key</p>
          <p className="font-medium">{team.teamKey}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Status</p>
          <span
            className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs ${
              badgeColor[team.status]
            }`}
          >
            {team.status}
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Owner</p>
          <p className="font-medium">{team.createdByName}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Created At</p>
          <p>{new Date(team.createdAt).toLocaleDateString()}</p>
        </div>

      </div>

      {/* ===== MEMBERS SECTION ===== */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <h2 className="font-semibold mb-2">Members</h2>

        {team.members.length === 0 ? (
          <p className="text-gray-500 text-sm">No members added</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {team.members.map((m, idx) => (
              <li
                key={idx}
                className="px-2 py-1 bg-white/10 text-xs rounded-lg"
              >
                {m.name || m}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ===== TABS (same vibe as Project) ===== */}
      <TeamTabs active={active} setActive={setActive} />

      {/* ===== TAB CONTENT ===== */}
      {active === "Overview" && (
        <div className="text-sm text-gray-300">
          This team is responsible for managing assigned projects and members.
        </div>
      )}

      {active === "Assigned Tasks" && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          {team.projects.length === 0 ? (
            <p className="text-gray-500 text-sm">No projects assigned</p>
          ) : (
            <ul className="list-disc pl-5 text-sm">
              {team.projects.map((p, idx) => (
                <li key={idx}>{p.name || p}</li>
              ))}
            </ul>
          )}
        </div>
      )}

    </div>
  );
};

export default TeamDetails;
