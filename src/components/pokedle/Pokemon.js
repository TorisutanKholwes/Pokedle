export default class Pokemon {

    constructor(data) {
        this.data = data;
        this.name = data.name ? data.name.fr : "";
        this.id = data.id;
        this.sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.id}.png`;
        this.types = data.types.map(type => type.name);
        this.evolutionStade = data.evolution && data.evolution.pre ? data.evolution.pre.length : 1 ;
        this.isEndEvolution = !(data.evolution && data.evolution.next);
        this.catchRate = data.catch_rate;
        this.generation = data.generation;
    }
}