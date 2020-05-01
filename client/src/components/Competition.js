import React from 'react';
import { useParams } from 'react-router-dom';

function Competition() {
  const { wcaId } = useParams();
  return <div>Competition: {wcaId}</div>;
}

export default Competition;
