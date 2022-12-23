import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const DeleteProjectAlert = ({
    token,
    reloadProjects,
    setReloadProjects,
    deleteProject,
}) => {
    const [success, setSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { name, slug } = deleteProject;
    const navigate = useNavigate();

    // Submission Function
    const DeleteProject = async () => {
        try {
            const response = await axios.post(
                `${url}api/projects/${slug}`,
                { _method: "delete" },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (response.data) {
                const { data: message } = response;
                return message;
            }
        } catch (err) {
            console.log(err.response);
            setErrorMessage(err.response.data.message);
            throw new Error();
        }
    };

    // On Submit Action
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const message = await DeleteProject();
            setSuccess(message.message);
            setReloadProjects(!reloadProjects);
        } catch (err) {
            setErrorMessage(err.response.data.message);
            throw new Error();
        }
    };

    // Reset Messages after 5 seconds
    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
        if (success) {
            setTimeout(() => {
                setSuccess("");
                navigate("/projects");
            }, 5000);
        }
    }, [errorMessage]);

    return (
        <div className="form-section category-form delete-category-form add-team-form">
            <section className="heading">
                <h2>
                    <AiFillDelete /> Delete Project
                </h2>
                <p>Are you sure you want to delete {name}?</p>
                {success && <p className="succeed-msg">{success}</p>}
                {errorMessage && <p className="error-msg">{errorMessage}</p>}
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="submit"
                            className="btn btn-block"
                            value="Delete Project"
                        />
                    </div>
                </form>
            </section>
        </div>
    );
};

export default DeleteProjectAlert;
