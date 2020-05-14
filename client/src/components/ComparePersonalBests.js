import React from 'react';
import { LinearProgress } from '@material-ui/core';
import { useQuery } from '../hooks/database';
import PersonalBestsComparisonTable from './PersonalBestsComparisonTable';

const query = `
  MATCH
    (p1:Person { wcaId: $wcaId1 }),
    (p2:Person { wcaId: $wcaId2 }),
    (p1)-[:CITIZEN_OF]->(c1:Country),
    (p2)-[:CITIZEN_OF]->(c2:Country),
    (p1)-[pb1:PERSONAL_BEST]->(e1:Event),
    (p2)-[pb2:PERSONAL_BEST]->(e2:Event)
  RETURN
    p1 AS person1,
    p2 AS person2,
    c1 AS country1,
    c2 AS country2,
    collect(DISTINCT { personalBest: pb1, event: e1 }) AS personalBests1,
    collect(DISTINCT { personalBest: pb2, event: e2 }) AS personalBests2
`;

function ComparePersonalBests({ wcaId1, wcaId2 }) {
  const { data, loading, error } = useQuery(query, { wcaId1, wcaId2 });

  if (loading) return <LinearProgress />;
  if (error) return error.message;

  const [{ person1, person2, personalBests1, personalBests2 }] = data;

  return (
    <div>
      <PersonalBestsComparisonTable
        person1={person1}
        person2={person2}
        personalBests1={personalBests1}
        personalBests2={personalBests2}
      />
    </div>
  );
}
export default ComparePersonalBests;
