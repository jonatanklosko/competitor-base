import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ListItem, List, ListItemText } from '@material-ui/core';
import { nodeUrl } from '../lib/utils';

function PersonCompetitionList({ competitions }) {
  return (
    <List style={{ maxHeight: 400, overflowY: 'auto' }}>
      {competitions.map((competition) => (
        <ListItem
          key={competition.properties.wcaId}
          button
          component={RouterLink}
          to={nodeUrl(competition)}
        >
          <ListItemText primary={competition.properties.name} />
        </ListItem>
      ))}
    </List>
  );
}

export default PersonCompetitionList;
