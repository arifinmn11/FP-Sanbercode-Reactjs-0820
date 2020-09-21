import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import axios from 'axios';
import { Grid, Paper } from '@material-ui/core'

const GameDetail = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null)
    useEffect(() => {
        if (game === null) {
            axios
                .get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
                .then(res => {
                    if (res.status === 200) {
                        setGame(res.data)
                    }
                })
        }
    })
    const style = {
        text: "white"
    }

    return (
        <div style={{ margin: "40px auto", background: "black", width: "90%" }}>
            <Grid justify="center" container className="gameDetails" >
                <Grid item xs={12}> <h1 style={{ color: style.text, textAlign: "center", marginTop: "20px" }}> {game ? game.name : null} </h1>
                </Grid>
                <Grid style={{ margin: "20px auto" }} item md={4} xs={12}>
                    {/* <img src={game ? game.image_url : null} alt="img"/> */}
                    <Paper elevation={0} />
                    <img src={game ? game.image_url : null} alt="img" style={{ width: "90%", margin: "0 auto", display: "block" }} />
                    <Paper />
                </Grid>
                <Grid style={{ margin: "20px 20px" }} item md={7} xs={12}>
                    <p style={{ color: style.text }}> Platform : {game ? game.platform : "-"}</p>
                    <p style={{ color: style.text }}> Release : {game ? game.release : "-"} </p>
                    <p style={{ color: style.text }}> Genre : {game ? game.genre : "-"} </p>
                    <p style={{ color: style.text }}> Single Player : {game ? game.singlePlayer : "-"} </p>
                    <p style={{ color: style.text }}> Multi Player : {game ? game.multiplayer : "-"} </p>
                </Grid>
            </Grid>
        </div>
    )
}

export default GameDetail
