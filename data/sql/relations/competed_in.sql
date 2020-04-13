SELECT DISTINCT
  personId AS ':START_ID(Person-ID)',
  competitionId AS ':END_ID(Competition-ID)',
  'COMPETED_IN' AS ':TYPE'
FROM Results
