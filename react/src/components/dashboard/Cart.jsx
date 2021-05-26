import React from 'react';
import "./dashboard.css"
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useGlobalStateUpdate } from '../../context/globalContext'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,


  },
  media: {
    height: 140,

  },
});


export default function Cart({ cart, setCart }) {
  const history = useHistory()
  const GlobalStateUpdate = useGlobalStateUpdate()
  const classes = useStyles();

  function checkout() {

    GlobalStateUpdate(prev => ({
      ...prev,
      checkoutData: { cart: cart, Total: Total }
    }))
    history.push("./Checkout")
  }

  const getTotalSum = () => {
    return cart.reduce(
      (sum, { price, quantity }) => sum + price * quantity,
      0
    );
  };
  const Total = getTotalSum()
  console.log("pury paise", Total)

  const clearCart = () => {
    setCart([]);
  };

  const setQuantity = (product, amount) => {
    const newCart = [...cart];
    newCart.find(
      (item) => item.name === product.name
    ).quantity = amount;
    setCart(newCart);
  };


  const removeFromCart = (productToRemove) => {
    setCart(
      cart.filter((product) => product !== productToRemove)
    );
  };
  console.log(cart)


  return (
    // <>
    //   <h1>Cart</h1>
    //   {cart.length > 0 && (
    //     <button className='btn btn-primary mt-3' onClick={clearCart}>Clear Cart</button>
    //   )}
    //   <h2>Total Cost: Pkr:{getTotalSum()}</h2>
    //   <div className="container">
    //     <div className="row justify-content-center">
    //       {cart.map((product, idx) => (
    //         <div className="col-md-3 mt-4 mx-3 py-3 " style={{ boxShadow: "0 0 10px grey" }} key={idx}>

    //             <img className="card-img-top" width="100%" src={product.image} alt="Card image cap" />
    //             <div className="card-body">
    //               <h5 className="card-title">{product.product}</h5>
    //               <p className="card-text">pkr:{product.price}</p>

    //               <input
    //                 value={product.quantity}
    //                 onChange={(e) =>
    //                   setQuantity(
    //                     product,
    //                     parseInt(e.target.value)
    //                   )
    //                 } /><br/>

    //               <button onClick={() => removeFromCart(product)} className="btn btn-primary">
    //                 Remove
    //              </button>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    // </div>
    //           <button className='btn btn-primary mt-5' onClick={checkout}>Check Out</button>

    // </>


    <div>

      {cart.length === 0 ?
        <>
          <div>loading</div>
          <div></div>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </>
        : null}
      
      <h1>Cart</h1>
      {cart.length > 0 && (
        
        <Button variant="outlined" color="primary" onClick={clearCart}>
          Clear Cart
        </Button>
      )}
      <h2>Total Cost: Pkr:{getTotalSum()}</h2>



      <Container>
        <Grid container justify='center' spacing={2} style={{ marginTop: "30px" }}>

          {cart.map((product, idx) => (
            <Grid item lg={3} md={3} sm={6} xs={12}>
              <Card className={classes.root} style={{ boxShadow: "0 0 10px grey" }}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={product.image}
                    title="sweets"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.product}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p">
                      per Kg:{product.price}
                    </Typography>

                    <input
                      value={product.quantity}
                      onChange={(e) =>
                        setQuantity(
                          product,
                          parseInt(e.target.value)
                        )
                      } />
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button onClick={() => removeFromCart(product)} size="small" color="primary">
                    Remove
        </Button>

                </CardActions>
              </Card>
            </Grid>
          ))}



        </Grid><br />

        <Button variant="outlined" color="primary" onClick={checkout}>
          Check Out
        </Button><br />
      </Container>


    </div>


  );
}