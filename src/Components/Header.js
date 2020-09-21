import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Grid } from "@material-ui/core"
import { UserContext } from "../Context/UserContext"

const Header = () => {
  const styleLinkNavbar = {
    color: "inherit",
    textDecoration: "none"
  }
  const [user] = useContext(UserContext)
  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <AppBar position="static" style={{ backgroundColor: "black" }}>
      <Toolbar>
        <Grid
          justify="space-between"
          container

        >
          <Grid item>
            <Button color="inherit">
              <Link style={styleLinkNavbar} to="/">Home</Link>
            </Button>

            <Button color="inherit">
              <Link style={styleLinkNavbar} to="/movie">Movie</Link>
            </Button>
            {user &&
              <Button color="inherit">
                <Link style={styleLinkNavbar} to="/edit-movie">Edit Movie</Link>
              </Button>
            }
            <Button color="inherit">
              <Link style={styleLinkNavbar} to="/game">Game</Link>
            </Button>
            {user &&
              <Button color="inherit">
                <Link style={styleLinkNavbar} to="/edit-game">Edit Game</Link>
              </Button>
            }
          </Grid>
          <Grid item>
            {user ?
              <>
              <Button color="inherit">
                  <Link style={styleLinkNavbar} to="/change-password">{user.name}</Link>
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  <Link style={styleLinkNavbar} to="/">Logout</Link>
                </Button>
              </>
              :
              <>
                <Button color="inherit">
                  <Link style={styleLinkNavbar} to="/login">Login</Link>
                </Button>
              </>
            }
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>

  )
}

export default Header
