import React, { useState, useEffect, useContext } from 'react'
import { Button, TextField, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Alert } from '@material-ui/lab';
import axios from 'axios'
import { UserContext } from '../Context/UserContext'

const TableGames = () => {
    const [user] = useContext(UserContext)
    const [games, setGames] = useState(null)
    const [search, setSearch] = useState({ name: "", release: "", genre: "" })
    const [Ingames, setIngames] = useState({ handle: "", id: "", name: "", platform: "", release: "", singlePlayer: "", genre: "", multiplayer: "", review: "", image_url: "" })
    const [notification, setNotification] = useState({ status: "", name: "", message: "" })
    useEffect(() => {
        if (games === null) {
            axios
                .get("https://backendexample.sanbersy.com/api/data-game")
                .then((res) => {
                    if (res.status === 200) {
                        setGames(res.data);
                    }
                });
        }
    }, [games]);
    const handleOnChange = (e) => {
        var typein = e.target.name
        switch (typein) {
            case "name": {
                setIngames({ ...Ingames, name: e.target.value })
                break
            }
            case "platform": {
                setIngames({ ...Ingames, platform: e.target.value })
                break
            }
            case "release": {
                setIngames({ ...Ingames, release: e.target.value })
                break
            }
            case "singlePlayer": {
                setIngames({ ...Ingames, singlePlayer: e.target.value })
                break
            }
            case "genre": {
                setIngames({ ...Ingames, genre: e.target.value })
                break
            }
            case "multiplayer": {
                setIngames({ ...Ingames, multiplayer: e.target.value })
                break
            }
            case "image_url": {
                setIngames({ ...Ingames, image_url: e.target.value })
                break
            }
            case "sTitle": {
                setSearch({ ...search, name: e.target.value })
                break
            }
            case "sRelease": {
                setSearch({ ...search, release: e.target.value })
                break
            }
            case "sGenre": {
                setSearch({ ...search, genre: e.target.value })
                break
            }
            default: {
                break
            }
        }
    }
    const handleEdit = (e, id) => {
        e.preventDefault();
        var data = (games.find((x) => x.id === id));
        setIngames({
            handle: "Edit",
            id: data.id,
            name: data.name,
            platform: data.platform,
            release: data.release,
            singlePlayer: data.singlePlayer,
            genre: data.genre,
            multiplayer: data.multiplayer,
            image_url: data.image_url

        })
    }
    const handleCreate = (e) => {
        e.preventDefault();
        setIngames({ ...setIngames, handle: "Create" })
    }
    const submitForm = (e) => {
        e.preventDefault();
        var _token = user.token;
        if (Ingames.handle === "Edit") {
            axios
                .put(`https://backendexample.sanbersy.com/api/data-game/${Ingames.id}`,
                    {
                        name: Ingames.name,
                        platform: Ingames.platform,
                        release: Ingames.release,
                        singlePlayer: Ingames.singlePlayer,
                        genre: Ingames.genre,
                        multiplayer: Ingames.multiplayer,
                        image_url: Ingames.image_url
                    },
                    { headers: { "Authorization": `Bearer ${_token}` } })
                .then(res => {
                    var updateGames = games.find((x) => x.id === Ingames.id);
                    updateGames.name = Ingames.name
                    updateGames.platform = Ingames.platform
                    updateGames.release = Ingames.release
                    updateGames.singlePlayer = Ingames.singlePlayer
                    updateGames.genre = Ingames.genre
                    updateGames.multiplayer = Ingames.multiplayer
                    updateGames.image_url = Ingames.image_url
                    setGames([...games]);
                    setIngames({
                        id: "",
                            name: "",
                            platform: "",
                        release: "",
                        singlePlayer: "",
                        genre: "",
                        multiplayer: "",
                        image_url: "",
                    })
                    setNotification({   
                        status: "",
                        name: "",
                        message: ""
                    })
                })
                .catch((error) => {
                    setNotification({
                        status: false,
                        name: 'Failed!',
                        message: 'Something wrong when create data, please try again later!!'
                    })
                })
        } else if (Ingames.handle === "Create") {
            axios
                .post(`https://backendexample.sanbersy.com/api/data-game`,
                    {
                        name: Ingames.name,
                        platform: Ingames.platform,
                        release: Ingames.release,
                        singlePlayer: Ingames.singlePlayer,
                        genre: Ingames.genre,
                        multiplayer: Ingames.multiplayer,
                        image_url: Ingames.image_url
                    },
                    { headers: { "Authorization": `Bearer ${_token}` } })
                .then(res => {
                    setGames([
                        ...games,
                        {
                            name: res.data.name,
                            platform: res.data.platform,
                            release: res.data.release,
                            singlePlayer: res.data.singlePlayer,
                            genre: res.data.genre,
                            multiplayer: res.data.multiplayer,
                            image_url: res.data.image_url
                        }])
                    setIngames({
                        id: "",
                        name: "",
                        platform: "",
                        release: "",
                        singlePlayer: "",
                        genre: "",
                        multiplayer: "",
                        image_url: "",
                    })
                    setNotification({
                        status: "",
                        name: "",
                        message: ""
                    })
                })
                .catch((error) => {
                    setNotification({
                        status: false,
                        name: 'Failed!',
                        message: 'Something wrong when create data, please try again later!!'
                    })
                })
        }
    }
    const handleDelete = (e, id) => {
        e.preventDefault()
        axios
            .delete(`http://backendexample.sanbercloud.com/api/games/${id}`)
            .then((res) => {
                var newData = games.filter((x) => x.id !== id);
                setGames(newData);
            });
    }
    const handleCancel = (e) => {
        e.preventDefault();
        setIngames({ handle: "", id: "", name: "", platform: "", release: "", singlePlayer: "", genre: "", multiplayer: "", image_url: "" })
        setNotification({ status: "", name: "", message: "" })
    }
    const handleSearch = (e) => {
        e.preventDefault()
        setGames(games)
        axios.get(`https://www.backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                let resGames = res.data.map(el => {
                    return {
                        id: el.id,
                        name: el.name,
                        platform: el.platform,
                        release: el.release,
                        singlePlayer: el.singlePlayer,
                        genre: el.genre,
                        multiplayer: el.multiplayer,
                        image_url: el.image_url
                    }
                })

                let filteredGames = resGames.filter(
                    (x) =>
                        (x.release.toString().includes(search.release) &&
                            x.name.toLowerCase().includes(search.name.toLocaleLowerCase()) &&
                            x.genre.toLowerCase().includes(search.genre.toLocaleLowerCase())
                        )
                )
                setGames([...filteredGames])
            })
    }
    return (
        <div style={{ width: "95%", margin: "0 auto" }}>
            <Grid container
                direction="row"
                justify="space-between"
                style={{ margin: "20px 0" }}>
                {Ingames.handle &&
                    <Grid item xs={11}>
                        <form onSubmit={submitForm}>
                            <List component="nav" style={{ backgroundColor: "white", width: "100%", margin: "0 auto" }}>
                                <ListItem>
                                    <ListItemText primary={Ingames.handle} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <TextField
                                        name="name"
                                        label="Title"
                                        style={{ margin: 8 }}
                                        placeholder="Title ..."
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={Ingames.name ? Ingames.name : ""}
                                        onChange={handleOnChange}
                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        name="image_url"
                                        label="Image Url"
                                        style={{ margin: 8 }}
                                        placeholder="imag url ..."
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={Ingames.image_url ? Ingames.image_url : ""}
                                        onChange={handleOnChange}
                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        name="platform"
                                        label="Platform"
                                        style={{ margin: 8 }}
                                        placeholder="platform ..."
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={Ingames.platform ? Ingames.platform : ""}
                                        onChange={handleOnChange}
                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        name="release"
                                        label="Release"
                                        style={{ margin: 8 }}
                                        placeholder="release ..."
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={Ingames.release ? Ingames.release : ""}
                                        onChange={handleOnChange}
                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        name="singlePlayer"
                                        label="Single Player"
                                        style={{ margin: 8 }}
                                        placeholder="singlePlayer ..."
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={Ingames.singlePlayer ? Ingames.singlePlayer : ""}
                                        onChange={handleOnChange}
                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        name="genre"
                                        label="Genre"
                                        style={{ margin: 8 }}
                                        placeholder="genre ..."
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={Ingames.genre ? Ingames.genre : ""}
                                        onChange={handleOnChange}
                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        name="multiplayer"
                                        label="Multiplayer"
                                        style={{ margin: 8 }}
                                        placeholder="multiplayer ..."
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={Ingames.multiplayer ? Ingames.multiplayer : ""}
                                        onChange={handleOnChange}
                                    />
                                </ListItem>
                                {(notification.status === false) ? <ListItem><Alert style={{ width: "100%" }} severity="warning"> {notification.message} </Alert></ListItem> : null}
                                <ListItem>
                                    <Button type="submit" variant="outlined"> {Ingames.handle === "Create" ? "Create" : "Update"}  </Button>
                                    <Button variant="outlined" onClick={handleCancel}> Cancel </Button>
                                </ListItem>
                            </List>
                        </form>
                    </Grid>
                }
                {!Ingames.handle &&
                    <>
                        <Grid item xs={12} md={3} style={{ margin: "20px 0" }}>
                            <List component="nav" style={{ backgroundColor: "white", width: "98%" }}>
                                <ListItem>
                                    <ListItemText primary="Filter" />
                                    <Button variant="outlined" onClick={handleSearch}> Search </Button>
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <TextField name="sTitle" onChange={handleOnChange} fullWidth label="Title" variant="outlined" />
                                </ListItem>
                                <ListItem>
                                    <TextField name="sRelease" onChange={handleOnChange} fullWidth label="Release" variant="outlined" />
                                </ListItem>
                                <ListItem>
                                    <TextField name="sGenre" onChange={handleOnChange} fullWidth label="Genre" variant="outlined" />
                                </ListItem>
                            </List>
                        </Grid>

                        <Grid item xs={12} md={9} style={{ margin: "20px 0" }}>
                            <List component="nav" style={{ backgroundColor: "white", width: "98%" }}>
                                <ListItem>
                                    <ListItemText primary="Games" />
                                    <Button variant="outlined" onClick={handleCreate}> Create </Button>
                                </ListItem>
                                <Divider />
                            </List>
                            <TableContainer component={Paper} style={{ width: "98%" }}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell align="right">Release</TableCell>
                                            <TableCell align="right">Genre</TableCell>
                                            <TableCell align="right">Multiplayer</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            games && games.map((row, i) => (
                                                <TableRow key={i}>
                                                    <TableCell align="left"> {i + 1} </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.release}</TableCell>
                                                    <TableCell align="right">{row.genre}</TableCell>
                                                    <TableCell align="right">{row.multiplayer}</TableCell>
                                                    <TableCell align="center">
                                                        <Button variant="outlined" style={{ margin: "0 5px" }} onClick={(e) => handleEdit(e, row.id)}>
                                                            Edit
                                                        </Button>
                                                        <Button variant="outlined" style={{ margin: "0 5px" }} value={row.id} onClick={(e) => handleDelete(e, row.id)}>
                                                            Delete
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                    </>
                }

            </Grid>

        </div>
    )
}

export default TableGames
