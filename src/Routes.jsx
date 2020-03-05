import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { lazyLoad, retry } from 'utils';
import Page404 from 'components/Page404';

const componentLazyImport = container => {
  return lazyLoad(lazy(() => retry(() => import(`./containers/${container}`))));
};

const ROUTES = [
  { path: '/', component: componentLazyImport('Home') },
  { path: '/register', component: componentLazyImport('Registration') }
];

const Routes = () => (
  <Switch>
    {ROUTES.map(({ path, component, type }, i) => {
      return <Route exact path={path} component={component} key={i} />;
    })}
    <Route component={Page404} />
  </Switch>
);

export default Routes;
