import { AiFillLock, AiFillUnlock } from "react-icons/ai";

const IsActiveButton = ({ status, showDeleteEmployeePopup, employee }) => {
  if (status === 1) {
    return (
      <button
        className="btn add-btn"
        onClick={() => showDeleteEmployeePopup(employee, false)}
      >
        <AiFillLock />
      </button>
    );
  }
  return (
    <button
      className="btn delete-btn"
      onClick={() => showDeleteEmployeePopup(employee, true)}
    >
      <AiFillUnlock />
    </button>
  );
};
export default IsActiveButton;
