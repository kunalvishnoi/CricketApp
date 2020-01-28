import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
// import Resource from "./resource";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#E9E8E8",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36,
    stroke: "black",
    color: "black"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    backgroundColor: "#252121"
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: "black",
    color: "#fff",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: "0"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontSize: "18px",
    padding: "20px 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const MiniDrawer = props => {
  const isOpen = !props.isMobile;
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);
  const [user, changeUser] = React.useState(false);
  const [email, changeEmail] = React.useState("admin");
  const [password, changePassword] = React.useState("admin@123");

  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  function handleDrawerOpen() {
    setOpen(prevState => !prevState);
  }

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token").length > 15
    ) {
      changeUser(true);
    }
  });

  const logOut = () => {
    localStorage.removeItem("token");
    changeUser(false);
    window.location.reload();
  };

  const handleEmailChange = e => {
    changeEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    changePassword(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const options = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    };

    const data = {
      username: email,
      password: password
    };

    axios
      .post(
        "https://pure-reaches-06765.herokuapp.com/api/v1/admins/login",
        JSON.stringify(data),
        options
      )
      .then(res => {
        localStorage.setItem("token", res.data.auth_token);
        changeUser(true);
        setOpenModal(false);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>Login By Admin</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            margin="dense"
            value={password}
            onChange={handlePasswordChange}
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <div style={{ flexGrow: "1" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton)}
              >
                <MenuIcon />
              </IconButton>
            </div>

            {user ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                style={{ marginRight: "10px" }}
                onClick={logOut}
              >
                LogOut
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  style={{ marginRight: "10px" }}
                  onClick={handleClickOpen}
                >
                  LogIn
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={` ${clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })} bg-black`}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          open={open}
        >
          <div className={classes.toolbar}>JSS Noida Cricket Team</div>
          <List>
            <NavLink exact to="/team" activeClassName="active">
              <ListItem button className="text-center">
                <ListItemText>Team</ListItemText>
              </ListItem>
            </NavLink>
            <NavLink exact to="/matches" activeClassName="active">
              <ListItem button className="text-center">
                <ListItemText>Matches</ListItemText>
              </ListItem>
            </NavLink>
            <NavLink exact to="/tournaments" activeClassName="active">
              <ListItem button className="text-center">
                <ListItemText>Tournaments</ListItemText>
              </ListItem>
            </NavLink>
            {user ? (
              <NavLink exact to="/record" activeClassName="active">
                <ListItem button className="text-center">
                  <ListItemText>Add Record</ListItemText>
                </ListItem>
              </NavLink>
            ) : null}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </>
  );
};
export default MiniDrawer;
