import React from 'react';
import './Page404.scss';
import { withNaming } from '@bem-react/classname';

const cn = withNaming({ e: '__', m: '--' })('Page404');
const Page404 = () => {
  return (
    <div className={cn()}>
      <div className='wrapper'>
        <div className={cn('wrapper')}>
          <p className={cn('title')}>404</p>
          <p className={cn('desc')}>We couldn't find the page</p>
        </div>
      </div>
    </div>
  );
};

export default Page404;
