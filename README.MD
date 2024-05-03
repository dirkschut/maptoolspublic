query to import to database:

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/allCountries.txt' INTO TABLE locations (
geonameid,
name,
asciiname,
alternatenames,
latitude,
longitude,
feature_class,
feature_code,
country_code,
cc2,
admin1_code,
admin2_code,
admin3_code,
admin4_code,
population,
@ELEVATIONTEMP,
dem,
timezone,
modification_date
)
SET elevation = IF(@ELEVATIONTEMP = '', NULL, @ELEVATIONTEMP)

query to generate locations.js:

SELECT
locations.name,
locations.population,
countries.Country AS country,
admin1.name AS region,
locations.latitude,
locations.longitude
FROM
locations
JOIN countries ON locations.country_code = countries.ISO
LEFT JOIN admin1 ON CONCAT(
locations.country_code,
'.',
locations.admin1_code
) = admin1.code
WHERE
1 = 1
AND locations.population >= 1
AND locations.feature_class = 'P'
ORDER BY
locations.population DESC

query to generate countries.js:
SELECT
Countries.Country,
CASE
WHEN Countries.Capital = 'Brasilia' THEN 'Brasília'
WHEN Countries.Capital = 'Bogota' THEN 'Bogotá'
WHEN Countries.Capital = 'Yaounde' THEN 'Yaoundé'
WHEN Countries.Capital = 'Nur-Sultan' THEN 'Astana'
WHEN Countries.Capital = 'Lome' THEN 'Lomé'
WHEN Countries.Capital = 'Asuncion' THEN 'Asunción'
WHEN Countries.Capital = 'San Jose' THEN 'San José'
WHEN Countries.Capital = 'Panama City' THEN 'Panamá'
WHEN Countries.Capital = 'Ulaanbaatar' THEN 'Ulan Bator'
WHEN Countries.Capital = 'Macao' THEN 'Macau'
WHEN Countries.Capital = 'Reykjavik' THEN 'Reykjavík'
WHEN Countries.Capital = 'Port Vila' THEN 'Port-Vila'
WHEN Countries.Capital = 'Noumea' THEN 'Nouméa'
WHEN Countries.Capital = 'El-Aaiun' THEN 'Laayoune'
WHEN Countries.Capital = 'Sao Tome' THEN 'São Tomé'
WHEN Countries.Capital = 'Hagatna' THEN 'Hagåtña'
WHEN Countries.Capital = 'Palikir' THEN 'Kolonia'
WHEN Countries.Capital = 'Nuku\'alofa' THEN 'Nuku‘alofa'
WHEN Countries.Capital = 'Torshavn' THEN 'Tórshavn'
ELSE Countries.Capital
END AS Capital,
Countries.Continent
FROM
countries
WHERE
countries.Country NOT IN ('Serbia and Montenegro', 'Netherlands Antilles')
ORDER BY
Population DESC

query to select location:

SELECT
locations.name,
locations.population,
countries.Country,
admin1.`name` as Region
from
locations
JOIN countries ON locations.country_code = countries.ISO
LEFT JOIN admin1 ON CONCAT(
locations.country_code,
'.',
locations.admin1_code
) = admin1.code
where
locations.population >= 5000
order by
rand()
limit
25
