import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {Spin} from 'antd';
import HomePage from './HomePage/index';

import Listen from './Components/ListenUrlChange/index';
import Drag from './Components/Drag/index';
const PaperSearchPage = lazy(() => import('./PaperSearchPage/index'));

function App() {
  return (
    <Router>
      <Listen></Listen>
      <Drag></Drag>
      <Suspense fallback={<Spin></Spin>}>
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/:method' component={PaperSearchPage}></Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
