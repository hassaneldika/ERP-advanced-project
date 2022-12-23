import { Link } from "react-router-dom";
import { AiOutlineTeam } from "react-icons/ai";
import { FaUsersCog } from "react-icons/fa";
import "./RelatedEmployeesProject.css";
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const RelatedEmployeesProject = ({
    first_name,
    team_name,
    last_name,
    picture,
    role_name,
    email,
}) => {
    return (
        <div className="employees-project-card">
            <div className="employees-project-image">
                <img
                    src={
                        picture.includes("avataaars")
                            ? picture
                            : `${url}${picture}`
                    }
                    alt="employee picture"
                />
            </div>
            <div className="employees-project-content">
                <h3>
                    <Link to={`/employees/${email}`}>
                        {first_name} {last_name}
                    </Link>
                </h3>
                <p>
                    <AiOutlineTeam className="icons" /> {team_name}
                </p>
                <p>
                    <FaUsersCog className="icons" /> {role_name}
                </p>
            </div>
        </div>
    );
};

export default RelatedEmployeesProject;
