import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { render } from 'react-dom';
import BrandwatchReactAuth from '../';

class DemoContent extends Component {
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
    const { brandwatchAuthLogout } = this.context;
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

        <button onClick={ () => brandwatchAuthLogout() }>Logout</button>
      </div>
    );
  }
}

DemoContent.contextTypes = {
  brandwatchAuthLogout: PropTypes.func.isRequired,
  brandwatchAuthGetProfile: PropTypes.func.isRequired,
  brandwatchAuthGetToken: PropTypes.func.isRequired,
};

render((
  <BrandwatchReactAuth
      audience="brandwatch.com"
      domain={ __BW_REACT_AUTH_DOMAIN__ }
      onCreateStore={ (store) => {/* viziaauth store */} }>
    <DemoContent />
  </BrandwatchReactAuth>
), document.getElementById('root'))
