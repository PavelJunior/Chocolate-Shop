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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Drawer from '../Drawer';
import './styles.css';

const Header: React.FC = () => {
  const navigationLinks: NavigationItem[] = [
    {title: `home`, path: `/`},
    {title: `cart`, path: `/cart`},
    {title: `about us`, path: `/`},
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
          <IconButton color="inherit" aria-label="home">
            <ShoppingCartIcon fontSize="large" />
          </IconButton>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
