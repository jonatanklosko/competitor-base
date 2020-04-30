import React, { Fragment } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Person from './Person';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  main: {
    padding: theme.spacing(2),
  },
}));

function Navigation() {
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Competitor Base
          </Typography>
          <Button color="inherit">Page 1</Button>
          <Button color="inherit">Page 2</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.main}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/persons/:wcaId">
            <Person />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Navigation;
