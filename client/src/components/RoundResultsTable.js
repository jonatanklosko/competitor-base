import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Link,
  LinearProgress,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@material-ui/core';
import { useQuery } from '../hooks/database';
import { formatAttemptResult } from '../lib/formatters';
import { nodeUrl } from '../lib/utils';

const query = `
  MATCH
    (r:Round)<-[result:RESULT_IN]-(p:Person)
  WHERE id(r) = $roundId
  WITH result, p
  ORDER BY result.rank
  RETURN result, p AS person
`;

function RoundResultsTable({ round, event }) {
  const { data, loading, error } = useQuery(query, { roundId: round.identity });

  if (loading) return <LinearProgress />;
  if (error) return error.message;

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Name</TableCell>
          <TableCell colSpan={5}></TableCell>
          <TableCell align="right">Average</TableCell>
          <TableCell align="right">Best</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ result, person }) => (
          <TableRow key={result.identity}>
            <TableCell>{result.properties.rank.toInt()}</TableCell>
            <TableCell>
              <Link component={RouterLink} to={nodeUrl(person)}>
                {person.properties.name}
              </Link>
            </TableCell>
            {result.properties.attempts.map((attempt, index) => (
              <TableCell align="right" key={index}>
                {formatAttemptResult(attempt.toInt(), event.properties.wcaId)}
              </TableCell>
            ))}
            <TableCell align="right" style={{ fontWeight: 600 }}>
              {formatAttemptResult(
                result.properties.average.toInt(),
                event.properties.wcaId
              )}
            </TableCell>
            <TableCell align="right">
              {formatAttemptResult(
                result.properties.best.toInt(),
                event.properties.wcaId
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
export default RoundResultsTable;
