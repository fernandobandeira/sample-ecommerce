import React, { Component } from 'react';
import { Table, Button, Popconfirm, Icon } from 'antd';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { qProducts } from '../../queries/products'

class ProductsPage extends Component {
  columns = [{
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Active',
    key: 'active',
    render: (text, record) => (
      <span>
        <Icon type={record.active ? 'check' : 'close'} />
      </span>
    ),
  }, {
    title: 'Slug',
    dataIndex: 'slug',
    key: 'slug',
  }, {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Link to={`/products/${record._id}`}><Button type="primary">Edit</Button></Link>
        <span className="ant-divider" />
        <Popconfirm
          placement="topRight"
          title="Are you sure delete this product?"
          onConfirm={() => this.onDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      </span>
    ),
  }]

  onDelete = (id) => {
    this.props.deleteProduct(id);
  }

  render() {
    console.log(this.props.data);
    const { loading } = this.props.data;
    let { products } = this.props.data;

    if (!loading) {
      products = this.props.data.products.filter((p) => !p.deleted);
    }

    return (
      <div>
        <Link to="/products/new" style={{ float: 'right' }}>
          <Button type="primary" shape="circle" icon="plus" />
        </Link>
        {loading && (
          <Icon type="loading" className="loading" />
        )}
        {!loading && (
          <Table dataSource={products} columns={this.columns} rowKey="_id" style={{ clear: 'both', paddingTop: '24px' }} />
        )}
      </div>
    );
  }
}

const mutation = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      _id
      deleted
    }
  }
`;

export default compose(
  graphql(qProducts),
  graphql(mutation, {
    props: ({ mutate }) => ({
      deleteProduct: (id) => mutate({ variables: { id } })
    })
  })
)(ProductsPage);
