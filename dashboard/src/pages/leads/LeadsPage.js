import React, { Component } from 'react';
import { Table, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { qUsers } from '../../queries/users';

class LeadsPage extends Component {
  columns = [{
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  }]

  render() {
    const { loading } = this.props.data;
    let { users = [] } = this.props.data;
    users = users.filter((u) => !u.deleted);

    return (
      <div>
        <Link to="/products/new" style={{ float: 'right' }}>
          <Button type="primary" shape="circle" icon="plus" />
        </Link>
        {loading && (
          <Icon type="loading" className="loading" />
        )}
        {!loading && (
          <Table dataSource={users} columns={this.columns} rowKey="_id" style={{ clear: 'both', paddingTop: '24px' }} />
        )}
      </div>
    );
  }
}

export default graphql(qUsers)(LeadsPage);
