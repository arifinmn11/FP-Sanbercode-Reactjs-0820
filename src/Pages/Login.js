
import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import { UserContext } from '../Context/UserContext';


const Login = () => {
    // const classes = useStyles();
    const [input, setInput] = useState({ email: "", password: "" })
    const [user, setUser] = useContext(UserContext)
    const handleChange = (e) => {
        var value = e.target.value
        var name = e.target.name
        switch (name) {
            case "email": {
                setInput({ ...input, email: value })
                break;
            }
            case "password": {
                setInput({ ...input, password: value })
                break;
            }

            default: { break; } 
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        {
            axios
                .post('https://backendexample.sanbersy.com/api/user-login', {
                    email: input.email,
                    password: input.password
                })
                .then(res => {
                    if (res.status === 201) {
                        var token = res.data.token
                        var currentUser = { name: res.data.user.name, email: res.data.user.email, token: token }
                        setUser(currentUser)
                        localStorage.setItem("user", JSON.stringify(currentUser))

                        window.location.href = '/'
                    }
                })
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <div style={{ paddingTop: '50px' }}>
                <Typography component="h1" variant="h5" style={{ color: 'white', margin: "20px 0" }}>
                    Sign in
            </Typography>
                <form onSubmit={handleSubmit}>
                    <div style={{ margin: "15px auto" }}>
                        <label style={{ color: "white" }}>Email</label>
                        <input style={{ width: "100%" }} type='text' onChange={handleChange} name="email" required />
                    </div>
                    <div style={{ margin: "15px auto" }}>
                        <label style={{ color: "white" }}>Password</label>
                        <input style={{ width: "100%" }} type='password' onChange={handleChange} name="password" minLength={8} required />
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        style={{ margin: "15px auto" }}
                    >
                        Sign In
                </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/register" variant="body2" color="secondary">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default Login
