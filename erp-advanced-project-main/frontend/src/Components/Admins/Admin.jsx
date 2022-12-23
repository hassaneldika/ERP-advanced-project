import { FaEdit } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import IsActiveButtonAdmin from "./IsActiveButtonAdmin";

const Admin = ({
  firstName,
  lastName,
  image,
  email,
  status,
  phoneNumber,
  showEditAdminPopup,
  showDeleteAdminPopup,
  admin,
}) => {
  return (
    <tr>
      <td>
        <div>
          <img
            src={
              image.includes("avataaars")
                ? image
                : `${process.env.REACT_APP_BACKEND_URL}${image}`
            }
            alt="profile image"
          />
        </div>
      </td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>
        {
          <IsActiveButtonAdmin
            status={status}
            showDeleteAdminPopup={showDeleteAdminPopup}
            admin={admin}
          />
        }
      </td>
      <td>
        <div className="flex-btn">
          <Link to={`/employees/${email}`} className="btn view-btn">
            <BiShowAlt />
          </Link>
          <button
            className="btn edit-btn"
            onClick={() => showEditAdminPopup(admin)}
          >
            <FaEdit />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Admin;
