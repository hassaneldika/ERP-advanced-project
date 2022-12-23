const IsActiveButtonAdmin = ({ status, showDeleteAdminPopup, admin }) => {
    if (status === 1) {
      return (
        <button
          className="btn add-btn status"
          onClick={() => showDeleteAdminPopup(admin, false)}
        ></button>
      );
    }
    return (
      <button
        className="btn delete-btn status"
        onClick={() => showDeleteAdminPopup(admin, true)}
      ></button>
    );
  };
export default IsActiveButtonAdmin;
  