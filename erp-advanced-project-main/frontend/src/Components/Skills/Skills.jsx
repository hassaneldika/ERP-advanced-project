import Spinner from "../Layout/Spinner";
import { GiSkills } from "react-icons/gi";
import { FaPlusSquare } from "react-icons/fa";
import Skill from "./Skill";
import "./Skills.css";

const Skills = ({
  loadingSkills,
  showAddSkillFormPopup,
  skills,
  showDeleteSkillPopup,
  showEditSkillPopup,
}) => {
  document.title = "Skills Dashboard | ERP";
  if (loadingSkills) {
    return <Spinner />;
  } else {
    return (
      <div className="dashboard">
        <div className="header">
          <h2>
            <GiSkills />
            Skills Management
          </h2>
          <button
            className="btn add-btn"
            onClick={() => showAddSkillFormPopup()}
          >
            <FaPlusSquare />
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-skills">
            <thead>
              <tr>
                <th>Name</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <Skill
                  key={skill.id}
                  name={skill.name}
                  slug={skill.slug}
                  userCounts={skill.users_count}
                  showEditSkillPopup={showEditSkillPopup}
                  showDeleteSkillPopup={showDeleteSkillPopup}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default Skills;
