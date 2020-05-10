import React from 'react';
import { LinearProgress, Grid, Typography } from '@material-ui/core';
import { useQuery } from '../hooks/database';
import RecordsTable from './RecordsTable';

const query = `
  MATCH
    (e:Event),
    (e)<-[record:PERSONAL_BEST { worldRank: 1 }]-(p:Person),
    (p)-[:CITIZEN_OF]->(c:Country)
  RETURN
    e AS event,
    collect({ record: record, person: p, country: c }) AS recordsWithPerson
`;

function Records() {
  const { data, loading, error } = useQuery(query);

  if (loading) return <LinearProgress />;
  if (error) return error.message;

  console.log(data);

  return (
    <Grid container direction="column" spacing={2}>
      {data.map(({ event, recordsWithPerson }) => (
        <Grid item key={event.identity}>
          <Typography variant="h5" gutterBottom>
            {event.properties.name}
          </Typography>
          <RecordsTable event={event} recordsWithPerson={recordsWithPerson} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Records;
