import { useState, useEffect } from "react";
import Popup from "../Layout/Popup";
import Admins from "../Admins/Admins";
import AddAdminForm from "../Admins/AddAdminForm";
import EditAdminForm from "../Admins/EditAdminForm";
import DeleteAdminAlert from "../Admins/DeleteAdminAlert";
import { useNavigate } from "react-router-dom";

const AdminsDashboard = ({
  admins,
  loadingAdmins,
  fetchAdmins,
  token,
  auth: {
    user: { system_role_id },
  },
}) => {
  const navigate = useNavigate();
  if (system_role_id !== 3) {
    navigate("/");
  }
  /**
   * Add Admin Form State Popup
   */
  const [showAddAdminForm, setShowAddAdminForm] = useState(false);

  /**
   * Edit Admin Form State Popup
   */
  const [showEditAdminForm, setShowEditAdminForm] = useState(false);
  const [editAdmin, setEditAdmin] = useState("");

  /**
   * Delete Admin Alert State Popup
   */
  const [showDeleteAdminForm, setShowDeleteAdminForm] = useState(false);
  const [deleteAdmin, setDeleteAdmin] = useState("");
  const [adminStatus, setAdminStatus] = useState("");

  /**
   * Refresh Admins Table after each add, edit and delete request
   */
  const [reloadAdmins, setReloadAdmins] = useState(false);

  /**
   * Popup Functions
   */
  const showAddAdminFormPopup = () => {
    setShowAddAdminForm(true);
  };

  const showEditAdminPopup = (admin) => {
    setEditAdmin(admin);
    setShowEditAdminForm(true);
  };

  const showDeleteAdminPopup = (admin, status) => {
    setDeleteAdmin(admin);
    setAdminStatus(status);
    setShowDeleteAdminForm(true);
  };

  useEffect(() => {
    fetchAdmins();
  }, [reloadAdmins]);

  return (
    <>
      <Admins
        admins={admins}
        loadingAdmins={loadingAdmins}
        showAddAdminFormPopup={showAddAdminFormPopup}
        showEditAdminPopup={showEditAdminPopup}
        showDeleteAdminPopup={showDeleteAdminPopup}
        token={token}
      />
      {/* Admins Add Form Popup */}
      {showAddAdminForm && (
        <Popup
          show={showAddAdminForm}
          setShow={setShowAddAdminForm}
          component={
            <AddAdminForm
              token={token}
              reloadAdmins={reloadAdmins}
              setReloadAdmins={setReloadAdmins}
            />
          }
        />
      )}
      {/* Admins Edit Form Popup */}
      {showEditAdminForm && (
        <Popup
          show={showEditAdminForm}
          setShow={setShowEditAdminForm}
          component={
            <EditAdminForm
              token={token}
              reloadAdmins={reloadAdmins}
              setReloadAdmins={setReloadAdmins}
              editAdmin={editAdmin}
            />
          }
        />
      )}
      {/* Admins Delete Form Popup */}
      {showDeleteAdminForm && (
        <Popup
          show={showDeleteAdminForm}
          setShow={setShowDeleteAdminForm}
          component={
            <DeleteAdminAlert
              token={token}
              reloadAdmins={reloadAdmins}
              setReloadAdmins={setReloadAdmins}
              deleteAdmin={deleteAdmin}
              status={adminStatus}
            />
          }
        />
      )}
    </>
  );
};

export default AdminsDashboard;
