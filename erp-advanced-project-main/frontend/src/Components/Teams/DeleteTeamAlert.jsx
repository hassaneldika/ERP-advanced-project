import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteTeamAlert = ({
  token,
  reloadTeams,
  setReloadTeams,
  deleteTeam,
}) => {
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { name, slug } = deleteTeam;
  const navigate = useNavigate();

  // Submission Function
  const DeleteTeam = async () => {
    try {
      const response = await axios.post(
        `/api/teams/${slug}`,
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
      setReloadTeams(!reloadTeams);
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
    if (success) {
      setTimeout(() => {
        setSuccess("");
        navigate("/teams");
      }, 5000);
    }
  }, [errorMessage]);

  return (
    <div className="form-section category-form delete-category-form">
      <section className="heading">
        <h2>
          <AiFillDelete /> Delete Team
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
              value="Delete Team"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default DeleteTeamAlert;
