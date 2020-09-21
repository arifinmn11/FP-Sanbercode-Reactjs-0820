import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Banner from "../Components/Banner"
import { Grid, CardMedia, Card, CardActionArea, CardContent, Typography, CardActions, Button } from "@material-ui/core"
import { Link } from "react-router-dom";

const Home = () => {
    const [Movies, setMovies] = useState(null);
    const [Games, setGames] = useState(null);
    useEffect(() => {
        if (Games === null) {
            axios
                .get("https://backendexample.sanbersy.com/api/data-game")
                .then((res) => {
                    if (res.status === 200) {
                        setGames(res.data);
                    }

                });
        }
    }, [Games]);
    useEffect(() => {
        if (Movies === null) {
            axios
                .get("https://backendexample.sanbersy.com/api/data-movie")
                .then((res) => {
                    if (res.status === 200) {
                        setMovies(res.data);
                    }
                });
        }
    }, [Movies]);

    return (
        <div>
            <Banner />
            <div style={{ textAlign: "center", margin: "20px auto" }}>
                <h1 style={{ color: "white", fontWeight: "800" }}> New Movies </h1>
            </div>
            <div>
                <Grid container
                    direction="row"
                    justify="center">
                    {Movies &&
                        Movies.map((item, i) => {
                            return (
                                i <= 2 ?
                                    <Grid key={i} style={{ margin: "10px 20px" }} item xs={8} md={3}>
                                        <Card style={{ backgroundColor: "black" }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    image="/static/images/cards/contemplative-reptile.jpg"
                                                    title="Contemplative Reptile"
                                                />
                                                <img style={{ width: "100%", height: "200px", objectFit: "cover" }} src={item.image_url} alt="gambar" />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2" style={{ color: "white" }}>
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="body2" style={{ color: "white" }} component="p">
                                                        Genre : {item.genre} <br />
                                                        Year : {item.year} <br />
                                                        Rating : {item.rating} <br />
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions style={{ float: "right", margin: "0 10px" }}>
                                                <Button variant="outlined" color="secondary">
                                                    <Link style={{ color: "#f50057" }} to={`/movie/detail/${item.id}`}>More</Link>
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    : null
                            )
                        })}
                </Grid>
                <div style={{ textAlign: "center", margin: "20px auto" }}>
                    <h1 style={{ color: "white", fontWeight: "800" }}> New Games </h1>
                </div>
                <Grid container
                    direction="row"
                    justify="center">
                    {Games &&
                        Games.map((item, i) => {
                            return (
                                i <= 2 ?
                                    <Grid key={i} style={{ margin: "10px 20px" }} item xs={8} md={3}>
                                        <Card style={{ backgroundColor: "black" }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    image="/static/images/cards/contemplative-reptile.jpg"
                                                    title="Contemplative Reptile"
                                                />
                                                <img style={{ width: "100%", height: "200px", objectFit: "cover" }} src={item.image_url} alt="gambar" />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2" style={{ color: "white" }}>
                                                        {item.name}
                                                    </Typography>
                                                    <Typography variant="body2" style={{ color: "white" }} component="p">
                                                        Genre : {item.genre} <br />
                                                        Release : {item.release} <br />
                                                        Platform : {item.platform} <br />
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions style={{ float: "right", margin: "0 10px" }}>
                                                <Button variant="outlined" color="secondary">
                                                    <Link style={{ color: "#f50057" }} to={`/game/detail/${item.id}`}>More</Link>
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    : null
                            )
                        })}
                </Grid>
            </div>
        </div>
    )
}

export default Home
