import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import { BiImageAdd } from "react-icons/bi";

const AddEmployeeForm = ({ token, setReloadEmployees, reloadEmployees }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imageError, setImageError] = useState("");
  const [image, setImage] = useState({});
  let canSubmit = false;
  const { first_name, last_name, email, phone_number } = formData;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
        setImageError("Invalid Image Type");
      } else {
        setImageError("");
        const img = {
          preview: URL.createObjectURL(event.target.files[0]),
          data: event.target.files[0],
        };
        setImage(img);
      }
    }
  };

  // On Change for controlled fields
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Submission Function
  const AddNewEmployee = async (userData) => {
    try {
      const response = await axios.post("/api/employees/", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        const { data: message } = response;
        return message;
      }
    } catch (err) {
      setErrorMessage(err.response.data);
      throw new Error();
    }
  };

  // On Submit Action
  const onSubmit = async (a) => {
    a.preventDefault();
    setErrors(validate(formData));
    if (canSubmit) {
      try {
        const imageFile = image.data;
        const data = new FormData();
        data.append("image", imageFile);
        data.append("first_name", first_name);
        data.append("last_name", last_name);
        data.append("email", email);
        data.append("phone_number", phone_number);
        data.append("system_role_id", "2");
        const message = await AddNewEmployee(data);
        setSuccess(message.message);
        setReloadEmployees(!reloadEmployees);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Validation for Enroll Form
  const validate = (values) => {
    canSubmit = false;
    const errorMessages = {};
    if (values.first_name === "") {
      errorMessages.first_name = "First name is required";
    } else {
      errorMessages.first_name = "";
    }
    if (values.last_name === "") {
      errorMessages.last_name = "Last name is required";
    } else {
      errorMessages.last_name = "";
    }
    if (values.email === "") {
      errorMessages.email = "Email is required";
    } else {
      errorMessages.email = "";
    }
    if (values.phone_number === "") {
      errorMessages.phone_number = "Phone Number is required";
    } else {
      errorMessages.phone_number = "";
    }
    if (image.data === undefined) {
      setImageError("Upload Image");
    } else {
      setImageError("");
    }
    if (
      errorMessages.first_name === "" &&
      errorMessages.last_name === "" &&
      errorMessages.email === "" &&
      errorMessages.phone_number === "" &&
      image.data !== undefined
    ) {
      canSubmit = true;
    }
    return errorMessages;
  };

  // Reset Messages after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
    if (success) {
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
  }, [errorMessage, success]);

  return (
    <div className="form-section add-team-form">
      <section className="heading">
        <h2>
          <AiOutlineUser /> Add New Employee
        </h2>
        <p>Enter your information below</p>
        {success && <p className="succeed-msg">{success}</p>}
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="edit-image-form">
            {imageError && <p className="error-msg">{imageError}</p>}
            {image.preview && <img src={image.preview} alt="User Image" />}
            <div>
              <label htmlFor="picture" className="form-control">
                <BiImageAdd /> Upload Image
                <input
                  type="file"
                  onChange={onImageChange}
                  className="form-control"
                  name="picture"
                  id="picture"
                />
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="first_name" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className={errors.first_name ? "error" : "form-valid"}
              name="first_name"
              id="first_name"
              placeholder="Enter your employee name"
              onChange={onChange}
            />
            <p>{errors.first_name}</p>
          </div>
          <div className="form-group">
            <label htmlFor="last_name" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className={errors.last_name ? "error" : "form-valid"}
              name="last_name"
              id="last_name"
              placeholder="Enter your last name"
              onChange={onChange}
            />
            <p>{errors.last_name}</p>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className={errors.email ? "error" : "form-valid"}
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={onChange}
            />
            <p>{errors.email}</p>
          </div>
          <div className="form-group">
            <label htmlFor="phone_number" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className={errors.phone_number ? "error" : "form-valid"}
              name="phone_number"
              id="phone_number"
              placeholder="Enter your phone number"
              onChange={onChange}
            />
            <p>{errors.phone_number}</p>
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-block"
              value="Add New Employee"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddEmployeeForm;
