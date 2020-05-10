import React from 'react';
import { useParams } from 'react-router-dom';
import {
  LinearProgress,
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useQuery } from '../hooks/database';
import FlagIcon from './FlagIcon';
import RoundResultsTable from './RoundResultsTable';

const query = `
  MATCH
    (c:Competition { wcaId: $wcaId }),
    (c)-[organizedIn:ORGANIZED_IN]->(country:Country),
    (c)<-[:HELD_IN]-(r:Round),
    (r)-[:OF_EVENT]->(e:Event)
  WITH c, organizedIn, country, r, e
  ORDER BY e.name, r.roundNumber
  RETURN
    c AS competition,
    organizedIn AS organizedIn,
    country AS country,
    collect({ round: r, event: e }) AS roundsWithEvent
`;

function Competition() {
  const { wcaId } = useParams();
  const { data, loading, error } = useQuery(query, { wcaId });

  if (loading) return <LinearProgress />;
  if (error) return error.message;
  const [{ competition, organizedIn, country, roundsWithEvent }] = data;

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <FlagIcon code={country.properties.iso2.toLowerCase()} size="2x" />
          </Grid>
          <Grid item>
            <Typography variant="h5">{competition.properties.name}</Typography>
          </Grid>
        </Grid>
        <Typography variant="subtitle1">
          {country.properties.name}, {organizedIn.properties.city}
        </Typography>
      </Grid>
      <Grid item>
        {roundsWithEvent.map(({ round, event }) => (
          <ExpansionPanel
            key={round.identity}
            TransitionProps={{ mountOnEnter: true }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {event.properties.name}, Round{' '}
                {round.properties.roundNumber.toInt()}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <RoundResultsTable round={round} event={event} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </Grid>
    </Grid>
  );
}

export default Competition;
