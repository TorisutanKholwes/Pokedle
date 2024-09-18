import React from "react";

import arrow from "../../resources/arrow.png"

import "./PokedleAnswer.scss"

export default class PokedleAnswer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            goodAnswerData: []
        }
        this.pokemonId = props.pokemonId;
        this.goodAnswerId = props.goodAnswerId;
        this.id = props.id;

    }

    componentDidMount() {
        this.fetchData();
        setTimeout(() => {
            console.log(document.getElementsByClassName("poke-type1")[0].innerHTML);
        }, 175)
    }

    fetchData = async () => {
        const responseInput = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${this.pokemonId}`)
        const dataInput = await responseInput.json()
        const responseGoodAnswer = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${this.goodAnswerId}`)
        const dataGoodAnswer = await responseGoodAnswer.json()
        this.setState({data: dataInput, goodAnswerData: dataGoodAnswer})
    }

    render() {
        const random = Math.floor(Math.random() * 50) + 1;
        const getFloat = (info) => {
            return parseFloat(info.split(" ")[0].replace(",", "."))
        }
        let imageUrl = (random === 1) ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${this.pokemonId}.png` : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemonId}.png`;
        const { data, goodAnswerData } = this.state;
        let type1 = data.types && goodAnswerData.types ? data.types[0].name === goodAnswerData.types[0].name ? "correct" : goodAnswerData.types.length === 2 && goodAnswerData.types[1].name === data.types[0].name ? "mid" : "wrong" : "wrong";
        let type2 = data.types && goodAnswerData.types ? (data.types.length === 1 && goodAnswerData.types.length === 1) || ((data.types.length === 2 && goodAnswerData.types.length === 2) && data.types[1].name === goodAnswerData.types[1].name) ? "correct" : data.types.length === 2 && data.types[1].name === goodAnswerData.types[0].name ? "mid" : "wrong" : "wrong";

        // Evolution stade
        let dataStade = data.evolution ? data.evolution.pre ? data.evolution.pre.length+1 : 1 : 1;
        let goodAnswerStade = goodAnswerData.evolution ? goodAnswerData.evolution.pre ? goodAnswerData.evolution.pre.length+1 : 1 : 1;
        let evolutionStade = dataStade === goodAnswerStade ? "correct" : "wrong";
        let evolutionStadeDiff = (evolutionStade === "wrong") ? (dataStade - goodAnswerStade > 0) ? "less" : "more" : "";

        // End evolution
        let isEndEvolution = data.evolution ? data.evolution.next ? "Non" : "Oui" : "Oui";
        let goodAnswerIsEndEvolution = goodAnswerData.evolution ? goodAnswerData.evolution.next ? "Non" : "Oui" : "Oui";
        let endEvolution = isEndEvolution === goodAnswerIsEndEvolution ? "correct" : "wrong";

        let catchRate = data.catch_rate && goodAnswerData.catch_rate ? data.catch_rate === goodAnswerData.catch_rate ? "correct" : "wrong" : "wrong";
        let catchRateDiff = (catchRate === "wrong") ? (data.catch_rate && goodAnswerData.catch_rate ? data.catch_rate - goodAnswerData.catch_rate > 0 ? "less" : "more" : "") : ""

        let weight = data.weight && goodAnswerData.weight ? getFloat(data.weight) === getFloat(goodAnswerData.weight) ? "correct" : "wrong" : "wrong";
        let weightDiff = (weight === "wrong") ? (data.weight && goodAnswerData.weight ? getFloat(data.weight) - getFloat(goodAnswerData.weight) > 0 ? "less" : "more" : "") : ""

        let height = data.height && goodAnswerData.height ? getFloat(data.height) === getFloat(goodAnswerData.height) ? "correct" : "wrong" : "wrong";
        let heightDiff = (height === "wrong") ? (data.height && goodAnswerData.height ? getFloat(data.height) - getFloat(goodAnswerData.height) > 0 ? "less" : "more" : "") : ""

        let gen = data.generation && goodAnswerData.generation ? data.generation === goodAnswerData.generation ? "correct" : "wrong" : "wrong";
        let genDiff = (gen === "wrong") ? (data.generation && goodAnswerData.generation ? data.generation - goodAnswerData.generation > 0 ? "less" : "more" : "") : ""

        return <div className="pokemon-answer" id={this.id}>
            <div className="poke-name">{data.name ? data.name.fr : ""}</div>
            <div className="poke-image">
                <img src={`${imageUrl}`} alt=""/>
            </div>
            <div className={`poke-type1 ${type1} poke-hide`}>
                {data.types ? data.types[0].name : ""}
            </div>
            <div className={`poke-type2 ${type2} poke-hide`}>
                {data.types && data.types.length === 2 ? data.types[1].name : "Aucun"}
            </div>
            <div className={`poke-evolution-stade ${evolutionStade} ${evolutionStadeDiff} poke-hide`}>
                {data.evolution ? data.evolution.pre ? data.evolution.pre.length+1 : "1" : "1"}
                {evolutionStadeDiff !== "" ? <img className={`arrow ${evolutionStadeDiff}`} src={arrow} alt={"Arrow"} /> : "" }
            </div>
            <div className={`poke-is-end-evolution ${endEvolution} poke-hide`}>
                {data.evolution ? data.evolution.next ? "Non" : "Oui" : "Oui"}
            </div>
            <div className={`poke-catchrate ${catchRate} ${catchRateDiff} poke-hide`}>
                {data.catch_rate ? data.catch_rate : ""}
                {catchRateDiff !== "" ? <img className={`arrow ${catchRateDiff}`} src={arrow} alt={"Arrow"} /> : "" }
            </div>
            <div className={`poke-weight ${weight} ${weightDiff}`}>
                {data.weight ? getFloat(data.weight) + " kg" : ""}
                {weightDiff !== "" ? <img className={`arrow ${weightDiff}`} src={arrow} alt={"Arrow"} /> : "" }
            </div>
            <div className={`poke-height ${height} ${heightDiff}`}>
                {data.height ? getFloat(data.height) + " m" : ""}
                {heightDiff !== "" ? <img className={`arrow ${heightDiff}`} src={arrow} alt={"Arrow"} /> : "" }
            </div>
            <div className={`poke-generation ${gen} ${genDiff} poke-hide`}>
                {data.generation ? data.generation : ""}
                {genDiff !== "" ? <img className={`arrow ${genDiff}`} src={arrow} alt={"Arrow"} /> : "" }
            </div>
        </div>
    }
}