import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineTeam } from "react-icons/ai";

const EditRoleForm = ({ editRole, token, setReloadRoles, reloadRoles }) => {
  const [formData, setFormData] = useState(editRole);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let canSubmit = false;
  const { name, slug } = formData;

  // On Change for controlled fields
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Submission Function
  const EditRole = async (userData) => {
    try {
      const response = await axios.post(`/api/roles/${slug}`, userData, {
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
        data.append("_method", "PUT");
        const message = await EditRole(data);
        setSuccess(message.message);
        setReloadRoles(!reloadRoles);
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
          <AiOutlineTeam /> Edit Role
        </h2>
        <p>Enter your information below</p>
        {success && <p className="succeed-msg">{success}</p>}
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Role Name:
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
          <div className="form-group">
            <input type="submit" className="btn btn-block" value="Edit Role" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditRoleForm;
