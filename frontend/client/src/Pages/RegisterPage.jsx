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
    role: "",
  });
 
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target; // "name", "email", "password", or "confirmPassword"
    setValues((current) => ({ ...current, [name]: value }));
    setPasswordError("");
    setFormError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (values.password !== values.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    const res = await register({
      name: values.name,
      email: values.email,
      password: values.password,
      role: values.role,
    });

    setIsSubmitting(false);

    if (!res.ok) {
      setFormError(res.error);
      return;
    }

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

        <FormField
          id="role"
          label="Role"
          name="role"
          type="text"
          value={values.role}
          onChange={updateField}
          required
        />

        {formError ? (
          <p className="form-error" role="alert">
            {formError}
          </p>
        ) : null}

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