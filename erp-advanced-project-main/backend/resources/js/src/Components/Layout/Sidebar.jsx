import React from "react";
import "./Sidebar.css";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { AiOutlineProject, AiOutlineTeam, AiOutlineUser } from "react-icons/ai";
import { FaUsersCog } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const Sidebar = ({
  auth: {
    user: { system_role_id },
  },
}) => {
  return (
    <section className="sidebar">
      <div className="brand">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <ul>
        <li>
          <NavLink to={"/"}>
            <TbReportSearch /> Reports
          </NavLink>
        </li>
        {/* Show Admin Tab Only for SuperAdmins*/}
        {system_role_id === 3 && (
          <li>
            <NavLink to="/admins">
              <RiAdminFill /> Admins
            </NavLink>
          </li>
        )}
        <li>
          <NavLink to={"/projects"}>
            <AiOutlineProject /> Projects
          </NavLink>
        </li>
        <li>
          <NavLink to={"/teams"}>
            <AiOutlineTeam /> Teams
          </NavLink>
        </li>
        <li>
          <NavLink to={"/employees"}>
            <AiOutlineUser /> Employees
          </NavLink>
        </li>
        <li>
          <NavLink to={"/roles"}>
            <FaUsersCog /> Roles
          </NavLink>
        </li>
        <li>
          <NavLink to={"/skills"}>
            <GiSkills /> KPI
          </NavLink>
        </li>
        <li></li>
      </ul>
    </section>
  );
};

export default Sidebar;
