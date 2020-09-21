
import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import { UserContext } from "../Context/UserContext";


const ChangePassowrd = () => {
    const [input, setInput] = useState({ name: "", email: "", password: "", cpassword: "" })
    const [validate, setValidate] = useState({ status: "", name: "", message: "" })
    const [user] = useContext(UserContext)
    const handleChange = (e) => {
        let value = e.target.value
        let name = e.target.name
        switch (name) {

            case "npassword": {
                setInput({ ...input, npassword: value })
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
        if ((input.npassword !== null && input.npassword !== input.password ) && (input.npassword === input.cpassword)) {
            var status = {
                status: true,
                name: 'password',
                message: 'Success!'
            }
            setValidate(status)
            var _token = user.token;
            axios
                .post('https://backendexample.sanbersy.com/api/change-password', {
                    current_password: input.password,
                    new_password: input.npassword,
                    new_confirm_password: input.cpassword
                },
                    { headers: { "Authorization": `Bearer ${_token}` } })
                .then((res) => {

                    let status = {
                        status: false,
                        name: 'success',
                        message: 'Success! Password has been changed!'
                    }
                    setValidate(status)
                    setInput({
                        password: "",
                        npassword: "",
                        cpassword: ""
                    });

                }).catch((error) => {
                    let status = {
                        status: false,
                        name: 'failed',
                        message: 'Failed! Please try again later!'
                    }
                    setValidate(status)
                })

        } else if (input.npassword !== input.cpassword) {
            let status = {
                status: false,
                name: 'password',
                message: 'Failed! Please enter the same password again!'
            }
            setValidate(status)
        } else if (input.password === input.npassword) {
            let status = {
                status: false,
                name: 'password',
                message: 'Failed! Please change the new password!'
            }
            setValidate(status)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <div style={{ paddingTop: '50px' }}>
                <Typography component="h1" variant="h5" style={{ color: 'white', margin: "20px 0" }}>
                    Change Password
            </Typography>
                <form onSubmit={handleSubmit}>
                    <div style={{ margin: "15px auto" }}>
                        <label style={{ color: "white" }}>Current Password</label>
                        <input onChange={handleChange} name="password" value={input.password} type="password" style={{ width: "100%" }} minLength={8} required />
                    </div>
                    <div style={{ margin: "15px auto" }}>
                        <label style={{ color: "white" }}>New Password</label>
                        <input onChange={handleChange} name="npassword" value={input.npassword} type="password" style={{ width: "100%" }} minLength={8} required />
                    </div>
                    {(validate.status === false && validate.name === 'password') ? <Alert severity="warning"> {validate.message} </Alert> : null}
                    <div style={{ margin: "15px auto" }}>
                        <label style={{ color: "white" }}>Confirm Password</label>
                        <input onChange={handleChange} name="cpassword" value={input.cpassword} type="password" style={{ width: "100%" }} minLength={8} required />
                    </div>
                    {(validate.status === false && validate.name === 'success') ? <Alert severity="success"> {validate.message} </Alert> : null}
                    {(validate.status === false && validate.name === 'failed') ? <Alert severity="warning"> {validate.message} </Alert> : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        style={{ margin: "15px auto" }}
                    >
                        Change Password
                </Button>
                </form>
            </div>
        </Container>
    )
}

export default ChangePassowrd
