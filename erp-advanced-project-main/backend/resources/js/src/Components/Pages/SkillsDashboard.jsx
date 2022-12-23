import { useState, useEffect } from "react";
import Popup from "../Layout/Popup";
import Skills from "../Skills/Skills";
import AddSkillForm from "../Skills/AddSkillForm";
import EditSkillForm from "../Skills/EditSkillForm";
import DeleteSkillAlert from "../Skills/DeleteSkillAlert";

const SkillsDashboard = ({ skills, loadingSkills, fetchSkills, token }) => {
    /**
     * Add Skill Form State Popup
     */
    const [showAddSkillForm, setShowAddSkillForm] = useState(false);

    /**
     * Edit Skill Form State Popup
     */
    const [showEditSkillForm, setShowEditSkillForm] = useState(false);
    const [editSkill, setEditSkill] = useState("");

    /**
     * Delete Skill Alert State Popup
     */
    const [showDeleteSkillForm, setShowDeleteSkillForm] = useState(false);
    const [deleteSkill, setDeleteSkill] = useState("");

    /**
     * Refresh Skills Table after each add, edit and delete request
     */
    const [reloadSkills, setReloadSkills] = useState(false);

    /**
     * Popup Functions
     */
    const showAddSkillFormPopup = () => {
        setShowAddSkillForm(true);
    };

    const showEditSkillPopup = (skill) => {
        setEditSkill(skill);
        setShowEditSkillForm(true);
    };

    const showDeleteSkillPopup = (skill) => {
        setDeleteSkill(skill);
        setShowDeleteSkillForm(true);
    };

    useEffect(() => {
        fetchSkills();
    }, [reloadSkills]);

    return (
        <>
            <Skills
                skills={skills}
                loadingSkills={loadingSkills}
                showAddSkillFormPopup={showAddSkillFormPopup}
                showEditSkillPopup={showEditSkillPopup}
                showDeleteSkillPopup={showDeleteSkillPopup}
            />
            {/* Skills Add Form Popup */}
            {showAddSkillForm && (
                <Popup
                    show={showAddSkillForm}
                    setShow={setShowAddSkillForm}
                    component={
                        <AddSkillForm
                            token={token}
                            reloadSkills={reloadSkills}
                            setReloadSkills={setReloadSkills}
                        />
                    }
                />
            )}
            {/* Skills Edit Form Popup */}
            {showEditSkillForm && (
                <Popup
                    show={showEditSkillForm}
                    setShow={setShowEditSkillForm}
                    component={
                        <EditSkillForm
                            token={token}
                            reloadSkills={reloadSkills}
                            setReloadSkills={setReloadSkills}
                            editSkill={editSkill}
                        />
                    }
                />
            )}
            {/* Skills Delete Form Popup */}
            {showDeleteSkillForm && (
                <Popup
                    show={showDeleteSkillForm}
                    setShow={setShowDeleteSkillForm}
                    component={
                        <DeleteSkillAlert
                            token={token}
                            reloadSkills={reloadSkills}
                            setReloadSkills={setReloadSkills}
                            deleteSkill={deleteSkill}
                        />
                    }
                />
            )}
        </>
    );
};

export default SkillsDashboard;
