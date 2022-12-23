import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reports from "./Components/Reports/Reports";
import LoginPage from "./Components/Pages/LoginPage";
import DashboardLayout from "./Components/Layout/DashboardLayout";
import axios from "axios";
import capitalizeFirstLetter from "./utils/capitalizeFirstLetter";
import TeamsDashboard from "./Components/Pages/TeamsDashboard";
import SingleTeamDashboard from "./Components/Pages/SingleTeamDashboard";
import SkillsDashboard from "./Components/Pages/SkillsDashboard";
import ProjectsDashboard from "./Components/Pages/ProjectsDashboard";
import EmployeesDashboard from "./Components/Pages/EmployeesDashboard";
import RolesDashboard from "./Components/Pages/RolesDashboard";
import SingleProjectDashboard from "./Components/Pages/SingleProjectDahboard";
import AdminsDashboard from "./Components/Pages/AdminsDashboard";
import SingleEmployeeDashboard from "./Components/Pages/SingleEmployeeDashboard";
import Forget from "./Components/Pages/Forget";
import Reset from "./Components/Pages/Reset";
// import Pagination from "./utils/Pagination";

const App = () => {
  /**
   * Get the user state from local storage
   * @type {object}
   */
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  const token = user ? user.access_token : "";

  /**
   * Auth State for Admin Credentials & Token
   */
  const [auth, setAuth] = useState(user ? user : null);

  /**
   * Teams States
   * Loading & Teams
   */
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [teams, setTeams] = useState([]);

  /**
   * Single Team States
   * Loading & Team
   */
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [team, setTeam] = useState([]);
  const [relatedEmployeesTeam, setRelatedEmployeesTeam] = useState([]);
  const [relatedProjectsTeam, setRelatedProjectsTeam] = useState([]);

  /**
   * Single Project States
   * Loading & Project
   */
  const [loadingProject, setLoadingProject] = useState(true);
  const [project, setProject] = useState([]);
  const [relatedUnassignedTeams, setRelatedUnassignedTeams] = useState([]);
  const [relatedAssignedEmployees, setRelatedAssignedEmployees] = useState([]);
  const [relatedEmployeesRoles, setRelatedEmployeesRoles] = useState([]);

  /**
   * Single Employee States
   * Loading & Employee
   */
  const [loadingEmployee, setLoadingEmployee] = useState(true);
  const [employee, setEmployee] = useState([]);
  const [empTeam, setEmpTeam] = useState([]);
  const [employeeSkills, setEmployeeSkills] = useState([]);

  /**
   * Employees States
   * Loading & Employees
   */
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [employees, setEmployees] = useState([]);

  /**
   * Admins States
   * Loading & Admins
   */
  const [loadingAdmins, setLoadingAdmins] = useState(true);
  const [admins, setAdmins] = useState([]);

  /**
   * Skills States
   * Loading & Skills
   */
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [skills, setSkills] = useState([]);

  /**
   * Roles States
   * Loading & Roles
   */
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [roles, setRoles] = useState([]);

  /**
   * Projects States
   * Loading & Projects
   */
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projects, setProjects] = useState([]);

  /**
   * Employee Projects States
   * Loading & Projects
   */
  const [loadingEmployeeProjects, setLoadingEmployeeProjects] = useState(true);
  const [employeeProjects, setEmployeeProjects] = useState([]);
  const [employeeProjectsRoles, setEmployeeProjectsRoles] = useState([]);

  /**
   * Reports States
   * Loading & Reports
   */
  const [loadingReport, setLoadingReport] = useState(true);
  const [reportEmployeeSkills, setReportEmployeeSkills] = useState([]);
  const [reportEmployee, setReportEmployee] = useState([]);
  const [reportEmployeeRoles, setReportEmployeeRoles] = useState([]);
  const [reportEmployeeProjects, setReportEmployeeProjects] = useState([]);

  /**
   * Get All teams with their corresponding employees
   * @returns {Promise<void>}
   */
  const fetchTeams = async () => {
    try {
      setLoadingTeams(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/teams/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const {
        data: { teams },
      } = response;
      setTeams(teams);
      setLoadingTeams(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Get All projects
   * @returns {Promise<void>}
   */
  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/projects/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const {
        data: { projects },
      } = response;
      setProjects(projects);
      setLoadingProjects(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Get All skills
   * @returns {Promise<void>}
   */
  const fetchSkills = async () => {
    try {
      setLoadingSkills(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/skills/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const {
        data: { skills },
      } = response;
      setSkills(skills);
      setLoadingSkills(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Get All roles
   * @returns {Promise<void>}
   */
  const fetchRoles = async () => {
    try {
      setLoadingRoles(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/roles/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const {
        data: { roles },
      } = response;
      setRoles(roles);
      setLoadingRoles(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Get all employees
   * @returns {Promise<void>}
   */
  const fetchEmployees = async () => {
    try {
      setLoadingEmployees(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/employees`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const {
        data: { employees },
      } = response;
      setEmployees(employees);
      setLoadingEmployees(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Get all admins
   * @returns {Promise<void>}
   */
  const fetchAdmins = async () => {
    try {
      setLoadingAdmins(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/admins`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const {
        data: { admins },
      } = response;
      setAdmins(admins);
      setLoadingAdmins(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * Get a single Team by SLug
   * @param slug
   * @returns {Promise<void>}
   */
  const getTeam = async (slug) => {
    setLoadingTeam(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/teams/${slug}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const {
        data: { team, employees, projects },
      } = response;
      setTeam(team);
      setRelatedEmployeesTeam(employees);
      setRelatedProjectsTeam(projects);
      document.title = `${capitalizeFirstLetter(team.name)} Team | ERP Teams`;
    } catch (error) {
      console.log(error.message);
    }
    setLoadingTeam(false);
  };

  /**
   * Get a single Project by SLug
   * @param slug
   * @returns {Promise<void>}
   */
  const getProject = async (slug) => {
    setLoadingProject(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/projects/${slug}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const {
        data: { project, related_teams, roles, assigned_employees },
      } = response;
      setRelatedUnassignedTeams(related_teams);
      setRelatedAssignedEmployees(assigned_employees);
      setRelatedEmployeesRoles(roles);
      setProject(project);
      document.title = `${capitalizeFirstLetter(
        project.name
      )} Project | ERP Projects`;
    } catch (error) {
      console.log(error.message);
    }
    setLoadingProject(false);
  };

  /**
   * Get a single Employee by SLug
   * @param email
   * @returns {Promise<void>}
   */
  const getEmployee = async (email) => {
    setLoadingEmployee(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/employees/${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const {
        data: { user, team, skills },
      } = response;
      setEmployee(user);
      setEmployeeSkills(skills);
      setEmpTeam(team);
      document.title = `${capitalizeFirstLetter(
        user.first_name
      )} | ERP Employees`;
    } catch (error) {
      console.log(error.message);
    }
    setLoadingEmployee(false);
  };

  /**
   * Get a single Report by SLug
   * @param email
   * @returns {Promise<void>}
   */
  const getReport = async (email) => {
    setLoadingReport(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/reports/${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const {
        data: { skills, user, roles, projects },
      } = response;
      setReportEmployeeRoles(roles);
      setReportEmployee(user);
      setReportEmployeeSkills(skills);
      setReportEmployeeProjects(projects);
    } catch (error) {
      console.log(error.message);
    }
    setLoadingReport(false);
  };

  /**
   * Get all projects related to this employee
   * @param email
   * @returns {Promise<void>}
   */
  const getProjectsEmployee = async (email) => {
    setLoadingEmployeeProjects(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/employees/${email}/projects`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const {
        data: { projects, roles },
      } = response;
      setEmployeeProjects(projects);
      setEmployeeProjectsRoles(roles);
    } catch (error) {
      console.log(error.message);
    }
    setLoadingEmployeeProjects(false);
  };

  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route
              index
              element={
                <Reports
                  fetchEmployees={fetchEmployees}
                  employees={employees}
                  loadingEmployees={loadingEmployees}
                  getReport={getReport}
                  loadingReport={loadingReport}
                  reportEmployeeSkills={reportEmployeeSkills}
                  reportEmployee={reportEmployee}
                  reportEmployeeRoles={reportEmployeeRoles}
                  reportEmployeeProjects={reportEmployeeProjects}
                />
              }
            />
          </Route>
          <Route
            path="/admins"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route
              index
              element={
                <AdminsDashboard
                  auth={auth}
                  fetchAdmins={fetchAdmins}
                  admins={admins}
                  loadingAdmins={loadingAdmins}
                  token={token}
                />
              }
            />
          </Route>
          <Route
            path="/projects"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route
              index
              element={
                <ProjectsDashboard
                  projects={projects}
                  loadingProjects={loadingProjects}
                  fetchProjects={fetchProjects}
                  token={token}
                  teams={teams}
                  loadingTeams={loadingTeams}
                  fetchTeams={fetchTeams}
                />
              }
            />
          </Route>
          <Route
            path="/teams"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route
              index
              element={
                <TeamsDashboard
                  fetchTeams={fetchTeams}
                  teams={teams}
                  loadingTeams={loadingTeams}
                  token={token}
                />
              }
            />
          </Route>
          <Route
            path="/teams/:slug/"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route
              index
              element={
                <SingleTeamDashboard
                  team={team}
                  relatedEmployeesTeam={relatedEmployeesTeam}
                  relatedProjectsTeam={relatedProjectsTeam}
                  loadingTeam={loadingTeam}
                  getTeam={getTeam}
                  token={token}
                />
              }
            />
          </Route>
          <Route
            path="/projects/:slug/"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route
              index
              element={
                <SingleProjectDashboard
                  project={project}
                  loadingProject={loadingProject}
                  getProject={getProject}
                  token={token}
                  getTeam={getTeam}
                  loadingTeam={loadingTeam}
                  roles={roles}
                  loadingRoles={loadingRoles}
                  fetchRoles={fetchRoles}
                  relatedEmployeesTeam={relatedEmployeesTeam}
                  relatedUnassignedTeams={relatedUnassignedTeams}
                  relatedAssignedEmployees={relatedAssignedEmployees}
                  relatedEmployeesRoles={relatedEmployeesRoles}
                />
              }
            />
          </Route>
          <Route
            path="/employees"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route
              index
              element={
                <EmployeesDashboard
                  fetchEmployees={fetchEmployees}
                  employees={employees}
                  // employeesPerPage={employeesPerPage}
                  // currentEmployees={currentEmployees}
                  loadingEmployees={loadingEmployees}
                  token={token}
                />
              }
            />
          </Route>
          <Route
            path="/employees/:email"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route
              index
              element={
                <SingleEmployeeDashboard
                  getEmployee={getEmployee}
                  employee={employee}
                  loadingEmployee={loadingEmployee}
                  token={token}
                  empTeam={empTeam}
                  employeeSkills={employeeSkills}
                  skills={skills}
                  loadingSkills={loadingSkills}
                  fetchSkills={fetchSkills}
                  loadingEmployeeProjects={loadingEmployeeProjects}
                  employeeProjects={employeeProjects}
                  getProjectsEmployee={getProjectsEmployee}
                  employeeProjectsRoles={employeeProjectsRoles}
                  fetchRoles={fetchRoles}
                  roles={roles}
                  loadingRoles={loadingRoles}
                />
              }
            />
          </Route>
          <Route
            path="/roles"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route
              index
              element={
                <RolesDashboard
                  roles={roles}
                  loadingRoles={loadingRoles}
                  fetchRoles={fetchRoles}
                  token={token}
                />
              }
            />
          </Route>
          <Route
            path="/skills"
            element={<DashboardLayout auth={auth} setAuth={setAuth} />}
          >
            <Route
              index
              element={
                <SkillsDashboard
                  skills={skills}
                  loadingSkills={loadingSkills}
                  fetchSkills={fetchSkills}
                  token={token}
                />
              }
            />
          </Route>
          <Route
            path="/login"
            element={<LoginPage auth={auth} setAuth={setAuth} />}
          />
          <Route path="/forget" element={<Forget auth={auth} />} />
          <Route path="/reset/:id" element={<Reset auth={auth} />} />
        </Routes>
      </>
    </Router>
  );
};

export default App;
