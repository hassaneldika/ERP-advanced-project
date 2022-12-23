import "./Teams.css";
import Spinner from "../Layout/Spinner";
import Team from "./Team";
import { FaPlusSquare } from "react-icons/fa";
import { AiOutlineTeam, AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import Select from "react-select";

const Teams = ({
  teams,
  loadingTeams,
  showAddTeamFormPopup,
  showEditTeamPopup,
  showDeleteTeamPopup,
}) => {
  const [searchTerm, setSearchTerm] = useState([]);
  document.title = "Teams Dashboard | ERP";
  if (loadingTeams) {
    return <Spinner />;
  } else {
    return (
      <div className="dashboard">
        <div className="header">
          <h2>
            <AiOutlineTeam />
            Teams Management
          </h2>
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
          <button
            className="btn add-btn"
            onClick={() => showAddTeamFormPopup()}
          >
            <FaPlusSquare />
          </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-teams">
            <thead>
              <tr>
                <th>Name</th>
                <th>Team Size</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {teams
                .filter((team) => {
                  if (searchTerm === "") {
                    return team;
                  } else if (team.name.includes(searchTerm)) {
                    return team;
                  }
                })
                .map((team) => (
                  <Team
                    key={team.id}
                    name={team.name}
                    size={team.users_count}
                    slug={team.slug}
                    created_at={team.created_at}
                    updated_at={team.updated_at}
                    showEditTeamPopup={showEditTeamPopup}
                    showDeleteTeamPopup={showDeleteTeamPopup}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Teams;
