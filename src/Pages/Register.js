
import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import { UserContext } from "../Context/UserContext";

const Register = () => {
  const [input, setInput] = useState({ name: "", email: "", password: "", cpassword: "" })
  const [validate, setValidate] = useState({ status: "", name: "", message: "" })
  const [user, setUser] = useContext(UserContext)
  const handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    switch (name) {
      case "name": {
        setInput({ ...input, name: value })
        break;
      }
      case "email": {
        setInput({ ...input, email: value })
        break;
      }
      case "password": {
        setInput({ ...input, password: value })
        break;
      }
      case "cpassword": {
        setInput({ ...input, cpassword: value })
        break;
      }
      default: { break; }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if ((input.cpassword !== null) && (input.password === input.cpassword)) {
      var status = {
        status: true,
        name: 'password',
        message: 'Success!'
      }
      setValidate(status)
      axios
        .post('https://backendexample.sanbersy.com/api/register', {
          name: input.name,
          email: input.email,
          password: input.password
        })
        .then((res) => {
          if (res.status === 201) {
            var token = res.data.token
            var currentUser = { name: res.data.name, email: res.data.email, token: token }
            setUser(currentUser)
            localStorage.setItem("user", JSON.stringify(currentUser))
            window.location.href = '/'
          } else {
            var status = {
              status: false,
              name: 'email',
              message: 'Failed! Please change your email!'
            }
            setValidate(status)
          }
        }).catch((error) => {
          var status = {
            status: false,
            name: 'email',
            message: 'Failed! Please change your email!'
          }
          setValidate(status)
        })
    } else {
      var status = {
        status: false,
        name: 'password',
        message: 'Failed! Please enter the same password again!'
      }
      setValidate(status)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ paddingTop: '50px' }}>
        <Typography component="h1" variant="h5" style={{ color: 'white', margin: "20px 0" }}>
          Register
            </Typography>
        <form onSubmit={handleSubmit}>
          <div style={{ margin: "15px auto" }}>
            <label style={{ color: "white" }}>Name</label>
            <input onChange={handleChange} name="name" value={input.name} type="text" style={{ width: "100%" }} required />
          </div>
          {(validate.status === false && validate.name === 'email') ? <Alert severity="warning"> {validate.message} </Alert> : null}
          <div style={{ margin: "15px auto" }}>
            <label style={{ color: "white" }}>Email</label>
            <input onChange={handleChange} name="email" value={input.email} type="email" style={{ width: "100%" }} required />
          </div>
          <div style={{ margin: "15px auto" }}>
            <label style={{ color: "white" }}>Password</label>
            <input onChange={handleChange} name="password" value={input.password} type="password" style={{ width: "100%" }} minLength={8} required />
          </div>
          {(validate.status === false && validate.name === 'password') ? <Alert severity="warning"> {validate.message} </Alert> : null}
          <div style={{ margin: "15px auto" }}>
            <label style={{ color: "white" }}>Confirm Password</label>
            <input onChange={handleChange} name="cpassword" value={input.cpassword} type="password" style={{ width: "100%" }} minLength={8} required />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            style={{ margin: "15px auto" }}
          >
            Sign Up
                </Button>
        </form>
      </div>
    </Container>
  )
}

export default Register
