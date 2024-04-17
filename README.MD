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
locations.population >= 5000

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
