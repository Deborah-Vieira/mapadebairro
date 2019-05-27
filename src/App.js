import React, { Component } from "react";
import styles from "./App.css";
import { getGoogleMaps, load_places } from "./utils"; //importando uma função
import Sidebar from "./Component/Sidebar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.filterVenues = this.filterVenues.bind(this);
  }

  //obtendo dados do google getGoogleMaps
  componentDidMount() {
    let googleMapsPromise = getGoogleMaps();
    let placesPromise = load_places();
    //chamo a função que busca lugares no foursquare e guardo na variavel lugarPromisse

    //aqui retorna dentro desse array todos esses valores o objeto mapa e foursquare(lugares)
    Promise.all([googleMapsPromise, placesPromise])
      .then(values => {
        let google = values[0]; //atribuindo para essa variavel o array map
        this.venues = values[1].response.venues; //atribuindo para essa variavel o array venue

        //estou armazenando nas propriedades do componente e nao no estado.
        this.google = google;
        this.markers = [];
        this.infowindow = new google.maps.InfoWindow(); //janela de informação do marcador,
        //criando um mapa
        this.map = new google.maps.Map(document.getElementById("map"), {
          zoom: 9,
          scrollwheel: true,
          center: {
            lat: this.venues[0].location.lat,
            lng: this.venues[0].location.lng
          }
        });

        //para cada lugar CHAMADO VENUE eu estou criando um marcador , o position é um objeto que passa os dados pertinentes a cada lugar com sua localização ou seja suas props(propriedades), posso adcionar outras propriedades para esse objeto
        this.venues.forEach(venue => {
          let marker = new google.maps.Marker({
            position: { lat: venue.location.lat, lng: venue.location.lng },
            map: this.map,
            venue: venue,
            id: venue.id,
            name: venue.name,
            animation: google.maps.Animation.DROP
          });

          //função que mostra uma tela de informações do marcador, a animação aqui é quando eu clico e ele pula para eu saber que ele foi clicado
          marker.addListener("click", () => {
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(google.maps.Animation.BOUNCE);
            }
            setTimeout(() => {
              marker.setAnimation(null);
            }, 1500);
          });

          google.maps.event.addListener(marker, "click", () => {
            this.infowindow.setContent(marker.name);
            // this.map.setZoom(13);
            this.map.setCenter(marker.position);
            this.infowindow.open(this.map, marker);
            this.map.panBy(0, -125);
          });

          this.markers.push(marker); //empurrando os marcadores
        });
        //aqui setará um estado, onde mais abaixo faço uma função que só será atendida se esse estado aqui nao for vazio, os locais serão locais e causa um renrender atualizando o app
        this.setState({ filteredVenues: this.venues });
        //estou colocando o this na frente de todos os venues porque eu quero ter uma copia da lista
        //console.log(values);
      })
      .catch(erro =>
        alert(
          `Erro! Os lugares nao foram carregados corretamente. Tente novamente mais tarde.-> ${erro}`
        )
      ); //melhorar esse erro
  }
  //O nome  de um marcador que é igual ao id do local dele, como id é unico, ele só pode me retornar 1 por vez
  //o que esse metodo faz é pegar o marcador com sua localização e associar com cada item da lista
  listItemClick = venue => {
    let marker = this.markers.filter(m => m.id === venue.id)[0];
    //quando eu clicar vou setar o estado do marcador então vou conseguir anima-lo assim como quando começa a renderização da minha aplicação
    this.infowindow.setContent(marker.name);
    this.map.setCenter(marker.position);
    this.infowindow.open(this.map, marker);
    this.map.panBy(0, -125);
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(this.google.maps.Animation.BOUNCE);
    }
    setTimeout(() => {
      marker.setAnimation(null);
    }, 1500);
    //console.log(marker);
  };

  //metodo que vai filtrar os marcadores para que eu possa filtrar os locais, nesse momento quando eu seto o estado de query o que eu digito aparece no input
  //vou criar um foreach para cada marcador para acessa-los
  // na linha 76 nome de todos os locais onde o nome inclui a query certa, faço uma logica no campo de busca para filtrar os marcadores e a lista

  filterVenues(query) {
    let f = this.venues.filter(venue =>
      venue.name.toLowerCase().includes(query.toLowerCase())
    );
    this.markers.forEach(marker => {
      marker.name.toLowerCase().includes(query.toLowerCase()) === true
        ? marker.setVisible(true)
        : marker.setVisible(false);
      // console.log(marker);
    });

    this.setState({ filteredVenues: f, query }); //isso passa o estado e atualiza no campo input, assim pesquiso o nome do local e ele identifica e mostra o marcador correspondente na tela.
    console.log(query);
  }

  render() {
    return (
      <div>
        <div aria-label="location" role="application" id="map" />
        <Sidebar
          filterVenues={this.filterVenues}
          listItemClick={this.listItemClick}
          filteredVenues={this.state.filteredVenues}
        />
        )) }
      </div>
    );
  }
}

export default App;
