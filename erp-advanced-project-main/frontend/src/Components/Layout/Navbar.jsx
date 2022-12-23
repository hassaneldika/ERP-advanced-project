import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import "./Navbar.css";

const Navbar = ({ auth: { user }, setAuth }) => {
  const navigate = useNavigate();
  const { first_name, email, picture } = user;
  const onLogout = () => {
    localStorage.removeItem("user");
    setAuth(null);
    navigate("/login");
  };
  return (
    <nav>
      <div>
        <Link to={`/employees/${email}`}>
          <img
            src={
              picture.includes("avataaars")
                ? picture
                : `${process.env.REACT_APP_BACKEND_URL}${picture}`
            }
            alt="profile image"
          />
          <p>{first_name}</p>
        </Link>
      </div>
      <button onClick={onLogout}>
        <FiLogOut /> Logout
      </button>
    </nav>
  );
};

export default Navbar;
