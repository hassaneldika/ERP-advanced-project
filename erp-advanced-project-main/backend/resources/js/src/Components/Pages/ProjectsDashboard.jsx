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

    useEffect(() => {
        fetchProjects();
    }, [reloadProjects]);

    return (
        <>
            <Projects
                projects={projects}
                loadingProjects={loadingProjects}
                showAddProjectFormPopup={showAddProjectFormPopup}
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
        </>
    );
};

export default ProjectsDashboard;
