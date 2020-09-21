import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import axios from 'axios';
import { Grid, Paper } from '@material-ui/core'

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null)
    useEffect(() => {
        if (movie === null) {
            axios
                .get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
                .then(res => {
                    if (res.status === 200) {
                        setMovie(res.data)
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
                <Grid item xs={12}> <h1 style={{ color: style.text, textAlign: "center", marginTop: "20px" }}> {movie ? movie.title : "-"} </h1>
                </Grid>
                <Grid style={{ margin: "20px auto" }} item md={4} xs={12}>
                    <Paper elevation={0} />
                    <img src={movie ? (movie.image_url ? movie.image_url : "-") : null } alt="img" style={{ width: "90%", margin: "0 auto", display: "block" }} />
                    <Paper />
                </Grid>
                <Grid style={{ margin: "20px 20px" }} item md={7} xs={12}>
                    <p style={{ color: style.text }}> Year : {movie ? (movie.year ? movie.year : "-") : null} </p>
                    <p style={{ color: style.text }}> Genre : {movie ? (movie.genre ? movie.genre : "-") : null} </p>
                    <p style={{ color: style.text }}> Rating : {movie ? (movie.rating ? movie.rating : "-") : null} </p>
                    <p style={{ color: style.text }}> Description : </p>
                    <p style={{ color: style.text }}> {movie ? (movie.description ? movie.description : "-") : null} </p>
                    <p style={{ color: style.text }}>Review :</p>
                    <p style={{ color: style.text }}>  {movie ? (movie.review ? movie.review : "-") : null} </p>
                </Grid>
            </Grid>
        </div>
    )
}

export default MovieDetail
