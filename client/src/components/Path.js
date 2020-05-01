import React, { Fragment } from 'react';
import { LinearProgress, Typography, Grid } from '@material-ui/core';
import { useQuery } from '../hooks/database';
import PathNode from './PathNode';

const query = `
  MATCH
    (p1:Person { wcaId: $wcaId1 }),
    (p2:Person { wcaId: $wcaId2 }),
    path = shortestPath((p1)-[:COMPETED_IN*]-(p2))
  RETURN nodes(path) AS nodes
`;

function Path({ wcaId1, wcaId2 }) {
  const { data, loading, error } = useQuery(query, { wcaId1, wcaId2 });

  if (loading) return <LinearProgress />;
  if (error) return error.message;

  const [{ nodes }] = data;
  const [first, ...rest] = nodes;

  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <PathNode node={first} />
      </Grid>
      {rest.map((node) => {
        const isCompetition = node.labels.includes('Competition');
        return (
          <Fragment key={node.properties.wcaId}>
            <Grid item>
              <Typography variant="subtitle2" color="textSecondary">
                {isCompetition ? 'Was at' : 'Together with'}
              </Typography>
            </Grid>
            <Grid item>
              <PathNode node={node} />
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
}

export default Path;
