import { useState, useEffect } from "react";
import Popup from "../Layout/Popup";
import Employees from "../Employees/Employees";
import AddEmployeeForm from "../Employees/AddEmployeeForm";
import EditEmployeeForm from "../Employees/EditEmployeeForm";
import DeleteEmployeeAlert from "../Employees/DeleteEmployeeAlert";

const EmployeesDashboard = ({
  employees,
  page,
  loadingEmployees,
  fetchEmployees,
  token,
}) => {
  /**
   * Add Employee Form State Popup
   */
  const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);

  /**
   * Edit Employee Form State Popup
   */
  const [showEditEmployeeForm, setShowEditEmployeeForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState("");

  /**
   * Delete Employee Alert State Popup
   */
  const [showDeleteEmployeeForm, setShowDeleteEmployeeForm] = useState(false);
  const [deleteEmployee, setDeleteEmployee] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");

  /**
   * Refresh Employees Table after each add, edit and delete request
   */
  const [reloadEmployees, setReloadEmployees] = useState(false);

  /**
   * Popup Functions
   */
  const showAddEmployeeFormPopup = () => {
    setShowAddEmployeeForm(true);
  };

  const showEditEmployeePopup = (employee) => {
    setEditEmployee(employee);
    setShowEditEmployeeForm(true);
  };

  const showDeleteEmployeePopup = (employee, status) => {
    setDeleteEmployee(employee);
    setEmployeeStatus(status);
    setShowDeleteEmployeeForm(true);
  };

  useEffect(() => {
    fetchEmployees();
  }, [reloadEmployees]);

  return (
    <>
      <Employees
        employees={employees}
        loadingEmployees={loadingEmployees}
        showAddEmployeeFormPopup={showAddEmployeeFormPopup}
        showEditEmployeePopup={showEditEmployeePopup}
        showDeleteEmployeePopup={showDeleteEmployeePopup}
        token={token}
        page={page}
      />
      {/* Employees Add Form Popup */}
      {showAddEmployeeForm && (
        <Popup
          show={showAddEmployeeForm}
          setShow={setShowAddEmployeeForm}
          component={
            <AddEmployeeForm
              token={token}
              reloadEmployees={reloadEmployees}
              setReloadEmployees={setReloadEmployees}
            />
          }
        />
      )}
      {/* Employees Edit Form Popup */}
      {showEditEmployeeForm && (
        <Popup
          show={showEditEmployeeForm}
          setShow={setShowEditEmployeeForm}
          component={
            <EditEmployeeForm
              token={token}
              reloadEmployees={reloadEmployees}
              setReloadEmployees={setReloadEmployees}
              editEmployee={editEmployee}
            />
          }
        />
      )}
      {/* Employees Delete Form Popup */}
      {showDeleteEmployeeForm && (
        <Popup
          show={showDeleteEmployeeForm}
          setShow={setShowDeleteEmployeeForm}
          component={
            <DeleteEmployeeAlert
              token={token}
              reloadEmployees={reloadEmployees}
              setReloadEmployees={setReloadEmployees}
              deleteEmployee={deleteEmployee}
              status={employeeStatus}
            />
          }
        />
      )}
    </>
  );
};

export default EmployeesDashboard;
