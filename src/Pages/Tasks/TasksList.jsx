import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, deleteTask } from "../../Redux/Tasks/TasksSlice";
import TaskCard from "../../Components/Tasks/TaskCard";
import CreateTaskModal from "./CreateTaskModal";
import DeleteTaskConfirmModal from "../../Components/Tasks/DeleteTaskConfirmModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TasksList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks, isLoading } = useSelector((state) => state.tasks);

  const [openModal, setOpenModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteTaskData, setDeleteTaskData] = useState(null);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditTask(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteTask(deleteTaskData._id)).unwrap();
      toast.success("Task deleted successfully 🗑️");
      setDeleteTaskData(null);
    } catch (err) {
      toast.error(err || "Delete failed");
    }
  };

  return (
    <div className="p-6 text-white">

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Tasks Board</h1>

        <button
          onClick={() => {
            setEditTask(null);
            setOpenModal(true);
          }}
          className="px-3 py-1 text-sm bg-[#00D1FF]/20 text-[#00D1FF] rounded-lg"
        >
          + Create Task
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-400">Loading tasks...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onView={() => navigate(`/dashboard/tasks/${task._id}`)}
              onEdit={(t) => {
                setEditTask(t);
                setOpenModal(true);
              }}
              onDelete={(t) => setDeleteTaskData(t)}
            />
          ))}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {openModal && (
        <CreateTaskModal
          onClose={handleCloseModal}
          editTask={editTask}
        />
      )}

      {/* DELETE CONFIRM */}
      {deleteTaskData && (
        <DeleteTaskConfirmModal
          taskTitle={deleteTaskData.title}
          onCancel={() => setDeleteTaskData(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default TasksList;