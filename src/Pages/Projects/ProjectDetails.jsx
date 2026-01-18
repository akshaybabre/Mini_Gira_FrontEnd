import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const badgeColor = {
  Active: "bg-blue-500/20 text-blue-400",
  Completed: "bg-purple-500/20 text-purple-400",
  Archived: "bg-gray-500/20 text-gray-300",
};

const ProjectDetails = () => {
  const { id } = useParams();
  const { projects } = useSelector((state) => state.projects);
  const project = projects.find((p) => p._id === id);

  if (!project)
    return <div className="p-6 text-white">Project not found</div>;

  return (
    <div className="p-6 text-white space-y-6">

      {/* Title Section */}
      <div>
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <p className="text-gray-400 text-sm mt-1">{project.description}</p>
      </div>

      {/* Meta Info */}
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Project Key</p>
          <p className="font-medium">{project.key}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Visibility</p>
          <p className="font-medium">{project.visibility}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500 ">Status</p>
          <span className={`px-2 py-0.5 rounded-full text-xs ${badgeColor[project.status]}`}>
            {project.status}
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Owner</p>
          <p className="font-medium">{project.createdByName}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">Start Date</p>
          <p>{new Date(project.startDate).toLocaleDateString()}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg p-3">
          <p className="text-gray-500">End Date</p>
          <p>{new Date(project.endDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Members Section */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <h2 className="font-semibold mb-2">Members</h2>
        {project.members.length === 0 ? (
          <p className="text-gray-500 text-sm">No members assigned</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {project.members.map((m, idx) => (
              <li key={idx} className="px-2 py-1 bg-white/10 text-xs rounded-lg">
                {m}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
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
