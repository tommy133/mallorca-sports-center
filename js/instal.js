var centers;

const xhttp = new XMLHttpRequest();
xhttp.open("GET", "json/centres_esportius.json", true);
xhttp.send();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    centers = JSON.parse(this.responseText);

    console.log(centers);
  }
};
