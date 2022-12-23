import "./SingleTeamEmployees.css";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const SingleTeamEmployees = ({
    firstName,
    lastName,
    picture,
    email,
    status,
    phoneNumber,
}) => {
    return (
        <Link to={`/employees/${email}`}>
            <div className="single-team-employee-card">
                <div className="single-team-employee-card-image">
                    <img
                        src={
                            picture.includes("avataaars")
                                ? picture
                                : `${url}${picture}`
                        }
                        alt="Employee image"
                    />
                </div>
                <div className="single-team-employee-card-body">
                    <h3>
                        {firstName} {lastName}
                    </h3>
                    <p>
                        <span>
                            <BsFillTelephoneFill /> {phoneNumber}
                        </span>
                        <span>
                            <MdEmail /> {email}
                        </span>
                    </p>
                </div>
                <div className="single-team-employee-card-footer">
                    {status === 1 ? (
                        <span className="active-status">Active</span>
                    ) : (
                        <span className="inactive-status">Inactive</span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default SingleTeamEmployees;
