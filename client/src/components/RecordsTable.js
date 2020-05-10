import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Link,
} from '@material-ui/core';
import FlagIcon from './FlagIcon';
import { formatAttemptResult } from '../lib/formatters';
import { nodeUrl } from '../lib/utils';

function RecordsTable({ event, recordsWithPerson }) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Country</TableCell>
          <TableCell align="right">Result</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {recordsWithPerson.map(({ person, record, country }) => (
          <TableRow key={record.identity}>
            <TableCell style={{ width: '10%' }}>
              {record.properties.type}
            </TableCell>
            <TableCell style={{ width: '15%' }}>
              <Link component={RouterLink} to={nodeUrl(person)}>
                {person.properties.name}
              </Link>
            </TableCell>
            <TableCell style={{ width: '15%' }}>
              <FlagIcon code={country.properties.iso2.toLowerCase()} />{' '}
              {country.properties.name}
            </TableCell>
            <TableCell align="right" style={{ width: '10%', fontWeight: 600 }}>
              {formatAttemptResult(
                record.properties.best.toInt(),
                event.properties.wcaId
              )}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
export default RecordsTable;
