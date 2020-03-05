import Select from 'react-select';
import React from 'react';
import './CustomSelect.scss';

const SelectDropdown = ({ label, className, ...props }) => {
  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <Select {...props} />
    </div>
  );
};

export default SelectDropdown;
