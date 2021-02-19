import React from 'react';
import {Link} from 'react-router-dom';
import {
  AppBar,
  Container,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import {Home} from '@material-ui/icons';
import Drawer from '../Drawer';
import './styles.css';

const Header: React.FC = () => {
  const navigationLinks: NavigationList = [
    {title: `about us`, path: `/`},
    {title: `product`, path: `/`},
    {title: `blog`, path: `/`},
    {title: `contact`, path: `/`},
    {title: `cart`, path: `/`},
  ];

  const navLinkComponents = navigationLinks.map(({title, path}) => (
    <ListItem key={title} className="navbar-list-item" button>
      <Link to={path} className="navbar-item-link">
        <ListItemText primary={title} />
      </Link>
    </ListItem>
  ));

  return (
    <AppBar position="static" className="app-bar">
      <Toolbar>
        <Container className="navbar-container">
          <IconButton edge="start" color="inherit" aria-label="home">
            <Home fontSize="large" />
          </IconButton>
          <Hidden smDown>
            <List
              component="nav"
              aria-labelledby="main navigation"
              className="navbar-list">
              {navLinkComponents}
            </List>
          </Hidden>
          <Hidden mdUp>
            <Drawer navigationLinks={navigationLinks} />
          </Hidden>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
