import React, { useEffect } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import './PhoneNumber.scss';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '--' })('PhoneNumber');

const PhoneNumber = ({ onChange, hasContact, className, value, ...props }) => {
  const emitChange = phone => {
    onchange && onChange(phone);
  };

  useEffect(() => {
    const phoneInput = document.getElementsByClassName('PhoneInputInput')[0];
    const phoneWrapper = document.getElementsByClassName('PhoneNumber')[0];
    const toGrey = () => {
      phoneWrapper.style.backgroundColor = '#fff';
    };

    const toWhite = () => {
      phoneWrapper.style.backgroundColor = '#f5f5f5';
    };

    phoneInput.addEventListener('focus', toGrey);
    phoneInput.addEventListener('blur', toWhite);
    return () => {
      phoneInput.removeEventListener('focus', toGrey);
      phoneInput.removeEventListener('blur', toWhite);
    };
  }, []);

  return (
    <PhoneInput
      {...props}
      value={value}
      international={false}
      displayInitialValueAsLocalNumber={true}
      onChange={emitChange}
      className={cn('', { error: !hasContact })}
    />
  );
};

export default PhoneNumber;
