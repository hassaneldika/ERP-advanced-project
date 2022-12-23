import { useEffect, useState } from "react";
import { AiOutlineProject } from "react-icons/ai";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import MultiSelect from "../Layout/MultiSelect";
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const EditProjectForm = ({
    token,
    setReloadProject,
    reloadProject,
    editProject,
    loadingTeams,
    setTeamsList,
    teamsList,
    setLoadingTeams,
    getTeams,
}) => {
    const [formData, setFormData] = useState(editProject);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [optionSelected, setOptionSelected] = useState([]);
    const [newSlug, setNewSlug] = useState("");

    let canSubmit = false;
    let teams = [];
    const { name, slug } = formData;
    const navigate = useNavigate();
    const location = useLocation();

    if (!loadingTeams) {
        for (let i = 0; i < teamsList.length; i++) {
            teams.push({
                value: teamsList[i].id,
                label: teamsList[i].name,
            });
        }
    }

    // On Change for controlled fields
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // Submission Function
    const EditTeam = async (userData) => {
        try {
            const response = await axios.post(
                `${url}api/projects/${slug}`,
                userData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (response.data) {
                const { data: message } = response;
                return message;
            }
        } catch (err) {
            setErrorMessage(err.response.data);
            throw new Error();
        }
    };

    // On Submit Action
    const onSubmit = async (a) => {
        a.preventDefault();
        setErrors(validate(formData));
        if (canSubmit) {
            try {
                const data = new FormData();
                data.append("name", name);
                data.append("teams", JSON.stringify(optionSelected));
                data.append("_method", "PUT");
                const message = await EditTeam(data);
                setSuccess(message.message);
                setNewSlug(message.slug);
                setReloadProject(!reloadProject);
            } catch (err) {
                console.log(err);
            }
        }
    };

    // Validation for Enroll Form
    const validate = (values) => {
        canSubmit = false;
        const errorMessages = {};
        if (values.name === "") {
            errorMessages.name = "Name is required";
        } else {
            errorMessages.name = "";
        }
        if (errorMessages.name === "") {
            canSubmit = true;
        }
        return errorMessages;
    };

    // Reset Messages after 5 seconds
    useEffect(() => {
        getTeams(slug, setLoadingTeams, setTeamsList);
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
        if (success) {
            setSuccess("");
            if (location.pathname === `/projects/${slug}`) {
                navigate(`/projects/${newSlug}`);
            }
        }
    }, [errorMessage, success]);

    return (
        <div className="form-section add-team-form">
            <section className="heading">
                <h2>
                    <AiOutlineProject /> Edit Project
                </h2>
                <p>Enter your information below</p>
                {success && <p className="succeed-msg">{success}</p>}
                {errorMessage && <p className="error-msg">{errorMessage}</p>}
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className={errors.name ? "error" : "form-valid"}
                            name="name"
                            id="name"
                            placeholder="Enter your team name"
                            value={name}
                            onChange={onChange}
                        />
                        <p>{errors.name}</p>
                    </div>
                    <label htmlFor="unassigned-select" className="form-label">
                        Assign a Team
                    </label>
                    <MultiSelect
                        id="unassigned-select"
                        options={teams}
                        loading={loadingTeams}
                        setSelectedOptions={setOptionSelected}
                    />
                    <div className="form-group">
                        <input
                            type="submit"
                            className="btn btn-block"
                            value="Edit Project"
                        />
                    </div>
                </form>
            </section>
        </div>
    );
};

export default EditProjectForm;
