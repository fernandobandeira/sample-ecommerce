import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import ShoppingCart from 'material-ui-icons/ShoppingCart';
import Badge from 'material-ui/Badge';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { omit } from 'lodash';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import * as jwt from 'jsonwebtoken';
import './App.css';

import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LoggedIn from './middleware/LoggedIn';

class App extends Component {
  state = {
    loginMenu: null,
    cart: {},
    login: false,
  };

  handleMenu = event => {
    this.setState({ loginMenu: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ loginMenu: null });
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setTokenInfo(token);
    }
  }

  setTokenInfo = (token) => {
    const info = jwt.decode(token);

    this.setState({ login: info });
  }

  addToCart = (item) => {
    const { cart } = this.state;

    this.setState({
      cart: {
        ...cart,
        [item._id]: item,
      },
    });
  }

  doLogin = (user) => {
    this.props.client.query({ query: gql`
      query getToken($user: UserInput!) {
        getToken(user: $user)
      }
    `, variables: { user }})
      .then(({data}) => {
        if (data.getToken !== '') {
          localStorage.setItem('token', data.getToken);
          this.setTokenInfo(data.getToken);
          this.props.history.push('/');
        }
      })
      .catch(() => this.setState({ loginMessage: "We couldn't find your credentials on our database!" }));
  }

  doLogout = () => {
    this.setState({
      login: false,
      loginMessage: '',
    });

    localStorage.removeItem('token');

    this.props.client.resetStore();
  }

  removeFromCart = (item) => {
    const { cart } = this.state;

    this.setState({
      cart: omit(cart, item._id),
    });
  }

  clearCart = () => {
    this.setState({
      cart: {},
    });
    this.props.history.push('/');
  }

  render() {
    const { loginMenu, cart, login } = this.state;    

    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>            
            <Typography type="title" color="inherit" style={{ flex: 1 }}>
              <Link to="/" style={{color:"#fff", textDecoration:"none"}}>            
                Store
              </Link>        
            </Typography>                
            <Badge badgeContent={Object.keys(cart).length} color="accent">
              <Link to="/checkout">
                <ShoppingCart color="#fff" />
              </Link>
            </Badge>            
            <div>
              <IconButton
                aria-owns={loginMenu ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="contrast"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={loginMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={loginMenu}
                onRequestClose={this.handleRequestClose}
              >
                {!login 
                ? (
                    <div>
                      <MenuItem onClick={this.handleRequestClose}>
                        <Link to="/login" style={{color:"inherit", textDecoration:"none"}}>
                          Login
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={this.handleRequestClose}>
                        <Link to="/register" style={{color:"inherit", textDecoration:"none"}}>
                          Register
                        </Link>
                      </MenuItem>
                    </div>
                  )
                : (
                  <div>
                    <MenuItem onClick={() => {
                      this.handleRequestClose();
                      this.doLogout();
                    }}>
                      Logout
                    </MenuItem>
                  </div>
                )}
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <div style={{marginTop: '20px', padding: '10px'}}>
          <Switch>
            <Route exact path="/" render={props => (
              <ProductsPage {...props} cart={cart} addToCart={this.addToCart} removeFromCart={this.removeFromCart} />
            )} />
            <Route exact path="/login" render={props => (
              <LoginPage {...props} doLogin={this.doLogin} />
            )} />
            <Route exact path="/register" render={props => (
              <RegisterPage {...props} doLogin={this.doLogin} />
            )} />
            <Route render={(props) => (
              <LoggedIn {...props} isLoggedIn={this.state.login}>
                <Route exact path="/checkout" render={props => (
                  <CheckoutPage {...props} cart={cart} login={login} clearCart={this.clearCart} />
                )} />
              </LoggedIn>
            )} />
          </Switch>          
        </div>
      </div>
    );
  }
}

export default withApollo(
  withRouter(App)
);
