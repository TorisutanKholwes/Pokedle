import React from "react";
import {createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./components/HomePage";
import Pokedle from "./components/pokedle/Pokedle";
import Mort from "./components/mort/Mort";

import "./App.scss"

export default class App extends React.Component {

    router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />
        },
        {
            path: "/pokedle",
            element: <Pokedle />
        },
        {
            path: "/mort",
            element: <Mort />
        }
        ]
    )

    render() {
        return <>
            <RouterProvider router={this.router}/>
        </>
    }
}