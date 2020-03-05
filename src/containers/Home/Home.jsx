import React from 'react';
import './Home.scss';
import { withNaming } from '@bem-react/classname';
import Button from 'components/Button/Button';
import { withRouter } from 'react-router-dom';

const cn = withNaming({ e: '__', m: '--' })('Home');
const Home = ({ history }) => {
  const gotoRegistration = () => {
    history.push('/register');
  };
  return (
    <div className={cn()}>
      <div className='wrapper'>
        <div className={cn('wrapper')}>
          <div className={cn('data-wrapper')}>
            <div className={cn('data')}>
              <p className={cn('title')}>Create, your way</p>
              <p className={cn('desc')}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
              <Button onClick={gotoRegistration} size='big'>
                Get Started
              </Button>
            </div>
          </div>
          <div className={cn('img-wrapper')}>
            <img
              src='https://airtable.com/images/home/shapes_collaboration.png'
              alt='illustration'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
