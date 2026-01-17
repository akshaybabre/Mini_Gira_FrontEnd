import React from "react";
import { useState } from "react";
import GlassContainer from "../../Components/Teams/GlassContainer";
import { teamsDummy } from "../../data/Teams/teamsDummy";

const CreateTeamModal = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({
    name: "",
    project: teamsDummy[0]?.name || "",
    members: "",
    description: "",
  });

  const handleSubmit = () => {
    if (!form.name.trim()) return alert("Team name required");

    onCreate({
      id: Date.now(),
      name: form.name,
      project: form.project,
      members: form.members.split(","),
      description: form.description,
      createdBy: "Akshay Babre",
      tasks: [],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <GlassContainer>
        <div className="flex flex-col gap-3 w-[320px] text-white">
          <h2 className="text-lg font-semibold">Create Team</h2>

          <input
            type="text"
            placeholder="Team Name"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            value={form.project}
            onChange={(e) => setForm({ ...form, project: e.target.value })}
            className="bg-[#0B1220] border border-white/10 rounded-lg px-3 py-2 text-sm"
          >
            {teamsDummy.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Members (comma separated)"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            onChange={(e) => setForm({ ...form, members: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <div className="flex justify-end gap-2 mt-2">
            <button onClick={onClose} 
            className="text-xs px-3 py-1 bg-gray-500/10 text-gray-300 rounded-lg">
              Cancel
            </button>
            <button onClick={handleSubmit} className="text-xs px-3 py-1 bg-[#00D1FF]/20 text-[#00D1FF] rounded-lg">
              Create
            </button>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};

export default CreateTeamModal;
