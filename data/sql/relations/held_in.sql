SELECT
  CONCAT(competitionId, '-', eventId, '-', roundNumber) ':START_ID(Round-ID)',
  competitionId AS ':END_ID(Competition-ID)',
  'HELD_IN' AS ':TYPE'
FROM rounds
