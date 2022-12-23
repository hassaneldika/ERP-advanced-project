import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import Spinner from "../Layout/Spinner";
import { FaEdit, FaUsersCog } from "react-icons/fa";
import "./SingleEmployee.css";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { GiSkills } from "react-icons/gi";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import SkillBar from "react-skillbars";

const SingleEmployee = ({
  employee,
  loadingEmployee,
  getEmployee,
  empTeam,
  employeeSkills,
  showEditEmployeePopup,
  showAssignEmployeePopup,
  showDeleteEmployeePopup,
  showChangeRolePopup,
}) => {
  const colors = {
    bar: "#0097a4",
    title: {
      text: "#f3f6fb",
      background: "#133f4c",
    },
  };
  const { email } = useParams();
  useEffect(() => {
    getEmployee(email);
  }, [email]);
  const string = "avataaars";

  if (loadingEmployee) {
    return <Spinner />;
  } else {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      picture,
      status,
      team: { name },
      system_role_id,
      skills,
    } = employee;
    const progressSkills = [];
    for (let i = 0; i < employeeSkills.length; i++) {
      progressSkills.push({
        type: capitalizeFirstLetter(
          skills.find((skill) => skill.id === employeeSkills[i].skill_id).name
        ),
        level: employeeSkills[i].score * 10,
      });
    }

    const uniqueIds = [];
    const unique = progressSkills.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.type);
      if (!isDuplicate) {
        uniqueIds.push(element.type);
        return true;
      }
      return false;
    });
    return (
      <div className="profile-container">
        <div className="profile-image">
          <div className="image">
            <img
              src={
                picture.includes(string)
                  ? picture
                  : `${process.env.REACT_APP_BACKEND_URL}${picture}`
              }
              alt="Single Profile"
            />
          </div>
          <div className="profile-buttons">
            <button
              className="btn dark-btn"
              onClick={() => showChangeRolePopup(employee)}
            >
              <FaUsersCog />
            </button>
            <button
              className="btn"
              onClick={() => showAssignEmployeePopup(employee)}
            >
              <GiSkills />
            </button>
            <button
              className="btn edit-btn"
              onClick={() => showEditEmployeePopup(employee)}
            >
              <FaEdit />
            </button>

            <button
              className={status === 1 ? "btn delete-btn" : "btn add-btn"}
              onClick={() => showDeleteEmployeePopup(employee)}
            >
              {status === 1 ? <AiFillLock /> : <AiFillUnlock />}
            </button>
          </div>
        </div>
        <div className="profile-content">
          <div className="block-1">
            <h2>Personal Information:</h2>
            <div className="the-form">
              <span> Name: </span>
              {first_name} {last_name}
            </div>
            <div className="the-form">
              <span> Email: </span>
              {email}
            </div>
            <div className="the-form">
              <span> Phone: </span>
              {phone_number}
            </div>
          </div>
          <div className="block-2">
            <h2>Work Description:</h2>
            <div className="the-form">
              <span> Team Name: </span>
              {capitalizeFirstLetter(name)}
            </div>
            <div className="the-form">
              <span> Post: </span>
              {system_role_id === 2 ? "Employee" : "Admin"}
            </div>
            <div className="the-form">
              <span> Team Size: </span>
              {empTeam}
            </div>
          </div>
          <div className="block-3">
            {employeeSkills.length > 0 ? (
              <div className="profile-skills">
                <h2>
                  <GiSkills /> Skills
                </h2>
                <SkillBar skills={unique} colors={colors} />
              </div>
            ) : (
              <div className="no-data">No Skills to display</div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default SingleEmployee;
