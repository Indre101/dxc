import accessibleAutocomplete from "accessible-autocomplete";
async function getCountriesData() {
  const response = await fetch("https://restcountries.eu/rest/v2/all");
  const res = await response.json();
  const countryNames = res.map((country) => country.name);

  countryNames[0] = "Denmark";
  countryNames[1] = "Sweden";
  countryNames[2] = "Norway";
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: document.querySelector("#location-picker"),
    source: countryNames,
    minLength: 1,
    displayMenu: "overlay",
    placeholder: "Start typing",
    autoselect: true,
    showAllValues: true,
  });
}

export { getCountriesData };
