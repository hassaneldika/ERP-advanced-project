import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import IsActiveButton from "./IsActiveButton";
import { AiOutlineMail, AiOutlineTeam } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const Employee = ({
    firstName,
    lastName,
    image,
    email,
    status,
    phoneNumber,
    showEditEmployeePopup,
    showDeleteEmployeePopup,
    employee,
    teamName,
}) => {
    return (
        <div className="users-card">
            <div className="users-card-main">
                <div className="users-card-image">
                    <img
                        src={
                            image.includes("avataaars")
                                ? image
                                : `${url}${image}`
                        }
                        alt="profile image"
                    />
                </div>
                <div className="users-card-content">
                    <h3>
                        <Link to={`/employees/${email}`}>
                            {firstName} {lastName}
                        </Link>
                    </h3>
                    <span>
                        <AiOutlineMail />
                        {email}
                    </span>
                    <h4>
                        <BsPhone /> {phoneNumber}
                    </h4>
                    <h4>
                        <AiOutlineTeam /> {capitalizeFirstLetter(teamName)} Team
                    </h4>
                </div>
            </div>
            <div className="users-card-footer">
                <IsActiveButton
                    status={status}
                    showDeleteEmployeePopup={showDeleteEmployeePopup}
                    employee={employee}
                />
                <button
                    className="btn edit-btn"
                    onClick={() => showEditEmployeePopup(employee)}
                >
                    <FaEdit />
                </button>
            </div>
        </div>
    );
};

export default Employee;
