import React, { Component } from 'react';
import { Layout, Menu, Icon, Alert } from 'antd';
import { Route, withRouter, Switch } from 'react-router-dom';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import * as jwt from 'jsonwebtoken';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/products/ProductsPage';
import ProductsFormPage from './pages/products/ProductsFormPage';
import CategoriesPage from './pages/categories/CategoriesPage';
import CategoriesFormPage from './pages/categories/CategoriesFormPage';
import DiscountsPage from './pages/discounts/DiscountsPage';
import DiscountsFormPage from './pages/discounts/DiscountsFormPage';
import LeadsPage from './pages/leads/LeadsPage';
import OrdersPage from './pages/orders/OrdersPage';

import './App.css';

const { Header, Sider, Content } = Layout;

class App extends Component {
  state = {
    collapsed: true,
    login: false,
    loginMessage: '',
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setTokenInfo(token);
    }
  }

  setTokenInfo = (token) => {
    const info = jwt.decode(token);
    if (!info.admin) {
      return this.setState({ loginMessage: "You don't have permission to access this dashboard!" });
    }

    this.setState({ login: info });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
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

  linkTo = (item) => {
    if (item.key === 'home') return this.props.history.push('/');
    if (item.key === 'logout') return this.doLogout();
    this.props.history.push(`/${item.key}`);
  }

  render() {
    const { login, loginMessage } = this.state;

    return (
      <Layout id="admin">
      
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{ height: '100vh' }}
        >    
          {login && (      
            <Menu
                  selectedKeys={[this.props.location.pathname.split('/')[1]]}
                  theme="dark"
                  mode="inline"
                  onClick={this.linkTo}
                >
              <Menu.Item key="home">
                <Icon type="home" />
                <span>Home</span>
              </Menu.Item>            
              <Menu.Item key="products">
                <Icon type="shopping-cart" />
                <span>Products</span>
              </Menu.Item>
              <Menu.Item key="categories">
                <Icon type="folder" />
                <span>Categories</span>
              </Menu.Item>
              <Menu.Item key="discounts">
                <Icon type="tag-o" />
                <span>Discounts</span>
              </Menu.Item>
              <Menu.Item key="leads">
                <Icon type="usergroup-add" />
                <span>Leads</span>
              </Menu.Item>
              <Menu.Item key="orders">
                <Icon type="shopping-cart" />
                <span>Orders</span>
              </Menu.Item>
              <Menu.Item key="logout">
                <Icon type="logout" />
                <span>Logout</span>
              </Menu.Item>
            </Menu>
          )}
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {login ? (
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/products" component={ProductsPage} />
                <Route exact path="/products/new" component={ProductsFormPage} />
                <Route exact path="/products/:id" component={ProductsFormPage} />
                <Route exact path="/categories" component={CategoriesPage} />
                <Route exact path="/categories/new" component={CategoriesFormPage} />
                <Route exact path="/categories/:id" component={CategoriesFormPage} />
                <Route exact path="/discounts" component={DiscountsPage} />
                <Route exact path="/discounts/new" component={DiscountsFormPage} />
                <Route exact path="/discounts/:id" component={DiscountsFormPage} />
                <Route exact path="/leads" component={LeadsPage} />
                <Route exact path="/orders" component={OrdersPage} />
              </Switch>
            ) : (
              <div>
                {loginMessage !== '' && (
                  <div style={{ margin: '0 0 24px 0'  }}>
                    <Alert message={loginMessage} type="error" showIcon />
                  </div>
                )}
                <LoginPage doLogin={this.doLogin} />
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withApollo(
  withRouter(App)
);
