import { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

const DeleteRoleAlert = ({
  deleteRole,
  token,
  setReloadRoles,
  reloadRoles,
}) => {
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { name, slug } = deleteRole;

  // Submission Function
  const DeleteTeam = async () => {
    try {
      const response = await axios.post(
        `/api/roles/${slug}`,
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
      setErrorMessage(err.response.data);
      throw new Error();
    }
  };

  // On Submit Action
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await DeleteTeam();
      setSuccess(message.message);
      setReloadRoles(!reloadRoles);
    } catch (err) {
      setErrorMessage(err.response.data);
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
    setTimeout(() => {
      setSuccess("");
    }, 5000);
  }, [errorMessage]);

  return (
    <div className="form-section category-form delete-category-form">
      <section className="heading">
        <h2>
          <AiFillDelete /> Delete Role
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
              value="Delete Role"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default DeleteRoleAlert;
