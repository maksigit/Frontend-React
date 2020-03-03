import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../middleware/i18n'; // Для мультиязычных проектов
import './main.scss';

const MainRoutes = lazy(() => import('../pages'));


const App = () => {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route component={MainRoutes} />
      </Switch>
    </Suspense>
  );
};

export default App;
