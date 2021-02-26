import {Link} from 'react-router-dom';
import {
  IconButton,
  Drawer,
  ListItem,
  ListItemText,
  List,
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import React, {useState} from 'react';
import './styles.css';

interface DrawerProps {
  navigationLinks: NavigationItem[];
}

const SideDrawer: React.FC<DrawerProps> = ({navigationLinks}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => (event: any) => {
    console.log(event);
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setMenuOpen(open);
  };

  const drawerList = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <List
        component="nav"
        aria-labelledby="main navigation"
        className="navbar-drawer-list">
        {navLinkComponents}
      </List>
    </div>
  );
  const navLinkComponents = navigationLinks.map(({title, path}) => (
    <ListItem className="navbar-list-item" button>
      <Link to={path} className="navbar-drawer-item-link">
        <ListItemText primary={title} />
      </Link>
    </ListItem>
  ));

  return (
    <>
      <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
        <Menu fontSize="large" />
      </IconButton>
      <Drawer anchor="left" open={menuOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </>
  );
};

export default SideDrawer;
