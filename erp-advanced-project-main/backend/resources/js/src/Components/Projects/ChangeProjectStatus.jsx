import { useEffect, useState } from "react";
import axios from "axios";
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const ChangeProjectStatus = ({
    token,
    statusProject,
    reloadProject,
    setReloadProject,
}) => {
    const [success, setSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { name, status, project_slug } = statusProject;

    // Submission Function
    const changeStatus = async (project_slug) => {
        try {
            const response = await axios.post(
                `${url}api/projects/${project_slug}/status`,
                { _method: "PUT" },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (response.data) {
                const { data: message } = response;
                return message;
            }
        } catch (err) {
            console.log(err.response.data);
            throw new Error();
        }
    };

    // On Submit Action
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const message = await changeStatus(project_slug);
            setSuccess(message.message);
            setReloadProject(!reloadProject);
        } catch (err) {
            console.log(err);
        }
    };

    // Reset Messages after 5 seconds
    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
        setTimeout(() => {
            setSuccess("");
        }, 5000);
    }, [errorMessage]);

    return (
        <div className="form-section category-form delete-category-form add-team-form">
            <section className="heading">
                <h2>Change {name} Status</h2>
                <p>
                    Are you sure you want to{" "}
                    {status
                        ? "reactivate this project?"
                        : "mark this project as done?"}
                </p>
                {success && <p className="succeed-msg">{success}</p>}
                {errorMessage && <p className="error-msg">{errorMessage}</p>}
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="submit"
                            className="btn btn-block"
                            value={status ? "Activate Project" : "Mark Done"}
                        />
                    </div>
                </form>
            </section>
        </div>
    );
};

export default ChangeProjectStatus;
