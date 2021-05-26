import axios from "axios"
import { useEffect, useState } from "react"
import "./admin.css"

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));



function AdminDashboard() {
    var [status, setstatus] = useState([])
    var [getorder, setgetorder] = useState([])
    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:5000/getOrder",
            withCredentials: true,
        }).then((res) => {
            console.log(res.data)
            setgetorder(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:5000/adminStatus",
            withCredentials: true,
        }).then((res) => {
            setstatus(res.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    function updateStatus(id) {
        axios({
            method: 'post',
            url: 'http://localhost:5000/updateStatus',
            data: {
                id: id,
                status: "Order confirmed"
            },
            withCredentials: true
        }).then((response) => {
            alert(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    function del(id) {
        axios({
            method: 'post',
            url: 'http://localhost:5000/delete',
            data: {
                id: id
            },
            withCredentials: true
        }).then((res) => {
            console.log(res.data)
            alert(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const classes = useStyles();
    // const [age, setAge] = React.useState('');



    console.log("order:", getorder)

    console.log("status:",status)

    return (
        <div>

            <div className="container">
                <h2 className="text-center mt-5 mb-5">Customer orders</h2>
                <div className="row justify-content-center ">
                    {getorder.map((value, index) => {
                        return (
                            <div className='col-md-5 mr-2 ml-2 mt-4 py-3 px-3' style={{ boxShadow: "0 0 8px grey", borderRadius: '8px' }}>
                                <div>
                                    <span>Name:</span>
                                    <span className="float-right">{value.name}</span>
                                </div>
                                <div>
                                    <span>Address:</span>
                                    <span className="float-right">{value.address}</span>
                                </div>
                                <div>
                                    <span>Phone:</span>
                                    <span className="float-right">{value.phone}</span>
                                </div><hr />
                                {value.orders.map((value, index) => {
                                    return (
                                        <div>

                                            <div>
                                                <span>Product Name:</span>
                                                <span className="float-right">{value.product}</span>
                                            </div>
                                            <div>
                                                <span> Cost:</span>
                                                <span className="float-right">Pkr per kg:{value.price}</span>
                                            </div>
                                            <div>
                                                <span> Quantity:</span>
                                                <span className="float-right"> {value.quantity}kg</span>
                                            </div>
                                            <hr />

                                        </div>
                                    )
                                })}
                                <div>
                                    <span>Total Cost:</span>
                                    <span className="float-right">Pkr:{value.total}</span>
                                </div> <hr />
                                {/* <div > */}
                                {/* <span className='float-right mt-2'>
                                        <button className="btn btn-outline-success" onClick={() => {
                                            updateStatus(value._id)
                                        }} >Confirm Order</button>
                                    </span>
                                    <span className='float-left mt-2'>
                                        <button className="btn btn-outline-success" onClick={() => {
                                            del(value._id)
                                        }} >Delete</button>
                                    </span>
                                </div> */}

                                <div>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"

                                            onChange={(event) => {
                                                // setAge(event.target.value);
                                                if (event.target.value === "ConfirmOrder") {
                                                    updateStatus(value._id)
                                                } else if (event.target.value === "Delete") {
                                                    del(value._id)
                                                }
                                            }}
                                            autoWidth
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="ConfirmOrder">Confirm Order</MenuItem>
                                            <MenuItem value="Delete">delete</MenuItem>

                                        </Select>
                                        {status.map((v, i) => { 
                                             return ( 
                                                 <>
                                                    <FormHelperText>Status : {v.status} </FormHelperText>
                                                 </> 
                                             )
                                        })
                                        } 
                                    </FormControl>


                                </div>
                            </div>

                        )

                    })}

                </div>
            </div>

        </div>

    )
}
export default AdminDashboard;