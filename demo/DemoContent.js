import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class DemoContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      token: null,
    };
  }

  componentWillMount() {
    const { brandwatchAuthGetProfile, brandwatchAuthGetToken } = this.context;

    brandwatchAuthGetProfile().then((profile) => this.setState({ profile }));
    brandwatchAuthGetToken().then((token) => this.setState({ token }));
  }

  render() {
    const { brandwatchAuthLogout, brandwatchAuthHandleRedirect } = this.context;
    const { profile, token } = this.state;
    return (
      <div>
        <p>You are authenticated!</p>

        {
          profile
            ? <pre><code>{ JSON.stringify(profile, null, 2) }</code></pre>
            : <p>Fetching profile</p>
        }

        {
          token
            ? <p>Token: { token }</p>
            : <p>Fetching token</p>
        }

        <button id="logout" onClick={ () => brandwatchAuthLogout() }>Logout</button>
        <button id="error" onClick={ () => brandwatchAuthHandleRedirect() }>Error</button>
      </div>
    );
  }
}

DemoContent.contextTypes = {
  brandwatchAuthLogout: PropTypes.func.isRequired,
  brandwatchAuthGetProfile: PropTypes.func.isRequired,
  brandwatchAuthGetToken: PropTypes.func.isRequired,
  brandwatchAuthHandleRedirect: PropTypes.func.isRequired,
};
