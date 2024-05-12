LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/allCountries.txt' INTO
TABLE locations (
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
SET
    elevation = IF(@ELEVATIONTEMP = '', NULL, @ELEVATIONTEMP)