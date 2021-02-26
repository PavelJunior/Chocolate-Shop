import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  AppBar,
  Container,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Badge,
  Typography,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Drawer from '../Drawer';
import './styles.css';
import {AppState} from '../../store/configureStore';

interface LinkStateProps {
  itemsInCart?: number;
}

const Header: React.FC<LinkStateProps> = ({itemsInCart}) => {
  const navigationLinks: NavigationItem[] = [
    {title: `home`, path: `/`},
    {title: `cart`, path: `/cart`},
    {title: `about us`, path: `/`},
  ];

  const navLinkComponents = navigationLinks.map(({title, path}) => (
    <ListItem key={title} className="navbar-list-item" button>
      <Link to={path} className="navbar-item-link">
        <ListItemText
          primary={
            <Typography className="navbar-item-text">{title}</Typography>
          }
        />
      </Link>
    </ListItem>
  ));

  return (
    <AppBar position="static" className="app-bar" color="transparent">
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
          <Link to="/cart">
            <IconButton aria-label="home">
              <Badge badgeContent={itemsInCart} color="primary">
                <ShoppingCartIcon fontSize="large" color="inherit" />
              </Badge>
            </IconButton>
          </Link>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state: AppState): LinkStateProps => {
  let itemsInCart = 0;
  state.shop.cart.forEach((p) => (itemsInCart += p.quantity));
  return {itemsInCart: itemsInCart};
};

export default connect(mapStateToProps, null)(Header);
