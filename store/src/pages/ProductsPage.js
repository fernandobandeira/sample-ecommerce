import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { qProducts } from '../queries/products';

class ProductsPage extends Component {
  getPrice = (product) => {
    const price = `$ ${product.price} USD`;

    if (product.price === product.dPrice) {
      return <span>{price}</span>
    }

    return <span> <small><s>{price}</s></small> $ {product.dPrice} USD </span>
  }

  render() {
    const { cart } = this.props;

    let { products = [] } = this.props.data;
    products = products.filter((p) => !p.deleted);

    return (
      <div>
        <Grid container spacing={16}>
          {products.map(product => (
            <Grid item xs={12} sm={3} key={product._id}>
              <Card>
                <CardContent>
                  <Typography type="headline" component="h2">
                    {product.name}
                  </Typography>
                  <Typography type="body1">
                    {this.getPrice(product)}
                  </Typography>
                </CardContent>
                <CardActions>
                  {cart[product._id] === undefined
                  ? (
                    <Button dense onClick={() => this.props.addToCart(product)}>Add to cart</Button>
                  )
                  : (
                    <Button dense onClick={() => this.props.removeFromCart(product)}>Remove from cart</Button>
                  )}                  
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default graphql(qProducts)(ProductsPage);
