import React, { useState, useEffect } from 'react';
import './Input.scss';
import { withNaming } from '@bem-react/classname';
import cs from 'classnames';

const cn = withNaming({ e: '__', m: '--' })('Input');

const Input = React.forwardRef((props, ref) => {
  const [type, setType] = useState('text');
  const [touched, setTouched] = useState(false);

  const {
    submitted,
    label,
    className,
    value,
    onChange,
    onFocus,
    onBlur,
    error,
    disabled,
    placeholder,
    children,
    name,
    icon,
    required,
    ...otherProps
  } = props;

  useEffect(() => setType(otherProps.type || 'text'), [otherProps.type]);

  const togglePassword = () => {
    setType(type === 'text' ? 'password' : 'text');
  };

  const _onChange = event => {
    onChange && onChange(event);
  };

  const _onFocus = event => {
    onFocus && onFocus(event);
  };

  const _onBlur = event => {
    setTouched(true);
    onBlur && onBlur(event);
  };

  const _value = (children && children.toString()) || value;

  const meta = { password: otherProps.type === 'password' };

  return (
    <label
      className={`Input ${
        (error && touched) || (submitted && error) ? cn('error') : ''
      }`}
    >
      {label && (
        <span className={cn('title')}>
          {label} {required && <span className={cn('required')}>*</span>}
        </span>
      )}
      <div className={cn('input')}>
        {icon && <div className={cn('meta')}>{icon}</div>}
        <input
          {...otherProps}
          ref={ref}
          type={type}
          value={_value}
          onChange={_onChange}
          onFocus={_onFocus}
          onBlur={_onBlur}
          placeholder={placeholder}
          disabled={disabled}
          name={name}
          className={cs(otherProps.className, { 'Input__input-icon': icon })}
        />
        <div
          className={`${cn('input-border')} ${
            (error && touched) || (submitted && error) ? cn('error-border') : ''
          }`}
        />
        {meta.password && (
          <div className={cn('meta')}>
            {meta.password && (
              <img
                alt='icon'
                onClick={togglePassword}
                className='eye'
                src={
                  type === 'password'
                    ? 'https://web-assets.qeemtee.com/component/eye_open.svg'
                    : 'https://web-assets.qeemtee.com/component/eye_close.svg'
                }
              />
            )}
          </div>
        )}
      </div>
      {(error && touched) || (submitted && error) ? (
        <p className={cn('error-message')}>{error}</p>
      ) : (
        ''
      )}
    </label>
  );
});

export default Input;
