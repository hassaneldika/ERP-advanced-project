import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import CapitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const Team = ({
  name,
  size,
  slug,
  showEditTeamPopup,
  showDeleteTeamPopup,
}) => {
  return (
    <tr>
      <td>{CapitalizeFirstLetter(name)}</td>
      <td>{size}</td>
      <td>
        <div className="flex-btn">
          <Link to={`/teams/${slug}`} className="btn view-btn">
            <BiShowAlt />
          </Link>
          <button
            className="btn edit-btn"
            onClick={() => showEditTeamPopup({ name, size, slug })}
          >
            <FaEdit />
          </button>

          <button
            disabled={size > 0}
            className={`btn ${size > 0 ? "disabled-btn" : "delete-btn"}`}
            onClick={() => showDeleteTeamPopup({ name, slug })}
          >
            <FaTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Team;
