LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/countryInfo.txt' INTO
TABLE countries (
    ISO,
    ISO3,
    ISONumeric,
    fips,
    Country,
    Capital,
    Area,
    Population,
    Continent,
    tld,
    CurrencyName,
    CurrencyCode,
    Phone,
    PostalCodeFormat,
    PostalCodeRegex,
    Languages,
    geonameid,
    neighbours,
    EquivalentFipsCode
)