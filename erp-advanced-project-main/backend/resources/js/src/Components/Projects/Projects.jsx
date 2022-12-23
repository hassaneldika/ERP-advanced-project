import "./Projects.css";
import Spinner from "../Layout/Spinner";
import { AiOutlineProject, AiOutlineSearch } from "react-icons/ai";
import { FaPlusSquare } from "react-icons/fa";
import Project from "./Project";
import { useState } from "react";
import Select from "react-select";

function Projects({ projects, loadingProjects, showAddProjectFormPopup }) {
  const [searchTerm, setSearchTerm] = useState([]);
  const [statusTerm, setStatusTerm] = useState(0);
  const options = [
    { value: 0, label: "Active" },
    { value: 1, label: "Done" },
    { value: -1, label: "All" },
  ];
  document.title = "Projects Dashboard | ERP";
  const onChange = (item) => {
    const { value } = item;
    setStatusTerm(value);
  };
  if (loadingProjects) {
    return <Spinner />;
  } else {
    return (
      <div className="dashboard">
        <div className="header">
          <h2>
            <AiOutlineProject />
            Projects Management
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
            <div>
              <button
                className="btn add-btn"
                onClick={() => showAddProjectFormPopup()}
              >
                <FaPlusSquare />
              </button>
            </div>
          </div>
        </div>
        <div className="projects-container">
          {projects
            .filter((project) => {
              if (searchTerm === "") {
                return project;
              } else if (project.name.includes(searchTerm)) {
                return project;
              }
            })
            .filter((project) => {
              if (statusTerm === 0) {
                return project.status === 0;
              } else if (statusTerm === 1) {
                return project.status === 1;
              } else {
                return project;
              }
            })

            .map((project) => (
              <Project
                key={project.id}
                name={project.name}
                slug={project.slug}
                status={project.status}
                finished_at={project.finished_at}
                created_at={project.created_at}
                teams_count={project.teams_count}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Projects;
