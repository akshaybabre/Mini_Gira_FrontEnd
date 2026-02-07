import React, { useEffect, useRef, useState } from "react";
import GlassContainer from "../../Components/Projects/GlassContainer";
import gsap from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { createProject, updateProject } from "../../Redux/Projects/ProjectSlice";
import { toast } from "react-toastify";
import { getCompanyMembers } from "../../Redux/Tasks/TasksSlice";

const CreateProjectModal = ({ onClose, editProject }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { members, isLoading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getCompanyMembers());
  }, [dispatch]);

  const toTitleCase = (value) =>
    value
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

  /* =======================
     FORM STATE (BACKEND ALIGNED)
  ======================= */
  const [form, setForm] = useState({
    name: editProject?.name || "",
    description: editProject?.description || "",
    key: editProject?.key || "",
    status: editProject?.status || "Active",
    members: editProject?.members || [],
  });

  const [errors, setErrors] = useState({});

  /* =======================
     GSAP ANIMATION
  ======================= */
  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" }
    );
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.9,
      duration: 0.25,
      ease: "power3.in",
      onComplete: onClose,
    });
  };

  /* =======================
     VALIDATION (MODEL BASED)
  ======================= */
  const validate = () => {
    const e = {};

    if (!form.name.trim() || form.name.length < 3)
      e.name = "Project name must be at least 3 characters";

    if (form.description && form.description.length > 2000)
      e.description = "Description too long";

    if (!form.key.trim())
      e.key = "Project key is required";

    return e;
  };

  /* =======================
     PAYLOAD SANITIZER
  ======================= */
  const buildPayload = () => ({
    name: form.name.trim(),
    description: form.description.trim(),
    key: form.key.trim().toUpperCase(),
    status: form.status,
    members: form.members,
  });

  /* =======================
     SUBMIT HANDLER
  ======================= */
  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);

    const payload = buildPayload();

    try {
      if (editProject) {
        await dispatch(
          updateProject({ id: editProject._id, data: payload })
        ).unwrap();
        toast.success("Project updated successfully ✏️");
      } else {
        await dispatch(createProject(payload)).unwrap();
        toast.success("Project created successfully 🚀");
      }
      handleClose();
    } catch (err) {
      toast.error(err || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-3">
      <div
        ref={modalRef}
        className="w-full max-w-[450px] max-h-[90vh] overflow-y-auto"
      >
        <GlassContainer>
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-white">
              {editProject ? "Update Project" : "Create New Project"}
            </h2>

            {/* Project Name */}
            <div>
              <input
                type="text"
                placeholder="Project Name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: toTitleCase(e.target.value),
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: toTitleCase(e.target.value),
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              />
              {errors.description && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Project Key */}
            <div>
              <input
                type="text"
                placeholder="Project Key (EAP)"
                value={form.key}
                onChange={(e) =>
                  setForm({ ...form, key: e.target.value })
                }
                className="w-full uppercase bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              />
              {errors.key && (
                <p className="text-red-400 text-xs mt-1">{errors.key}</p>
              )}
            </div>

            {/* Status */}
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option className="bg-[#0B1220]">Active</option>
              <option className="bg-[#0B1220]">Completed</option>
              <option className="bg-[#0B1220]">Archived</option>
            </select>

            {/* PROJECT MEMBERS */}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Project Members
              </label>

              {/* Dropdown (task / team style) */}
              <select
                value=""
                onChange={(e) => {
                  const userId = e.target.value;
                  if (!userId) return;

                  if (!form.members.includes(userId)) {
                    setForm((prev) => ({
                      ...prev,
                      members: [...prev.members, userId],
                    }));
                  }
                }}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              >
                <option value="">Add Member</option>
                {isLoading ? (
                  <option>Loading members...</option>
                ) : (
                  members.map((user) => (
                    <option
                      key={user._id}
                      value={user._id}
                      disabled={form.members.includes(user._id)}
                      className="bg-[#0B1220]"
                    >
                      {user.name}
                    </option>
                  ))
                )}
              </select>

              {/* Selected members chips */}
              {form.members.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {members
                    .filter((u) => form.members.includes(u._id))
                    .map((u) => (
                      <span
                        key={u._id}
                        className="flex items-center gap-1 text-xs bg-[#00D1FF]/20 text-[#00D1FF] px-2 py-1 rounded"
                      >
                        {u.name}
                        <button
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              members: prev.members.filter(
                                (id) => id !== u._id
                              ),
                            }))
                          }
                          className="hover:text-red-400"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={handleClose}
                className="text-xs px-3 py-1 bg-gray-500/10 text-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="text-xs px-3 py-1 bg-[#00D1FF]/20 text-[#00D1FF] rounded-lg"
              >
                {editProject ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </GlassContainer>
      </div>
    </div>
  );
};

export default CreateProjectModal;