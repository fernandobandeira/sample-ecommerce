import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Route, withRouter, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/products/ProductsPage';
import ProductsFormPage from './pages/products/ProductsFormPage';
import CategoriesPage from './pages/categories/CategoriesPage';
import CategoriesFormPage from './pages/categories/CategoriesFormPage';

import './App.css';
const { Header, Sider, Content } = Layout;

class App extends Component {
  state = {
    collapsed: true,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  linkTo = (item) => {
    if (item.key === 'home') return this.props.history.push('/');
    if (item.key === 'logout') return this.doLogout();
    this.props.history.push(`/${item.key}`);
  }

  render() {    
    return (
      <Layout id="admin">
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{ height: '100vh' }}
        >          
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
            <Menu.Item key="logout">
              <Icon type="logout" />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
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
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/products" component={ProductsPage} />
              <Route exact path="/products/new" component={ProductsFormPage} />
              <Route exact path="/products/:id" component={ProductsFormPage} />
              <Route exact path="/categories" component={CategoriesPage} />
              <Route exact path="/categories/new" component={CategoriesFormPage} />
              <Route exact path="/categories/:id" component={CategoriesFormPage} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App);
