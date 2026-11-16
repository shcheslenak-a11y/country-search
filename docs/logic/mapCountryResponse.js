export function mapCountryResponse(raw) {
    return raw.map((countryInfo) => {
        return {
            name: countryInfo.name,
            flag: countryInfo.flags?.png || countryInfo.flags?.svg || "none",
            capital: countryInfo.capital || "",
            region: `${countryInfo.region}/${countryInfo.subregion}`,
            population: countryInfo.population || 0,
            languages: countryInfo.languages?.map((lang) => {
                if (lang.name != lang.nativeName)
                    return `${lang.nativeName}(${lang.name})`;
                return lang.name;
            }) || [],
            currencies: countryInfo.currencies?.map((currency) => currency.name) || [],
            area: countryInfo.area || 0,
            borders: countryInfo.borders || [],
        };
    });
}
//# sourceMappingURL=mapCountryResponse.js.map