import React, { Component } from "react";
import {
  IonApp,
  IonContent,
  IonRouterOutlet,
  setupIonicReact,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
} from "@ionic/react";
import Pokemon from "./pokemon";
import "../styles/boton.css";


class ConsultaPokemon extends Component {
  // ****** Propiedades ******* //
  state = {
    url: "https://pokeapi.co/api/v2/pokemon/",
    pokemons: [],
    next_url: null,
    previus_url: null,
    error: "",
  };

  //******** Funciones ********//

  numeroAleatorio = () => {
    let numero = Math.round(Math.random() * 3);
    if (numero === 0) {
      return 0;
    } else if (numero === 1) {
      return 1;
    } else {
      return -1;
    }
  };

  //******** Funciones para setState de cada propiedad ********//

  nextUrl = (url) => {
    this.setState({
      next_url: url,
    });
  };

  prevUrl = (url) => {
    this.setState({
      previus_url: url,
    });
  };

  errorMessage = (mensaje) => {
    this.setState({
      error: mensaje,
    });
  };

  addPokemon = (pokemon) => {
    this.setState((prevState) => ({
      pokemons: prevState.pokemons.concat(pokemon),
    }));
  };

  //******** Peticion a la Api de pokemon ********//

  ApiPokemon = (url) => {
    fetch(url)
      .then((respuesta) => {
        if (respuesta.ok) {
          return respuesta.json();
        } else {
          let mensaje = " No se pudo acceder a la informacion";
          throw new Error(mensaje);
        }
      })
      .then((json) => {
        json.results.sort(this.numeroAleatorio);
        this.prevUrl(json.previous);
        this.nextUrl(json.next);
        json.results.forEach((elemento) => {
          fetch(elemento.url)
            .then((respuesta) => {
              if (respuesta.ok) {
                return respuesta.json();
              } else {
                let mensaje =
                  " No se pudo acceder a la informacion del pokemon";
                throw new Error(mensaje);
              }
            })
            .then((json) => {
              let movimientos = [];
              json.abilities.forEach((mov) => {
                movimientos.push(mov.ability.name);
              });
              let pokemon = {
                id: json.id,
                nombre: json.name,
                experiencia: json.base_experience,
                altura: json.height,
                peso: json.weight,
                habilidades: movimientos,
                avatar: json.sprites.front_default,
              };
              this.addPokemon(pokemon);
            });
        });
      })
      .catch((e) => {
        this.errorMessage(e.message);
      });
  };

  //******** Funciones para paginas prev y next de la Api ********//

  nextPage = (url) => {
    this.setState({ pokemons: [] });
    this.ApiPokemon(url);
  };

  previusPage = (url) => {
    this.setState({ pokemons: [] });
    this.ApiPokemon(url);
  };

  componentDidMount() {
    this.ApiPokemon(this.state.url);
  }

  render() {
    return (
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center">
              <h1>LISTA DE POKEMONS ALEATORIOS</h1>
            </IonCol>
          </IonRow>
          <IonRow>
            {this.state.error != "" ? (
              <IonCol className="ion-text-center">
                <h2>{this.state.error}</h2>
              </IonCol>
            ) : (
              this.state.pokemons.map((elemento) => (
                <IonCol
                  key={elemento.id}
                  size="12"
                  sizeLg="6"
                  className="ion-text-center"
                >
                  <Pokemon
                    key={elemento.id}
                    id={elemento.id}
                    nombre={elemento.nombre}
                    altura={elemento.altura}
                    peso={elemento.peso}
                    habilidades={elemento.habilidades}
                    avatar={elemento.avatar}
                    experiencia={elemento.experiencia}
                  />
                </IonCol>
              ))
            )}
          </IonRow>
        </IonGrid>
        {this.state.error != "" ? null : (
          <div className="contenedor-botones">
            <IonButton
              className="botones"
              onClick={() =>
                this.state.previus_url === null
                  ? null
                  : this.previusPage(this.state.previus_url)
              }
            >
              Pagina Anterior
            </IonButton>
            <IonButton
              className="botones"
              onClick={() =>
                this.state.next_url === null
                  ? null
                  : this.nextPage(this.state.next_url)
              }
            >
              Pagina Siguiente
            </IonButton>
          </div>
        )}
      </IonContent>
    );
  }
}

export default ConsultaPokemon;
