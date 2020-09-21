import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, CardMedia, Card, CardActionArea, CardContent, Typography, CardActions, Button } from "@material-ui/core"
import { Link } from "react-router-dom";

const Games = () => {
    const [Games, setGames] = useState(null)
    const [Search, setSearch] = useState({ search: "" })
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
    const handleOnChange = (e) => {
        var typein = e.target.name
        switch (typein) {
            case "search": {
                setSearch({ ...Search, search: e.target.value })
                break
            }
            default: {
                break
            }
        }
    }
    const handleSearch = (e) => {
        e.preventDefault();
        axios.get(`https://www.backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                let resGames = res.data.map(el => {
                    return {
                        id: el.id,
                        name: el.name,
                        genre: el.genre,
                        singlePlayer: el.singlePlayer,
                        multiplayer: el.multiplayer,
                        platform: el.platform,
                        release: el.release,
                        image_url: el.image_url
                    }
                })

                let filterGames = resGames.filter(
                    (x) =>
                        (
                            x.name.toLowerCase().includes(Search.search.toLocaleLowerCase()) ||
                            x.genre.toLowerCase().includes(Search.search.toLocaleLowerCase())
                            // x.singlePlayer.toLowerCase().includes(Search.search.toLocaleLowerCase()) ||
                            // x.multiplayer.toLowerCase().includes(Search.search.toLocaleLowerCase())
                            // x.release.toLowerCase().includes(Search.search.toLocaleLowerCase())
                        )
                )
                setGames([...filterGames])
            })
    }
    return (
        <div>
            <div style={{ position: "relative", textAlign: "center" }}>
                <img style={{ opacity: "0.5", width: "100%", height: "300px", objectFit: "cover" }} src="http://www.innersloth.com/Images/GAMES/AmongUs/banner_AmongUs.jpg" alt="gambar" />
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    <h1 style={{ color: "white", fontSize: "40px", fontWeight: "900" }}> Games </h1>
                    <h3 style={{ color: "white", fontSize: "20px" }} > Game List </h3>
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
                    {Games &&
                        Games.map((item, i) => {
                            return (
                                <Grid key={i} style={{ margin: "10px 20px" }} item xs={8} md={3}>
                                    <Card style={{ backgroundColor: "black" }}>
                                        <CardActionArea>
                                            <CardMedia />
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
                            )
                        })}
                </Grid>
            </div>
        </div>
    )
}

export default Games
