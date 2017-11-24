import React, { Component } from 'react';
import { Table, Button, Popconfirm, Icon } from 'antd';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { qCategories } from '../../queries/categories'

class CategoriesPage extends Component {
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
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Link to={`/categories/${record._id}`}><Button type="primary">Edit</Button></Link>
        <span className="ant-divider" />
        <Popconfirm
          placement="topRight"
          title="Are you sure delete this category?"
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
    this.props.deleteCategory(id);
  }

  render() {
    const { loading } = this.props.data;
    let { categories = [] } = this.props.data;
    categories = categories.filter((p) => !p.deleted);

    return (
      <div>
        <Link to="/categories/new" style={{ float: 'right' }}>
          <Button type="primary" shape="circle" icon="plus" />
        </Link>
        {loading && (
          <Icon type="loading" className="loading" />
        )}
        {!loading && (
          <Table dataSource={categories} columns={this.columns} rowKey="_id" style={{ clear: 'both', paddingTop: '24px' }} />
        )}
      </div>
    );
  }
}

const mutation = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      _id
      deleted
    }
  }
`;

export default compose(
  graphql(qCategories),
  graphql(mutation, {
    props: ({ mutate }) => ({
      deleteCategory: (id) => mutate({ variables: { id } })
    })
  })
)(CategoriesPage);
