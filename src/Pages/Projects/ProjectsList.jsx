import React from "react";
import { useState } from "react";
import { projectsDummy } from "../../data/Projects/projectsDummy";
import ProjectCard from "../../Components/Projects/ProjectCard";
import CreateProjectModal from "../../Pages/Projects/CreateProjectModal";
import { useNavigate } from "react-router-dom";

const ProjectsList = () => {
  const [projects, setProjects] = useState(projectsDummy);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

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
            key={proj.id}
            project={proj}
            onView={(p) => navigate(`/dashboard/projects/${p.id}`)}
            onDelete={(p) =>
              setProjects(projects.filter((x) => x.id !== p.id))
            }
          />
        ))}
      </div>

      {openModal && (
        <CreateProjectModal
          onClose={() => setOpenModal(false)}
          onCreate={(newProj) => setProjects([...projects, newProj])}
        />
      )}
    </div>
  );
};

export default ProjectsList;
