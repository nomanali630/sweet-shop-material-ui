import React, { useState } from 'react';
import './dashboard.css';
import Products from './Products';
import Cart from './Cart';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const PAGE_PRODUCTS = 'products';
const PAGE_CART = 'cart';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function Dashboard() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);
  const classes = useStyles();

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (sum, { quantity }) => sum + quantity,
      0
    );
  };

  return (



    <div className="App">
      <header>
        <div className={classes.root}>
          <Button onClick={() => navigateTo(PAGE_CART)} variant="outlined"  >
            Go to Cart ({getCartTotal()})
          </Button>

          <Button onClick={() => navigateTo(PAGE_PRODUCTS)} variant="outlined" >
            View Products
          </Button>
        </div>
      </header>
      {page === PAGE_PRODUCTS && (
        <Products cart={cart} setCart={setCart} />
      )}
      {page === PAGE_CART && (
        <Cart cart={cart} setCart={setCart} />
      )}
    </div>

  )

}

export default Dashboard;