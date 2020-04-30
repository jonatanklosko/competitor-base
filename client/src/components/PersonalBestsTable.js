import React from 'react';
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { formatAttemptResult } from '../lib/formatters';
import { events } from '../lib/events';

const useStyles = makeStyles((theme) => ({
  best: {
    fontWeight: 600,
  },
  countryRank: {
    opacity: 0.6,
  },
  continentRank: {
    opacity: 0.8,
  },
}));

function PersonalBestsTable({ personalBests }) {
  const classes = useStyles();

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Event</TableCell>
          <TableCell align="right">NR</TableCell>
          <TableCell align="right">CR</TableCell>
          <TableCell align="right">WR</TableCell>
          <TableCell align="right">Best</TableCell>
          <TableCell align="right">Average</TableCell>
          <TableCell align="right">WR</TableCell>
          <TableCell align="right">CR</TableCell>
          <TableCell align="right">NR</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {events.map((event) => {
          const singlePb = personalBests.find(
            (pb) =>
              pb.event.properties.wcaId === event.wcaId &&
              pb.personalBest.properties.type === 'single'
          );
          if (!singlePb) return null;
          const averagePb = personalBests.find(
            (pb) =>
              pb.event.properties.wcaId === event.wcaId &&
              pb.personalBest.properties.type === 'average'
          );
          const singlePbProps = singlePb.personalBest.properties;
          const averagePbProps = averagePb && averagePb.personalBest.properties;
          return (
            <TableRow key={event.wcaId} hover>
              <TableCell>{event.name}</TableCell>
              <TableCell align="right" className={classes.countryRank}>
                {singlePbProps.countryRank.toInt()}
              </TableCell>
              <TableCell align="right" className={classes.continentRank}>
                {singlePbProps.continentRank.toInt()}
              </TableCell>
              <TableCell align="right">
                {singlePbProps.worldRank.toInt()}
              </TableCell>
              <TableCell align="right" className={classes.best}>
                {formatAttemptResult(singlePbProps.best.toInt(), event.wcaId)}
              </TableCell>
              <TableCell align="right" className={classes.best}>
                {averagePb &&
                  formatAttemptResult(averagePbProps.best.toInt(), event.wcaId)}
              </TableCell>
              <TableCell align="right">
                {averagePb && averagePbProps.worldRank.toInt()}
              </TableCell>
              <TableCell align="right" className={classes.continentRank}>
                {averagePb && averagePbProps.continentRank.toInt()}
              </TableCell>
              <TableCell align="right" className={classes.countryRank}>
                {averagePb && averagePbProps.countryRank.toInt()}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default PersonalBestsTable;
