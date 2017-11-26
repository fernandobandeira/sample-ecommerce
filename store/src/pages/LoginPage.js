import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

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
        <Button raised onClick={() => this.props.doLogin({ ...this.state })}>
          Login
        </Button>
      </Paper>
    );
  }
}

export default LoginPage;
