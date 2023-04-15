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
let loading = false;

async function getRestaurants(state, city) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "cc6b170988mshf1759b35552ccc1p19f93ejsn2c2fce67394d",
      "X-RapidAPI-Host": "restaurants-near-me-usa.p.rapidapi.com",
    },
  };
  const response = await fetch(
    `https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/${state}/city/${city}/0`,
    options
  );
  const data = await response.json();
  const { restaurants } = data;
  const fiveResults = restaurants.slice(0, 5);
  console.log(fiveResults);

  return fiveResults;
}

//**** search bar button event listener to start function chain and to hide main page
searchBtn.addEventListener("click", function () {
  const city = cityInput.value;
  const state = stateInput.value;

  let history = JSON.parse(localStorage.getItem("history")) || [];

  if (!history.includes({ city, state })) {
    history.push({ city, state });
    localStorage.setItem("history", JSON.stringify(history));
  }
  renderSearchHistory();
  getResults(state, city);
  mainPage.classList.add("hidden");
  informationPage.classList.remove("hidden");
  testing.classList.add("hidden");
});
//**** function to grab info from restaurant list and search videos for them based on name and city.
async function fetchYoutubeVideo(state, city) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b409b7abe1mshd693097ae9fc635p1c58ffjsn0debf85713b0",
      "X-RapidAPI-Host": "youtube-data8.p.rapidapi.com",
    },
  };
  console.log(
    `https://youtube-data8.p.rapidapi.com/search/?q=funthingstodoin${city} ${state}&hl=en&gl=US`
  );
  const response = await fetch(
    `https://youtube-data8.p.rapidapi.com/search/?q=funthingstodoin${city} ${state}&hl=en&gl=US`,
    options
  );
  const data = await response.json();
  console.log(data.contents);
  return data.contents;
}

// delay function to delay requests to youtube api
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getResults = async (state, city) => {
  try {
    const restaurantsArray = await getRestaurants(state, city);
    let videoDataArray = [];
    for (const restaurant of restaurantsArray) {
      const videoData = await fetchYoutubeVideo(state, city);
      videoDataArray.push(videoData);
      await delay(200);
    }
    createCards(restaurantsArray, videoDataArray);
  } catch (error) {
    console.log(error);
    console.log("no restaurants found :(");
    const alertPopUp = document.createElement("div");
    alertPopUp.setAttribute("class", "alertPopUp");
    const alertDivText = document.createElement("p");
    alertDivText.innerText = "Sorry no restaurants found. please try again.";
    const alertBtn = document.createElement("button");
    alertBtn.innerText = "OK";
    const appendingDiv = document.getElementById("mainPage");
    const loadingIcon = document.getElementById("loadingIcon");
    loadingIcon.setAttribute("class", "hidden");
    alertPopUp.append(alertDivText);
    alertPopUp.append(alertBtn);
    appendingDiv.append(alertPopUp);
    alertBtn.addEventListener("click", function () {
      location.reload();
    });
  }
};

//**** creates cards that contain restaurants info
function createCards(restaurantsArray, videoData) {
  loadingIcon.setAttribute("class", "hidden");
  console.log(restaurantsArray);
  const searchDiv = document.getElementById("search-page");
  const containerWrapDiv = document.getElementById("container-wrapper");
  containerWrapDiv.innerHTML = "";
  //foreach loop to create cards and append all drilled info onto them

  restaurantsArray.forEach((restaurant, index) => {
    const card = document.createElement("div");
    card.setAttribute("class", "container");
    //website URL
    const restWeb = document.createElement("a");
    restWeb.setAttribute("class", "restWeb infoHover");
    restWeb.setAttribute("href", restaurant.website);
    restWeb.setAttribute("target", "_blank");
    restWeb.innerText = "~ View Restaurant Website ~";
    //name
    const restName = document.createElement("h3");
    restName.setAttribute("class", "restName");
    restName.innerText = restaurant.restaurantName;
    //Phone number
    const restPhone = document.createElement("a");
    restPhone.setAttribute("class", "restPhone");
    restPhone.setAttribute("href", "tel:" + restaurant.phone);
    restPhone.innerText = "Phone Number: " + restaurant.phone;
    //address
    const restAdd = document.createElement("h3");
    restAdd.setAttribute("class", "restAdd");
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
    restInfoDiv.append(restPhone);
    restInfoDiv.append(restAdd);
    restInfoDiv.append(restWeb);

    card.append(restInfoDiv);

    const attractionsDiv = document.createElement("div");
    attractionsDiv.setAttribute("class", "attractionsDiv");
    attractionsDiv.innerText = "Attractions";

    //youtube Div for youtube videos
    const youtubeDiv = document.createElement("div");
    youtubeDiv.setAttribute("class", "youtubeDiv");
    const iframeForVid = document.createElement("iframe");
    const video = videoData[index];
    const { videoId } = video[index].video;
    console.log("Items", videoId);
    iframeForVid.setAttribute(
      "src",
      `https://www.youtube.com/embed/${videoId}`
    );
    iframeForVid.setAttribute("width", "250");
    iframeForVid.setAttribute("height", "200");
    youtubeDiv.append(attractionsDiv);
    youtubeDiv.append(iframeForVid);
    card.append(youtubeDiv);
    searchDiv.append(containerWrapDiv);
    containerWrapDiv.append(card);
  });
}

async function narrowDowResults(videos, restaurantName) {
  const lowercaseRestaurantName = restaurantName.toLowerCase();

  for (const videoArr of videos) {
    console.log("test", videoArr.video);
  }
}

const inputCity = document.getElementById("inputCity");
const dropdownButton = document.querySelector("#testing");

// Load stored past cities on page load
renderSearchHistory();
function renderSearchHistory() {
  dropdownButton.innerHTML = "";
  const historyArray = JSON.parse(localStorage.getItem("history")) || [];
  for (let i = 0; i < historyArray.length; i++) {
    const option = document.createElement("option");
    option.text = `${historyArray[i].city}, ${historyArray[i].state}`;
    option.value = historyArray[i];
    option.addEventListener("click", function () {
      console.log("clicked a history button", historyArray[i]);
      getResults(historyArray[i].state, historyArray[i].city);
      mainPage.classList.add("hidden");
      informationPage.classList.remove("hidden");
      testing.classList.add("hidden");
    });
    dropdownButton.append(option);
  }
}

// Upon clicking the search Button, the dropdown menu will populate new information
// searchBtn.addEventListener("click", function () {
// //   const city = inputCity.value;
// //   const state = stateInput.value;

// // });
