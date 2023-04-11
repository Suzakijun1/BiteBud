var mainPage = document.querySelector("#main-page");
var informationPage = document.querySelector("#search-page");
var testing = document.querySelector("#mainPageInfo");

function toggleDropdown(event) {
  event.preventDefault();
  var dropdownContent = event.target.nextElementSibling;
  dropdownContent.classList.toggle("show");
}
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

var searchInput = document.getElementById("inputMain");
var searchBtn = document.getElementById("searchBtnMain");
var formMain = document.getElementById("formMain");

// ****This fetch for location id number by city name
function fetchLocationId(e) {
  // e.preventDefault();
  locationInput = searchInput.value;
  console.log(locationInput);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b409b7abe1mshd693097ae9fc635p1c58ffjsn0debf85713b0",
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    },
  };
  fetch(
    `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=${locationInput}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data[0].locationId);
      //send to function here with (data.data[0].locationId)
      fetchLocationId2(data.data[0].locationId);
    })
    .catch((err) => console.error(err));
}

searchBtn.addEventListener("click", function () {
  fetchLocationId();
  mainPage.classList.add("hidden");
  informationPage.classList.remove("hidden");
  testing.classList.add("hidden");
});

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b409b7abe1mshd693097ae9fc635p1c58ffjsn0debf85713b0",
    "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
  },
};

fetch(
  "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=34515",
  options
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response.data.data)
    for(var i=0; i < 5; i++){
      console.log(response.data.data[i])
      console.log(response.data.data[i].name)
      console.log(response.data.data[i].parentGeoName)
      fetchYoutubeVideo(response.data.data[i].name,response.data.data[i].parentGeoName)
    }
  })
  .catch((err) => console.error(err));
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "b409b7abe1mshd693097ae9fc635p1c58ffjsn0debf85713b0",
//     "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
//   },
// };

// fetch(
//   "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=34515",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

function fetchLocationId2(functionid) {
  console.log(functionid);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b409b7abe1mshd693097ae9fc635p1c58ffjsn0debf85713b0",
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    },
  };
  fetch(
    `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=${functionid}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      createCards(data.data.data);
    })
    .catch((err) => console.error(err));
}

function createCards(restaurants) {
  restaurants.forEach((restaurant) => {});
}

// let searchInput = document.getElementById("inputMain");
// let searchBtn = document.getElementById("searchBtnMain");
// let formMain = document.getElementById("myForm");

// function fetchYoutubeVideo(e){
//   e.preventDefault();
//   const youtubeVideo = searchInput.value;
//   console.log(youtubeVideo);

function fetchYoutubeVideo(restaurant,city){
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'cc6b170988mshf1759b35552ccc1p19f93ejsn2c2fce67394d',
      'X-RapidAPI-Host': 'youtube-data8.p.rapidapi.com'
    }
  };
  fetch(`https://youtube-data8.p.rapidapi.com/search/?q=${restaurant} ${city}&hl=en&gl=US`, options)
    .then(response => response.json())
    .then(response => {
      console.log(response.contents[0].video)
    })
    .catch(err => console.error(err));
}
// fetchYoutubeVideo();
// fetch('https://youtube-data8.p.rapidapi.com/search/?q=movie&hl=en&gl=US', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// mainPage.classList.add(hidden);
// informationPage.classList.remove(hidden);

