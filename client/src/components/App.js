import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from './Navigation';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navigation />
    </Router>
  );
}

export default App;
