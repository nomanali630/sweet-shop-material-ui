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
            url: "http://localhost:5000/orderHistory",
            withCredentials: true,
        }).then((res) => {
            setorderHistroy(res.data.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const classes = useStyles();
    const [age, setAge] = React.useState('');
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };

    console.log('orderHistory', orderHistory)

    return (
        <div>
            <div className="container">
                <h2 className="text-center mt-5 mb-5">Confirmed orders</h2>
                <div className="row justify-content-center ">
                    {orderHistory.map((value, index) => {
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
                                            value={age}
                                            onChange={handleChange}
                                            autoWidth
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                        <FormHelperText></FormHelperText>
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
export default OrderHistory;