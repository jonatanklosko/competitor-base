// Add indices to speed up basic queries.
CREATE INDEX ON :Person(wcaId);
CREATE INDEX ON :Competition(wcaId);

// Add a fulltext index for global searching.
CALL db.index.fulltext.createNodeIndex("search", ["Person", "Competition"], ["name"]);

// Compute page rank score for every person.
CALL gds.pageRank.write({
  nodeQuery: 'MATCH (p:Person) RETURN id(p) AS id',
  relationshipQuery: '
    MATCH (p1:Person)-[:COMPETED_IN]->(:Competition)<-[:COMPETED_IN]-(p2:Person)
    RETURN id(p1) AS source, id(p2) AS target
  ',
  writeProperty: 'pageRank'
});
