import { useEffect, useState } from "react";
import { AiOutlineProject } from "react-icons/ai";
import axios from "axios";
import MultiSelect from "../Layout/MultiSelect";

const AddProjectForm = ({
  token,
  teams,
  loadingTeams,
  fetchTeams,
  setReloadProjects,
  reloadProjects,
}) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [optionSelected, setOptionSelected] = useState([]);
  let canSubmit = false;
  const { name } = formData;
  const teamsList = [];

  if (!loadingTeams) {
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].users_count !== 0) {
        teamsList.push({
          value: teams[i].id,
          label: teams[i].name,
        });
      }
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
  const AddNewProject = async (userData) => {
    try {
      const response = await axios.post("/api/projects/", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        const message = await AddNewProject(data);
        setSuccess(message.message);
        setReloadProjects(!reloadProjects);
        setFormData({
          name: "",
        });
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
    fetchTeams();
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
          <AiOutlineProject /> Add New Project
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
              placeholder="Enter your project name"
              onChange={onChange}
            />
            <p>{errors.name}</p>
          </div>
          <label htmlFor="unassigned-select" className="form-label">
            Assign teams
          </label>
          <MultiSelect
            options={teamsList}
            loading={loadingTeams}
            setSelectedOptions={setOptionSelected}
          />
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-block"
              value="Add New Project"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddProjectForm;
