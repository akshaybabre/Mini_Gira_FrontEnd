import React, { useState, useEffect } from "react";
import ProjectCard from "../../Components/Projects/ProjectCard";
import CreateProjectModal from "./CreateProjectModal";
import { useDispatch, useSelector } from "react-redux";
import { getMyProjects , deleteProject } from "../../Redux/Projects/ProjectSlice";
import { useNavigate } from "react-router-dom";
import DeleteConfirmModal from "../../Components/Projects/DeleteConfirmModal"
import { toast } from "react-toastify";

const ProjectsList = () => {
  const dispatch = useDispatch();
  const { projects, isLoading } = useSelector((state) => state.projects);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);


  const navigate = useNavigate();



  useEffect(() => {
    dispatch(getMyProjects());
  }, [dispatch]);


  return (
    <div className="p-6 text-white">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="px-3 py-1 text-sm bg-[#00D1FF]/20 text-[#00D1FF] rounded-lg"
        >
          + Create Project
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <ProjectCard
            key={proj._id}
            project={{
              ...proj,
              id: proj._id,
              createdBy: proj.createdByName,
            }}
            onView={(p) => navigate(`/dashboard/projects/${p.id}`)}
            onEdit={(p) => {
              setSelectedProject(p);
              setOpenModal(true);
            }}
            onDelete={(p) => {
              setProjectToDelete(p);
              setDeleteModal(true);
            }}
          />
        ))}
      </div>

      {openModal && (
        <CreateProjectModal
          onClose={() => {
            setOpenModal(false);
            setSelectedProject(null);
          }}
          onCreate={(newProj) => setProjects([...projects, newProj])}
          editProject={selectedProject}
        />
      )}
      {deleteModal && (
        <DeleteConfirmModal
          projectName={projectToDelete?.name}
          onCancel={() => {
            setDeleteModal(false);
            setProjectToDelete(null);
          }}
          onConfirm={() => {
            dispatch(deleteProject(projectToDelete._id));
            setDeleteModal(false);
            setProjectToDelete(null);
            toast.success("Project deleted successfully 🗑️");
          }}
        />
      )}
    </div>
  );
};

export default ProjectsList;
