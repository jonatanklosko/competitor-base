SELECT
  person.id AS 'wcaId:ID(Person-ID)',
  person.name AS 'name',
  person.gender AS 'gender',
  'Person' AS ':LABEL'
FROM Persons person
WHERE subId = 1
