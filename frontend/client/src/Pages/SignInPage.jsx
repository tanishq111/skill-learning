import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import FormField from "../Components/FormFields.jsx";
import { useContext } from "react";
import { authContext } from "../context/authContext.jsx";
const SignInPage = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useContext(authContext);

  const [values, setValues] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const updateField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await signIn(values.email, values.password);
    setIsSubmitting(false);
    navigate(location.state?.from?.pathname || "/courses", {
      replace: true,
    });
  };

  return (
    <section className="form-page" aria-labelledby="sign-in-title">
      <div className="form-page__intro">
        <p className="eyebrow">Welcome back</p>
        <h1 id="sign-in-title">Sign in</h1>
        <p>Continue your courses and keep learning.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField
          id="login-email"
          label="Email address"
          name="email"
          type="email"
          value={values.email}
          onChange={updateField}
          required
        />

        <FormField
          id="login-password"
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={updateField}
          required
        />

        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        <p>
          New to SkillSpring? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </section>
  );
};

export default SignInPage;