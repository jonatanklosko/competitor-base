import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useQuery } from '../hooks/database';
import { PieChart, Pie, Tooltip } from 'recharts';

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

  const plotData = data.map(({ country, count }) => ({
    name: country.properties.name,
    count: count.toInt(),
  }));

  return (
    <PieChart width={400} height={400}>
      <Tooltip />
      <Pie
        data={plotData}
        dataKey="count"
        nameKey="name"
        fill="#82ca9d"
        label
      />
    </PieChart>
  );
}

export default VisitedCountriesPieChart;
