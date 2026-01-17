import React from "react";
import { useState } from "react";
import GlassContainer from "../../Components/Tasks/GlassContainer";

const CreateTaskModal = ({ onClose, onCreate }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
    assignedTo: "Akshay Babre",
  });

  const handleSubmit = () => {
    if (!task.title.trim()) return alert("Task title required");

    onCreate({ ...task, id: Date.now() });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <GlassContainer>
        <div className="flex flex-col gap-3 w-[320px] text-white">
          <h2 className="text-lg font-semibold">Create Task</h2>

          <input
            type="text"
            placeholder="Task Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
          />

          <textarea
            placeholder="Description"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
          />

          <select
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            className="bg-[#0B1220] border border-white/10 rounded-lg px-3 py-2 text-sm"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <div className="flex justify-end gap-2 mt-2">
            <button onClick={onClose} 
            className="text-xs px-3 py-1 bg-gray-500/10 text-gray-300 rounded-lg">
              Cancel
            </button>
            <button onClick={handleSubmit} 
            className="text-xs px-3 py-1 bg-[#00D1FF]/20 text-[#00D1FF] rounded-lg">
              Create
            </button>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
};

export default CreateTaskModal;
