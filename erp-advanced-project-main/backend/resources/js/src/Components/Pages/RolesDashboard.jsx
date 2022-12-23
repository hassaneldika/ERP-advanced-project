import { useState, useEffect } from "react";
import Popup from "../Layout/Popup";
import Roles from "../Roles/Roles";
import AddRoleForm from "../Roles/AddRoleForm";
import EditRoleForm from "../Roles/EditRoleForm";
import DeleteRoleForm from "../Roles/DeleteRoleForm";

const RolesDashboard = ({ roles, loadingRoles, fetchRoles, token }) => {
  /**
   * Add Role Form State Popup
   */
  const [showAddRoleForm, setShowAddRoleForm] = useState(false);

  /**
   * Edit Role Form State Popup
   */
  const [showEditRoleForm, setShowEditRoleForm] = useState(false);
  const [editRole, setEditRole] = useState("");

  /**
   * Delete Role Alert State Popup
   */
  const [showDeleteRoleForm, setShowDeleteRoleForm] = useState(false);
  const [deleteRole, setDeleteRole] = useState("");

  /**
   * Refresh Roles Table after each add, edit and delete request
   */
  const [reloadRoles, setReloadRoles] = useState(false);

  /**
   * Popup Functions
   */
  const showAddRoleFormPopup = () => {
    setShowAddRoleForm(true);
  };

  const showEditRolePopup = (role) => {
    setEditRole(role);
    setShowEditRoleForm(true);
  };

  const showDeleteRolePopup = (role) => {
    setDeleteRole(role);
    setShowDeleteRoleForm(true);
  };

  useEffect(() => {
    fetchRoles();
  }, [reloadRoles]);

  return (
    <>
      <Roles
        roles={roles}
        loadingRoles={loadingRoles}
        showAddRoleFormPopup={showAddRoleFormPopup}
        showEditRolePopup={showEditRolePopup}
        showDeleteRolePopup={showDeleteRolePopup}
      />
      {/* Roles Add Form Popup */}
      {showAddRoleForm && (
        <Popup
          show={showAddRoleForm}
          setShow={setShowAddRoleForm}
          component={
            <AddRoleForm
              token={token}
              reloadRoles={reloadRoles}
              setReloadRoles={setReloadRoles}
            />
          }
        />
      )}
      {/* Roles Edit Form Popup */}
      {showEditRoleForm && (
        <Popup
          show={showEditRoleForm}
          setShow={setShowEditRoleForm}
          component={
            <EditRoleForm
              token={token}
              reloadRoles={reloadRoles}
              setReloadRoles={setReloadRoles}
              editRole={editRole}
            />
          }
        />
      )}
      {/* Roles Delete Form Popup */}
      {showDeleteRoleForm && (
        <Popup
          show={showDeleteRoleForm}
          setShow={setShowDeleteRoleForm}
          component={
            <DeleteRoleForm
              token={token}
              reloadRoles={reloadRoles}
              setReloadRoles={setReloadRoles}
              deleteRole={deleteRole}
            />
          }
        />
      )}
    </>
  );
};

export default RolesDashboard;
