import axios from "axios"
import { useEffect, useState } from "react"
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

function OrderHistory() {
    var [orderHistory, setorderHistroy] = useState([])
    useEffect(() => {
        axios({
            method: 'get',
            url: "http://localhost:5000/getOrder",
            withCredentials: true,
        }).then((res) => {
            setorderHistroy(res.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
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



    const classes = useStyles();



    console.log('orderHistory', orderHistory)

    return (
        <div>
            <div className="container">
                <h2 className="text-center mt-5 mb-5">Orders History</h2>
                <div className="row justify-content-center ">
                    {orderHistory.map((eachHistory, index) => {
                        if (eachHistory.status === "Cancel" || eachHistory.status === "Delivered") {
                            return (
                                <div className='col-md-5 mr-2 ml-2 mt-4 py-3 px-3' style={{ boxShadow: "0 0 8px grey", borderRadius: '8px' }}>
                                    <div>
                                        <span>Name:</span>
                                        <span className="float-right">{eachHistory.name}</span>
                                    </div>
                                    <div>
                                        <span>Address:</span>
                                        <span className="float-right">{eachHistory.address}</span>
                                    </div>
                                    <div>
                                        <span>Phone:</span>
                                        <span className="float-right">{eachHistory.phone}</span>
                                    </div><hr />
                                    {eachHistory.orders.map((ItemHistory, index) => {
                                        return (
                                            <div>

                                                <div>
                                                    <span>Product Name:</span>
                                                    <span className="float-right">{ItemHistory.product}</span>
                                                </div>
                                                <div>
                                                    <span> Cost:</span>
                                                    <span className="float-right">Pkr per kg:{ItemHistory.price}</span>
                                                </div>
                                                <div>
                                                    <span> Quantity:</span>
                                                    <span className="float-right"> {ItemHistory.quantity}kg</span>
                                                </div>
                                                <hr />

                                            </div>
                                        )
                                    })}
                                    <div>
                                        <span>Total Cost:</span>
                                        <span className="float-right">Pkr:{eachHistory.total}</span>
                                    </div> <hr />
                                    {/* <div>
                                    <span> Status</span>
                                    <span className="float-right">Delivered</span>
                                </div> */}
                                    <div>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth"
                                                defaultValue={eachHistory.status}
                                                onChange={(event) => {
                                                    // setAge(event.target.value);
                                                    if (event.target.value === "ConfirmOrder") {
                                                        confirmStatus(eachHistory._id)
                                                    } else if (event.target.value === "Delivered") {
                                                        deliveredStatus(eachHistory._id)
                                                    } else if (event.target.value === "Cancel") {
                                                        cancelStatus(eachHistory._id)
                                                    } else if (event.target.value === "InReview") {
                                                        reviewStatus(eachHistory._id)
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
                                            <FormHelperText>Status :{eachHistory.status}</FormHelperText>


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
export default OrderHistory;