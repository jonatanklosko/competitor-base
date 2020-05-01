import React from 'react';
import { useHistory } from 'react-router-dom';
import Search from './Search';
import { nodeUrl } from '../lib/utils';
import { Typography, Grid } from '@material-ui/core';

function Home() {
  const history = useHistory();

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="h5">Welcome to Competitor Base!</Typography>
      </Grid>
      <Grid item>
        <Typography>
          You can search for any competition or competitor below
        </Typography>
      </Grid>
      <Grid item style={{ width: 400 }}>
        <Search onChange={(node) => history.push(nodeUrl(node))} />
      </Grid>
    </Grid>
  );
}

export default Home;
