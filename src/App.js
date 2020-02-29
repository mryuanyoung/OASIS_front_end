import React from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import HomePage from './HomePage/index';
import PaperSearchPage from './PaperSearchPage/index';



function App() {
  return (
    <Router>
      <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route exact path='/paper' component={PaperSearchPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
