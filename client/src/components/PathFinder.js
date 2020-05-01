import React, { useState } from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Search from './Search';
import Path from './Path';

const useStyles = makeStyles((theme) => ({
  divider: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function PathFinder() {
  const classes = useStyles();
  const [person1, setPerson1] = useState(null);
  const [person2, setPerson2] = useState(null);

  const showPath =
    person1 && person2 && person1.properties.wcaId !== person2.properties.wcaId;

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <Typography variant="h5" gutterBottom align="center">
          Find a connection between people
        </Typography>
        <Typography align="center">
          This looks up the shortest link between competitors.
        </Typography>
      </Grid>
      <Grid item container spacing={2} justify="center">
        <Grid item xs md={3}>
          <Search onChange={(node) => setPerson1(node)} />
        </Grid>
        <Grid item xs md={3}>
          <Search onChange={(node) => setPerson2(node)} />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid item>
        {showPath && (
          <Path
            wcaId1={person1.properties.wcaId}
            wcaId2={person2.properties.wcaId}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default PathFinder;
