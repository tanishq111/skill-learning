const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }
  if(password.length > 0 && password.length < 8) {
    errors.password = "Password must contain at least 8 characters.";
  }

  return errors;
};

export const validateRegistration = ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  const errors = validateLogin({ email, password });

  if (name.trim().length < 2) {
    errors.name = "Name must contain at least 2 characters.";
  }

  if (password.length > 0 && password.length < 8) {
    errors.password = "Password must contain at least 8 characters.";
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords must match.";
  }

  return errors;
};

export const validateProfile = ({ name, headline }) => {
  const errors = {};

  if (name.trim().length < 2) {
    errors.name = "Name must contain at least 2 characters.";
  }

  if (headline.trim().length < 4) {
    errors.headline = "Headline must contain at least 4 characters.";
  }

  return errors;
};
