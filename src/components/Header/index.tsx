import {Link} from "react-router-dom";
import {AppBar, Container, Hidden, IconButton, List, ListItem, ListItemText, Toolbar} from "@material-ui/core";
import {Home} from "@material-ui/icons";
import React from "react";

function Header() {
  return (
      <AppBar position="static">
        <Toolbar>
          <Container className='navbar-container'>
            <IconButton edge="start" color="inherit" aria-label="home">
              <Home fontSize="large" />
            </IconButton>
            <Hidden smDown>
              <List component="nav" aria-labelledby="main navigation" className='navbar-list'>
                <ListItem button className='navbar-list-item'>
                  <ListItemText primary='Cart' />
                </ListItem>
                <ListItem button>
                  <ListItemText primary='About us' />
                </ListItem>
                <ListItem button>
                  <Link to='/'>
                    <ListItemText primary='Checkout' />
                  </Link>
                </ListItem>
              </List>
            </Hidden>
          </Container>
        </Toolbar>
      </AppBar>
  );
}

export default Header;
