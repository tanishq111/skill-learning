import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormField from "../Components/FormFields.jsx";

import { useContext } from "react";
import { authContext } from "../context/authContext.jsx";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useContext(authContext);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
 
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target; // "name", "email", "password", or "confirmPassword"
    console.log(values);
    setValues((current) => ({ ...current, [name]: value }));
    setPasswordError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    register();
    setIsSubmitting(false);

    navigate("/courses", { replace: true });
  };

  return (
    <section className="form-page" aria-labelledby="register-title">
      <div className="form-page__intro">
        <p className="eyebrow">Start learning</p>
        <h1 id="register-title">Create account</h1>
        <p>Create your profile and begin learning.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField
          id="register-name"
          label="Full name"
          name="name"
          value={values.name}
          onChange={updateField}
          required
        />

        <FormField
          id="register-email"
          label="Email address"
          name="email"
          type="email"
          value={values.email}
          onChange={updateField}
          required
        />

        <FormField
          id="register-password"
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={updateField}
          minLength={8}
          required
        />

        <FormField
          id="register-confirm-password"
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={updateField}
          error={passwordError}
          required
        />

        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>

        <p>
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </section>
  );
};

export default RegisterPage;