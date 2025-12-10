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

  await fetch(`https://api.airtable.com/v0/appuAb4p2UuhniNpC/Places`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear brews

      const articleHTML = `
        <article class="col-sm-12 col-md-6 col-lg-4 col-xxl-3 overview">
          <div class="card h-100">
            <a href="index.html?id=ID">
              <div class="img-container">
                <img src="SRC" class="card-img-top" alt="Card image">
              </div>
            </a>
            <div class="card-body">
              <h2>NAME</h2>
              <ul>
                <li>Location Type: TYPE</li>
                <li>Best for Ages: AGES</li>
                <li>Indoor/Outdoor: IN-OUT</li>
              </ul>
            </div>
          </div>
        </article>
      `;

      let newHtml = "";
      for (let i = 0; i < data.records.length; i++) {
        const fields = data.records[i].fields;
        const id = data.records[i].id;
        // This is the shorthand syntax for an if/else statement
        // const photo = fields["Photo"] ? fields["Photo"][0].url : "";
        let photo = "assets/placeholder.png";
        if (fields["Photo"]) {
          photo = fields["Photo"][0].url;
        }
        const type = fields["Type"];
        const name = fields["Name"];
        const ages = fields["Ages"];
        const inOut = fields["Indoor/Outdoor"];

        const article = articleHTML
          .replace("ID", id)
          .replace("SRC", photo)
          .replace("NAME", name)
          .replace("TYPE", type)
          .replace("AGES", ages)
          .replace("IN-OUT", inOut);

        newHtml += article;
      }

      getResultElement.innerHTML = newHtml;
    });
}

// function for our detail view
async function getOneRecord(id) {
  let jobsResultElement = document.getElementById("places");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patSddLYWQQyWCuvi.4a25ebc8de15c84f61ad455bd010afe1f0ad098c3e0784941254924afc43b6c4`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appuAb4p2UuhniNpC/Places/${id}`,
    options,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is a single object

      const fields = data.fields;
      let type = fields["Type"]; // here we are getting column values
      let name = fields["Name"]; //here we are using the Field ID to fecth the name property
      let ages = fields["Ages"];
      let inOut = fields["Indoor/Outdoor"];
      let address = fields["Address"];
      let description = fields["Description"];
      let hours = fields["Hours"];
      let contact = fields["Contact"];
      let sensory = fields["Sensory"];
      let cost = fields["Cost"];
      let url = fields["URL"];
      let photo = "assets/placeholder.png";
      if (fields["Photo"]) {
        photo = fields["Photo"][0].url;
      }
      const articleHTML = `
        <article class="card detail">
          <div class="row gx-5">
            <div class="col-sm-12 col-md-4">
              <figure>
                <div class="img-container">
                  <img src="SRC" class="card-img-top" alt="Card image">
                </div>
                <figcaption>DESCRIPTION</figcaption>
              </figure>
            </div>
            <div class="col-sm-12 col-md-8">
              <h2>NAME</h2>
              <ul>
                <li>Address: ADDRESS</li>
                <li>Location Type: TYPE</li>
                <li>Hours: HOURS</li>
                <li>Contact: CONTACT</li>
                <li>Sensory Level: SENSORY</li>
                <li>Cost: COST</li>
                <li>Best for Ages: AGES</li>
                <li>Indoor/Outdoor: IN-OUT</li>
              </ul>
            </div>
          </div>
        </article>
      `;

      const article = articleHTML
        .replace("DESCRIPTION", description)
        .replace("SRC", photo)
        .replace("NAME", name)
        .replace("ADDRESS", address)
        .replace("TYPE", type)
        .replace("HOURS", hours)
        .replace("CONTACT", contact)
        .replace("SENSORY", sensory)
        .replace("COST", cost)
        .replace("AGES", ages)
        .replace("IN-OUT", inOut);

      let newHtml = article;

      jobsResultElement.innerHTML = newHtml;
    });
}

// look up window.location.search and split, so this would take
// https://dmspr2021-airtable-app.glitch.me/index.html?id=receHhOzntTGZ44I5
// and look at the ?id=receHhOzntTGZ44I5 part, then split that into an array
// ["?id=", "receHhOzntTGZ44I5"] and then we only choose the second one
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  // has at least ["?id=", "OUR ID"]

  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  getAllRecords(); // no id given, fetch summaries
}
