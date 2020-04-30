import React from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress, Typography } from '@material-ui/core';
import { useQuery } from '../hooks/database';

const query = `
  MATCH
    (p:Person { wcaId: $wcaId }),
    (p)-[:COMPETED_IN]->(c:Competition),
    (p)-[pb:PERSONAL_BEST]->(e:Event)
  RETURN
    p AS person,
    collect(DISTINCT c) AS competitions,
    collect(DISTINCT { personalBest: pb, event: e }) AS personalBests
`;

function Person() {
  const { wcaId } = useParams();
  const { data, loading } = useQuery(query, { wcaId });

  if (loading) return <LinearProgress />;

  const [{ person, competitions, personalBests }] = data;

  return (
    <div>
      <Typography variant="h5">{person.properties.name}</Typography>
      <div>Competitions: {competitions.length}</div>
    </div>
  );
}

export default Person;
