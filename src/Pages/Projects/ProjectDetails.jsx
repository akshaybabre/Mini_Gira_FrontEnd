import React from "react";
import { useParams } from "react-router-dom";
import { projectsDummy } from "../../data/Projects/projectsDummy";

const ProjectDetails = () => {
  const { id } = useParams();

  const project = projectsDummy.find((p) => p.id == id);

  if (!project) return <div className="p-6 text-white">Project not found</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">{project.name}</h1>
      <p className="text-gray-400">{project.description}</p>

      <div className="mt-6 flex gap-3">
        {["Overview", "Sprints", "Tasks", "Members"].map((tab) => (
          <button
            key={tab}
            className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-lg hover:bg-white/10"
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
