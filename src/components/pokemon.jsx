import React from "react";
import "../styles/detalles.css";

//***** Componente para Crear Pokemons ****

function Pokemon(props) {
  return (
    <div>
      <img
        style={{ width: "150px" }}
        src={props.avatar}
        alt={props.nombre}
      ></img>
      <h4>{props.nombre.toUpperCase()}</h4>
      <p>
        <b>id:</b> {props.id}
        <br></br>
        <b>Altura:</b> {props.altura}
        <br></br>
        <b>Peso:</b> {props.peso}
        <br></br>
        <b>Experiencia:</b> {props.experiencia}
        <br></br>
        <b>Habilidades:</b> {props.habilidades}
        <br></br>
      </p>
    </div>
  );
}

export default Pokemon;
