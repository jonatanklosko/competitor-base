import React from 'react';
import { LinearProgress, Typography, Paper, Grid } from '@material-ui/core';
import { useQuery } from '../hooks/database';
import PageRankList from './PageRankList';

const query = `
  MATCH (p:Person)-[:CITIZEN_OF]->(c:Country)
  RETURN { person: p, country: c } AS personWithCountry
  ORDER BY p.pageRank DESC
  LIMIT 100
`;

function PageRank() {
  const { data, loading, error } = useQuery(query);

  if (loading) return <LinearProgress />;
  if (error) return error.message;

  const peopleWithCountry = data.map((record) => record.personWithCountry);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h5" gutterBottom>
          Page rank
        </Typography>
        <Typography variant="subtitle1">
          This ranking presents the most important community members. Such
          information may be interesiting for companies willing to sign a
          sponsorship agreement with competitors in order to promote their
          brand. The relevant link between competitors here is whether they have
          been to the same competition.
        </Typography>
      </Grid>
      <Grid item>
        <Paper>
          <PageRankList peopleWithCountry={peopleWithCountry} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default PageRank;
