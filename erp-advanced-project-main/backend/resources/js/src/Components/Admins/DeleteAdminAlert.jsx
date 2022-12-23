import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const DeleteAdminAlert = ({
    token,
    setReloadAdmins,
    deleteAdmin,
    reloadAdmins,
    status,
}) => {
    const [success, setSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { first_name, email, last_name } = deleteAdmin;

    // Submission Function
    const changeStatus = async (email) => {
        try {
            const response = await axios.post(
                `${url}api/user/${email}/status`,
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
            const message = await changeStatus(email);
            setSuccess(message.message);
            setReloadAdmins(!reloadAdmins);
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
        <div className="form-section category-form delete-category-form">
            <section className="heading">
                <h2>
                    <AiFillDelete />{" "}
                    {status ? "Activate Admin" : "Deactivate Admin"}
                </h2>
                <p>
                    Are you sure you want to{" "}
                    {status ? "activate" : "deactivate"} {first_name}{" "}
                    {last_name}
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
                            value={
                                status ? "Activate Admin" : "Deactivate Admin"
                            }
                        />
                    </div>
                </form>
            </section>
        </div>
    );
};

export default DeleteAdminAlert;
