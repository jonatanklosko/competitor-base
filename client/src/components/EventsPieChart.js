import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useQuery } from '../hooks/database';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
import { getColor } from '../lib/colors';

const query = `
  MATCH
    (p:Person { wcaId: $wcaId }),
    (p)-[:RESULT_IN]->(:Round)-[:OF_EVENT]->(event:Event)
  WITH event, COUNT(*) AS count
  ORDER BY count
  RETURN event, count
`;

function EventsPieChart({ personWcaId }) {
  const { data, loading, error } = useQuery(query, { wcaId: personWcaId });

  if (loading) return <CircularProgress />;
  if (error) return error.message;

  const plotData = data.map(({ event, count }, index) => ({
    name: event.properties.name,
    count: count.toInt(),
    fill: getColor(index),
  }));

  return (
    <RadialBarChart
      width={800}
      height={450}
      innerRadius="10%"
      outerRadius="90%"
      data={plotData}
      startAngle={180}
      endAngle={0}
    >
      <RadialBar
        dataKey="count"
        nameKey="name"
        minAngle={15}
        label={{ fill: '#fff', position: 'insideStart' }}
        background
        clockWise={true}
      />
      <Legend
        iconType="circle"
        iconSize={15}
        width={300}
        height={400}
        layout="vertical"
        verticalAlign="top"
        align="left"
      />
      <Tooltip labelFormatter={(index) => plotData[index].name} />
    </RadialBarChart>
  );
}

export default EventsPieChart;
