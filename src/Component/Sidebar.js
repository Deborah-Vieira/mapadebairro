import React, { Component } from "react";

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div aria-label="location" role="application" id="sidebar">
          {" "}
          {/*aqui vai um aria label e todas as divs */}
          <input
            id="input"
            aria-label="Encontre sua comida favorita..."
            placeholder="Encontre sua comida favorita..."
            value={this.props.query}
            onChange={e => this.props.filterVenues(e.target.value)}
          />
          <br />
          <br />
          {/*aqui e m baixo faço uma condição: pego o meu estado e verifico o tamanho dele, ou seja se nao esta vazio(maior que 0. então faço um map gerando uma nova array que dela vou pegar  apenas o nome do local, cada vez que o map passar  e renderizo cada item em minha lista) */}
          {this.props.filteredVenues &&
            this.props.filteredVenues.length > 0 &&
            this.props.filteredVenues.map((venue, index) => (
              <div
                tabIndex="1"
                key={index}
                className="venue-item"
                onClick={() => {
                  this.props.listItemClick(venue);
                }}
              >
                {venue.name}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Sidebar;
