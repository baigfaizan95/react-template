const validateEmail = value => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(value)) {
    return false;
  }
  return true;
};

const validatePassword = value => {
  const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (!pattern.test(value)) {
    return false;
  }
  return true;
};

const validateName = value => {
  const pattern = /^(?=.{3,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
  if (!pattern.test(value)) {
    return false;
  }
  return true;
};

const exists = value => {
  if (!value || !value.trim()) {
    return false;
  }
  return true;
};

export default {
  exists,
  validateEmail,
  validatePassword,
  validateName
};
