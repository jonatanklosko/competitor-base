import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
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

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [wcaId1, setWcaId1] = useState(searchParams.get('wcaId1') || null);
  const [wcaId2, setWcaId2] = useState(searchParams.get('wcaId2') || null);

  const showPath = wcaId1 && wcaId2 && wcaId1 !== wcaId2;

  useEffect(() => {
    if (!wcaId1 || !wcaId2) return;
    history.push({
      pathname: '/path-finder',
      search: `?wcaId1=${wcaId1}&wcaId2=${wcaId2}`,
    });
  }, [wcaId1, wcaId2]);

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
          <Search
            onChange={(node) => setWcaId1(node && node.properties.wcaId)}
            label="Person"
          />
        </Grid>
        <Grid item xs md={3}>
          <Search
            onChange={(node) => setWcaId2(node && node.properties.wcaId)}
            label="Person"
          />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid item>{showPath && <Path wcaId1={wcaId1} wcaId2={wcaId2} />}</Grid>
    </Grid>
  );
}

export default PathFinder;
