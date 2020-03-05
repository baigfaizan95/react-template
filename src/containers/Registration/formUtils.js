import { validator } from 'utils';
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';

export function validateForm(values) {
  const error = {};
  const { firstName, lastName, email, password } = values;

  if (!validator.exists(firstName)) {
    error.firstName = 'Please enter first name';
  } else if (!validator.validateName(firstName)) {
    error.firstName = 'Please enter a valid first name';
  }

  if (!validator.exists(lastName)) {
    error.lastName = 'Please enter last name';
  } else if (!validator.validateName(lastName)) {
    error.lastName = 'Please enter a valid last name';
  }

  if (!validator.exists(email)) {
    error.email = 'Please enter email';
  } else if (!validator.validateEmail(email)) {
    error.email = 'Please enter a valid email';
  }

  if (!validator.exists(password)) {
    error.password = 'Please enter password';
  } else if (!validator.validatePassword(password)) {
    error.password =
      'Password must be 8 characters long with atleast 1 uppercase, number and a special character';
  }

  return error;
}

export const style = {
  control: (provided, state) => {
    return {
      ...provided,
      minHeight: '40px',
      backgroundColor: state.isFocused ? '#fff' : '#f5f5f5',
      '&:hover': { borderColor: '#dedede' }, // border style on hover
      border: '1px solid #dedede', // default border color
      boxShadow: 'none' // no box-shadow
    };
  },
  option: (styles, { isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#04b96a' : styles.backgroundColor
    };
  }
};

export const onContactChange = phone => {
  let error = '';
  let flag = true;
  let value = '';
  if (!phone) {
    flag = false;
  } else {
    const parsedNum = parsePhoneNumber(phone) || {};
    if (!parsedNum || !isValidPhoneNumber(phone)) {
      flag = false;
    }
    value = {
      countryCode: parsedNum.countryCallingCode,
      nationalNumber: parsedNum.nationalNumber
    };
  }
  if (!flag) {
    error = 'Please enter a valid phone number';
  }
  return [flag, value, error];
};
