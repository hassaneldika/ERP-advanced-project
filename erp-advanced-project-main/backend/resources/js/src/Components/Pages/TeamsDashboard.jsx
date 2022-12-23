import { useState, useEffect } from "react";
import Teams from "../Teams/Teams";
import Popup from "../Layout/Popup";
import AddTeamForm from "../Teams/AddTeamForm";
import axios from "axios";
import EditTeamForm from "../Teams/EditTeamForm";
import DeleteTeamAlert from "../Teams/DeleteTeamAlert";
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const TeamsDashboard = ({ teams, loadingTeams, fetchTeams, token }) => {
    /**
     * Add Team Form State Popup
     */
    const [showAddTeamForm, setShowAddTeamForm] = useState(false);

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
    const [reloadTeams, setReloadTeams] = useState(false);

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
            const response = await axios.get(`${url}api/teams/filter/${team}`, {
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
    const showAddTeamFormPopup = () => {
        setShowAddTeamForm(true);
    };

    const showEditTeamPopup = (team) => {
        setEditTeam(team);
        setShowEditTeamForm(true);
    };

    const showDeleteTeamPopup = (team) => {
        setDeleteTeam(team);
        setShowDeleteTeamForm(true);
    };

    useEffect(() => {
        fetchTeams();
    }, [reloadTeams]);

    return (
        <>
            <Teams
                teams={teams}
                loadingTeams={loadingTeams}
                showAddTeamFormPopup={showAddTeamFormPopup}
                showEditTeamPopup={showEditTeamPopup}
                showDeleteTeamPopup={showDeleteTeamPopup}
            />
            {/* Teams Add Form Popup */}
            {showAddTeamForm && (
                <Popup
                    show={showAddTeamForm}
                    setShow={setShowAddTeamForm}
                    component={
                        <AddTeamForm
                            token={token}
                            reloadTeams={reloadTeams}
                            setReloadTeams={setReloadTeams}
                            getEmployees={getEmployees}
                            loadingEmployees={loadingEmployees}
                            setLoadingEmployees={setLoadingEmployees}
                            employeesList={employeesList}
                            setEmployeesList={setEmployeesList}
                        />
                    }
                />
            )}
            {/* Teams Edit Form Popup */}
            {showEditTeamForm && (
                <Popup
                    show={showEditTeamForm}
                    setShow={setShowEditTeamForm}
                    component={
                        <EditTeamForm
                            token={token}
                            reloadTeams={reloadTeams}
                            setReloadTeams={setReloadTeams}
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
                            reloadTeams={reloadTeams}
                            setReloadTeams={setReloadTeams}
                            deleteTeam={deleteTeam}
                        />
                    }
                />
            )}
        </>
    );
};

export default TeamsDashboard;
