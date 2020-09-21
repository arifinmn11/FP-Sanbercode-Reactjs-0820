import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
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
import { UserContext } from '../Context/UserContext'


export default function App() {
    const [user] = useContext(UserContext)
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/movie" component={Movies} />
                    <Route exact path="/game" component={Games} />
                    <Route exact path="/register" render={() => (
                        user ?  <Redirect to="/" /> : <Register />
                    )} />
                    <Route exact path="/login" render={() => (
                        user ?  <Redirect to="/" /> : <Login />
                    )} />
                    <Route exact path="/movie/detail/:id" component={MovieDetail} />
                    <Route exact path="/game/detail/:id" component={GameDetail} />
                    <Route exact path="/edit-movie" render={() => (
                        user ? <TableMovie /> : <Redirect to="/" />
                    )} />
                    <Route exact path="/edit-game" render={() => (
                        user ? <TableGame /> : <Redirect to="/" />
                    )} />
                    <Route exact path="/change-password" render={() => (
                        user ? <ChangePassword /> : <Redirect to="/" />
                    )} />
                </Switch>
            </div>
        </Router>
    )
}
