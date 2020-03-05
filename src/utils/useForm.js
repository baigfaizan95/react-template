import { useState, useEffect } from 'react';

function useForm(validate) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(Object.keys(errors).length === 0);
  }, [errors]);

  useEffect(() => {
    const _errors = validate(values);
    if (JSON.stringify(errors) !== JSON.stringify(_errors)) {
      setErrors(_errors);
    }
  }, [values, errors, validate]);

  const onChange = event => {
    event.persist();

    const _values = {
      ...values,
      [event.target.name]: event.target.value
    };
    if (JSON.stringify(values) !== JSON.stringify(_values)) {
      setValues(_values);
    }

    const _errors = validate(_values);
    if (JSON.stringify(errors) !== JSON.stringify(_errors)) {
      setErrors(_errors);
    }
  };

  const submit = () => {
    const _errors = validate(values);
    if (JSON.stringify(errors) !== JSON.stringify(_errors)) {
      setErrors(_errors);
    }
  };

  return {
    values,
    errors,
    valid,
    onChange,
    submit,
    setErrors,
    setValues
  };
}

export default useForm;
