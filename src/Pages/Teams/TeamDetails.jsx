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
  const { members: allMembers } = useSelector((state) => state.tasks);

  const memberMap = Object.fromEntries(
    allMembers.map((u) => [u._id, u.name])
  );

  const [active, setActive] = useState("Overview");

  if (!team)
    return <div className="p-6 text-white">Team not found</div>;

  return (
    <div className="p-6 text-white space-y-6">

      {/* ===== TITLE ===== */}
      <div>
        <h1 className="text-2xl font-bold">{team.name}</h1>
        <p className="text-gray-400 text-sm mt-1">
          {team.description || "No description provided"}
        </p>
      </div>

      {/* ===== META GRID ===== */}
      <div className="grid md:grid-cols-2 gap-4 text-sm">

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Team Key</p>
          <p className="font-medium">{team.key}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Status</p>
          <span
            className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs ${badgeColor[team.status]
              }`}
          >
            {team.status}
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Company</p>
          <p className="font-medium">{team.company?.name}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Project</p>
          <p className="font-medium">{team.project?.name}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Owner</p>
          <p className="font-medium">{team.createdBy?.name}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Created At</p>
          <p>{new Date(team.createdAt).toLocaleDateString()}</p>
        </div>

      </div>

      {/* ===== MEMBERS ===== */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <h2 className="font-semibold mb-2">Members</h2>

        <ul className="flex flex-wrap gap-2">
          {team.members.map((id) => (
            <li
              key={id}
              className="px-2 py-1 bg-white/10 text-xs rounded-lg"
            >
              {memberMap[id] || "Unknown"}
            </li>
          ))}
        </ul>
      </div>

      {/* ===== TABS ===== */}
      <TeamTabs active={active} setActive={setActive} />

      {active === "Overview" && (
        <div className="text-sm text-gray-300">
          This team is working under <b>{team.project?.name}</b> project.
        </div>
      )}

    </div>
  );
};

export default TeamDetails;