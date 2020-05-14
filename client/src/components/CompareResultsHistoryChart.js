import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Typography } from '@material-ui/core';
import { formatAttemptResult } from '../lib/formatters';
import { unique, range } from '../lib/utils';

function CompareResultsHistoryChart({ peopleWithResultsData, eventWcaId }) {
  const series = peopleWithResultsData.map(({ person, resultsData }) => {
    return {
      name: person.properties.name,
      data: resultsData
        .filter(({ result }) => result.properties.average.toInt() > 0)
        .filter(({ round }) => round.properties.roundNumber.toInt() === 1)
        .map(({ result, competition }) => {
          const { day, month, year } = competition.properties.startDate;
          const date = new Date(year.toInt(), month.toInt(), day.toInt());
          return {
            dateValue: date.getTime(),
            average: result.properties.average.toInt(),
          };
        }),
    };
  });

  if (series.every(({ data }) => data.length === 0)) {
    return (
      <Typography variant="subtitle1" align="center">
        Nothing to show
      </Typography>
    );
  }

  const years = unique(
    series.flatMap(({ data }) =>
      data.map(({ dateValue }) => new Date(dateValue).getFullYear())
    )
  );
  const tickYears = range(Math.min(...years), Math.max(...years));

  const colors = ['#8884d8', '#82ca9d'];

  return (
    <ScatterChart width={1000} height={500}>
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis
        type="number"
        dataKey="dateValue"
        domain={['dataMin', 'dataMax']}
        tickFormatter={(dateValue) => new Date(dateValue).getFullYear()}
        ticks={tickYears.map((year) => new Date(year, 0, 1).getTime())}
      />
      <YAxis
        dataKey="average"
        tickFormatter={(value) => formatAttemptResult(value, eventWcaId)}
        domain={[
          (dataMin) => Math.floor(dataMin / 1000) * 1000,
          (dataMax) => Math.ceil(dataMax / 100) * 100,
        ]}
      />
      <Legend verticalAlign="top" height={36} />
      {series.map(({ name, data }, index) => (
        <Scatter
          key={name}
          line
          data={data}
          dataKey="average"
          name={name}
          fill={colors[index]}
        />
      ))}
    </ScatterChart>
  );
}

export default CompareResultsHistoryChart;
