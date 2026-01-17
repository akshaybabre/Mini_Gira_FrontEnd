import React from "react";
import { useState } from "react";
import { tasksDummy } from "../../data/Tasks/tasksDummy";
import TaskCard from "../../Components/Tasks/TaskCard";
import CreateTaskModal from "./CreateTaskModal";
import { useNavigate } from "react-router-dom";

const TasksList = () => {
  const [tasks, setTasks] = useState(tasksDummy);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Tasks Board</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="px-3 py-1 text-sm bg-[#00D1FF]/20 text-[#00D1FF] rounded-lg"
        >
          + Create Task
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onView={(t) => navigate(`/dashboard/tasks/${t.id}`)}
            onDelete={(t) => setTasks(tasks.filter((x) => x.id !== t.id))}
          />
        ))}
      </div>

      {openModal && (
        <CreateTaskModal
          onClose={() => setOpenModal(false)}
          onCreate={(newTask) => setTasks([...tasks, newTask])}
        />
      )}
    </div>
  );
};

export default TasksList;
