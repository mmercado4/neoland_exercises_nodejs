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

const getTenCountries = () => {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((response) => response.json())
    .then((data) => {
      let list = document.querySelector("#countries");
      let areaArr = data
        .map((country) => [country.name, country.area])
        .sort(compareNumbers);
      let countriesList = areaArr
        .slice(0, 10)
        .map(
          (country) => `<li>${country[0]} - ${country[1]} m<sup>2</sup></li>`
        )
        .join("");
      list.innerHTML = countriesList;
    })
    .finally(() => console.log("Fetch done"))
    .catch((err) => console.error(err.message));
};

function compareNumbers(a, b) {
  return b[1] - a[1];
}

let countries = document.querySelector("#countries");
const region = countries.getAttribute("data-region");

if (region === "world") {
  getAllCountries();
} else if (region === "topten") {
  getTenCountries();
} else {
  getRegionCountries(region);
}
