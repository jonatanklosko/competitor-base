import React, { Fragment } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Link as RouterLink, Redirect } from 'react-router-dom';
import Home from './Home';
import Person from './Person';
import Compare from './Compare';
import Competition from './Competition';
import PageRank from './PageRank';
import Records from './Records';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit',
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
          <Typography
            variant="h6"
            className={classes.title}
            component={RouterLink}
            to="/"
          >
            Competitor Base
          </Typography>
          <Button color="inherit" component={RouterLink} to="/compare">
            Compare
          </Button>
          <Button color="inherit" component={RouterLink} to="/page-rank">
            Page rank
          </Button>
          <Button color="inherit" component={RouterLink} to="/records">
            Records
          </Button>
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
          <Route exact path="/competitions/:wcaId">
            <Competition />
          </Route>
          <Route exact path="/compare">
            <Compare />
          </Route>
          <Route exact path="/page-rank">
            <PageRank />
          </Route>
          <Route exact path="/records">
            <Records />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Fragment>
  );
}

export default Navigation;
