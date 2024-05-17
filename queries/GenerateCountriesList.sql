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
        WHEN Countries.Capital = 'Nuku''alofa' THEN 'Nuku‘alofa'
        WHEN Countries.Capital = 'Torshavn' THEN 'Tórshavn'
        WHEN Countries.Capital = 'St. George''s' THEN 'Saint George''s'
        WHEN Countries.Capital = 'Melekeok' THEN 'Melekeok Village'
        WHEN Countries.Capital = 'St. John''s' THEN 'Saint John’s'
        ELSE Countries.Capital
    END AS Capital,
    Countries.Continent,
    Countries.Population,
    Locations5k.Locations5k,
    LocationsTotal.Locations
FROM
    Countries
    LEFT JOIN (
        SELECT
            country_code,
            COUNT(*) AS Locations5k
        FROM
            locations
        WHERE
            1 = 1
            AND population >= 5000
        GROUP BY
            country_code
    ) Locations5k ON Countries.ISO = Locations5k.country_code
    LEFT JOIN (
        SELECT
            country_code,
            COUNT(*) AS Locations
        FROM
            locations
        WHERE
            1 = 1
            AND population > 0
        GROUP BY
            country_code
    ) LocationsTotal ON Countries.ISO = LocationsTotal.country_code
WHERE
    1 = 1
    AND Countries.Country NOT IN('Serbia and Montenegro', 'Netherlands Antilles')
    AND Countries.Population > 0
ORDER BY
    Countries.Population DESC