import React from "react";

import "./Mort.scss"

import personnage from "../../resources/personnage.png"

export default class Mort extends React.Component {

    componentDidMount() {

        for (let i = 0; i < 5; i++) {
            let canvas = document.getElementById(`canvas-${i}`);
            let ctx = canvas.getContext("2d");
            let img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = personnage;
            img.onload = () => {
                let y = (i < 4) ? 4 : 82;
                let x = (i === 4) ? 5 : 67*i + 5;
                ctx.drawImage(img, x, y, 62, 72, 0, 0, 62, 72);
            }
        }
        if (localStorage.length === 0) {
            for (let i = 0; i < 5; i++) {
                localStorage.setItem(`player-${i}`, "0");
            }
        } else {
            for (let i = 0; i < 5; i++) {
                let player = localStorage.getItem(`player-${i}`);
                document.getElementById(`mortCount-${i}`).innerText = player;
            }
        }

    }

    addDeath = (e) => {
        let target = e.target;
        let p = target.parentElement.parentElement.children[2];
        let count = parseInt(p.innerText);
        count++;
        p.innerText = count;
        localStorage.setItem(p.parentElement.id, count);
    }

    removeDeath = (e) => {
        let target = e.target;
        let p = target.parentElement.parentElement.children[2];
        let count = parseInt(p.innerText);
        if (count > 0) {
            count--;
            p.innerText = count;
            localStorage.setItem(p.parentElement.id, count);
        }
    }

    render() {
        let tabName = ["Tristan", "Raphael", "Ilan", "Killian", "Victor"]
        let tab = []
        for (let i = 0; i < 5; i++) {
            tab.push(
                <div id={`player-${i}`} key={`player-${i}`}>
                    <p>{tabName[i]}</p>
                    <canvas id={`canvas-${i}`} width={62} height={72}/>
                    <p id={`mortCount-${i}`}>0</p>
                    <div className="button">
                        <button onClick={this.addDeath}>Ajouter Mort</button>
                        <button onClick={this.removeDeath}>Supprimer Mort</button>
                    </div>
                </div>
            )
        }

        return <div id="mort">
        <h1>Compteur de Mort</h1>
            <div id="morts">
                {tab}
            </div>
        </div>
    }
}