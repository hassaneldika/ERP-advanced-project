import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";

const ReportProjects = ({ name, role, slug, created_at, end_date }) => {
  return (
    <div>
      <h3>
        <Link to={`/projects/${slug}`}>{name}</Link>
      </h3>
      <span>
        <b>From</b> {formatDate(created_at)} {end_date ? <b>To</b> : ""}{" "}
        {end_date ? formatDate(end_date) : ""}
      </span>
      <span>@{role}</span>
    </div>
  );
};

export default ReportProjects;
