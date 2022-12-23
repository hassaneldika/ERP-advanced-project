import CapitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import React from "react";

const Role = ({
  name,
  slug,
  showDeleteRolePopup,
  showEditRolePopup,
  userCounts,
}) => {
  return (
    <tr>
      <td>{CapitalizeFirstLetter(name)}</td>
      <td>
        <div className="flex-btn">
          <button
            className="btn edit-btn"
            onClick={() => showEditRolePopup({ name, slug })}
          >
            <FaEdit />
          </button>
          <button
            disabled={userCounts > 0}
            className={`btn ${userCounts > 0 ? "disabled-btn" : "delete-btn"}`}
            onClick={() => showDeleteRolePopup({ name, slug })}
          >
            <FaTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Role;
