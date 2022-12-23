import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import Spinner from "../Layout/Spinner";
import "./SingleTeam.css";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineProject, AiOutlineUser } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SingleTeamEmployees from "./SingleTeamEmployees";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SingleProjectTeam from "./SingleProjectTeam";

const SingleTeam = ({
  team,
  loadingTeam,
  getTeam,
  showDeleteTeamPopup,
  showEditTeamPopup,
  relatedEmployeesTeam,
  relatedProjectsTeam,
}) => {
  const { slug } = useParams();

  useEffect(() => {
    getTeam(slug);
  }, [slug]);

  if (loadingTeam) {
    return <Spinner />;
  } else {
    const { name } = team;
    const size = relatedEmployeesTeam.length;
    const projectsSize = relatedProjectsTeam.length;
    return (
      <div className="single-team-container">
        <header>
          <div className="description">
            <h2>{name} Team</h2>
            <div>
              <HiUserGroup />
              Team Size: {size}
            </div>
          </div>
          <div className="single-team-manage">
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
        </header>
        <Tabs>
          <TabList>
            <Tab>
              <AiOutlineProject /> Projects
            </Tab>
            <Tab>
              <AiOutlineUser /> Team Members
            </Tab>
          </TabList>
          <TabPanel>
            {projectsSize > 0 ? (
              <div className="single-team-projects-container">
                {relatedProjectsTeam.map((project) => (
                  <SingleProjectTeam
                    key={project.id}
                    name={project.name}
                    slug={project.slug}
                  />
                ))}
              </div>
            ) : (
              <div className="no-data">No Projects Assigned</div>
            )}
          </TabPanel>
          <TabPanel>
            {size > 0 ? (
              <div className="single-team-employees-container ">
                {relatedEmployeesTeam.map((employee) => (
                  <SingleTeamEmployees
                    key={employee.id}
                    picture={employee.picture}
                    firstName={employee.first_name}
                    lastName={employee.last_name}
                    status={employee.status}
                    email={employee.email}
                    phoneNumber={employee.phone_number}
                  />
                ))}
              </div>
            ) : (
              <div className="no-data">No Employees Assigned</div>
            )}
          </TabPanel>
        </Tabs>
      </div>
    );
  }
};

export default SingleTeam;
