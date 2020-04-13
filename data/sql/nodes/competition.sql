SELECT
  id AS 'wcaId:ID(Competition-ID)',
  name AS 'name',
  start_date AS 'startDate:date',
  end_date AS 'endDate:date',
  'Competition' AS ':LABEL'
FROM Competitions competition
