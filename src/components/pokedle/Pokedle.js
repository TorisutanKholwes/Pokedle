import React from "react";
import ReactDom from "react-dom/client";

import PokedleAnswer from "./PokedleAnswer";

import "./Pokedle.scss"

export default class Pokedle extends React.Component {

    listAnswer = [];
    answerRoot;

    constructor(props) {
        super(props);
        this.randomPokemonId = Math.floor(Math.random() * 1025) + 1;
        this.state = {
            data: [],
            listData: []
        }
    }

    componentDidMount() {
        this.fetchData();
        this.answerRoot = ReactDom.createRoot(document.getElementById("poke-answer"));
    }

    fetchData = async () => {
        const allPokemonResponse = await fetch(`https://tyradex.vercel.app/api/v1/pokemon`)
        const allPokemonData = await allPokemonResponse.json()
        let filtered = allPokemonData.filter(pokemon => this.getActiveGeneration().includes(pokemon.generation));
        let randomIndex = Math.floor(Math.random() * filtered.length);
        let randomPokemon = filtered[randomIndex].pokedex_id;
        this.randomPokemonId = randomPokemon;
        const response = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${this.randomPokemonId}`)
        const data = await response.json()
        this.setState({data: data})
        const responseList = await fetch(`https://tyradex.vercel.app/api/v1/pokemon`)
        const dataList = await responseList.json()
        this.setState({listData: dataList})
        return randomPokemon;
    }

    activeGeneration = (e) => {
        if (this.getActiveGeneration().length === 1 && e.target.classList.contains("active")) return;
        if (e.target.classList.contains("active")) {
            e.target.classList.remove("active");
        } else {
            e.target.classList.add("active");
        }
    }

    getActiveGeneration = () => {
        let gens = document.getElementsByClassName("starter");
        let actives = [];
        for (let i = 0; i < gens.length; i++) {
            if (gens[i].classList.contains("active")) {
                actives.push(i + 1);
            }
        }
        return actives;
    }

    regenerate = () => {
        this.fetchData();
        let answer = document.getElementById("poke-answer");
        answer.innerHTML = "";
        setTimeout(() => {
            console.log("New : " + this.randomPokemonId);
        }, 200)
    }

    showPokemon = () => {
        let input = document.getElementById("pokemon-list");
        input.style.display = "block";

    }

    hidePokemon = () => {
        setTimeout(() => {
            let input = document.getElementById("pokemon-list");
            input.style.display = "none";
        }, 150);
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

    checkKey = (e) => {
        if (e.key !== "Enter") return;
        let input = document.getElementById("poke-input");
        let value = input.value;
        let {listData} = this.state;
        let pokemon = listData.find(pokemon => pokemon.name.fr.toLowerCase() === value.toLowerCase() && this.getActiveGeneration().includes(pokemon.generation));
        if (pokemon) {
            this.validateAnswer(pokemon.pokedex_id);
        }
    }

    checkClick = (e) => {
        let target = e.target;
        if (target.tagName === "IMG" || target.tagName === "P") {
            target = target.parentElement;
        }
        let value = target.textContent;
        let {listData} = this.state;
        let pokemon = listData.find(pokemon => pokemon.name.fr.toLowerCase() === value.toLowerCase());
        if (pokemon) {
            this.validateAnswer(pokemon.pokedex_id);
        }
    }

    validateAnswer = (id) => {
        let input = document.getElementById("poke-input");
        input.value = "";
        input.blur();
        let pokemons = document.getElementsByClassName("pokemon-list-element");
        for (let i = 0; i < pokemons.length; i++) {
            pokemons[i].style.display = "flex";
        }
        document.getElementById("pokemon-list").style.height = "400px";
        this.hidePokemon();

        this.listAnswer.push(<PokedleAnswer key={this.listAnswer.length+1} pokemonId={id} goodAnswerId={this.randomPokemonId}/>);
        this.answerRoot.unmount();
        this.answerRoot = ReactDom.createRoot(document.getElementById("poke-answer"));
        console.log(this.listAnswer);
        this.answerRoot.render(<> {this.listAnswer.reverse()} </>);
        setTimeout(() => {
            this.listAnswer.reverse()
        }, 150)
    }

    render() {
        let {listData} = this.state;
        let startersIDs = [909, 813, 725, 653, 498, 390, 255, 155, 4].reverse()
        let gens = [];
        for (let i = 0; i < 9; i++) {
            gens.push(<img onClick={this.activeGeneration} key={`key-${i}`} className="starter active" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${startersIDs[i]}.png`} alt={`starter-${startersIDs[i]}`}/>)
        }
        return (
        <div className="pokedle">
            <h1 id="title">Pokedle</h1>
            <div id="generation">
                <div id="genlist">{gens}</div>
                <button id="valid-button" onClick={this.regenerate}>Valider</button>
            </div>
            <div id="input-div">
                <input id="poke-input" onFocus={this.showPokemon} onBlur={this.hidePokemon} onInput={this.updatePokemon} onKeyDown={this.checkKey} type="text"/>
                <div id="pokemon-list">
                    {listData.map(pokemon => {
                        if (pokemon.pokedex_id === 0) return;
                        if (this.getActiveGeneration().includes(pokemon.generation)) {
                            //return <div key={"poke-" + pokemon.pokedex_id}> {pokemon.name ? pokemon.name.fr : ""} </div>
                            return <div onClick={this.checkClick} key={"poke-" + pokemon.pokedex_id} className="pokemon-list-element">
                                <img
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokedex_id}.png`}
                                    alt=""/>
                                <p>{pokemon.name.fr}</p>
                            </div>
                        }
                    })}
                </div>
            </div>
            <div id="category">
                <p>Nom</p>
                <p>Photo</p>
                <p>Type 1</p>
                <p>Type 2</p>
                <p>Stade évolution</p>
                <p>Entièrement évolué</p>
                <p>Taux de capture</p>
                <p>Génération</p>
            </div>
            <div id="poke-answer">
                <PokedleAnswer pokemonId={6} goodAnswerId={this.randomPokemonId}/>
                <PokedleAnswer pokemonId={383} goodAnswerId={this.randomPokemonId}/>
                <PokedleAnswer pokemonId={364} goodAnswerId={this.randomPokemonId}/>
                <PokedleAnswer pokemonId={229} goodAnswerId={this.randomPokemonId}/>
                <PokedleAnswer pokemonId={this.randomPokemonId} goodAnswerId={this.randomPokemonId}/>
            </div>
        </div>
        );
    }
}