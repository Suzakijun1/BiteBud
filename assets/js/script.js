var mainPage = document.querySelector("#main-page");
var informationPage = document.querySelector("#search-page");
var testing = document.querySelector("#mainPageInfo");
function goBack() {
  window.location.href = "index.html"; 
}
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

var searchInput = document.getElementById("inputMain");
var searchBtn = document.getElementById("searchBtnMain");
var formMain = document.getElementById("formMain");

//**** search bar button event listener to start function chain and to hide main page
searchBtn.addEventListener("click", function () {
  // fetchLocationId();
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

// //**** creates cards that contain restaurants pic name price range open status
// function createCards(topFiveArray) {
//   console.log(topFiveArray);
//   searchDiv = document.getElementById("search-page");
//   //foreach loop to create cards and append all drilled info onto them. may need to put picture and title into one div and info into another.
//   topFiveArray.forEach((restaurant) => {
//     const card = document.createElement("div");
//     card.setAttribute("class", "restaurantCard");
//     //img
//     const restHeroImg = document.createElement("img");
//     restHeroImg.setAttribute("src", restaurant.heroImgUrl);
//     restHeroImg.setAttribute("class", "restHeroImg");
//     restHeroImg.setAttribute("alt", "Restaurant image");
//     //name
//     const restName = document.createElement("h3");
//     restName.setAttribute("class", "restName");
//     restName.innerText = restaurant.name;
//     //rating in stars
//     const restRating = document.createElement("h3");
//     restRating.setAttribute("class", "restRating");
//     restRating.innerText = restaurant.averageRating;
//     //price range
//     const restPrice = document.createElement("h3");
//     restPrice.setAttribute("class", "restPrice");
//     restPrice.innerText = restaurant.priceTag;
//     //type of food
//     const restType = document.createElement("h3");
//     restType.setAttribute("class", "restType");
//     restType.innerText = restaurant.establishmentTypeAndCuisineTags[0];
//     //open status
//     const restOpen = document.createElement("h3");
//     restOpen.setAttribute("class", "restOpen");
//     restOpen.innerText = restaurant.currentOpenStatusText;
//     //appending to card div and then to search div
//     card.append(restHeroImg);
//     card.append(restName);
//     card.append(restRating);
//     card.append(restPrice);
//     card.append(restType);
//     card.append(restOpen);

//     searchDiv.append(card);
//   });
// }
