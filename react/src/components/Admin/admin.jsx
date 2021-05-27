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
    // var [status, setstatus] = useState([])
    var [orders, setorders] = useState([])
    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:5000/getOrder",
            withCredentials: true,
        }).then((res) => {
            console.log("zubair kakkakakak", res.data)
            setorders(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    
    function confirmStatus(id) {
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
    function deliveredStatus(id) {
        axios({
            method: 'post',
            url: 'http://localhost:5000/updateStatus',
            data: {
                id: id,
                status: "Delivered"
            },
            withCredentials: true
        }).then((response) => {
            alert(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    function reviewStatus(id) {
        axios({
            method: 'post',
            url: 'http://localhost:5000/updateStatus',
            data: {
                id: id,
                status: "In review"
            },
            withCredentials: true
        }).then((response) => {
            alert(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    function cancelStatus(id) {
        axios({
            method: 'post',
            url: 'http://localhost:5000/updateStatus',
            data: {
                id: id,
                status: "Cancel"
            },
            withCredentials: true
        }).then((response) => {
            alert(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    // function del(id) {
    //     axios({
    //         method: 'post',
    //         url: 'http://localhost:5000/delete',
    //         data: {
    //             id: id
    //         },
    //         withCredentials: true
    //     }).then((res) => {
    //         console.log(res.data)
    //         alert(res.data)
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }

    const classes = useStyles();
    



    console.log("order:", orders)

    

    return (
        <div>
            
            <div className="container">
                <h2 className="text-center mt-5 mb-5">Customer orders</h2>
                <div className="row justify-content-center ">
                    {orders.map((eachOrder, index) => {
                        if(eachOrder.status === "Order confirmed" || eachOrder.status === "In review"){
                            return (
                                <div className='col-md-5 mr-2 ml-2 mt-4 py-3 px-3' style={{ boxShadow: "0 0 8px grey", borderRadius: '8px' }}>
                                    <div>
                                        <span>Name:</span>
                                        <span className="float-right">{eachOrder.name}</span>
                                    </div>
                                    <div>
                                        <span>Address:</span>
                                        <span className="float-right">{eachOrder.address}</span>
                                    </div>
                                    <div>
                                        <span>Phone:</span>
                                        <span className="float-right">{eachOrder.phone}</span>
                                    </div><hr />
                                    {eachOrder.orders.map((eachItem, index) => {
                                        return (
                                            <div>
    
                                                <div>
                                                    <span>Product Name:</span>
                                                    <span className="float-right">{eachItem.product}</span>
                                                </div>
                                                <div>
                                                    <span> Cost:</span>
                                                    <span className="float-right">Pkr per kg:{eachItem.price}</span>
                                                </div>
                                                <div>
                                                    <span> Quantity:</span>
                                                    <span className="float-right"> {eachItem.quantity}kg</span>
                                                </div>
                                                <hr />
    
                                            </div>
                                        )
                                    })}
                                    <div>
                                        <span>Total Cost:</span>
                                        <span className="float-right">Pkr:{eachOrder.total}</span>
                                    </div> <hr />
                                   
                                    <div>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth"
                                                defaultValue={eachOrder.status}
                                                onChange={(event) => {
                                                    // setAge(event.target.value);
                                                    if (event.target.value === "ConfirmOrder") {
                                                        confirmStatus(eachOrder._id)
                                                    } else if (event.target.value === "Delivered") {
                                                        deliveredStatus(eachOrder._id)
                                                    }else if (event.target.value === "Cancel") {
                                                        cancelStatus(eachOrder._id)
                                                    }else if (event.target.value === "InReview") {
                                                        reviewStatus(eachOrder._id)
                                                    }
                                                }}
                                                autoWidth
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="ConfirmOrder">Confirm Order</MenuItem>
                                                <MenuItem value="Delivered">Delivered</MenuItem>
                                                <MenuItem value="Cancel">Cancel</MenuItem>
                                                <MenuItem value="InReview">In review</MenuItem>
    
                                            </Select>
                                            <FormHelperText>Status :{eachOrder.status}</FormHelperText>
                                            
                                            
                                        </FormControl>
    
    
                                    </div>
                                </div>
    
                            )
                        }

                    })}

                </div>
            </div>
            
        </div>

    )
}
export default AdminDashboard;