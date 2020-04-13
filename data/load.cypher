LOAD CSV WITH HEADERS FROM "file:///wca/countries.tsv" AS line FIELDTERMINATOR '\t'
CREATE (:Country {iso2: line.iso2, name: line.name});

CREATE INDEX ON :Country(iso2);

LOAD CSV WITH HEADERS FROM "file:///wca/events.tsv" AS line FIELDTERMINATOR '\t'
CREATE (:Event {wcaId: line.wcaId, name: line.name});

CREATE INDEX ON :Event(wcaId);

LOAD CSV WITH HEADERS FROM "file:///wca/people.tsv" AS line FIELDTERMINATOR '\t'
MATCH (country:Country {iso2: line.countryIso2})
CREATE
  (person:Person {wcaId: line.wcaId, name: line.name, gender: line.gender}),
  (person)-[:CITIZEN_OF]->(country);

CREATE INDEX ON :Person(wcaId);

LOAD CSV WITH HEADERS FROM "file:///wca/competitions.tsv" AS line FIELDTERMINATOR '\t'
MATCH (country:Country {iso2: line.countryIso2})
CREATE
  (competition:Competition {
    wcaId: line.wcaId,
    name: line.name,
    city: line.city,
    startDate: date(line.startDate),
    endDate: date(line.endDate)
  }),
  (competition)-[:ORGANIZED_IN]->(country);

CREATE INDEX ON :Competition(wcaId);

LOAD CSV WITH HEADERS FROM "file:///wca/rounds.tsv" AS line FIELDTERMINATOR '\t'
MATCH
  (competition:Competition {wcaId: line.competitionWcaId}),
  (event:Event {wcaId: line.eventWcaId})
CREATE
  (round:Round {
    roundNumber: toInteger(line.roundNumber),
    isFinal: CASE WHEN line.isFinal = '0' THEN FALSE ELSE TRUE END
  }),
  (round)-[:HELD_IN]->(competition),
  (round)-[:OF_EVENT]->(event);

CREATE INDEX ON :Competition(roundNumber);

USING PERIODIC COMMIT 500 // Commit smaller chunks at a time to avoid out-of-memory errors.
LOAD CSV WITH HEADERS FROM "file:///wca/results.tsv" AS line FIELDTERMINATOR '\t'
MATCH
  (person:Person {wcaId: line.personWcaId}),
  (competition:Competition {wcaId: line.competitionWcaId}),
  (event:Event {wcaId: line.eventWcaId}),
  (competition)<-[:HELD_IN]-(round:Round {roundNumber: toInteger(line.roundNumber)})-[:OF_EVENT]->(event)
CREATE
  (person)-[:RESULT_IN {
    rank: toInteger(line.rank),
    attempts: [toInteger(line.attempt1), toInteger(line.attempt2), toInteger(line.attempt3), toInteger(line.attempt4), toInteger(line.attempt5)],
    best: toInteger(line.best),
    average: toInteger(line.average),
    regionalSingleRecord: CASE WHEN line.regionalSingleRecord = 'NULL' THEN NULL ELSE line.regionalSingleRecord END,
    regionalAverageRecord: CASE WHEN line.regionalAverageRecord = 'NULL' THEN NULL ELSE line.regionalAverageRecord END
  }]->(round);

USING PERIODIC COMMIT 500 // Commit smaller chunks at a time to avoid out-of-memory errors.
LOAD CSV WITH HEADERS FROM "file:///wca/personal_bests.tsv" AS line FIELDTERMINATOR '\t'
MATCH
  (person:Person {wcaId: line.personWcaId}),
  (event:Event {wcaId: line.eventWcaId})
CREATE
  (person)-[:PERSONAL_BEST {
    type: line.type,
    best: toInteger(line.best),
    worldRank: toInteger(line.worldRank),
    continentRank: toInteger(line.continentRank),
    countryRank: toInteger(line.countryRank)
  }]->(event);

// Compute an additional relation between a person and every competition they competed in.
MATCH (person:Person)-[:RESULT_IN]->(round:Round)-[:HELD_IN]->(competition:Competition)
MERGE (person)-[:COMPETED_IN]->(competition);
