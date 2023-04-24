var centers;

const xhttp = new XMLHttpRequest();
xhttp.open("GET", "json/centres_esportius.json", true);
xhttp.send();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    centers = JSON.parse(this.responseText);

    displayCenters();
  }
};

function displayCenters() {
  console.log(centers);

  const row = document.createElement("div");
  row.classList.add("row");
  centers.sport_centers.forEach((center) => {
    center.organitzations.forEach((organization) => {
      const col = document.createElement("div");
      col.classList.add("col-lg-3", "col-md-6");

      const team = document.createElement("div");
      team.classList.add(
        "team",
        "position-relative",
        "overflow-hidden",
        "mb-5"
      );

      const img = document.createElement("img");
      img.classList.add("img-fluid");
      img.setAttribute("src", organization.image);
      img.setAttribute("alt", "");

      const textContainer = document.createElement("div");
      textContainer.classList.add("position-relative", "text-center");

      const teamText = document.createElement("div");
      teamText.classList.add("team-text", "bg-primary", "text-white");

      const h5 = document.createElement("h5");
      h5.classList.add("text-white", "text-uppercase");
      h5.textContent = organization.name;

      const p = document.createElement("p");
      p.classList.add("m-0");
      p.textContent = organization.city;

      const teamSocial = document.createElement("div");
      teamSocial.classList.add("team-social", "bg-dark", "text-center");

      const twitter = document.createElement("a");
      twitter.classList.add("btn", "btn-outline-primary", "btn-square", "mr-2");
      twitter.setAttribute("href", organization.twitter);

      const twitterIcon = document.createElement("i");
      twitterIcon.classList.add("fab", "fa-twitter");

      const facebook = document.createElement("a");
      facebook.classList.add(
        "btn",
        "btn-outline-primary",
        "btn-square",
        "mr-2"
      );
      facebook.setAttribute("href", organization.facebook);

      const facebookIcon = document.createElement("i");
      facebookIcon.classList.add("fab", "fa-facebook-f");

      const instagram = document.createElement("a");
      instagram.classList.add("btn", "btn-outline-primary", "btn-square");
      instagram.setAttribute("href", organization.instagram);

      const instagramIcon = document.createElement("i");
      instagramIcon.classList.add("fab", "fa-instagram");

      row.appendChild(col);
      col.appendChild(team);
      team.appendChild(img);
      team.appendChild(textContainer);
      textContainer.appendChild(teamText);
      teamText.appendChild(h5);
      teamText.appendChild(p);
      textContainer.appendChild(teamSocial);
      teamSocial.appendChild(twitter);
      twitter.appendChild(twitterIcon);
      teamSocial.appendChild(facebook);
      facebook.appendChild(facebookIcon);
      teamSocial.appendChild(instagram);
      instagram.appendChild(instagramIcon);
    });
  });
  const container = document.getElementById("centers-container");
  container.appendChild(row);
}
