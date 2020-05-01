import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  'neo4j://localhost',
  neo4j.auth.basic('neo4j', 'password')
);

export async function runQuery(cypher, params = {}) {
  const session = driver.session();
  const result = await session.run(cypher, params);
  session.close();
  return result.records.map((record) => record.toObject());
}
