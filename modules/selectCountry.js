import accessibleAutocomplete from "accessible-autocomplete";
async function getCountriesData() {
  const response = await fetch("https://restcountries.eu/rest/v2/all");
  const res = await response.json();
  const countryNames = res.map((country) => country.name);

  const countryInput = document.querySelector("#location-picker");

  moveScandinavianCuntries(countryNames);
  accessibleAutocomplete.enhanceSelectElement({
    selectElement: countryInput,
    source: countryNames,
    minLength: 1,
    displayMenu: "overlay",
    placeholder: "Start typing",
    autoselect: true,
    defaultValue: "Country",
    showAllValues: true,
    confirmOnBlur: true,
  });
}

function moveCountryPositions(array, toIndex, country) {
  const indexOfelement = array.indexOf(country);
  array.splice(indexOfelement, 1);
  array.splice(toIndex, 1, country);
}

function moveScandinavianCuntries(countryNames) {
  moveCountryPositions(countryNames, 0, "Denmark");
  moveCountryPositions(countryNames, 1, "Sweden");
  moveCountryPositions(countryNames, 2, "Norway");
  moveCountryPositions(countryNames, 3, "Finland");
}

export { getCountriesData };
