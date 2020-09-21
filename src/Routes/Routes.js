import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Header from "../Components/Header"
import Home from "../Pages/Home"
import Movies from "../Pages/Movies"
import Games from "../Pages/Games"
import Register from "../Pages/Register"
import Login from "../Pages/Login"
import MovieDetail from '../Pages/MovieDetail';
import GameDetail from '../Pages/GameDetail'
import TableMovie from '../Pages/TableMovies'
import TableGame from '../Pages/TableGames'
import ChangePassword from '../Pages/ChangePassowrd'
export default function App() {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/movie" component={Movies} />
                    <Route exact path="/game" component={Games} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/movie/detail/:id" component={MovieDetail} />
                    <Route exact path="/game/detail/:id" component={GameDetail} />
                    <Route exact path="/edit-movie" component={TableMovie} />
                    <Route exact path="/edit-game" component={TableGame} />
                    <Route exact path="/change-password" component={ChangePassword} />
                </Switch>
            </div>
        </Router>
    )
}
