import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useQuery } from '../hooks/database';
import { PieChart, Pie, Tooltip } from 'recharts';
import { getColor } from '../lib/colors';

const query = `
  MATCH
    (p:Person { wcaId: $wcaId }),
    (p)-[:COMPETED_IN]->(c:Competition),
    (c)-[:ORGANIZED_IN]->(country:Country)
  RETURN country, COUNT(*) AS count
`;

function VisitedCountriesPieChart({ personWcaId }) {
  const { data, loading, error } = useQuery(query, { wcaId: personWcaId });

  if (loading) return <CircularProgress />;
  if (error) return error.message;

  const plotData = data.map(({ country, count }, index) => ({
    name: country.properties.name,
    count: count.toInt(),
    fill: getColor(index),
  }));

  return (
    <PieChart width={400} height={400}>
      <Tooltip />
      <Pie data={plotData} dataKey="count" nameKey="name" fill="fill" label />
    </PieChart>
  );
}

export default VisitedCountriesPieChart;
