import PropTypes from 'prop-types';
import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import TokenStore from 'donny-auth';

export default class BrandwatchReactAuth extends Component {
  getChildContext() {
    return {
      brandwatchAuthLogout: this.handleLogout,
      brandwatchAuthGetProfile: this.handleGetProfile,
      brandwatchAuthGetToken: this.handleGetToken,
    };
  }

  constructor(props) {
    super(props);
    this.store = new TokenStore(this.props.domain),
    this.handleGetProfile = this.handleGetProfile.bind(this);
    this.handleGetToken = this.handleGetToken.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      loggedIn: undefined,
    };

    if (props.onCreateStore) {
      props.onCreateStore(this.store);
    }
  }

  componentWillMount() {
    this.handleGetToken().then((token) => {
      if (!token) {
        return window.location.replace(this.store.loginUrl);
      }

      this.setState(() => ({ loggedIn: true }));
    });
  }

  handleGetProfile() {
    return this.handleGetToken().then(jwtDecode);
  }

  handleGetToken() {
    return this.store.getToken({ aud: this.props.audience });
  }

  handleLogout() {
    return this.store.removeToken({ aud: this.props.audience }).then(() => {
      window.location.replace(this.store.loginUrl);
    });
  }

  render() {
    if (this.state.loggedIn === true) {
      return this.props.children
    }

    return null;
  }
}


BrandwatchReactAuth.propTypes = {
  audience: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  onCreateStore: PropTypes.func,
}

BrandwatchReactAuth.childContextTypes = {
  brandwatchAuthGetProfile: PropTypes.func.isRequired,
  brandwatchAuthGetToken: PropTypes.func.isRequired,
  brandwatchAuthLogout: PropTypes.func.isRequired,
};
