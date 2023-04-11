var mainPage = document.querySelector("#main-page");
var informationPage = document.querySelector("#search-page");
var testing = document.querySelector("#mainPageInfo");
//****dropdown logic for navbar
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

// ****This fetch is for location id number by city name to be sent to fetchlocationid2 function to get location's restaurant list.
function fetchLocationId() {
  searchInput.value;
  console.log(searchInput.value);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b409b7abe1mshd693097ae9fc635p1c58ffjsn0debf85713b0",
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    },
  };
  fetch(
    `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=${searchInput.value}`,
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
//**** search bar button event listener to start function chain and to hide main page
searchBtn.addEventListener("click", function () {
  fetchLocationId();
  mainPage.classList.add("hidden");
  informationPage.classList.remove("hidden");
  testing.classList.add("hidden");
});
//**** function to grab info from trip advisor restaurant list and search videos for the top 5 on the list by name and city
function fetchYoutubeVideo(restaurant, city) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cc6b170988mshf1759b35552ccc1p19f93ejsn2c2fce67394d",
      "X-RapidAPI-Host": "youtube-data8.p.rapidapi.com",
    },
  };

  fetch(
    `https://youtube-data8.p.rapidapi.com/search/?q=${restaurant} ${city}&hl=en&gl=US`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response.contents[0].video);
    })
    .catch((err) => console.error(err));
}
//**** Grabs location ID from getlocationid function and GET's list of restaurants and sends that info to create cards function and fetchyoutubevideo function.
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
      console.log(data.data.data);
      // createCards(data.data.data); *commented out for future changes
      console.log(data.data.data);
      for (var i = 0; i < 5; i++) {
        console.log(data.data.data[i]);
        console.log(data.data.data[i].name);
        console.log(data.data.data[i].parentGeoName);
        fetchYoutubeVideo(
          data.data.data[i].name,
          data.data.data[i].parentGeoName
        );
      }
    })
    .catch((err) => console.error(err));
}
//**** creates cards that contain restaurants pic name price range open status
function createCards(restaurants) {
  restaurants.forEach((restaurant) => {});
}
