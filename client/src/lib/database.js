import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  'neo4j://localhost',
  neo4j.auth.basic('neo4j', 'password')
);

const session = driver.session();
