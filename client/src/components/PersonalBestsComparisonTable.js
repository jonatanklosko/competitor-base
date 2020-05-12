import React, { Fragment } from 'react';
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@material-ui/core';
import { events } from '../lib/events';
import { formatAttemptResult } from '../lib/formatters';

function PersonalBestsPair({ personalBest1, personalBest2, wcaEventId }) {
  const best1 = personalBest1 && personalBest1.properties.best.toInt();
  const best2 = personalBest2 && personalBest2.properties.best.toInt();
  const isBetter1 = best1 && (!best2 || best1 < best2);
  const isBetter2 = best2 && (!best1 || best2 < best1);
  return (
    <Fragment>
      <TableCell
        align="center"
        style={{ fontWeight: isBetter1 ? 600 : undefined }}
      >
        {best1 ? formatAttemptResult(best1, wcaEventId) : '-'}
      </TableCell>
      <TableCell
        align="center"
        style={{ fontWeight: isBetter2 ? 600 : undefined }}
      >
        {best2 ? formatAttemptResult(best2, wcaEventId) : '-'}
      </TableCell>
    </Fragment>
  );
}

function PersonalBestsComparisonTable({
  person1,
  person2,
  personalBests1,
  personalBests2,
}) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell colSpan={2}></TableCell>
          <TableCell align="center">{person1.properties.name}</TableCell>
          <TableCell align="center">{person2.properties.name}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {events.map((wcaEvent) => {
          const { personalBest: singlePb1 } =
            personalBests1.find(
              ({ event, personalBest }) =>
                wcaEvent.wcaId === event.properties.wcaId &&
                personalBest.properties.type === 'single'
            ) || {};
          const { personalBest: averagePb1 } =
            personalBests1.find(
              ({ event, personalBest }) =>
                wcaEvent.wcaId === event.properties.wcaId &&
                personalBest.properties.type === 'average'
            ) || {};
          const { personalBest: singlePb2 } =
            personalBests2.find(
              ({ event, personalBest }) =>
                wcaEvent.wcaId === event.properties.wcaId &&
                personalBest.properties.type === 'single'
            ) || {};
          const { personalBest: averagePb2 } =
            personalBests2.find(
              ({ event, personalBest }) =>
                wcaEvent.wcaId === event.properties.wcaId &&
                personalBest.properties.type === 'average'
            ) || {};
          return (
            <Fragment>
              <TableRow>
                <TableCell rowSpan={2}>{wcaEvent.name}</TableCell>
                <TableCell>Single</TableCell>
                <PersonalBestsPair
                  personalBest1={singlePb1}
                  personalBest2={singlePb2}
                  wcaEventId={wcaEvent.wcaId}
                />
              </TableRow>
              <TableRow>
                <TableCell>Average</TableCell>
                <PersonalBestsPair
                  personalBest1={averagePb1}
                  personalBest2={averagePb2}
                  wcaEventId={wcaEvent.wcaId}
                />
              </TableRow>
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
}
export default PersonalBestsComparisonTable;
