import React from "react";

import PokedleAnswer from "./PokedleAnswer";

import "./Pokedle.scss"

export default class Pokedle extends React.Component {
    test = (e) => {
        if (e.target.classList.contains("active")) {
            e.target.classList.remove("active");
        } else {
            e.target.classList.add("active");
        }
    }

    render() {
        let startersIDs = [909, 813, 725, 653, 498, 390, 255, 155, 4].reverse()
        let gens = [];
        for (let i = 0; i < 9; i++) {
            gens.push(<img onClick={this.test} key={`key-${i}`} className="starter active" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${startersIDs[i]}.png`} alt={`starter-${startersIDs[i]}`}/>)
        }
        return (
        <div className="pokedle">
            <h1>Pokedle</h1>
            <div id="generation">
                <div id="genlist">{gens}</div>
                <button id="valid-button">Valider</button>
            </div>
            <div id="input-div">
                <input type="text"/>
                <div id="autocomplete-pokemon"/>
            </div>
            <PokedleAnswer pokemonId={6} goodAnswerId={255}/>
            <PokedleAnswer pokemonId={383} goodAnswerId={255}/>
        </div>
        );
    }
}