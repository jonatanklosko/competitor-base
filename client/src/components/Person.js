import React from 'react';
import { useParams } from 'react-router-dom';

function Person() {
  const { wcaId } = useParams();

  return <div>{wcaId}</div>;
}

export default Person;
