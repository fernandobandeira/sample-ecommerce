import React, { Component } from 'react';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Button from 'material-ui/Button';
import { omit } from 'lodash';

class CheckoutPage extends Component {
  generateOrder = () => {
    const { cart, login, createOrder, clearCart } = this.props;

    const products = Object.keys(cart).map((key) => omit(cart[key], '__typename'));

    createOrder({
      products,
      user: omit(login, ['iat', 'exp']),
    }).then(() => {
      clearCart();
    });
  }

  render() {
    const { cart } = this.props;

    return (
      <Paper elevation={2} style={{padding: '20px'}}>
        <List>
          {Object.keys(cart).map(key => (
            <ListItem>
              <ListItemText
                primary={`${cart[key].name} -  $ ${cart[key].dPrice} USD`}
              />
            </ListItem>
          ))}
        </List>
        <Button raised onClick={() => this.generateOrder()}>
          Order items
        </Button>
      </Paper>
    );
  }
}

const createOrder = gql`
  mutation createOrder($order: OrderInput!) {
    createOrder(order: $order) {
      _id
    }
  }
`;

export default graphql(createOrder, {
  props: ({ mutate }) => ({
    createOrder: (order) => mutate({
      variables: { order },
    })
  })
})(CheckoutPage);
