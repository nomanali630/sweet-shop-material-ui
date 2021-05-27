import React, { useState } from "react";
import "./signup.css"
import axios from "axios";
import {
  useHistory
} from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



function Signup() {
  var url = "http://localhost:5000"
  let history = useHistory()
  let [show, setshow] = useState()
  let [showSucess, setshowsucces] = useState()


  function sign(event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    var Data = {
      name: name,
      email: email,
      phone: phone,
      password: password
    }
    axios({
      method: "post",
      url: url + "/auth/signup",
      data: Data,
      withCredentials: true
    }).then((response) => {
      if (response.data.status === 200) {
        // history.push("/login")        
        setshowsucces(response.data.message)
      } else {
        setshow(response.data.message)
      }
      console.log(response.data.message)
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
    //   <div className="main">
    //     <h1 className="sign">Signup</h1><br></br>
    //     <form onSubmit={sign}>
    //       <div className="form-group text-center ">

    //         <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Name" required />

    //       </div>
    //       <div className="form-group text-center">

    //         <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />

    //       </div>
    //       <div className="form-group text-center">

    //         <input type="number" className="form-control" id="phone" aria-describedby="emailHelp" placeholder="Enter phone" required />

    //       </div>
    //       <div className="form-group text-center">

    //         <input type="password" className="form-control" id="password" placeholder="Password" required />
    //       </div>

    //       <button type="submit" className="btn btn-primary container-fluid mb-3 ">Sign up</button><br></br>
    //       {show?<div class="alert alert-danger" role="alert">{show}</div>:null}

    //       {showSucess? <div class="alert alert-success" role="alert"> {showSucess}       
    //         <span style={{cursor: "pointer"}} onClick={()=>{
    //          history.push("/login")
    //        }}> : Login</span> </div>:null}

    //     </form>

    //   </div>

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
    </Typography>
        <form onSubmit={sign} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full-Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                type="number"
                name="Phone"
                autoComplete="Phone"
              />
            </Grid>
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
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
      </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link  variant="body2" style={{cursor: "pointer"}} onClick={()=>{
             history.push("/login")
           }}>              
                Already have an account? Sign in
          </Link>
            </Grid>
          </Grid>
          <div className={classes.suc}>
            {showSucess ? <Alert severity="success">{showSucess}</Alert>
              : null}
            {show ? <Alert severity="warning">{show}</Alert>
              : null}
          </div>
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>



  )

}

export default Signup;
