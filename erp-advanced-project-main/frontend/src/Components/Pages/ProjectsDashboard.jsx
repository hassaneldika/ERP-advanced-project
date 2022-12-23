import { useState, useEffect } from "react";
import Popup from "../Layout/Popup";
import Projects from "../Projects/Projects";
import AddProjectForm from "../Projects/AddProjectForm";

const ProjectsDashboard = ({
  projects,
  loadingProjects,
  fetchProjects,
  token,
  fetchTeams,
  teams,
  loadingTeams,
}) => {
  /**
   * Add Project Form State Popup
   */
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);

  // /**
  //  * Edit Project Form State Popup
  //  */
  // const [showEditProjectForm, setShowEditProjectForm] = useState(false);
  // const [editProject, setEditProject] = useState("");
  //
  // /**
  //  * Delete Project Alert State Popup
  //  */
  // const [showDeleteProjectForm, setShowDeleteProjectForm] = useState(false);
  // const [deleteProject, setDeleteProject] = useState("");
  //
  /**
   * Refresh Projects Table after each add, edit and delete request
   */
  const [reloadProjects, setReloadProjects] = useState(false);

  /**
   * Popup Functions
   */
  const showAddProjectFormPopup = () => {
    setShowAddProjectForm(true);
  };
  //
  // const showEditProjectPopup = (team) => {
  //   setEditProject(team);
  //   setShowEditProjectForm(true);
  // };
  //
  // const showDeleteProjectPopup = (team) => {
  //   setDeleteProject(team);
  //   setShowDeleteProjectForm(true);
  // };

  useEffect(() => {
    fetchProjects();
  }, [reloadProjects]);

  return (
    <>
      <Projects
        projects={projects}
        loadingProjects={loadingProjects}
        showAddProjectFormPopup={showAddProjectFormPopup}
        // showEditProjectPopup={showEditProjectPopup}
        // showDeleteProjectPopup={showDeleteProjectPopup}
      />
      {/* Projects Add Form Popup */}
      {showAddProjectForm && (
        <Popup
          show={showAddProjectForm}
          setShow={setShowAddProjectForm}
          component={
            <AddProjectForm
              token={token}
              reloadProjects={reloadProjects}
              setReloadProjects={setReloadProjects}
              loadingTeams={loadingTeams}
              teams={teams}
              fetchTeams={fetchTeams}
            />
          }
        />
      )}
      {/* Projects Edit Form Popup */}
      {/*{showEditProjectForm && (*/}
      {/*  <Popup*/}
      {/*    show={showEditProjectForm}*/}
      {/*    setShow={setShowEditProjectForm}*/}
      {/*    component={*/}
      {/*      <EditProjectForm*/}
      {/*        token={token}*/}
      {/*        reloadProjects={reloadProjects}*/}
      {/*        setReloadProjects={setReloadProjects}*/}
      {/*        editProject={editProject}*/}
      {/*      />*/}
      {/*    }*/}
      {/*  />*/}
      {/*)}*/}
      {/*/!* Projects Delete Form Popup *!/*/}
      {/*{showDeleteProjectForm && (*/}
      {/*  <Popup*/}
      {/*    show={showDeleteProjectForm}*/}
      {/*    setShow={setShowDeleteProjectForm}*/}
      {/*    component={*/}
      {/*      <DeleteProjectAlert*/}
      {/*        token={token}*/}
      {/*        reloadProjects={reloadProjects}*/}
      {/*        setReloadProjects={setReloadProjects}*/}
      {/*        deleteProject={deleteProject}*/}
      {/*      />*/}
      {/*    }*/}
      {/*  />*/}
      {/*)}*/}
    </>
  );
};

export default ProjectsDashboard;
