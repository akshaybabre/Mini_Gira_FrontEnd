import React, { useEffect, useRef, useState } from "react";
import GlassContainer from "../../Components/Teams/GlassContainer";
import { useDispatch, useSelector } from "react-redux";
import { createTeam, updateTeam } from "../../Redux/Teams/TeamsSlice";
import { getCompanyMembers } from "../../Redux/Tasks/TasksSlice";
import { toast } from "react-toastify";
import gsap from "gsap";

const CreateTeamModal = ({ onClose, editTeam }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  // 🔥 PROJECTS FROM REDUX
  const { projects } = useSelector((state) => state.projects);
  const { members, isLoading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getCompanyMembers());
  }, [dispatch]);

  const toTitleCase = (value) =>
    value
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

  /* =======================
     FORM STATE
  ======================= */
  const [form, setForm] = useState({
    projectId: editTeam?.project?.id || "",
    name: editTeam?.name || "",
    description: editTeam?.description || "",
    key: editTeam?.key || "",
    members: editTeam?.members || [],
    status: editTeam?.status || "Active",
  });

  const [errors, setErrors] = useState({});

  /* =======================
     GSAP
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
     VALIDATION
  ======================= */
  const validate = () => {
    const e = {};

    if (!form.projectId)
      e.projectId = "Project is required";

    if (!form.name.trim() || form.name.length < 2)
      e.name = "Team name must be at least 2 characters";

    if (form.description && form.description.length > 500)
      e.description = "Description too long";

    if (!form.key.trim())
      e.key = "Team key is required";

    return e;
  };

  /* =======================
     PAYLOAD
  ======================= */
  const buildPayload = () => ({
    projectId: form.projectId,
    name: form.name.trim(),
    description: form.description.trim(),
    key: form.key.trim().toUpperCase(),
    status: form.status,
    members: form.members,
  });

  /* =======================
     SUBMIT
  ======================= */
  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);

    const payload = buildPayload();

    try {
      if (editTeam) {
        await dispatch(
          updateTeam({ id: editTeam._id, data: payload })
        ).unwrap();
        toast.success("Team updated successfully ✏️");
      } else {
        await dispatch(createTeam(payload)).unwrap();
        toast.success("Team created successfully 🚀");
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
        className="w-full max-w-[420px] max-h-[90vh] overflow-y-auto"
      >
        <GlassContainer>
          <div className="flex flex-col gap-4 text-white">
            <h2 className="text-xl font-semibold">
              {editTeam ? "Update Team" : "Create New Team"}
            </h2>

            {/* PROJECT DROPDOWN */}
            <div>
              <select
                value={form.projectId}
                disabled={!!editTeam}
                onChange={(e) =>
                  setForm({ ...form, projectId: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select Project</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id} className="bg-[#0B1220]">
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.projectId && (
                <p className="text-red-400 text-xs mt-1">{errors.projectId}</p>
              )}
            </div>

            {/* TEAM NAME */}
            <input
              type="text"
              placeholder="Team Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: toTitleCase(e.target.value) })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            />
            {errors.name && (
              <p className="text-red-400 text-xs">{errors.name}</p>
            )}

            {/* DESCRIPTION */}
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: toTitleCase(e.target.value),
                })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            />

            {/* TEAM KEY */}
            <input
              type="text"
              placeholder="Team Key (e.g. FE-TEAM)"
              value={form.key}
              onChange={(e) =>
                setForm({ ...form, key: e.target.value })
              }
              className="w-full uppercase bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            />
            {errors.key && (
              <p className="text-red-400 text-xs">{errors.key}</p>
            )}

            {/* STATUS */}
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            >
              <option className="bg-[#0B1220]">Active</option>
              <option className="bg-[#0B1220]">Archived</option>
            </select>

            {/* TEAM MEMBERS */}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Team Members
              </label>

              {/* DROPDOWN (task jaisa) */}
              <select
                value=""
                onChange={(e) => {
                  const userId = e.target.value;
                  if (!userId) return;

                  // duplicate mat add kar
                  if (!form.members.includes(userId)) {
                    setForm((prev) => ({
                      ...prev,
                      members: [...prev.members, userId],
                    }));
                  }
                }}
                className="bg-[#0B1220] border border-white/10 rounded-lg px-3 py-2 text-sm w-full"
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
                    >
                      {user.name}
                    </option>
                  ))
                )}
              </select>

              {/* SELECTED MEMBERS LIST */}
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
            {/* BUTTONS */}
            <div className="flex justify-end gap-2 mt-2">
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
                {editTeam ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </GlassContainer>
      </div>
    </div>
  );
};

export default CreateTeamModal;