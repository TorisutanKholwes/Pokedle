import React from "react";

import "./PokemonList.scss"

export default class PokemonList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.generations = props.generations;
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch(`https://tyradex.vercel.app/api/v1/pokemon`)
        const data = await response.json()
        this.setState({data: data})
    }

    showPokemon = () => {
        let input = document.getElementById("pokemon-list");
        input.style.display = "block";

    }

    hidePokemon = () => {
        let input = document.getElementById("pokemon-list");
        input.style.display = "none";
    }

    updatePokemon = (e) => {
        let input = e.target.value;
        let pokemons = document.getElementsByClassName("pokemon-list-element");
        let showedPokemon = 0;
        for (let i = 0; i < pokemons.length; i++) {
            let pokemon = pokemons[i];
            if (pokemon.textContent.toLowerCase().startsWith(input.toLowerCase())) {
                pokemon.style.display = "flex";
                showedPokemon++;
            } else {
                pokemon.style.display = "none";
            }
        }
        let list = document.getElementById("pokemon-list");
        if (showedPokemon < 4) {
            list.style.height = "auto";
        } else if (showedPokemon >= 4 && list.style.height === "auto") {
            list.style.height = "400px";
        }
    }

    render() {
        let { data } = this.state;
        return <>
            <input onFocus={this.showPokemon} onBlur={this.hidePokemon} onInput={this.updatePokemon} type="text"/>
            <div id="pokemon-list">
                {data.map(pokemon => {
                    if (pokemon.pokedex_id === 0) return;
                    if (this.generations.includes(pokemon.generation)) {
                        //return <div key={"poke-" + pokemon.pokedex_id}> {pokemon.name ? pokemon.name.fr : ""} </div>
                        return <div key={"poke-" + pokemon.pokedex_id} className="pokemon-list-element">
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokedex_id}.png`}
                                alt=""/>
                            <p>{pokemon.name.fr}</p>
                        </div>
                    }
                })}
            </div>
        </>
    }
}