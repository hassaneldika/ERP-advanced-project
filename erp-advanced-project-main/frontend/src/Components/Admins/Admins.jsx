import "./Admins.css";
import Spinner from "../Layout/Spinner";
import Admin from "./Admin";
import { AiOutlineTeam, AiOutlineSearch } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import { useState } from "react";
import Select from "react-select";

const Admins = ({
  admins,
  token,
  loadingAdmins,
  showEditAdminPopup,
  showAddAdminFormPopup,
  showDeleteAdminPopup,
}) => {
  const [searchTerm, setSearchTerm] = useState([]);
  const [statusTerm, setStatusTerm] = useState(1);
  const options = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" },
    { value: -1, label: "All" },
  ];
  document.title = "Admins Dashboard | ERP";
  const onChange = (item) => {
    const { value } = item;
    setStatusTerm(value);
  };
  if (loadingAdmins) {
    return <Spinner />;
  } else {
    return (
      <div className="dashboard employees-dashboard">
        <div className="header">
          <h2>
            <AiOutlineTeam />
            Admins Management
          </h2>
          <div className="tools">
            <div className="form-group">
              <div className="form-input-div">
                <div>
                  <AiOutlineSearch />
                </div>
                <input
                  type="search"
                  name="search"
                  placeholder="Search..."
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  required
                  className="form-valid"
                />
              </div>
            </div>
            <div className="search-bar">
              <Select
                onChange={(item) => onChange(item)}
                options={options}
                defaultValue={{ value: 1, label: "Active" }}
              />
            </div>
            <button
              className="btn add-btn"
              onClick={() => showAddAdminFormPopup()}
            >
              <FaPlusSquare />
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-employees">
            <thead>
              <tr>
                <th>Image</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {admins
                .filter((admin) => {
                  if (searchTerm === "") {
                    return admin;
                  } else if (admin.first_name.includes(searchTerm)) {
                    return admin;
                  }
                })
                .filter((admin) => {
                  if (statusTerm === 0) {
                    return admin.status === 0;
                  } else if (statusTerm === 1) {
                    return admin.status === 1;
                  } else {
                    return admin;
                  }
                })
                .map((admin) => (
                  <Admin
                    key={admin.id}
                    token={token}
                    image={admin.picture}
                    firstName={admin.first_name}
                    lastName={admin.last_name}
                    email={admin.email}
                    phoneNumber={admin.phone_number}
                    status={admin.status}
                    showEditAdminPopup={showEditAdminPopup}
                    showDeleteAdminPopup={showDeleteAdminPopup}
                    admin={admin}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Admins;
