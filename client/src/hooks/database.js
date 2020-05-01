import { useState, useEffect } from 'react';
import { runQuery } from '../lib/database';

export function useQuery(cypher, params = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    runQuery(cypher, params)
      .then((result) => setData(result))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cypher, JSON.stringify(params)]);

  return { data, loading, error };
}
