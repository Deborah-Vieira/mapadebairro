import { tsRestType } from "@babel/types";

export function getGoogleMaps() {
  return new Promise(resolve => {
    window.resolveGoogleMapsPromise = () => {
      resolve(window.google);
      delete window.resolveGoogleMapsPromise;
    };
    const script = document.createElement("script");
    const API = "AIzaSyCizCkZS0qPzj1i5QQ7zoeD8gkZ1tscUgU";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}

//FUNÇÃO PEGA DADOS DA API FOURSQUARE
export function buscaLugares() {
  let city = "Silver Spring, MD";
  let query = "Shopping";
  var apiURL =
    "https://api.foursquare.com/v2/venues/search?client_id=R54VZH1EHZB4R4SBGYBEA2DBLRDXVFLKVGPAVZHGHQ34KNMS&client_secret=EUVHLJLLA340F4XL51MQSSJS2VVXVNNLR302DQ0LNPJZPYR2&v=20130815%20&limit=50&near=" +
    city + "&query=" + query +
    "";
  return fetch(apiURL).then(resp => resp.json());
}
