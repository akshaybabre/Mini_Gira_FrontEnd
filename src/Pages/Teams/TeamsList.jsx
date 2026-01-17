import React from "react";
import { useState } from "react";
import { teamsDummy } from "../../data/Teams/teamsDummy";
import TeamCard from "../../Components/Teams/TeamCard";
import CreateTeamModal from "./CreateTeamModal";
import { useNavigate } from "react-router-dom";

const TeamsList = () => {
  const [teams, setTeams] = useState(teamsDummy);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Teams Management</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="px-3 py-1 text-sm bg-[#00D1FF]/20 text-[#00D1FF] rounded-lg"
        >
          + Create Team
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            onView={(t) => navigate(`/dashboard/teams/${t.id}`)}
            onDelete={(t) => setTeams(teams.filter((x) => x.id !== t.id))}
          />
        ))}
      </div>

      {openModal && (
        <CreateTeamModal
          onClose={() => setOpenModal(false)}
          onCreate={(newTeam) => setTeams([...teams, newTeam])}
        />
      )}
    </div>
  );
};

export default TeamsList;
