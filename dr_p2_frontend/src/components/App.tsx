import React from 'react';
import {
  BrowserRouter as Router,
//  Route,
//  Link,
//  RouteComponentProps
} from "react-router-dom";

import RedirectToNewProblem from './RedirectToNewProblem'
import NewProblemPage from './NewProblemPage';
import PrivateRoute from './PrivateRoute'
import DiscussionPage from './DiscussionPage'

//import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router >
        <div>
          <PrivateRoute exact path="/" component={RedirectToNewProblem} />
          <PrivateRoute exact path="/problem" component={NewProblemPage} />
          <PrivateRoute path="/problem/:id" component={DiscussionPage} />
        </div>
      </Router>
      {/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */}
    </div>
  );
}

export default App;
