import React, { useState, useEffect, useContext } from 'react'
import { Button, TextField, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Alert } from '@material-ui/lab';
import axios from 'axios'
import { UserContext } from '../Context/UserContext'

const TableMovies = () => {
    const [user] = useContext(UserContext)
    const [movies, setMovies] = useState(null)
    const [search, setSearch] = useState({ title: "", year: "", genre: "" })
    const [Inmovies, setInmovies] = useState({ handle: "", id: "", title: "", description: "", year: "", duration: "", genre: "", rating: "", review: "", image_url: "" })
    const [notification, setNotification] = useState({ status: "", name: "", message: "" })
    useEffect(() => {
        if (movies === null) {
            axios
                .get("https://backendexample.sanbersy.com/api/data-movie")
                .then((res) => {
                    if (res.status === 200) {
                        setMovies(res.data);
                    }
                });
        }
    }, [movies]);

    const handleOnChange = (e) => {
        var typein = e.target.name
        switch (typein) {
            case "title": {
                setInmovies({ ...Inmovies, title: e.target.value })
                break
            }
            case "description": {
                setInmovies({ ...Inmovies, description: e.target.value })
                break
            }
            case "year": {
                setInmovies({ ...Inmovies, year: e.target.value })
                break
            }
            case "duration": {
                setInmovies({ ...Inmovies, duration: e.target.value })
                break
            }
            case "genre": {
                setInmovies({ ...Inmovies, genre: e.target.value })
                break
            }
            case "rating": {
                setInmovies({ ...Inmovies, rating: e.target.value })
                break
            }
            case "review": {
                setInmovies({ ...Inmovies, review: e.target.value })
                break
            }
            case "image_url": {
                setInmovies({ ...Inmovies, image_url: e.target.value })
                break
            }
            case "sTitle": {
                setSearch({ ...search, title: e.target.value })
                break
            }
            case "sYear": {
                setSearch({ ...search, year: e.target.value })
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
        var data = (movies.find((x) => x.id === id));
        setInmovies({
            handle: "Edit",
            id: data.id,
            title: data.title,
            description: data.description,
            year: data.year,
            duration: data.duration,
            genre: data.genre,
            rating: data.rating,
            review: data.review,
            image_url: data.image_url

        })
    }

    const handleCreate = (e) => {
        e.preventDefault();
        setInmovies({ ...setInmovies, handle: "Create" })
    }
    const submitForm = (e) => {
        e.preventDefault();
        var _token = user.token;
        if (Inmovies.handle === "Edit") {
            axios
                .put(`https://backendexample.sanbersy.com/api/data-movie/${Inmovies.id}`,
                    {
                        title: Inmovies.title,
                        description: Inmovies.description,
                        year: Inmovies.year,
                        duration: Inmovies.duration,
                        genre: Inmovies.genre,
                        rating: Inmovies.rating,
                        review: Inmovies.review,
                        image_url: Inmovies.image_url
                    },
                    { headers: { "Authorization": `Bearer ${_token}` } })
                .then(res => {
                    var updateMovies = movies.find((x) => x.id === Inmovies.id);
                    updateMovies.title = Inmovies.title
                    updateMovies.description = Inmovies.description
                    updateMovies.year = Inmovies.year
                    updateMovies.duration = Inmovies.duration
                    updateMovies.genre = Inmovies.genre
                    updateMovies.rating = Inmovies.rating
                    updateMovies.review = Inmovies.review
                    updateMovies.image_url = Inmovies.image_url
                    setMovies([...movies]);
                    setInmovies({
                        id: "",
                        title: "",
                        description: "",
                        year: "",
                        duration: "",
                        genre: "",
                        rating: "",
                        review: "",
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
        } else if (Inmovies.handle === "Create") {
            axios
                .post(`https://backendexample.sanbersy.com/api/data-movie`,
                    {
                        title: Inmovies.title,
                        description: Inmovies.description,
                        year: Inmovies.year,
                        duration: Inmovies.duration,
                        genre: Inmovies.genre,
                        rating: Inmovies.rating,
                        review: Inmovies.review,
                        image_url: Inmovies.image_url
                    },
                    { headers: { "Authorization": `Bearer ${_token}` } })
                .then(res => {
                    setMovies([
                        ...movies,
                        {
                            title: res.data.title,
                            description: res.data.description,
                            year: res.data.year,
                            duration: res.data.duration,
                            genre: res.data.genre,
                            rating: res.data.rating,
                            review: res.data.review,
                            image_url: res.data.image_url
                        }])
                    setInmovies({
                        id: "",
                        title: "",
                        description: "",
                        year: "",
                        duration: "",
                        genre: "",
                        rating: "",
                        review: "",
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
            .delete(`http://backendexample.sanbercloud.com/api/movies/${id}`)
            .then((res) => {
                var newData = movies.filter((x) => x.id !== id);
                setMovies(newData);
            });
    }
    const handleCancel = (e) => {
        e.preventDefault();
        setInmovies({ handle: "", id: "", title: "", description: "", year: "", duration: "", genre: "", rating: "", review: "", image_url: "" })
        setNotification({ status: "", name: "", message: "" })
    }
    const handleSearch = (e) => {
        e.preventDefault()
        setMovies(movies)
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
                        (x.year.toString().includes(search.year) &&
                            x.title.toLowerCase().includes(search.title.toLocaleLowerCase()) &&
                            x.genre.toLowerCase().includes(search.genre.toLocaleLowerCase())
                        )
                )
                setMovies([...filteredMovies])
            })
    }
    return (
        <div style={{ width: "95%", margin: "0 auto" }}>
            <Grid container
                direction="row"
                justify="space-between"
                style={{ margin: "20px 0" }}>
                {Inmovies.handle &&
                    <Grid item xs={11}>
                        <form onSubmit={submitForm}>
                            <List component="nav" style={{ backgroundColor: "white", width: "100%", margin: "0 auto" }}>
                                <ListItem>
                                    <ListItemText primary={Inmovies.handle} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <TextField
                                        name="title"
                                        label="Title"
                                        style={{ margin: 8 }}
                                        placeholder="Title ..."
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={Inmovies.title ? Inmovies.title : ""}
                                        onChange={handleOnChange}
                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        name="image_url"
                                        label="Image Url"
                                        style={{ margin: 8 }}
                                        placeholder="review ..."
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={Inmovies.image_url ? Inmovies.image_url : ""}
                                        onChange={handleOnChange}
                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        name="description"
                                        label="Description"
                                        style={{ margin: 8 }}
                                        placeholder="description ..."
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={Inmovies.description ? Inmovies.description : ""}
                                        onChange={handleOnChange}
                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        name="year"
                                        label="Year"
                                        style={{ margin: 8 }}
                                        placeholder="year ..."
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={Inmovies.year ? Inmovies.year : ""}
                                        onChange={handleOnChange}
                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        name="duration"
                                        label="Duration"
                                        style={{ margin: 8 }}
                                        placeholder="duration ..."
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={Inmovies.duration ? Inmovies.duration : ""}
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
                                        value={Inmovies.genre ? Inmovies.genre : ""}
                                        onChange={handleOnChange}
                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        name="rating"
                                        label="Rating"
                                        style={{ margin: 8 }}
                                        placeholder="rating ..."
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={Inmovies.rating ? Inmovies.rating : ""}
                                        onChange={handleOnChange}
                                    />
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        name="review"
                                        label="review"
                                        style={{ margin: 8 }}
                                        placeholder="review ..."
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        value={Inmovies.review ? Inmovies.review : ""}
                                        onChange={handleOnChange}
                                    />
                                </ListItem>
                                {(notification.status === false) ? <ListItem><Alert style={{ width: "100%" }} severity="warning"> {notification.message} </Alert></ListItem> : null}
                                <ListItem>
                                    <Button type="submit" variant="outlined"> {Inmovies.handle === "Create" ? "Create" : "Update"}  </Button>
                                    <Button variant="outlined" onClick={handleCancel}> Cancel </Button>
                                </ListItem>
                            </List>
                        </form>
                    </Grid>
                }
                {!Inmovies.handle &&
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
                                    <TextField name="sYear" onChange={handleOnChange} fullWidth label="Year" variant="outlined" />
                                </ListItem>
                                <ListItem>
                                    <TextField name="sGenre" onChange={handleOnChange} fullWidth label="Genre" variant="outlined" />
                                </ListItem>
                            </List>
                        </Grid>

                        <Grid item xs={12} md={9} style={{ margin: "20px 0" }}>
                            <List component="nav" style={{ backgroundColor: "white", width: "98%" }}>
                                <ListItem>
                                    <ListItemText primary="Movies" />
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
                                            <TableCell align="right">Year</TableCell>
                                            <TableCell align="right">Genre</TableCell>
                                            <TableCell align="right">Rating</TableCell>
                                            <TableCell align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            movies && movies.map((row, i) => (
                                                <TableRow key={i}>
                                                    <TableCell align="left"> {i + 1} </TableCell>
                                                    <TableCell component="th" scope="row">
                                                        {row.title}
                                                    </TableCell>
                                                    <TableCell align="right">{row.year}</TableCell>
                                                    <TableCell align="right">{row.genre}</TableCell>
                                                    <TableCell align="right">{row.rating}</TableCell>
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

export default TableMovies
