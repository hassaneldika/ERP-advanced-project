import "./Employees.css";
import Spinner from "../Layout/Spinner";
import Employee from "./Employee";
import { AiOutlineTeam, AiOutlineSearch } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import { useState } from "react";
import Select from "react-select";

const Employees = ({
  employees,
  token,
  loadingEmployees,
  showEditEmployeePopup,
  showAddEmployeeFormPopup,
  showDeleteEmployeePopup,
}) => {
  const [searchTerm, setSearchTerm] = useState([]);
  const [statusTerm, setStatusTerm] = useState(1);
  const [teamStatusTerm, setTeamStatusTerm] = useState(1);

  // const [page, setPage] = useState(6);
  const options = [
    { value: 1, label: "Active" },
    { value: 0, label: "Inactive" },
    { value: -1, label: "All" },
  ];

  const teamoptions = [
    { value: 1, label: "Assigned" },
    { value: 0, label: "Unassigned" },
    { value: -1, label: "All" },
  ];

  document.title = "Employees Dashboard | ERP";

  // const showEmployees = () => {
  //   let theEmployees = document.getElementById("hideit");
  //   setPage((prevValue) => prevValue + 3);
  //   if (page >= employees.length) {
  //     theEmployees.style.visibility = "hidden";
  //   }
  // }

  const onChange = (item) => {
    const { value } = item;
    setStatusTerm(value);
  };

  const onChange1 = (item1) => {
    const { value } = item1;
    setTeamStatusTerm(value);
  };
  if (loadingEmployees) {
    return <Spinner />;
  } else {
    return (
      <div className="dashboard employees-dashboard">
        <div className="header">
          <h2>
            <AiOutlineTeam />
            Employees Management
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
                defaultValue={{ value: 1, label: "Active" }}
                onChange={(item) => onChange(item)}
                options={options}
              />
            </div>
            <Select
              defaultValue={{ value: 1, label: "Assigned" }}
              onChange={(item1) => onChange1(item1)}
              options={teamoptions}
            />

            <button
              className="btn add-btn"
              onClick={() => showAddEmployeeFormPopup()}
            >
              <FaPlusSquare />
            </button>
          </div>
        </div>
        <div className="users-container">
          {employees /*.slice(0, page) */
            .filter((employee) => {
              if (searchTerm === "") {
                return employee;
              } else if (employee.first_name.includes(searchTerm)) {
                return employee;
              }
            })
            .filter((employee) => {
              if (teamStatusTerm === 0) {
                return employee.team.name === "unassigned";
              } else if (teamStatusTerm === 1) {
                return employee.team.name !== "unassigned";
              } else {
                return employee;
              }
            })
            .filter((employee) => {
              if (statusTerm === 0) {
                return employee.status === 0;
              } else if (statusTerm === 1) {
                return employee.status === 1;
              } else {
                return employee;
              }
            })
            .map((employee) => (
              <Employee
                key={employee.id}
                token={token}
                image={employee.picture}
                firstName={employee.first_name}
                lastName={employee.last_name}
                email={employee.email}
                phoneNumber={employee.phone_number}
                status={employee.status}
                showEditEmployeePopup={showEditEmployeePopup}
                showDeleteEmployeePopup={showDeleteEmployeePopup}
                employee={employee}
                teamName={employee.team.name}
              />
            ))}
          {/* <button onClick={showEmployees} className="btn show-btn" id="hideit">Show More</button> */}
        </div>
      </div>
    );
  }
};

export default Employees;
