import React from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress, Typography, Paper, Grid } from '@material-ui/core';
import { useQuery } from '../hooks/database';
import PersonalBestsTable from './PersonalBestsTable';
import PersonCompetitionList from './PersonCompetitionList';
import VisitedCountriesPieChart from './VisitedCountriesPieChart';
import EventsPieChart from './EventsPieChart';
import CompetitionsByYearBarPlot from './CompetitionsByYearBarPlot';

const query = `
  MATCH
    (p:Person { wcaId: $wcaId }),
    (p)-[:CITIZEN_OF]->(country:Country),
    (p)-[:COMPETED_IN]->(c:Competition),
    (p)-[pb:PERSONAL_BEST]->(e:Event)
  WITH p, country, c, pb, e
  ORDER BY c.startDate DESC
  RETURN
    p AS person,
    country AS country,
    collect(DISTINCT c) AS competitions,
    collect(DISTINCT { personalBest: pb, event: e }) AS personalBests
`;

function Person() {
  const { wcaId } = useParams();
  const { data, loading, error } = useQuery(query, { wcaId });

  if (loading) return <LinearProgress />;
  if (error) return error.message;

  const [{ person, country, competitions, personalBests }] = data;

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5" gutterBottom>
          {person.properties.name} ({country.properties.name})
        </Typography>
        <Typography variant="subtitle1">
          Competitions: {competitions.length}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" gutterBottom>
          Personal Records
        </Typography>
        <Paper>
          <PersonalBestsTable personalBests={personalBests} />
        </Paper>
      </Grid>
      <Grid
        item
        container
        spacing={2}
        justify="space-evenly"
        style={{ marginTop: 16, marginBottom: 16 }}
      >
        <Grid item>
          <Typography variant="h6" gutterBottom align="center">
            Visited countries
          </Typography>
          <VisitedCountriesPieChart personWcaId={wcaId} />
        </Grid>
        <Grid item>
          <Typography variant="h6" gutterBottom align="center">
            Events
          </Typography>
          <EventsPieChart personWcaId={wcaId} />
        </Grid>
        <Grid item>
          <Typography variant="h6" gutterBottom align="center">
            Competitions by year
          </Typography>
          <CompetitionsByYearBarPlot personWcaId={wcaId} />
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h6" gutterBottom>
          Competitions
        </Typography>
        <Paper>
          <PersonCompetitionList competitions={competitions} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Person;
