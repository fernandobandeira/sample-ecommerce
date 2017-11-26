import React, { Component } from 'react';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

class CheckoutPage extends Component {
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
        <Button raised>
          Order items
        </Button>
      </Paper>
    );
  }
}

export default CheckoutPage;
