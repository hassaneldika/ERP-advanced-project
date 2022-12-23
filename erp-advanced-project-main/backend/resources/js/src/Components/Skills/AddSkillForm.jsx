import { useEffect, useState } from "react";
import { GiSkills } from "react-icons/gi";
import axios from "axios";
const url = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const AddSkillForm = ({ token, setReloadSkills, reloadSkills }) => {
    const [formData, setFormData] = useState({
        name: "",
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    let canSubmit = false;
    const { name } = formData;

    // On Change for controlled fields
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // Submission Function
    const AddNewSkill = async (userData) => {
        try {
            const response = await axios.post(`${url}api/skills`, userData, {
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
                const data = new FormData();
                data.append("name", name);
                const message = await AddNewSkill(data);
                setSuccess(message.message);
                setReloadSkills(!reloadSkills);
                setFormData({
                    name: "",
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
        if (values.name === "") {
            errorMessages.name = "Name is required";
        } else {
            errorMessages.name = "";
        }
        if (errorMessages.name === "") {
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
                    <GiSkills /> Add New Skill
                </h2>
                <p>Enter your information below</p>
                {success && <p className="succeed-msg">{success}</p>}
                {errorMessage && <p className="error-msg">{errorMessage}</p>}
            </section>

            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Skill Name
                        </label>
                        <input
                            type="text"
                            className={errors.name ? "error" : "form-valid"}
                            name="name"
                            id="name"
                            placeholder="Enter your skill name"
                            onChange={onChange}
                        />
                        <p>{errors.name}</p>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            className="btn btn-block"
                            value="Add New Skill"
                        />
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AddSkillForm;
