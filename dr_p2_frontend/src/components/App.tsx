import React from 'react';
import { BrowserRouter as Router } from "react-router-dom"

import {ThemeProvider} from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles';
//import { responsiveFontSizes } from '@material-ui/core/styles';

import RedirectToNewProblem from './RedirectToNewProblem'
import NewProblemPage from './NewProblemPage';
import PrivateRoute from './PrivateRoute'
import DiscussionPage from './DiscussionPage'

//import logo from './logo.svg';
import './App.css';

const theme = createMuiTheme();
//theme = responsiveFontSizes(theme);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router >
          <div>
            <PrivateRoute exact path="/" component={RedirectToNewProblem} />
            <PrivateRoute exact path="/problem" component={NewProblemPage} />
            <PrivateRoute path="/problem/:id" component={DiscussionPage} />
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
