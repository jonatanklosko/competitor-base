import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useQuery } from '../hooks/database';
import { BarChart, Bar, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { getColor } from '../lib/colors';

const query = `
  MATCH
    (p:Person { wcaId: $wcaId }),
    (p)-[:COMPETED_IN]->(c:Competition)
  WITH p, c
  ORDER BY c.startDate.year
  RETURN c.startDate.year AS year, COUNT(*) AS count
`;

function CompetitionsByYearBarPlot({ personWcaId }) {
  const { data, loading, error } = useQuery(query, { wcaId: personWcaId });
  console.log(data);
  if (loading) return <CircularProgress />;
  if (error) return error.message;

  const plotData = data.map(({ year, count }, index) => ({
    year: year.toInt(),
    count: count.toInt(),
    fill: getColor(index),
  }));

  return (
    <BarChart width={700} height={400} data={plotData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis
        label={{ value: 'Competitions', angle: -90, position: 'center' }}
      />
      <Tooltip />
      <Bar dataKey="count" fill="fill" />
    </BarChart>
  );
}

export default CompetitionsByYearBarPlot;
