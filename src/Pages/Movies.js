import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, CardMedia, Card, CardActionArea, CardContent, Typography, CardActions, Button } from "@material-ui/core"
import { Link } from "react-router-dom";

const Movies = () => {
    const [Movies, setMovies] = useState(null);
    const [Search, setSearch] = useState({ title: "" })
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

    const handleSearch = (e) => {
        e.preventDefault();
        axios.get(`https://www.backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                let resMovies = res.data.map(el => {
                    return {
                        id: el.id,
                        title: el.title,
                        description: el.description,
                        year: el.year,
                        duration: el.duration,
                        genre: el.genre,
                        rating: el.rating,
                        image_url: el.image_url
                    }
                })

                let filteredMovies = resMovies.filter(
                    (x) =>
                        (x.title.toLowerCase().includes(Search.title.toLocaleLowerCase()) ||
                            x.title.toLowerCase().includes(Search.title.toLocaleLowerCase()) ||
                            x.genre.toLowerCase().includes(Search.title.toLocaleLowerCase())
                        )
                )
                setMovies([...filteredMovies])
            })
    }
    const handleOnChange = (e) => {
        var typein = e.target.name

        switch (typein) {
            case "search": {
                setSearch({ ...Search, title: e.target.value })
                break
            }
            default: {
                break
            }
        }
    }

    return (
        <div>
            <div style={{ position: "relative", textAlign: "center" }}>
                <img style={{ opacity: "0.5", width: "100%", height: "300px", objectFit: "cover" }} src="https://thebannercsi.files.wordpress.com/2019/04/disney-deadpool.jpg" alt="gambar" />
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <h1 style={{ color: "white", fontSize: "40px", fontWeight: "900" }}> MOVIES </h1>
                    <h3 style={{ color: "white", fontSize: "20px" }} > Movie List </h3>
                    <input style={{ width: "30vw", height: "36px", margin: "0 10px" }} type="text" placeholder="Search.." name="search" onChange={handleOnChange} />
                    <Button variant="outlined" color="secondary" onClick={handleSearch}>
                        Search
                    </Button>
                </div>
            </div>
            <div>
                <Grid container
                    direction="row"
                    justify="center"
                    // alignItems="center"
                    style={{ marginTop: "20px" }}
                >
                    {Movies !== null &&
                        Movies.map((item, i) => {
                            return (
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
                            )
                        })}
                </Grid>
            </div>
        </div>
    )
}

export default Movies
