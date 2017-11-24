import React, { Component } from 'react';
import { Table, Button, Popconfirm, Icon } from 'antd';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { graphql, compose } from 'react-apollo';
import { qDiscounts } from '../../queries/discounts';

class DiscountsPage extends Component {
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
    title: 'Start',
    key: 'start',
    render: (text, record) => (
      <span>
        {moment(record.start).toLocaleString()}
      </span>
    ),
  }, {
    title: 'End',      
    key: 'end',
    render: (text, record) => (
      <span>
        {record.end 
          ? moment(record.end).toLocaleString()
          : 'No end date specified.'
        }
      </span>
    ),
  }, {
    title: 'Percentage',      
    key: 'percentage',
    render: (text, record) => (
      <span>
        {record.percentage} %
      </span>
    ),
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Link to={`/discounts/${record._id}`}><Button type="primary">Edit</Button></Link>
        <span className="ant-divider" />
        <Popconfirm
          placement="topRight"
          title="Are you sure delete this discount?"
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
    this.props.deleteDiscount(id);
  }

  render() {
    const { loading } = this.props.data;
    let { discounts = [] } = this.props.data;
    discounts = discounts.filter((p) => !p.deleted);

    return (
      <div>
        <Link to="/discounts/new" style={{ float: 'right' }}>
          <Button type="primary" shape="circle" icon="plus" />
        </Link>
        {loading && (
          <Icon type="loading" className="loading" />
        )}
        {!loading && (
          <Table dataSource={discounts} columns={this.columns} rowKey="_id" style={{ clear: 'both', paddingTop: '24px' }} />
        )}
      </div>
    );
  }
}

const mutation = gql`
  mutation deleteDiscount($id: ID!) {
    deleteDiscount(id: $id) {
      _id
      deleted
    }
  }
`;

export default compose(
  graphql(qDiscounts),
  graphql(mutation, {
    props: ({ mutate }) => ({
      deleteDiscount: (id) => mutate({ variables: { id } })
    })
  })
)(DiscountsPage);
