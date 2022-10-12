import PropTypes from 'prop-types';
import { Component } from 'react';
import jwtDecode from 'jwt-decode';
import TokenStore from 'donny-auth';

export default class BrandwatchReactAuth extends Component {
  getChildContext() {
    return {
      brandwatchAuthGetProfile: this.handleGetProfile,
      brandwatchAuthGetToken: this.handleGetToken,
      brandwatchAuthHandleRedirect: this.handleRedirect,
      brandwatchAuthLogout: this.handleLogout,
    };
  }

  constructor(props) {
    super(props);
    this.store = new TokenStore(this.props.domain);
    this.handleRedirect = this.handleRedirect.bind(this);
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
    this.handleGetToken();
  }

  handleGetProfile() {
    return this.handleGetToken().then(jwtDecode);
  }

  handleGetToken(aud = this.props.audience) {
    return this.store.getToken({ aud })
      .then(token => {
        if (token) {
          this.setState({ loggedIn: true });
          return token;
        }
        return this.handleRedirect();
      });
  }

  handleRedirect() {
    const { backupDomain, backupRedirect } = this.props;

    if (backupDomain && backupRedirect) {
      return this.store.getToken({ aud: backupDomain }).then(backupToken => {
        window.location.replace(backupToken ? backupRedirect : this.store.loginUrl);
      });
    }

    return window.location.replace(this.store.loginUrl);
  }

  handleLogout(aud = this.props.audience) {
    const { logoutUrl } = this.props;

    if (logoutUrl) {
      return this.store.removeToken({ logoutUrl });
    }

    return this.store.removeToken({ aud }).then(() =>
      window.location.replace(this.store.loginUrl));
  }

  render() {
    if (this.state.loggedIn === true) {
      return this.props.children;
    }
    return null;
  }
}

BrandwatchReactAuth.propTypes = {
  audience: PropTypes.string.isRequired,
  backupDomain: PropTypes.string,
  backupRedirect: PropTypes.string,
  children: PropTypes.node,
  domain: PropTypes.string.isRequired,
  logoutUrl: PropTypes.string,
  onCreateStore: PropTypes.func,
};

BrandwatchReactAuth.childContextTypes = {
  brandwatchAuthGetProfile: PropTypes.func.isRequired,
  brandwatchAuthGetToken: PropTypes.func.isRequired,
  brandwatchAuthHandleRedirect: PropTypes.func.isRequired,
  brandwatchAuthLogout: PropTypes.func.isRequired,
};
