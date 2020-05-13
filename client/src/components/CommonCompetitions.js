import React from 'react';
import { LinearProgress } from '@material-ui/core';
import { useQuery } from '../hooks/database';
import { Link as RouterLink } from 'react-router-dom';
import {
  ListItem,
  List,
  ListItemText,
  Paper,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import { nodeUrl } from '../lib/utils';
import FlagIcon from './FlagIcon';

const query = `
  MATCH
    (p1:Person { wcaId: $wcaId1 }),
    (p2:Person { wcaId: $wcaId2 }),
    (p1)-[:COMPETED_IN]->(c:Competition),
    (p2)-[:COMPETED_IN]->(c),
    (c)-[:ORGANIZED_IN]->(country: Country)
  WITH c, country
  ORDER BY c.startDate DESC
  RETURN c AS competition, country AS country
`;

function CommonCompetitions({ wcaId1, wcaId2 }) {
  const { data, loading, error } = useQuery(query, { wcaId1, wcaId2 });

  if (loading) return <LinearProgress />;
  if (error) return error.message;

  if (data.length === 0) {
    return (
      <Typography variant="subtitle1">No competitions in common</Typography>
    );
  }

  return (
    <Paper>
      <List>
        {data.map(({ competition, country }) => (
          <ListItem
            key={competition.properties.wcaId}
            button
            component={RouterLink}
            to={nodeUrl(competition)}
          >
            <ListItemIcon>
              <FlagIcon
                code={country.properties.iso2.toLowerCase()}
                size="lg"
              />
            </ListItemIcon>
            <ListItemText primary={competition.properties.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
export default CommonCompetitions;
