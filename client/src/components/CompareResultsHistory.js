import React, { useState } from 'react';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { useQuery } from '../hooks/database';
import EventIdSelect from './EventIdSelect';
import CompareResultsHistoryChart from './CompareResultsHistoryChart';

const query = `
  MATCH
    (p:Person { wcaId: $wcaId1 }),
    (p)-[result:RESULT_IN]->(round:Round)-[:OF_EVENT]->(e:Event { wcaId: $eventWcaId }),
    (round)-[:HELD_IN]->(c:Competition)
  WITH p, result, c, round
  ORDER BY c.startDate, round.roundNumber
  RETURN
    p AS person,
    collect(DISTINCT { result: result, competition: c, round: round }) AS resultsData
  UNION ALL
  MATCH
    (p:Person { wcaId: $wcaId2 }),
    (p)-[result:RESULT_IN]->(round:Round)-[:OF_EVENT]->(e:Event { wcaId: $eventWcaId }),
    (round)-[:HELD_IN]->(c:Competition)
  WITH p, result, c, round
  ORDER BY c.startDate, round.roundNumber
  RETURN
    p AS person,
    collect(DISTINCT { result: result, competition: c, round: round }) AS resultsData
`;

function CompareResultsHistory({ wcaId1, wcaId2 }) {
  const [eventWcaId, setEventWcaId] = useState('333');
  const { data, loading, error } = useQuery(query, {
    wcaId1,
    wcaId2,
    eventWcaId,
  });

  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <EventIdSelect value={eventWcaId} onChange={setEventWcaId} />
      </Grid>
      <Grid item>
        {loading && <CircularProgress />}
        {error && error.message}
      </Grid>
      {data && (
        <Grid item>
          <Typography variant="h6" gutterBottom align="center">
            Averages history (first rounds only)
          </Typography>
          <CompareResultsHistoryChart
            peopleWithResultsData={data}
            eventWcaId={eventWcaId}
          />
        </Grid>
      )}
    </Grid>
  );
}
export default CompareResultsHistory;
