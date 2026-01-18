import React, { useEffect, useRef, useState } from "react";
import GlassContainer from "../../Components/Projects/GlassContainer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import gsap from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { createProject, updateProject } from "../../Redux/Projects/ProjectSlice";
import { toast } from "react-toastify";



const CreateProjectModal = ({ onClose, currentUser, editProject }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const { user } = useSelector((state) => state.authentication);

  const toTitleCase = (value) =>
    value
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());


  const [form, setForm] = useState({
    name: editProject?.name || "",
    description: editProject?.description || "",
    key: editProject?.key || "",
    visibility: editProject?.visibility || "Public",
    status: editProject?.status || "Active",
    startDate: editProject?.startDate ? new Date(editProject.startDate) : null,
    endDate: editProject?.endDate ? new Date(editProject.endDate) : null,
    createdByName: editProject?.createdByName || user?.name,
    members: editProject?.members || [],
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

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.length < 3)
      e.name = "Project name must be at least 3 characters";

    if (!form.description.trim() || form.description.length < 10)
      e.description = "Description must be at least 10 characters";

    if (!form.key.trim())
      e.key = "Project key is required";


    if (form.endDate && form.startDate && form.endDate < form.startDate)
      e.endDate = "End date must be after start date";

    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) return setErrors(e);
    if (editProject) {
      dispatch(updateProject({ id: editProject._id, data: form }));
      toast.success("Project updated successfully ✏️");
    } else {
      dispatch(createProject(form));
      toast.success("Project created successfully 🚀");

    }
    handleClose();
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
              Create New Project
            </h2>

            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Project Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: toTitleCase(e.target.value) })}
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
                  setForm({ ...form, description: toTitleCase(e.target.value) })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              />
              {errors.description && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Key */}
            <div>
              <input
                type="text"
                placeholder="Project Key (EAP)"
                value={form.key}
                onChange={(e) => setForm({ ...form, key: e.target.value })}
                className="w-full uppercase bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              />
              {errors.key && (
                <p className="text-red-400 text-xs mt-1">{errors.key}</p>
              )}
            </div>

            {/* Visibility */}
            <select
              value={form.visibility}
              onChange={(e) =>
                setForm({ ...form, visibility: e.target.value })
              }
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
            >
              <option className="bg-[#0B1220]">Public</option>
              <option className="bg-[#0B1220]">Private</option>
            </select>

            {/* Owner */}
            <input
              type="text"
              value={form.createdByName}
              onChange={(e) =>
                setForm({ ...form, createdByName: toTitleCase(e.target.value) })
              }
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              placeholder="Owner"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Start Date */}
              <DatePicker
                selected={form.startDate}
                onChange={(date) => setForm({ ...form, startDate: date })}
                placeholderText="Start Date"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              />

              {/* End Date */}
              <DatePicker
                selected={form.endDate}
                onChange={(date) => setForm({ ...form, endDate: date })}
                placeholderText="End Date"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
              />
              {errors.endDate && (
                <p className="text-red-400 text-xs mt-1">{errors.endDate}</p>
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
