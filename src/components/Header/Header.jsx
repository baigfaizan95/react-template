import React from 'react';
import './Header.scss';
import { withNaming } from '@bem-react/classname';
import { Link } from 'react-router-dom';
const cn = withNaming({ e: '__', m: '--' })('Header');

const Header = () => {
  return (
    <div className={cn()}>
      <div className='wrapper'>
        <Link to='/'>
          <p className={cn('logo')}>LOGO</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
