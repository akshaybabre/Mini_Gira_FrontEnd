import React, { useEffect, useRef, useState } from "react";
import GlassContainer from "../../Components/Teams/GlassContainer";
import { useDispatch } from "react-redux";
import { createTeam, updateTeam } from "../../Redux/Teams/TeamsSlice";
import { toast } from "react-toastify";
import gsap from "gsap";

const CreateTeamModal = ({ onClose, editTeam }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const toTitleCase = (value) =>
    value
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());


  const [form, setForm] = useState({
    name: editTeam?.name || "",
    description: editTeam?.description || "",
    teamKey: editTeam?.teamKey || "",
    members: editTeam?.members?.join(", ") || "",
  });


  const [errors, setErrors] = useState({});

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

  /* ===== VALIDATION (backend aligned) ===== */
  const validate = () => {
    const e = {};

    if (!form.name.trim() || form.name.length < 3)
      e.name = "Team name must be at least 3 characters";

    if (!form.description.trim() || form.description.length < 10)
      e.description = "Description must be at least 10 characters";

    if (!form.teamKey.trim())
      e.teamKey = "Team key is required";

    return e;
  };

  /* ===== SUBMIT ===== */
  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);

    const payload = {
      name: form.name,
      description: form.description,
      teamKey: form.teamKey.toUpperCase(),
      members: form.members
        ? form.members.split(",").map((m) => m.trim())
        : [],
    };

    if (editTeam) {
      dispatch(updateTeam({ id: editTeam._id, data: payload }));
      toast.success("Team updated successfully ✏️");
    } else {
      dispatch(createTeam(payload));
      toast.success("Team created successfully 🚀");
    }
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-3">
      <div
        ref={modalRef}
        className="w-full max-w-[420px] max-h-[90vh] overflow-y-auto"
      >
        <GlassContainer>
          <div className="flex flex-col gap-4 text-white">

            <h2 className="text-xl font-semibold">Create New Team</h2>

            {/* TEAM NAME */}
            <div>
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
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div>
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: toTitleCase(e.target.value) })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
              />
              {errors.description && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* TEAM KEY */}
            <div>
              <input
                type="text"
                placeholder="Team Key (e.g. FTM)"
                value={form.teamKey}
                onChange={(e) =>
                  setForm({ ...form, teamKey: e.target.value })
                }
                className="w-full uppercase bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
              />
              {errors.teamKey && (
                <p className="text-red-400 text-xs mt-1">{errors.teamKey}</p>
              )}
            </div>

            {/* MEMBERS */}
            <input
              type="text"
              placeholder="Members (comma separated IDs)"
              value={form.members}
              onChange={(e) =>
                setForm({ ...form, members: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm"
            />

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
