import React from "react";
import { useParams } from "react-router-dom";
import { tasksDummy } from "../../data/Tasks/tasksDummy";

const TaskDetails = () => {
  const { id } = useParams();
  const task = tasksDummy.find((t) => t.id == id);

  if (!task) return <div className="p-6 text-white">Task not found</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold">{task.title}</h1>
      <p className="text-gray-400">{task.description}</p>

      <div className="mt-4 text-sm">
        <p>Priority: {task.priority}</p>
        <p>Assigned To: {task.assignedTo}</p>
        <p>Status: {task.status}</p>
      </div>
    </div>
  );
};

export default TaskDetails;
