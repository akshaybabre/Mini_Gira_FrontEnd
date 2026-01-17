import React, { useState } from "react";
import { sprintsDummy } from "../../data/Sprints/sprintsDummy";
import SprintCard from "../../Components/Sprints/SprintCard";
import CreateSprintModal from "./CreateSprintModal";
import { useNavigate } from "react-router-dom";

const SprintsList = () => {
  const [sprints, setSprints] = useState(sprintsDummy);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Sprint Planning</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="px-3 py-1 text-sm bg-[#00D1FF]/20 text-[#00D1FF] rounded-lg"
        >
          + Create Sprint
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {sprints.map((s) => (
          <SprintCard
            key={s.id}
            sprint={s}
            onView={(sp) => navigate(`/dashboard/sprints/${sp.id}`)}
            onDelete={(sp) =>
              setSprints(sprints.filter((x) => x.id !== sp.id))
            }
          />
        ))}
      </div>

      {openModal && (
        <CreateSprintModal
          onClose={() => setOpenModal(false)}
          onCreate={(newSprint) => setSprints([...sprints, newSprint])}
        />
      )}
    </div>
  );
};

export default SprintsList;
