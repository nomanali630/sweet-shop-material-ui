import React, { useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGlobalState, useGlobalStateUpdate } from "../../context/globalContext"
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';





const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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




function Checkout() {
  
  let [show, setshow] = useState()
  var GlobalState = useGlobalState()
  console.log("data: ", Number(GlobalState.checkoutData.Total))
  console.log("data: ", GlobalState)
  const classes = useStyles();
  function order(e) {
    e.preventDefault()
    axios({
      method: "post",
      url: "http://localhost:5000/order",
      data: {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        orderData: GlobalState.checkoutData.cart,
        Total: GlobalState.checkoutData.Total
      },
      withCredentials: true
    }).then((res) => {
      if (res.data.status === 200) {
        setshow(res.data.message)
        console.log(res.data.message)
      } else {
        setshow(res.data.message)
      }
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
    // <div className="Container " style={{ boxShadow: "0 0 10px grey" ,width:"400px" ,margin:"0 auto"} }>
    //   <h3 className=" col-sm-12 mt-5 pt-3 row justify-content-center">Check Out</h3>
    //   <div className=" col-sm-12 mt-5 row justify-content-center">
         
    //     <form onSubmit={order} >
    //       <div className="form-group">
            
    //         <input type="text" className="name" id="name" aria-describedby="emailHelp" placeholder="Name" required />

    //       </div>
    //       <div className="form-group">
            
    //         <input type="number" className="phone" id="phone" placeholder="Phone (confirmation)" required />
    //       </div>
    //       <div className="form-group">
            
    //         <input type="text" className="address" id="address" placeholder="Address" required />
    //       </div>
    //       <button type="submit" className="btn btn-outline-success mb-4 container-fluid ">Submit</button>
    //       {show ? <div class="alert alert-success" role="alert">{show}</div> : null}
    //     </form>

    //   </div>
    // </div>


    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography component="h1" variant="h5">
          Check Form
    </Typography>
      
        <form onSubmit={order} className={classes.form} noValidate>
          <Grid container spacing={2}>


            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Customer Name"
                type="text"
                name="name"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phone"
                label="Phone "
                type="number"
                id="phone"
                autoComplete="phone"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Address "
                type="text"
                id="address"
                autoComplete="address"
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
            Check Out
      </Button>
          
          <div className={classes.suc}>
            {show ? <Alert severity="success">{show}</Alert>
              : null}
          </div>
        </form>
      </div>

    </Container>

   




  )
}
export default Checkout;