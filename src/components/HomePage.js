import React from "react";
import {Link} from "react-router-dom";

export default class HomePage extends React.Component {
    render() {
        return <div>
            <h1>Home Page</h1>
            <Link to="/pokedle">Pokedle Solo</Link>
        </div>
    }
}