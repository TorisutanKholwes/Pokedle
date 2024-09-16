import React from "react";

import "./PokedleAnswer.scss"

export default class PokedleAnswer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.pokemonId = props.pokemonId;
        this.goodAnswerId = props.goodAnswerId;

    }

    componentDidMount() {
        this.fetchData();
        /*let answerContent = [<div className="pokemon-image"><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonId}.png`} alt=""/></div>]
        fetch(`https://tyradex.vercel.app/api/v1/pokemon/${this.pokemonId}`).then(res => res.json())
            .then(data => {
                answerContent.push(<div className="poke-type1">`${data.types[0].name}`</div>)
            })*/
    }

    fetchData = async () => {
        const response = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${this.pokemonId}`)
        const data = await response.json()
        this.setState({data: data})
    }

    render() {
        const {data } = this.state;
        console.log(data.evolution && data.evolution.pre ? "oui" : "non" )
        return <div className="pokemon-answer">
            <div className="pokemon-image">
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonId}.png`} alt=""/></div>
                <p>{data.name ? data.name.fr : ""}</p>
            <div className="poke-type1">
                {data.types ? data.types[0].name : ""}
            </div>
            <div className="poke-type2">
                {data.types && data.types.length === 2 ? data.types[1].name : "Aucun"}
            </div>
            <div className="poke-evolution-stade">
                {data.evolution ? data.evolution.pre ? data.evolution.pre.length : "1" : "1"}
            </div>
            <div className="poke-is-end-evolution"/>
            {data.evolution ? data.evolution.next ? "Non" : "Oui" : "Oui"}
            <div className="poke-color"/>
            <div className="poke-generation"/>
        </div>
    }
}