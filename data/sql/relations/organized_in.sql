SELECT
  competition.id AS ':START_ID(Competition-ID)',
  country.iso2 AS ':END_ID(Country-ID)',
  competition.cityName AS 'city',
  CONCAT('{', 'latitude:', latitude / 1000000, ', longitude:', longitude / 1000000 , '}') AS 'location:point',
  'ORGANIZED_IN' AS ':TYPE'
FROM Competitions competition
JOIN Countries country ON country.id = competition.countryId
