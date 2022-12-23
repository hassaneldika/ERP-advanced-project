import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoBarcode } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import "./Reset.css";
import { useNavigate } from "react-router-dom";

const Reset = ({ auth }) => {
  document.title = "Reset Password | ERP";
  const navigate = useNavigate();
  let canSubmit = false;
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    token: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { token, email, password, password_confirmation } = formData;

  const onChangePass = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Reset Password Function
  const resetPassword = async (userData) => {
    try {
      const response = await axios.post("/api/reset-password", userData);
      if (response.data) {
        const { data: message } = response;
        return message;
      }
    } catch (err) {
      setErrorMessage(err.response.data.message);
      throw new Error();
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setErrors(validate(formData));
    if (canSubmit) {
      const message = await resetPassword(formData);
      setSuccess(message.message);
      setFormData({
        token: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    }
  };

  const validate = (values) => {
    canSubmit = false;
    const errorMessages = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (values.token === "") {
      errorMessages.token = "Pin Code is required";
    } else {
      errorMessages.token = "";
    }
    if (values.email === "") {
      errorMessages.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errorMessages.email = "Invalid Email address!";
    } else {
      errorMessages.email = "";
    }
    if (values.password === "") {
      errorMessages.password = "Password is required";
    } else if (values.password.length < 8) {
      errorMessages.password = "Password should be at least 8 characters";
    } else if (values.password_confirmation !== values.password) {
      errorMessages.password_confirmation = "Password is not Confirmed";
    } else {
      errorMessages.password = "";
    }
    if (
      errorMessages.token === "" &&
      errorMessages.email === "" &&
      errorMessages.password === ""
    ) {
      canSubmit = true;
    }
    return errorMessages;
  };

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
      }, 5000);
    }
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        navigate("/login");
      }, 5000);
    }
    if (auth) {
      navigate("/");
    }
  }, [errorMessage, auth]);

  return (
    <div className="login-container">
      <div className="login-form">
        <section className="heading">
          <h1>Reset Your Password</h1>
          {success && <p className="succeed-msg">{success}</p>}
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
        </section>
        <section className="form">
          <form onSubmit={submitForm}>
            <div className="form-group">
              <label htmlFor="token" className="form-label">
                Pin code:
              </label>
              <div className="form-input-div">
                <div>
                  <IoBarcode />
                </div>
                <input
                  type="number"
                  className={errors.token ? "error" : "form-valid"}
                  name="token"
                  id="token"
                  value={token}
                  onChange={onChangePass}
                  placeholder="Enter your Pincode"
                />
              </div>
              <p>{errors.token}</p>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <div className="form-input-div">
                <div>
                  <HiOutlineMail />
                </div>
                <input
                  type="email"
                  className={errors.email ? "error" : "form-valid"}
                  name="email"
                  id="email"
                  value={email}
                  onChange={onChangePass}
                  placeholder="Enter your Email Address"
                />
              </div>
              <p>{errors.email}</p>
            </div>
            <div className="form-group">
              <label htmlFor="pass" className="form-label">
                Password:
              </label>
              <div className="form-input-div">
                <div>
                  <RiLockPasswordFill />
                </div>
                <input
                  type="password"
                  name="password"
                  className={errors.password ? "error" : "form-valid"}
                  id="pass"
                  value={password}
                  onChange={onChangePass}
                  placeholder="Enter your password"
                />
              </div>
              <p>{errors.password}</p>
            </div>
            <div className="form-group">
              <label htmlFor="passCon" className="form-label">
                Confirm The Password:
              </label>
              <div className="form-input-div">
                <div>
                  <RiLockPasswordFill />
                </div>
                <input
                  type="password"
                  className={
                    errors.password_confirmation ? "error" : "form-valid"
                  }
                  name="password_confirmation"
                  id="passCon"
                  value={password_confirmation}
                  onChange={onChangePass}
                  placeholder="Confirm your password"
                />
              </div>
              <p>{errors.password_confirmation}</p>
            </div>
            <div className="form-group reset">
              <input type="submit" className="btn" value="Reset" />
              <Link to="/login" className="btn dark-btn">
                Back
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Reset;
