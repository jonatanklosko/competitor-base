import React, { useState, useEffect, Fragment } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Grid, Typography, Divider, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Search from './Search';
import Path from './Path';
import ComparePersonalBests from './ComparePersonalBests';
import CompareResultsHistory from './CompareResultsHistory';
import CommonCompetitions from './CommonCompetitions';

const useStyles = makeStyles((theme) => ({
  divider: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  tabs: {
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
  const [tab, setTab] = useState('path');

  const peopleSelected = wcaId1 && wcaId2 && wcaId1 !== wcaId2;

  useEffect(() => {
    if (!wcaId1 || !wcaId2) return;
    history.push({
      pathname: '/compare',
      search: `?wcaId1=${wcaId1}&wcaId2=${wcaId2}`,
    });
  }, [wcaId1, wcaId2, history]);

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <Typography variant="h5" gutterBottom align="center">
          Find a connection between people
        </Typography>
        <Typography align="center">
          See how people are related and compare their results.
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
      {peopleSelected && (
        <Fragment>
          <Tabs
            value={tab}
            className={classes.tabs}
            onChange={(event, value) => setTab(value)}
          >
            <Tab label="Path" value="path" />
            <Tab label="Compare PBs" value="compare-pbs" />
            <Tab label="Results history" value="results-history" />
            <Tab label="Common competitions" value="common-competitions" />
          </Tabs>
          <Grid item>
            {tab === 'path' && <Path wcaId1={wcaId1} wcaId2={wcaId2} />}
            {tab === 'compare-pbs' && (
              <ComparePersonalBests wcaId1={wcaId1} wcaId2={wcaId2} />
            )}
            {tab === 'results-history' && (
              <CompareResultsHistory wcaId1={wcaId1} wcaId2={wcaId2} />
            )}
            {tab === 'common-competitions' && (
              <CommonCompetitions wcaId1={wcaId1} wcaId2={wcaId2} />
            )}
          </Grid>
        </Fragment>
      )}
    </Grid>
  );
}

export default PathFinder;
