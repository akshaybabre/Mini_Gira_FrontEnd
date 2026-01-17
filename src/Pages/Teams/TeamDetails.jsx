import React from "react";
import { useParams } from "react-router-dom";
import { teamsDummy } from "../../data/Teams/teamsDummy";
import TeamTabs from "../../Components/Teams/TeamTabs";

const TeamDetails = () => {
  const { id } = useParams();
  const team = teamsDummy.find((t) => t.id == id);

  const [active, setActive] = useState("Overview");

  if (!team) return <div className="p-6 text-white">Team not found</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold">{team.name}</h1>
      <p className="text-gray-400">{team.description}</p>

      <TeamTabs active={active} setActive={setActive} />

      {active === "Overview" && (
        <div className="mt-4 text-sm">
          <p>Project: {team.project}</p>
          <p>Created By: {team.createdBy}</p>
        </div>
      )}

      {active === "Members" && (
        <ul className="mt-4 text-sm list-disc pl-5">
          {team.members.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      )}

      {active === "Assigned Tasks" && (
        <ul className="mt-4 text-sm list-disc pl-5">
          {team.tasks.map((task, i) => (
            <li key={i}>{task}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeamDetails;
