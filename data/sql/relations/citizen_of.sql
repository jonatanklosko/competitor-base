SELECT
  person.id AS ':START_ID(Person-ID)',
  country.iso2 AS ':END_ID(Country-ID)',
  'CITIZEN_OF' AS ':TYPE'
FROM Persons person
JOIN Countries country ON country.id = person.countryId
WHERE subId = 1
