import { useState, useEffect } from "react";
import Popup from "../Layout/Popup";
import axios from "axios";
import EditTeamForm from "../Teams/EditTeamForm";
import DeleteTeamAlert from "../Teams/DeleteTeamAlert";
import SingleTeam from "../Teams/SingleTeam";
import { useParams } from "react-router-dom";

const SingleTeamDashboard = ({
  team,
  loadingTeam,
  getTeam,
  token,
  relatedEmployeesTeam,
  relatedProjectsTeam,
}) => {
  const { slug } = useParams();
  /**
   * Edit Team Form State Popup
   */
  const [showEditTeamForm, setShowEditTeamForm] = useState(false);
  const [editTeam, setEditTeam] = useState("");

  /**
   * Delete Team Alert State Popup
   */
  const [showDeleteTeamForm, setShowDeleteTeamForm] = useState(false);
  const [deleteTeam, setDeleteTeam] = useState("");

  /**
   * Refresh Teams Table after each add, edit and delete request
   */
  const [reloadTeam, setReloadTeam] = useState(false);

  /**
   * Unassigned Employees State
   */
  const [employeesList, setEmployeesList] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  /**
   * Get All unassigned employees
   * @returns {Promise<void>}
   */
  const getEmployees = async (team, loading, list) => {
    try {
      loading(true);
      const response = await axios.get(`/api/teams/filter/${team}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const {
        data: { employees },
      } = response;
      list(employees);
      loading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Popup Functions
   */
  const showEditTeamPopup = (team) => {
    setEditTeam(team);
    setShowEditTeamForm(true);
  };

  const showDeleteTeamPopup = (team) => {
    setDeleteTeam(team);
    setShowDeleteTeamForm(true);
  };

  useEffect(() => {
    getTeam(slug);
  }, [reloadTeam]);

  return (
    <>
      <SingleTeam
        team={team}
        loadingTeam={loadingTeam}
        getTeam={getTeam}
        showEditTeamPopup={showEditTeamPopup}
        showDeleteTeamPopup={showDeleteTeamPopup}
        relatedEmployeesTeam={relatedEmployeesTeam}
        relatedProjectsTeam={relatedProjectsTeam}
      />
      {/* Teams Edit Form Popup */}
      {showEditTeamForm && (
        <Popup
          show={showEditTeamForm}
          setShow={setShowEditTeamForm}
          component={
            <EditTeamForm
              token={token}
              reloadTeams={reloadTeam}
              setReloadTeams={setReloadTeam}
              getEmployees={getEmployees}
              loadingEmployees={loadingEmployees}
              setLoadingEmployees={setLoadingEmployees}
              employeesList={employeesList}
              setEmployeesList={setEmployeesList}
              editTeam={editTeam}
            />
          }
        />
      )}
      {/* Teams Delete Form Popup */}
      {showDeleteTeamForm && (
        <Popup
          show={showDeleteTeamForm}
          setShow={setShowDeleteTeamForm}
          component={
            <DeleteTeamAlert
              token={token}
              reloadTeams={reloadTeam}
              setReloadTeams={setReloadTeam}
              deleteTeam={deleteTeam}
            />
          }
        />
      )}
    </>
  );
};

export default SingleTeamDashboard;
