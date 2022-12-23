import { useEffect, useState } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import "./AddTeamForm.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import MultiSelect from "../Layout/MultiSelect";
import StructureSelect from "../../utils/StructureSelect";
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const EditTeamForm = ({
    token,
    setReloadTeams,
    reloadTeams,
    getEmployees,
    employeesList,
    setEmployeesList,
    loadingEmployees,
    setLoadingEmployees,
    editTeam,
}) => {
    const [formData, setFormData] = useState(editTeam);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [optionSelected, setOptionSelected] = useState([]);
    const [optionRelatedSelected, setOptionRelatedSelected] = useState([]);
    const [relatedEmployees, setRelatedEmployees] = useState([]);
    const [loadingRelatedEmployees, setLoadingRelatedEmployees] =
        useState(true);
    const [newSlug, setNewSlug] = useState("");

    let canSubmit = false;
    let employees = [];
    let assignedEmployees = [];
    const { name, size, slug } = formData;
    const navigate = useNavigate();
    const location = useLocation();

    if (!loadingEmployees) {
        StructureSelect(employeesList, employees);
    }

    if (!loadingRelatedEmployees) {
        StructureSelect(relatedEmployees, assignedEmployees);
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
                `${url}api/teams/${slug}`,
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
                data.append("employees", JSON.stringify(optionSelected));
                data.append(
                    "removedEmployees",
                    JSON.stringify(optionRelatedSelected)
                );
                data.append("_method", "PUT");
                const message = await EditTeam(data);
                setSuccess(message.message);
                setNewSlug(message.slug);
                setReloadTeams(!reloadTeams);
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
        getEmployees("unassigned", setLoadingEmployees, setEmployeesList);
        getEmployees(slug, setLoadingRelatedEmployees, setRelatedEmployees);
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
        if (success) {
            setTimeout(() => {
                setSuccess("");
                if (location.pathname === `/teams/${slug}`) {
                    navigate(`/teams/${newSlug}`);
                }
            }, 5000);
        }
    }, [errorMessage, success]);

    return (
        <div className="form-section add-team-form">
            <section className="heading">
                <h2>
                    <AiOutlineTeam /> Edit Team
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
                        Assign an employee
                    </label>
                    <MultiSelect
                        id="unassigned-select"
                        options={employees}
                        loading={loadingEmployees}
                        setSelectedOptions={setOptionSelected}
                    />
                    {size > 0 && !loadingRelatedEmployees && (
                        <>
                            <label
                                htmlFor="related-select"
                                className="form-label"
                            >
                                Remove an employee
                            </label>
                            <MultiSelect
                                id="related-select"
                                options={assignedEmployees}
                                loading={loadingRelatedEmployees}
                                setSelectedOptions={setOptionRelatedSelected}
                            />
                        </>
                    )}
                    <div className="form-group">
                        <input
                            type="submit"
                            className="btn btn-block"
                            value="Edit Team"
                        />
                    </div>
                </form>
            </section>
        </div>
    );
};

export default EditTeamForm;
