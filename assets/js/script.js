var mainPage = document.querySelector("#main-page");
var informationPage = document.querySelector("#search-page");
var testing = document.querySelector("#mainPageInfo");

var loadingIcon = document.querySelector("#loadingIcon");

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

var cityInput = document.getElementById("inputCity");
var stateInput = document.getElementById("inputState");
var searchBtn = document.getElementById("searchBtnMain");
var formMain = document.getElementById("formMain");
//fetch for restaurant array for city and state once search button is clicked
function getRestaurants() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cc6b170988mshf1759b35552ccc1p19f93ejsn2c2fce67394d",
      "X-RapidAPI-Host": "restaurants-near-me-usa.p.rapidapi.com",
    },
  };
  fetch(
    `https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/${stateInput.value}/city/${cityInput.value}/0`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      createCards(data.restaurants);
    })
    .catch((err) => console.error(err));
  console.log(stateInput);
}

//**** search bar button event listener to start function chain and to hide main page
searchBtn.addEventListener("click", function () {
  getRestaurants();
  mainPage.classList.add("hidden");
  informationPage.classList.remove("hidden");
  testing.classList.add("hidden");
});
//**** function to grab info from restaurant list and search videos for them based on name and city.
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

//**** creates cards that contain restaurants info
function createCards(restaurantsArray) {
  loadingIcon.setAttribute("class", "hidden");
  console.log(restaurantsArray);
  searchDiv = document.getElementById("search-page");
  containerWrapDiv = document.createElement("div");
  containerWrapDiv.setAttribute("class", "container-wrapper");
  //foreach loop to create cards and append all drilled info onto them
  restaurantsArray.forEach((restaurant) => {
    const card = document.createElement("div");
    card.setAttribute("class", "container");
    //website URL
    const restWeb = document.createElement("h3");
    restWeb.setAttribute("class", "restWeb");
    restWeb.innerText = "Website: " + restaurant.website;
    //name
    const restName = document.createElement("h3");
    restName.setAttribute("class", "restName");
    restName.innerText = restaurant.restaurantName;
    //Phone number
    const restPhone = document.createElement("h3");
    restPhone.setAttribute("class", "restPhone");
    restPhone.innerText = "Phone Number: " + restaurant.phone;
    //address
    const restAdd = document.createElement("h3");
    restAdd.setAttribute("class", "restPrice");
    restAdd.innerText = "Address: " + restaurant.address;
    //type of food
    const restType = document.createElement("h3");
    restType.setAttribute("class", "restType");
    restType.innerText = "Cuisine Type: " + restaurant.cuisineType;
    //hours of operation
    const restOpen = document.createElement("h3");
    restOpen.setAttribute("class", "restOpen");
    restOpen.innerText = "Hours: " + restaurant.hoursInterval;
    //appending to div, card, and page
    //logo div
    const cardLogoDiv = document.createElement("div");
    cardLogoDiv.setAttribute("class", "cardLogoDiv");
    const BiteBudLogo = document.createElement("h3");
    BiteBudLogo.setAttribute("class", "BiteBudLogo");
    BiteBudLogo.innerText = "BiteBud";
    cardLogoDiv.append(BiteBudLogo);
    card.append(cardLogoDiv);

    //rest info div
    const restInfoDiv = document.createElement("div");
    restInfoDiv.setAttribute("class", "restInfoDiv");
    restInfoDiv.append(restName);
    restInfoDiv.append(restType);
    restInfoDiv.append(restOpen);
    restInfoDiv.append(restWeb);
    restInfoDiv.append(restPhone);
    restInfoDiv.append(restAdd);

    card.append(restInfoDiv);

    //youtube Div for youtube videos
    const youtubeDiv = document.createElement("div");
    youtubeDiv.setAttribute("class", "youtubeDiv");
    card.append(youtubeDiv);

    searchDiv.append(containerWrapDiv);
    containerWrapDiv.append(card);
  });
}
