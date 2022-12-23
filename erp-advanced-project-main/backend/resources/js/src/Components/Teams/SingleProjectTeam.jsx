import "./SingleTeamEmployees.css";
import { Link } from "react-router-dom";

const SingleProjectTeam = ({ name, slug }) => {
  return (
    <div>
      <h3>
        <Link to={`/projects/${slug}`}>{name}</Link>
      </h3>
    </div>
  );
};

export default SingleProjectTeam;
