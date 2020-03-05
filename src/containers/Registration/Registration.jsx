import React, { useState, useEffect } from 'react';
import './Registration.scss';
import { withNaming } from '@bem-react/classname';
import Input from 'components/Input';
import Button from 'components/Button';
import FileUploader from 'components/FileUploader';
import PhoneNumber from 'components/PhoneNumber/PhoneNumber';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { API } from 'utils';
import Select from 'components/Select';
import { validateForm, style, onContactChange } from './formUtils';
import { useForm } from 'utils';
import get from 'lodash/get';
import Swal from 'sweetalert2';

const cn = withNaming({ e: '__', m: '--' })('Registration');

const Registration = () => {
  const [countries, setCountries] = useState([]);
  const { values, errors, valid, onChange, submit, setValues } = useForm(
    validateForm
  );
  const [submitted, setSubmit] = useState(false);

  useEffect(() => {
    API.getRequest('https://restcountries.eu/rest/v2/all').then(data =>
      setCountries(data)
    );
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    submit();
    setSubmit(true);
    if (valid) {
      Swal.fire('Registration successful', '', 'success');
    } else {
      Swal.fire(
        'Validation error',
        'Please complete the form',
        'error'
      ).then(data => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  };

  const onPhoneChange = phone => {
    const [, value] = onContactChange(phone);
    setValues({ ...values, phoneNumber: value });
  };

  const handleDobChange = dob => {
    setValues({ ...values, dob });
  };

  const setCountry = country => {
    setValues({ ...values, country });
  };

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <p className={cn('title')}>Register</p>
        <form onSubmit={onSubmit} className={cn('form')}>
          <Input
            label='First Name'
            value={values.firstName || ''}
            name='firstName'
            error={errors.firstName}
            onChange={onChange}
            type='text'
            submitted={submitted}
          />
          <Input
            label='Last Name'
            value={values.lastName || ''}
            name='lastName'
            error={errors.lastName}
            onChange={onChange}
            type='text'
            submitted={submitted}
          />
          <Input
            label='Email'
            value={values.email || ''}
            name='email'
            error={errors.email}
            onChange={onChange}
            type='email'
            submitted={submitted}
          />
          <Input
            label='Password'
            value={values.password || ''}
            name='password'
            error={errors.password}
            onChange={onChange}
            type='password'
            submitted={submitted}
          />
          <div className={cn('group')}>
            <label>Profile Picture</label>
            <FileUploader multi={false} type='image' />
          </div>
          <div className={cn('group')}>
            <label>Phone Number</label>
            <PhoneNumber
              onChange={onPhoneChange}
              value={
                get(values, 'phoneNumber.nationalNumber')
                  ? `+${values.phoneNumber.countryCode}${values.phoneNumber.nationalNumber}`
                  : ''
              }
              defaultCountry='US'
            />
          </div>
          <div className={cn('group')}>
            <label>Date of birth</label>
            <DatePicker
              maxDate={new Date()}
              selected={values.dob}
              onChange={handleDobChange}
              className={cn('datepicker')}
            />
          </div>
          <Select
            getOptionLabel={option => option.name}
            getOptionValue={option => option.name}
            options={countries}
            className={cn('group')}
            label='Nationality'
            styles={style}
            value={values.country}
            onChange={setCountry}
          />
          <div className={cn('button-wrapper')}>
            <Button size='big' type='submit'>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
