import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import Logo from "../../assets/images/logo.png";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const LoginPage = ({ auth, setAuth }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();
    let canSubmit = false;
    const { email, password } = formData;

    document.title = "Login | ERP";

    // On Change for controlled fields
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // Login Function
    const loginProcess = async (userData) => {
        try {
            const response = await axios.post(`${url}api/login`, userData);
            if (response.data) {
                const { data: user } = response;
                setAuth(user);
                localStorage.setItem("user", JSON.stringify(user));
                return user;
            }
        } catch (err) {
            setErrorMessage(err.response.data.message);
            throw new Error();
        }
    };

    // On Submit Action
    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors(validate(formData));
        if (canSubmit) {
            try {
                await loginProcess({ email, password });
                setFormData({ email: "", password: "" });
            } catch (error) {
                console.log(error);
            }
        }
    };

    // Validation for Enroll Form
    const validate = (values) => {
        canSubmit = false;
        const errorMessages = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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
        } else {
            errorMessages.password = "";
        }
        if (errorMessages.email === "" && errorMessages.password === "") {
            canSubmit = true;
        }
        return errorMessages;
    };

    // Reset Messages after 5 seconds
    useEffect(() => {
        if (errorMessage) {
            setTimeout(() => {
                setErrorMessage(false);
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
                    <img src={Logo} alt="Logo" />
                    <h1>Login To Dashboard</h1>
                    {errorMessage && (
                        <p className="error-msg">{errorMessage}</p>
                    )}
                </section>
                <section className="form">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">
                                Email:
                            </label>
                            <div className="form-input-div">
                                <div>
                                    <HiOutlineMail />
                                </div>
                                <input
                                    type="text"
                                    className={
                                        errors.email ? "error" : "form-valid"
                                    }
                                    name="email"
                                    id="email"
                                    value={email}
                                    placeholder="Enter your email"
                                    onChange={onChange}
                                />
                            </div>
                            <p>{errors.email}</p>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">
                                Password:
                            </label>
                            <div className="form-input-div">
                                <div>
                                    <RiLockPasswordFill />
                                </div>
                                <input
                                    type="password"
                                    className={
                                        errors.password ? "error" : "form-valid"
                                    }
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={onChange}
                                    placeholder="Enter your password"
                                />
                            </div>

                            <p>{errors.password}</p>
                            <Link to="/forget">
                                <p className="secondp">Forget your Password?</p>
                            </Link>
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btn"
                                value="Login"
                            />
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default LoginPage;
