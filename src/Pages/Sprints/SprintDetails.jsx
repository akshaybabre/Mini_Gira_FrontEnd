import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { sprintsDummy } from "../../data/Sprints/sprintsDummy";
import SprintTabs from "../../Components/Sprints/SprintTabs";

const SprintDetails = () => {
  const { id } = useParams();
  const sprint = sprintsDummy.find((s) => s.id == id);

  const [active, setActive] = useState("Backlog");

  if (!sprint) return <div className="p-6 text-white">Sprint not found</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold">{sprint.name}</h1>
      <p className="text-gray-400">{sprint.goal}</p>

      <SprintTabs active={active} setActive={setActive} />

      <div className="mt-4 text-sm">
        {active === "Backlog" && sprint.backlog.map((t, i) => <p key={i}>{t}</p>)}
        {active === "In Progress" && sprint.progress.map((t, i) => <p key={i}>{t}</p>)}
        {active === "Done" && sprint.done.map((t, i) => <p key={i}>{t}</p>)}
        {active === "Members" && sprint.members.map((m, i) => <p key={i}>{m}</p>)}
      </div>
    </div>
  );
};

export default SprintDetails;
