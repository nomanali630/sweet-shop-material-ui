import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,


  },
  media: {
    height: 140,

  },
});





export default function Products({ setCart, cart }) {
  const classes = useStyles();

  const [products, setproducts] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/getproducts",
      withCredentials: true
    }).then((res) => {
      setproducts(res.data)
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find(
      (item) => product.product === item.product
    );
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      newCart.push(itemInCart);
    }
    setCart(newCart);
  };



  return (
    // <>
    //   <h1>PRODUCTS</h1><br></br>

    //   <div className="container">
    //     <div className="row justify-content-center">
    //       {products.map((product, idx) => (
    //         <div className="col-md-3 mt-4 mx-3 py-3" style={{ boxShadow: "0 0 10px grey" }} key={idx}>
    //             <img className="card-img-top" src={product.image} width="100%" alt="Card image cap" />
    //             <div className="card-body">
    //               <h5 className="card-title">{product.product}</h5>
    //               <p className="card-text">pkr:{product.price}</p>
    //               <button onClick={() => addToCart(product)} className="btn btn-primary">
    //                 Add to Cart
    //        </button>
    //             </div>
    //           </div>
    //       ))}
    //     </div>
    //   </div>
    // </>

    <div>
      <Container>
        <Grid container justify='center' spacing={2} style={{marginTop:"30px"}}>

        {products.length === 0 ?
                        <>
                            <div>loading</div>
                            <div></div>
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </>
                        : null}


          {products.map((product, idx) => (
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
                      pkr:{product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button onClick={() => addToCart(product)} size="small" color="primary">
                    Add to cart
        </Button>

                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>

  );
}