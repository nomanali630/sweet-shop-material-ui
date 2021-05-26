import axios from 'axios'
import React, { useState } from 'react'

import Alert from '@material-ui/lab/Alert';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function AddProduct() {
    var [show, setShow] = useState()

    function add(event) {
        event.preventDefault()
        var fileInput = document.getElementById("file")

        console.log("kdfgdjf", fileInput);
        var price = document.getElementById("price").value
        var product = document.getElementById("productName").value

        var formData = new FormData();
        formData.append("fileInput", fileInput.files[0]);
        formData.append("price", price);
        formData.append("product", product);

        axios({
            method: "post",
            url: "http://localhost:5000/upload",
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        }).then((res) => {
            console.log(res)
            // console.log(res.data.message)
            setShow(res.data.message)
        }).catch((error) => {
            console.log(error)
        })

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
        btn:{
            border:'solid 1px black',
            padding: '5px',
            marginLeft:'10px'
        }

    }));

    const classes = useStyles();


    return (
        <div>
            {/* <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-5">
                        <form onSubmit={add}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail14">Product Name</label>
                                    <input type="text" className="form-control" id="productName" required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail14">Price</label>
                                    <input type="text" className="form-control" id="price" required />
                                </div>
                                <div className="form-group">
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="file" />
                                        <label className="custom-file-label" for="file">Choose Image</label>
                                    </div>
                                </div><br/>
                                <button type="submit" className=" btn btn-primary">Add Product</button>
                            </div>
                        </form><br/>
                        {show? <div className="alert alert-success" role="alert">{show}</div>:null }
                    </div>
                </div>
            </div> */}

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        ADD PRODUCTS
    </Typography>


                    <form onSubmit={add} className={classes.form} noValidate>
                        <Grid container spacing={2}>


                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="productName"
                                    label="Product Name"
                                    type="text"
                                    name="text"
                                    autoComplete="text"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Price"
                                    type="number"
                                    id="price"
                                    autoComplete="numbers"
                                />
                            </Grid>
                            <div>
                                <input accept="image/*" style={{ display: 'none' }} id="file" multiple type="file" />
                                <label htmlFor="file" className={classes.btn}>
                                    Upload Image
                                </label>
                                
                            </div>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Add
      </Button>

                        <div className={classes.suc}>
                            {show ? <Alert severity="success">{show}</Alert>
                                : null}
                        </div>
                    </form>
                </div>

            </Container>




        </div>
    )
}
export default AddProduct;