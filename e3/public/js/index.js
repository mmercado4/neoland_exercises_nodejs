const getAllCountries = () => {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => response.json())
    .then((data) => {
      let list = document.querySelector("#countries");
      let countriesList = data
        .map((country) => `<li>${country.name}</li>`)
        .join("");
      list.innerHTML = countriesList;
    })
    .finally(() => console.log("Fetch done"))
    .catch((err) => console.error(err.message));
};

const getRegionCountries = (region) => {
  fetch(`https://restcountries.eu/rest/v2/region/${region}`)
    .then((response) => response.json())
    .then((data) => {
      let list = document.querySelector("#countries");
      let countriesList = data
        .map((country) => `<li>${country.name}</li>`)
        .join("");
      list.innerHTML = countriesList;
    })
    .finally(() => console.log("Fetch done"))
    .catch((err) => console.error(err.message));
};

let countries = document.querySelector("#countries");
const region = countries.getAttribute("data-region");

if (region === "world") {
  getAllCountries();
} else {
  getRegionCountries(region);
}
