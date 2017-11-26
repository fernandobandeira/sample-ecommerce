import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Button from 'material-ui/Button';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  register = () => {
    const { username, password } = this.state;

    this.props.createUser({
      username,
      password,
    }).then((data) => {
      this.props.doLogin({
        username: data.data.createUser.username,
        password
      });      
    });
  }

  render() {
    return (
      <Paper elevation={2} style={{padding: '20px'}}>
        <TextField 
          placeholder="Username" 
          style={{marginBottom: "20px"}}
          value={this.state.username}
          onChange={this.handleChange('username')}
        /><br />
        <TextField 
          placeholder="Password" 
          style={{marginBottom: "20px"}}
          value={this.state.password}
          type="password"
          onChange={this.handleChange('password')}
        /><br />
        <Button raised onClick={() => this.register()}>
          Register
        </Button>
      </Paper>
    );
  }
}

const createUser = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      username
    }
  }
`;

export default graphql(createUser, {
  props: ({ mutate }) => ({
    createUser: (user) => mutate({
      variables: { user },
    })
  })
})(RegisterPage);
