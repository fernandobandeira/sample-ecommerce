import { Component } from 'react';

class LoggedIn extends Component {
  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.replace("/login")
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.props.children
    }

    return null
  }
}

export default LoggedIn;
