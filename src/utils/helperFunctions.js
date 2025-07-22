const validatePassword = password => {
  // At least 8 characters, 1 uppercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  return passwordRegex.test(password);
};

const validateEmail = email => {
  // Basic email pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export {validatePassword, validateEmail};
