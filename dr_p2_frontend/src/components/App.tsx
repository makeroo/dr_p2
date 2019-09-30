import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps
} from "react-router-dom";
import WelcomePage from './WelcomePage';
import NewProblemPage from './NewProblemPage';
import PrivateRoute from '../utils/PrivateRoute'
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router >
        <div>
          <Route exact path="/" component={WelcomePage} />
          <Route exact path="/problem" component={NewProblemPage} />
          <PrivateRoute path="/test" component={NewProblemPage} />
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
