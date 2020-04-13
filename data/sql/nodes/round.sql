SELECT
  CONCAT(competitionId, '-', eventId, '-', roundNumber) ':ID(Round-ID)',
  roundNumber AS 'roundNumber:int',
  IF(isFinal, 'true', 'false') AS 'isFinal:boolean',
  'Round' AS ':LABEL'
FROM rounds
