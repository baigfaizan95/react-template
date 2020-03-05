import React from 'react';
import './Loader.scss';
import { withNaming } from '@bem-react/classname';
import Spinner from 'assets/svg/spinner.svg';

const cn = withNaming({ e: '__', m: '--' })('Loader');

const Loader = () => {
  return (
    <div className={cn()}>
      <img src={Spinner} alt='spinner' />
    </div>
  );
};

export default Loader;
