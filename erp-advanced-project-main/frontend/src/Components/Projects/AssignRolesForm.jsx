import { useEffect, useState } from "react";
import { FaUsersCog } from "react-icons/fa";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const AssignRolesForm = ({
  token,
  roles,
  loadingRoles,
  assignTeam,
  getTeam,
  relatedEmployeesTeam,
  loadingTeam,
  reloadProject,
  setReloadProject,
}) => {
  const { name: teamName, slug, project_slug } = assignTeam;
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectErrors, setSelectErrors] = useState("");
  const [optionSelected, setOptionSelected] = useState([]);
  let canSubmit = false;
  const animatedComponents = makeAnimated();
  const rolesList = [];

  const onChange = (index, item, user_id) => {
    const { value } = item;
    const values = [...optionSelected];
    const isFound = values.some((assign) => {
      return assign.id === index;
    });
    if (isFound) {
      values[index].user_id = user_id;
      values[index].role = value;
    } else {
      values.push({ id: index, user_id, role: value });
    }
    setOptionSelected(values);
  };

  if (!loadingRoles) {
    for (let i = 0; i < roles.length; i++) {
      rolesList.push({
        value: roles[i].id,
        label: capitalizeFirstLetter(roles[i].name),
      });
    }
  }

  // Submission Function
  const AssignEmployees = async (userData) => {
    try {
      const response = await axios.post(
        `/api/projects/assignments/${project_slug}`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data) {
        const { data: message } = response;
        setReloadProject(!reloadProject);
        return message;
      }
    } catch (err) {
      setErrorMessage(err.response.data);
      throw new Error();
    }
  };

  // On Submit Action
  const onSubmit = async (a) => {
    canSubmit = true;
    setSelectErrors("");
    a.preventDefault();
    if (optionSelected.length !== relatedEmployeesTeam.length) {
      canSubmit = false;
      setSelectErrors("Please Assign Employees");
    }
    if (canSubmit) {
      try {
        const data = new FormData();
        data.append("assignments", JSON.stringify(optionSelected));
        const message = await AssignEmployees(data);
        setSuccess(message.message);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Reset Messages after 5 seconds
  useEffect(() => {
    getTeam(slug);
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
  }, [errorMessage, success]);

  return (
    <div className="form-section add-team-form">
      <section className="heading">
        <h2>
          <FaUsersCog /> {teamName}
        </h2>
        <p>Assign Roles to this team's employees</p>
        {success && <p className="succeed-msg">{success}</p>}
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
        {selectErrors && <p className="error-msg">{selectErrors}</p>}
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          {!loadingTeam &&
            relatedEmployeesTeam.map((employee, index) => (
              <div key={employee.id} className="form-group">
                <label htmlFor={`select-${index + 1}`} className="form-label">
                  {employee.first_name} {employee.last_name}:
                </label>
                <Select
                  id={`select-${index + 1}`}
                  components={animatedComponents}
                  onChange={(item) => onChange(index, item, employee.id)}
                  options={rolesList}
                  isSearchable
                  isLoading={loadingRoles}
                  closeMenuOnSelect={true}
                />
              </div>
            ))}

          <div className="form-group">
            <input
              type="submit"
              className="btn btn-block"
              value="Assign Roles"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AssignRolesForm;
