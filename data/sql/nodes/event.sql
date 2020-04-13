SELECT
  id AS 'wcaId:ID(Event-ID)',
  name AS 'name',
  format AS 'attemptFormat',
  'Event' AS ':LABEL'
FROM Events
WHERE `rank` < 900 -- Ignore no longer official events.
