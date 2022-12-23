import "./Project.css";
import ProjectStatus from "./ProjectStatus";
import formatDate from "../../utils/formatDate";
import { MdDateRange } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { Link } from "react-router-dom";

const Project = ({
  name,
  slug,
  status,
  created_at,
  finished_at,
  teams_count,
}) => {
  return (
    <Link to={`/projects/${slug}`}>
      <div className="project">
        <div className="project-header">
          <h3>{name}</h3>
          <ProjectStatus status={status} finished_at={finished_at} />
        </div>
        <div className="project-body">
          <p>Teams assigned: {teams_count}</p>
        </div>
        <div className="project-footer">
          <p>
            <MdDateRange /> {formatDate(created_at)}
          </p>
          <p>
            {finished_at && <IoMdDoneAll />} {finished_at && finished_at}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Project;
