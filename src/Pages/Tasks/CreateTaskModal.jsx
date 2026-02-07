import React, { useEffect, useState } from "react";
import GlassContainer from "../../Components/Tasks/GlassContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  createTask,
  updateTask,
  getCompanyMembers,
} from "../../Redux/Tasks/TasksSlice";
import { toast } from "react-toastify";

const CreateTaskModal = ({ onClose, editTask = null }) => {
  const dispatch = useDispatch();

  /* =========================
     REDUX STATE
  ========================= */
  const { members, isLoading } = useSelector((state) => state.tasks);
  const { projects } = useSelector((state) => state.projects);
  const { teams } = useSelector((state) => state.teams);

  /* =========================
     FORM STATE
  ========================= */
  const [form, setForm] = useState({
    projectId: "",
    teamId: "",
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
    assignedTo: "",
  });

  const isEdit = Boolean(editTask);

  /* =========================
     FETCH MEMBERS
  ========================= */
  useEffect(() => {
    dispatch(getCompanyMembers());
  }, [dispatch]);

  /* =========================
     PREFILL (EDIT MODE)
  ========================= */
  useEffect(() => {
    if (editTask) {
      setForm({
        projectId: editTask.project?.id || "",
        teamId: editTask.team?.id || "",
        title: editTask.title || "",
        description: editTask.description || "",
        priority: editTask.priority || "Medium",
        status: editTask.status || "Todo",
        assignedTo: editTask.assignedTo?.id || "",
      });
    }
  }, [editTask]);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleProjectChange = (value) => {
    setForm((prev) => ({
      ...prev,
      projectId: value,
      teamId: "", // reset team when project changes
    }));
  };

  /* =========================
     FILTER TEAMS BY PROJECT
  ========================= */
  const filteredTeams = teams.filter(
    (team) => team.project?.id === form.projectId
  );

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async () => {
    if (!form.projectId) return toast.error("Select project");
    if (!form.teamId) return toast.error("Select team");
    if (!form.title.trim()) return toast.error("Task title required");
    if (!form.assignedTo) return toast.error("Assign task to a user");

    const payload = {
      projectId: form.projectId,
      teamId: form.teamId,
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      assignedTo: form.assignedTo,
    };

    try {
      if (isEdit) {
        await dispatch(
          updateTask({ id: editTask._id, data: payload })
        ).unwrap();
        toast.success("Task updated successfully ✏️");
      } else {
        await dispatch(createTask(payload)).unwrap();
        toast.success("Task created successfully 🚀");
      }
      onClose();
    } catch (err) {
      toast.error(err || "Something went wrong");
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <GlassContainer>
        <div className="flex flex-col gap-3 w-[340px] text-white">

          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit Task" : "Create Task"}
          </h2>

          {/* PROJECT */}
          <select
            value={form.projectId}
            onChange={(e) => handleProjectChange(e.target.value)}
            className="bg-[#0B1220] border border-white/10 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>

          {/* TEAM */}
          <select
            value={form.teamId}
            onChange={(e) => handleChange("teamId", e.target.value)}
            disabled={!form.projectId}
            className="bg-[#0B1220] border border-white/10 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Select Team</option>
            {filteredTeams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>

          {/* TITLE */}
          <input
            type="text"
            placeholder="Task Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
          />

          {/* PRIORITY */}
          <select
            value={form.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
            className="bg-[#0B1220] border border-white/10 rounded-lg px-3 py-2 text-sm"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* ASSIGNED USER */}
          <select
            value={form.assignedTo}
            onChange={(e) => handleChange("assignedTo", e.target.value)}
            className="bg-[#0B1220] border border-white/10 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Assign To</option>
            {isLoading ? (
              <option>Loading members...</option>
            ) : (
              members.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))
            )}
          </select>

          {/* BUTTONS */}
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onClose}
              className="text-xs px-3 py-1 bg-gray-500/10 text-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="text-xs px-3 py-1 bg-[#00D1FF]/20 text-[#00D1FF] rounded-lg"
            >
              {isEdit ? "Update" : "Create"}
            </button>
          </div>

        </div>
      </GlassContainer>
    </div>
  );
};

export default CreateTaskModal;