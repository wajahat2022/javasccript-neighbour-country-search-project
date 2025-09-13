const btn = document.querySelector(".btn-country");
const countiesContainer = document.querySelector(".countries");
const searchInput = document.querySelector(".searchInput"); 
const searchButton = document.querySelector("#searchButton");


function getCountry(data) {
  const languages = Object.values(data.languages).join(", ");
  const currencies = Object.values(data.currencies)[0].name;
  const html = `
  <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1_000_000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${languages}</p>
      <p class="country__row"><span>💰</span>${currencies}</p>
    </div>
  </article>
  `;
  countiesContainer.insertAdjacentHTML("beforeend", html);
}
function getCountryData(country) {
  // fetch json placeholder todos
  fetch("https://jsonplaceholder.typicode.com/todos");

  //////////////

  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  console.log("working");
  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText)[0];
    console.log(data);

    getCountry(data);

    // second ajax call for neighbour country
    const [...neighbours] = data.borders;

    neighbours?.forEach((neighbour) => {
      const request = new XMLHttpRequest();
      request.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
      request.send();
      request.addEventListener("load", function () {
        //  add number with data varaible  from dataNumber variable to create data1 data2 data3
        const data = JSON.parse(this.responseText)[0];
        getCountry(data);
      });
    });
  });
}



getCountryData("pakistan");

searchButton.addEventListener("click", function () { 
  countiesContainer.innerHTML = "";
  const country = searchInput.value;
  getCountryData(country); 
}); 


fetch("https://ipapi.co/json/")
  .then((res) => res.json())
  .then((loc) => {
    const userCountry = loc.country_name;
    console.log("Detected country:", userCountry); // debug log

    return fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(userCountry)}?fullText=true`
    );
  })
  .then((res) => {
    if (!res.ok) throw new Error("Country not found in RESTCountries");
    return res.json();
  })
  .then((data) => {
    if (!data || !data[0]) throw new Error("Invalid country data received");
    countiesContainer.innerHTML = ""; // optional: clear old results
    getCountry(data[0]);
  })
  .catch((err) => {
    console.error("Error fetching user's country:", err.message);
  });


