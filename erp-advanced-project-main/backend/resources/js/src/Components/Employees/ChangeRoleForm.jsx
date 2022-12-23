import { useEffect, useState } from "react";
import axios from "axios";
import "./AssignSkillForm.css";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { FaUsersCog } from "react-icons/fa";
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const ChangeRoleForm = ({
    token,
    reloadEmployee,
    setReloadEmployee,
    loadingEmployeeProjects,
    employeeProjects,
    getProjectsEmployee,
    employeeProjectsRoles,
    changeRole,
    roles,
    fetchRoles,
    loadingRoles,
}) => {
    const { first_name, last_name, email } = changeRole;
    const [success, setSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectErrors, setSelectErrors] = useState("");
    const [optionSelected, setOptionSelected] = useState("");
    const [rolesSelected, setRolesSelected] = useState("");
    const [role, setRole] = useState("");
    const [show, setShow] = useState(false);
    let canSubmit = false;
    const animatedComponents = makeAnimated();
    const projectsList = [];
    const rolesList = [];

    const onChange = (item) => {
        setOptionSelected(item);
        setRolesSelected(employeeProjectsRoles[item.value.split(" ")[0]].name);
        setShow(true);
    };

    const onChangeRole = (item) => {
        setRole(item);
    };

    if (!loadingEmployeeProjects) {
        for (let i = 0; i < employeeProjects.length; i++) {
            projectsList.push({
                value: `${i} ${employeeProjects[i].id}`,
                label: capitalizeFirstLetter(employeeProjects[i].name),
            });
        }
    }
    if (!loadingRoles) {
        for (let i = 0; i < roles.length; i++) {
            rolesList.push({
                value: roles[i].id,
                label: capitalizeFirstLetter(roles[i].name),
            });
        }
    }

    // Submission Function
    const changeAssignment = async (userData) => {
        try {
            const response = await axios.post(
                `${url}api/employees/${email}/projects/role`,
                userData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (response.data) {
                const { data: message } = response;
                setReloadEmployee(!reloadEmployee);
                return message;
            }
        } catch (err) {
            setErrorMessage(err.response.data.message);
            throw new Error();
        }
    };

    // On Submit Action
    const onSubmit = async (e) => {
        e.preventDefault();
        if (optionSelected === "" || role === "") {
            canSubmit = false;
            setSelectErrors("Please Select all fields");
        } else {
            canSubmit = true;
            setSelectErrors("");
            if (canSubmit) {
                try {
                    const data = new FormData();
                    data.append("_method", "PUT");
                    data.append("project", optionSelected.value.split(" ")[1]);
                    data.append("role", role.value.toString());
                    const message = await changeAssignment(data);
                    setSuccess(message.message);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };

    // Reset Messages after 5 seconds
    useEffect(() => {
        getProjectsEmployee(email);
        fetchRoles();
        if (errorMessage || selectErrors) {
            setTimeout(() => {
                setErrorMessage("");
                setSelectErrors("");
            }, 5000);
        }
        if (success) {
            setTimeout(() => {
                setSuccess("");
            }, 5000);
        }
    }, [errorMessage, success, selectErrors]);

    return (
        <div className="form-section add-team-form">
            <section className="heading">
                <h2>
                    <FaUsersCog /> {first_name} {last_name}
                </h2>
                <p>Change Employee's Role in a Project</p>
                {success && <p className="succeed-msg">{success}</p>}
                {errorMessage && <p className="error-msg">{errorMessage}</p>}
                {selectErrors && <p className="error-msg">{selectErrors}</p>}
            </section>
            <section className="form">
                <div className="form-group">
                    <Select
                        id={`select-skills`}
                        components={animatedComponents}
                        onChange={(item) => onChange(item)}
                        options={projectsList}
                        isSearchable
                        isLoading={loadingEmployeeProjects}
                        closeMenuOnSelect={true}
                    />
                </div>

                {show && (
                    <div className="form-group">
                        <label htmlFor="select-roles">
                            Current Role: {capitalizeFirstLetter(rolesSelected)}
                        </label>
                        <Select
                            id={`select-roles`}
                            components={animatedComponents}
                            onChange={(item) => onChangeRole(item)}
                            options={rolesList}
                            isSearchable
                            isLoading={loadingRoles}
                            closeMenuOnSelect={true}
                        />
                    </div>
                )}
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="submit"
                            className="btn btn-block"
                            value="Change Role"
                        />
                    </div>
                </form>
            </section>
        </div>
    );
};

export default ChangeRoleForm;
