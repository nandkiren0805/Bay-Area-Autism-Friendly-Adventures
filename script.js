"use strict";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("places");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patSddLYWQQyWCuvi.4a25ebc8de15c84f61ad455bd010afe1f0ad098c3e0784941254924afc43b6c4`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appuAb4p2UuhniNpC/Places`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear brews

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let logo = data.records[i].fields["Logo"]; // here we are getting column values
        let name = data.records[i].fields["Name"]; //here we are using the Field ID to fecth the name property
        let neighborhood = data.records[i].fields["Neighborhood"];

        newHtml += `
        
         <div class="col-xl-4 cardImageText">
          <div class="card list move border-dark mb-5" style="width: 20rem;">
          <a href="breweries.html?id=${data.records[i].id}">${
          logo
            ? `<img class="card-img-top rounded" alt="${name}" src="${logo[0].url}">`
            : ``
        }
          </a>
          <p  class="card-key">${name}</p>
          </div>
          </div>
        </div>
    
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

// look up window.location.search and split, so this would take
// https://dmspr2021-airtable-app.glitch.me/index.html?id=receHhOzntTGZ44I5
// and look at the ?id=receHhOzntTGZ44I5 part, then split that into an array
// ["?id=", "receHhOzntTGZ44I5"] and then we only choose the second one
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  // has at least ["?id=", "OUR ID"]
  // call function for the dropdown menu
  dropdown();
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else { 
  getAllRecords(); // no id given, fetch summaries
}
