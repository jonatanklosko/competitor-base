-- Create a table with all rounds.

DROP TABLE IF EXISTS rounds;
CREATE TABLE rounds
WITH rounds_without_number AS (
  SELECT DISTINCT competitionId, eventId, roundTypeId
  FROM Results
)
SELECT
  competitionId,
  eventId,
  (
    CASE
      WHEN roundTypeId IN ('1', 'd') THEN 1
      WHEN roundTypeId IN ('2', 'e') THEN 2
      WHEN roundTypeId IN ('3', 'g') THEN 3
      WHEN roundTypeId IN ('f', 'c') THEN (
        -- If this is a final, then return the total number of rounds.
        SELECT COUNT(*)
        FROM rounds_without_number
        WHERE competitionId = r.competitionId AND eventId = r.eventId
      )
      ELSE 0
    END
  ) roundNumber,
  roundTypeId,
  roundTypeId IN ('c', 'f') isFinal
FROM rounds_without_number r
JOIN Events event ON event.id = eventId
WHERE event.rank < 900; -- Ignore no longer official events.

CREATE INDEX index_rounds ON rounds(competitionId, eventId, roundTypeId);
