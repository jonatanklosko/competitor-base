import React from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { events } from '../lib/events';

function EventSelect({ value, onChange }) {
  return (
    <Select
      variant="outlined"
      style={{ minWidth: 300 }}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {events.map((event) => (
        <MenuItem key={event.wcaId} value={event.wcaId}>
          {event.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default EventSelect;
