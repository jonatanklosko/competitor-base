#!/bin/bash

# This script generates TSV files based on a local MySQL WCA databse.
# Those TSV files are then used to import the data to Neo4j.

cd "$(dirname "$0")"

if [ $# -eq 0 ]; then
  echo "Usage: $0 <local-mysql-wca-db-name>" >> /dev/stderr
  exit 1
fi

mysql_dbname=$1
neo4j_path="../neo4j"

tsv_export_dir="mysql_tsv_export"
mkdir -p ${tsv_export_dir}

people_query="
SELECT
  person.id wcaId,
  person.name name,
  person.gender gender,
  country.iso2 countryIso2
FROM Persons person
JOIN Countries country ON country.id = person.countryId
WHERE subId = 1
"
mysql $mysql_dbname -e "${people_query}" --batch > $tsv_export_dir/people.tsv

countries_query="
SELECT
  iso2,
  name
FROM Countries
"
mysql $mysql_dbname -e "${countries_query}" --batch > $tsv_export_dir/countries.tsv

competitions_query="
SELECT
  competition.id wcaId,
  competition.name name,
  country.iso2 countryIso2,
  competition.cityName city,
  competition.start_date startDate,
  competition.end_date endDate
FROM Competitions competition
JOIN Countries country ON country.id = competition.countryId
"
mysql $mysql_dbname -e "${competitions_query}" --batch > $tsv_export_dir/competitions.tsv

events_query="
SELECT
  id wcaId,
  name name,
  format attemptFormat
FROM Events
WHERE \`rank\` < 900
"
mysql $mysql_dbname -e "${events_query}" --batch > $tsv_export_dir/events.tsv

rounds_query="
WITH rounds AS (
  SELECT DISTINCT competitionId, eventId, roundTypeId
  FROM Results
)
SELECT
  competitionId competitionWcaId,
  eventId eventWcaId,
  (
    CASE
      WHEN roundTypeId IN ('1', 'd') THEN 1
      WHEN roundTypeId IN ('2', 'e') THEN 2
      WHEN roundTypeId IN ('3', 'g') THEN 3
      WHEN roundTypeId IN ('f', 'c') THEN (
        -- If this is a final, then return the total number of rounds.
        SELECT COUNT(*)
        FROM rounds
        WHERE competitionId = r.competitionId AND eventId = r.eventId
      )
      ELSE 0
    END
  ) roundNumber,
  roundTypeId IN ('c', 'f') isFinal
FROM rounds r
"
mysql $mysql_dbname -e "${rounds_query}" --batch > $tsv_export_dir/rounds.tsv

results_query="
SELECT
  pos \`rank\`,
  personId personWcaId,
  competitionId competitionWcaId,
  eventId eventWcaId,
  (
    CASE
      WHEN roundTypeId IN ('1', 'd') THEN 1
      WHEN roundTypeId IN ('2', 'e') THEN 2
      WHEN roundTypeId IN ('3', 'g') THEN 3
      WHEN roundTypeId IN ('f', 'c') THEN (
        -- If this is a final, then return the total number of rounds.
        SELECT COUNT(DISTINCT roundTypeId)
        FROM Results
        WHERE competitionId = result.competitionId AND eventId = result.eventId
      )
      ELSE 0
    END
  ) roundNumber,
  value1 attempt1,
  value2 attempt2,
  value3 attempt3,
  value4 attempt4,
  value5 attempt5,
  best best,
  average average,
  regionalSingleRecord regionalSingleRecord,
  regionalAverageRecord regionalAverageRecord
FROM Results result
"
mysql $mysql_dbname -e "${results_query}" --batch > $tsv_export_dir/results.tsv

personal_bests_query="
SELECT
  'single' type,
  personId personWcaId,
  eventId eventWcaId,
  best best,
  worldRank worldRank,
  continentRank continentRank,
  countryRank countryRank
FROM RanksSingle
UNION ALL
SELECT
  'average' type,
  personId personWcaId,
  eventId eventWcaId,
  best best,
  worldRank worldRank,
  continentRank continentRank,
  countryRank countryRank
FROM RanksAverage
"
mysql $mysql_dbname -e "${personal_bests_query}" --batch > $tsv_export_dir/personal_bests.tsv

rm -rf "$neo4j_path/import/wca"
cp -r $tsv_export_dir "$neo4j_path/import/wca"
