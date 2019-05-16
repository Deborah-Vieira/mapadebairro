import React, { Component } from "react";
import { getGoogleMaps, buscaLugares } from "./utils"; //importando uma função

class App extends Component {
  //obtendo dados do google getGoogleMaps
  componentDidMount() {
    let googleMapaPromisse = getGoogleMaps();
    let lugarPromisse = buscaLugares(); //chamo a função que busca lugares no foursquare e guardo na variavel lugarPromisse


    //aqui retorna dentro desse array todos esses valores o objeto mapa e foursquare(lugares)
    Promise.all([googleMapaPromisse, lugarPromisse])
      .then(values => {
        let google = values[0]; //atribuindo para essa variavel o array map
        let venues = values[1].response.venues;//atribuindo para essa variavel o array venue

        //estou armazenando nas propriedades do componente e nao no estado, para ser mais facil o acesso
        this.google = google;
        this.marker = [];
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          scrollwheel: true,
          center: { lat: venues[0].location.lat, lng: venues[0].location.lng }
        });

        //para cada lugar eu estou criando um marcador , o position é um objeto que passa os dados pertinentes a cada lugar com sua localização ou seja suas props(propriedades), posso adcionar outras propriedades para esse objeto
        venues.forEach(venue => {
          let marker = new google.maps.Marker({
            position: { lat: venue.location.lat, lng: venue.location.lng },
            map: this.map,
            venue: venue,
            id: venue.id,
            name: venue.name,
            animation: google.maps.Animation.DROP
          });

        });


        console.log(values);
      });
  }

  render() {
    return (
      <div id="map">



      </div>
    );
  }
}

export default App;
