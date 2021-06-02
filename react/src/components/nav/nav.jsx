import { Link } from "react-router-dom"
import Logout from './logout'
import { useGlobalState } from "../../context/globalContext"
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(1),
    palette: {
      colorPrimary: {
        default: "#EBD489"
      },

    }
  },
  
  title: {
    flexGrow: 1,
  },
  bar: {
    position: 'relative',
    bottom: '15px'
  },
  hov: {
    '&:hover': {
      color: "white",
      background:"#648813" 
    }
  },
  hov2: {
    '&:hover': {
      color: "black"
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
   
  },
  drawerPaper: {
    width: drawerWidth,
    
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  navItemDesk:{
    display:"none",
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      marginLeft: "auto"
  }
  }
}));





function Nav() {
  const GlobaleState = useGlobalState()
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };





  return (
    <div className={classes.root}>
      {
        (GlobaleState.loginStatus === true) ?

          <AppBar position="static"style={{ background: '#D8BE07', color:"black" }}>
            <Toolbar className={classes.bar} >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>

              {
                (GlobaleState.loginStatus === true && GlobaleState.role === "user") ?
                  <>
                    <Typography variant="h6" className={classes.title}>
                      Sweet Shop
                   </Typography>

                    <div className={classes.navItemDesk}>

                      <Button className={classes.hov} color="inherit" component={Link} to="/"  >Dashboard</Button>
                      <Button className={classes.hov} color="inherit" component={Link} to="/myOrders" >My orders</Button>
                      <Logout />
                    </div>

                  </> : null}

              {
                (GlobaleState.loginStatus === true && GlobaleState.role === "admin") ?
                  < >
                    <Typography variant="h6" className={classes.title}>
                      Welcome Admin
                   </Typography>
                   <div className={classes.navItemDesk}>
                    <Button className={classes.hov} color="inherit" component={Link} to="/"  >Dashboard</Button>
                    <Button className={classes.hov} color="inherit" component={Link} to="/Addproduct" >Add products</Button>
                    <Button className={classes.hov} color="inherit" component={Link} to="/orderHistory" >Order History</Button>
                    <Logout />
                    </div>
                  </> : null}
            </Toolbar>
          </AppBar>

          : null}
      {
        (GlobaleState.loginStatus === true && GlobaleState.role === "user") ?
          <>

            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,

              }}
             >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>

                <ListItem button >
                  <ListItemIcon> <DashboardOutlinedIcon /> </ListItemIcon>
                  <Button onClick={handleDrawerClose} className={classes.hov2} color="inherit" component={Link} to="/"  >Dashboard</Button>
                </ListItem>


                <ListItem button >
                  <ListItemIcon> <EventAvailableOutlinedIcon /> </ListItemIcon>
                  <Button onClick={handleDrawerClose} className={classes.hov2} color="inherit" component={Link} to="/myOrders"  >My Orders</Button>
                </ListItem>

                <ListItem button >
                  <ListItemIcon> <ExitToAppOutlinedIcon /> </ListItemIcon>
                  <Logout />
                </ListItem>

              </List>
              <Divider />
            </Drawer>
          </> : null}

      {
        (GlobaleState.loginStatus === true && GlobaleState.role === "admin") ?
          <>

            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>


                <ListItem button >
                  <ListItemIcon> <DashboardOutlinedIcon /> </ListItemIcon>
                  <Button onClick={handleDrawerClose} className={classes.hov2} color="inherit" component={Link} to="/"  >Dashboard</Button>
                </ListItem>

                <ListItem button >
                  <ListItemIcon> <DashboardOutlinedIcon /> </ListItemIcon>
                  <Button onClick={handleDrawerClose} className={classes.hov2} color="inherit" component={Link} to="/orderHistory"  >Order History</Button>
                </ListItem>

                <ListItem button >
                  <ListItemIcon> <AddCircleOutlineOutlinedIcon /> </ListItemIcon>
                  <Button onClick={handleDrawerClose} className={classes.hov2} color="inherit" component={Link} to="/Addproduct"  >Add products</Button>
                </ListItem>

                <ListItem button >
                  <ListItemIcon> <ExitToAppOutlinedIcon /> </ListItemIcon>
                  <Logout />
                </ListItem>

              </List>
              <Divider />
            </Drawer>
          </> : null}




    </div>

  );

}

export default Nav









