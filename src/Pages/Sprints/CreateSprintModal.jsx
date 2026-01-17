import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GlassContainer from "../../Components/Sprints/GlassContainer";
import { sprintsDummy } from "../../data/Sprints/sprintsDummy";

const CreateSprintModal = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({
    name: "",
    project: sprintsDummy[0]?.name || "",
    startDate: new Date(),
    endDate: new Date(),
    goal: "",
  });

  const handleSubmit = () => {
    if (!form.name.trim()) return alert("Sprint name required");

    onCreate({
      ...form,
      id: Date.now(),
      startDate: form.startDate.toISOString().slice(0, 10),
      endDate: form.endDate.toISOString().slice(0, 10),
      status: "Active",
      backlog: [],
      progress: [],
      done: [],
      members: [],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <GlassContainer>
        <div className="flex flex-col gap-3 w-[320px] text-white">
          <h2 className="text-lg font-semibold">Create Sprint</h2>

          <input
            type="text"
            placeholder="Sprint Name"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            value={form.project}
            onChange={(e) => setForm({ ...form, project: e.target.value })}
            className="bg-[#0B1220] border border-white/10 rounded-lg px-3 py-2 text-sm"
          >
            {sprintsDummy.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
          </select>

          <DatePicker
            selected={form.startDate}
            onChange={(date) => setForm({ ...form, startDate: date })}
            className="bg-[#0B1220] border border-white/10 rounded-lg px-3 py-2 text-sm w-full"
          />

          <DatePicker
            selected={form.endDate}
            onChange={(date) => setForm({ ...form, endDate: date })}
            className="bg-[#0B1220] border border-white/10 rounded-lg px-3 py-2 text-sm w-full"
          />

          <textarea
            placeholder="Sprint Goal"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
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

export default CreateSprintModal;
