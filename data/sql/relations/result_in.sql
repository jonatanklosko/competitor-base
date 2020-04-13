SELECT
  personId AS ':START_ID(Person-ID)',
  CONCAT(round.competitionId, '-', round.eventId, '-', round.roundNumber) AS ':END_ID(Round-ID)',
  pos AS 'rank:int',
  CONCAT(value1, ';', value2, ';', value3, ';', value4, ';', value5) AS 'attempts:int[]',
  best AS 'best:int',
  average AS 'average:int',
  IF(regionalSingleRecord IS NOT NULL AND regionalSingleRecord != '', regionalSingleRecord, '') AS 'regionalSingleRecord',
  IF(regionalAverageRecord IS NOT NULL AND regionalAverageRecord != '', regionalAverageRecord, '') AS 'regionalAverageRecord',
  'RESULT_IN' AS ':TYPE'
FROM Results result
JOIN rounds round ON round.competitionId = result.competitionId
  AND round.eventId = result.eventId
  AND round.roundTypeId = result.roundTypeId
