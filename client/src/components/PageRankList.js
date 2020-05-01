import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { nodeUrl } from '../lib/utils';
import FlagIcon from './FlagIcon';

function PageRankList({ peopleWithCountry }) {
  return (
    <List>
      {peopleWithCountry.map(({ person, country }) => (
        <ListItem
          key={person.properties.wcaId}
          button
          component={RouterLink}
          to={nodeUrl(person)}
        >
          <ListItemIcon>
            <FlagIcon code={country.properties.iso2.toLowerCase()} size="lg" />
          </ListItemIcon>
          <ListItemText
            primary={person.properties.name}
            secondary={`
              Page rank score: ${person.properties.pageRank.toFixed(2)}
            `}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default PageRankList;
