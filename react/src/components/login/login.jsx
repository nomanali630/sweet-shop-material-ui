import axios from 'axios';

import React, { useState } from 'react';


import "./login.css"
import {
  useHistory
} from "react-router-dom"
import { useGlobalStateUpdate } from '../../context/globalContext'
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
function Login() {
  var GlobaleStateUpdate = useGlobalStateUpdate()
  let url = "http://localhost:5000";
  let [show, setshow] = useState();
  let history = useHistory();

  function login(event) {
    event.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:5000/auth/login",
      data: {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      },
      withCredentials: true
    }).then((response) => {
      if (response.data.status === 200) {
        GlobaleStateUpdate(prev => ({
          ...prev,
          loginStatus: true,
          user: response.data.user,
          role: response.data.user.role
        }))
        // history.push("/dashboard")
        console.log(response.data.message)
      } else {
        setshow(response.data.message)
      }
     
    }).catch((error) => {
      console.log(error);
    });

  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    fb: {
      margin: theme.spacing(1),
      backgroundColor: "white",
      
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    suc: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const classes = useStyles();


  return (
    // <div className="main">
    //   <h1 className="sign">Login</h1><br></br>
    //   <form onSubmit={login}>
    //     <div className="form-group text-center">

    //       <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
    //     </div>
    //     <div className="form-group text-center">

    //       <input type="password" className="form-control" id="password" placeholder="Password" />
    //     </div>
    //     <button type="submit" className="btn btn-primary container-fluid mb-3">Login</button><br></br>

    //     {show ? <div class="alert alert-danger" role="alert">{show}
    //     </div> : null}
    //   </form>
    //   <a href='http://localhost:5000/auth/facebook'><FacebookLoginButton /></a>
    // </div>

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
    </Typography>
      <Typography component="h3">
        Login with facebook
      </Typography>
      <Avatar className={classes.fb}>
      <a href='http://localhost:5000/auth/facebook'> < FacebookIcon style={{ fontSize: 55 }}/></a>
        </Avatar>
        <form onSubmit={login} className={classes.form} noValidate>
          <Grid container spacing={2}>


            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
      </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" style={{ cursor: "pointer" }} onClick={() => {
                history.push("/signup")
              }}>
                Don't have an account? Sign up
          </Link>
            </Grid>
          </Grid>
          <div className={classes.suc}>
            {show ? <Alert severity="warning">{show}</Alert>
              : null}
          </div>
        </form>
      </div>

    </Container>


  )
}

export default Login;