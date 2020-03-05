import React, { forwardRef } from 'react';
import './Button.scss';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '--' })('Button');

const Button = forwardRef(
  (
    {
      children,
      type,
      disabled,
      color = 'primary',
      layout = 'solid ',
      size = 'normal',
      ...props
    },
    ref
  ) => {
    const classes = cn('', {
      color,
      layout,
      size
    });
    return (
      <button ref={ref} {...props} className={classes}>
        {children}
      </button>
    );
  }
);

export default Button;
