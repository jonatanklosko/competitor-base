SELECT
  personId AS ':START_ID(Person-ID)',
  eventId AS ':END_ID(Event-ID)',
  'single' AS 'type',
  best AS 'best:int',
  worldRank AS 'worldRank:int',
  continentRank AS 'continentRank:int',
  countryRank AS 'countryRank:int',
  'PERSONAL_BEST' AS ':TYPE'
FROM RanksSingle
UNION ALL
SELECT
  personId AS ':START_ID(Person-ID)',
  eventId AS ':END_ID(Event-ID)',
  'average' AS 'type',
  best AS 'best:int',
  worldRank AS 'worldRank:int',
  continentRank AS 'continentRank:int',
  countryRank AS 'countryRank:int',
  'PERSONAL_BEST' AS ':TYPE'
FROM RanksAverage
