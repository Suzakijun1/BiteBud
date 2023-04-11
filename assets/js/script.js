function toggleDropdown(event) {
    event.preventDefault();
    var dropdownContent = event.target.nextElementSibling;
    dropdownContent.classList.toggle("show");
  }
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

// ****This fetch for location id number by city name

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'b409b7abe1mshd693097ae9fc635p1c58ffjsn0debf85713b0',
// 		'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
// 	}
// };


// fetch('https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=Orlando', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// ****This fetch for location restaurants list of 30

const cityName = 'Orlando'; // Replace with function for user inputted cityName

// Fetch restaurant list by city name
fetch(`https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation?query=${cityName}`, {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'b409b7abe1mshd693097ae9fc635p1c58ffjsn0debf85713b0',
    'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
  }
})
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => console.error(error));




// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'cc6b170988mshf1759b35552ccc1p19f93ejsn2c2fce67394d',
// 		'X-RapidAPI-Host': 'youtube-data8.p.rapidapi.com'
// 	}
// };

// fetch('https://youtube-data8.p.rapidapi.com/search/?q=movie&hl=en&gl=US', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
