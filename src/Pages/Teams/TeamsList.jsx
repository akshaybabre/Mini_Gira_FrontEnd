import React, { useState, useEffect } from "react";
import TeamCard from "../../Components/Teams/TeamCard";
import CreateTeamModal from "./CreateTeamModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyTeams, deleteTeam } from "../../Redux/Teams/TeamsSlice";
import { toast } from "react-toastify";
import DeleteTeamConfirmModal from "../../Components/Teams/DeleteTeamConfirmModal"

const TeamsList = () => {
  const dispatch = useDispatch();
  const { teams, isLoading } = useSelector((state) => state.teams);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);



  useEffect(() => {
    dispatch(getMyTeams());
  }, [dispatch]);

  console.log("TEAMS FROM REDUX 👉", teams);


  return (
    <div className="p-6 text-white">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Teams Management</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="px-3 py-1 text-sm bg-[#00D1FF]/20 text-[#00D1FF] rounded-lg"
        >
          + Create Team
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {teams.map((team) => (
          <TeamCard
            key={team._id}
            team={{
              ...team,
              id: team._id,
              createdBy: team.createdByName,
            }}
            onView={(t) => navigate(`/dashboard/teams/${t.id}`)}
            onEdit={(t) => {
              setSelectedTeam(t);
              setOpenModal(true);
            }}
            onDelete={(t) => {
              setTeamToDelete(t);
              setDeleteModal(true);
            }}
          />
        ))}
      </div>


      {openModal && (
        <CreateTeamModal
          onClose={() => {
            setOpenModal(false);
            setSelectedTeam(null);
          }}
          editTeam={selectedTeam}
        />
      )}

      {deleteModal && (
        <DeleteTeamConfirmModal
          teamName={teamToDelete?.name}
          onCancel={() => {
            setDeleteModal(false);
            setTeamToDelete(null);
          }}
          onConfirm={() => {
            dispatch(deleteTeam(teamToDelete._id));
            setDeleteModal(false);
            setTeamToDelete(null);
            toast.success("Team deleted successfully 🗑️");
          }}
        />
      )}
    </div>
  );
};

export default TeamsList;
