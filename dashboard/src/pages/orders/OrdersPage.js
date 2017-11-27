import React, { Component } from 'react';
import { Table, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { qOrders } from '../../queries/orders';

class OrdersPage extends Component {
  columns = [{
    title: 'ID',
    dataIndex: '_id',
    key: '_id',
  }, {
    title: 'Username',
    dataIndex: 'user.username',
    key: 'user.username',
  }, {
    title: 'Price',    
    key: 'products',
    render: (text, record) => (
      <span>
        $ {record.products.reduce((cur, p) => cur + p.dPrice, 0)} USD
      </span>
    )
  }]

  render() {
    const { loading } = this.props.data;
    let { orders = [] } = this.props.data;
    orders = orders.filter((u) => !u.deleted);

    return (
      <div>
        <Link to="/products/new" style={{ float: 'right' }}>
          <Button type="primary" shape="circle" icon="plus" />
        </Link>
        {loading && (
          <Icon type="loading" className="loading" />
        )}
        {!loading && (
          <Table dataSource={orders} columns={this.columns} rowKey="_id" style={{ clear: 'both', paddingTop: '24px' }} />
        )}
      </div>
    );
  }
}

export default graphql(qOrders)(OrdersPage);
