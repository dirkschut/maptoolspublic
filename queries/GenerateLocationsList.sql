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