import Spinner from "../Layout/Spinner";
import { FaPlusSquare, FaUsersCog } from "react-icons/fa";
import Role from "./Role";

const Roles = ({
  roles,
  loadingRoles,
  showAddRoleFormPopup,
  showDeleteRolePopup,
  showEditRolePopup,
}) => {
  document.title = "Roles Dashboard | ERP";
  if (loadingRoles) {
    return <Spinner />;
  } else {
    return (
      <div className="dashboard">
        <div className="header">
          <h2>
            <FaUsersCog />
            Roles Management
          </h2>
          <button
            className="btn add-btn"
            onClick={() => showAddRoleFormPopup()}
          >
            <FaPlusSquare />
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-skills">
            <thead>
              <tr>
                <th>Name</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <Role
                  key={role.id}
                  name={role.name}
                  slug={role.slug}
                  userCounts={role.users_count}
                  showEditRolePopup={showEditRolePopup}
                  showDeleteRolePopup={showDeleteRolePopup}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Roles;
