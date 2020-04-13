SELECT
  CONCAT(competitionId, '-', eventId, '-', roundNumber) ':START_ID(Round-ID)',
  eventId AS ':END_ID(Event-ID)',
  'OF_EVENT' AS ':TYPE'
FROM rounds
