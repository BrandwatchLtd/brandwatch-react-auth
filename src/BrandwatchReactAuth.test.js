import PropTypes from 'prop-types';
import React, { Component } from 'react';
import sinon from 'sinon';
import enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BrandwatchReactAuth from './BrandwatchReactAuth';
import {
  openDomain,
  closedDomain,
  openBackupDomain,
  closedBackupDomain,
  loginUrl,
} from './MockTokenStore';
import { DemoContent as App } from '../demo/DemoContent';

function render(props) {
  return mount(
    <BrandwatchReactAuth { ...props }>
      <App />
    </BrandwatchReactAuth>
  );
}

describe('BrandwatchReactAuth', () => {
  const sandbox = sinon.sandbox.create();

  let props;

  beforeEach(() => {
    props = {
      audience: 'open.brandwatch.com',
      domain: 'open.brandwatch.com',
      onCreateStore: sandbox.stub(),
    };

    sandbox.stub(global.window.location, 'replace');
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('user is correctly authenticated', () => {
    it('renders the application', () => {
      return Promise.resolve(render(props))
        .then(component => component.update() )
        .then(component => expect(component.find(App).length).toBe(1));
    });

    it('redirects them when they log out', () => {
      return Promise.resolve(render(props))
        .then(component => component.update() )
        .then(component => {
          component.find(App).find('button').simulate('click')
          return component.update();
        })
        .then(() => expect(global.window.location.replace.callCount).toBe(1));
    })
  });

  describe('user is not authenticated', () => {
    beforeEach(() => {
      props.audience = 'closed.brandwatch.com';
    });

    it('does not render the application', (done) => {
      const component = render(props);
      setImmediate(() => {
        expect(component.find(App).length).toBe(0);
        done();
      }, 0)
    });

    it('redirects them to the login page', (done) => {
      render(props);
      setImmediate(() => {
        expect(global.window.location.replace.firstCall.args[0]).toBe(loginUrl);
        expect(global.window.location.replace.callCount).toBe(1)
        done();
      }, 0)
    });

    describe('user is authenticated against backup domain', () => {
      beforeEach(() => {
        props.backupDomain = 'open.backup.brandwatch.com';
        props.backupRedirect = 'https://my.brandwatch.com';
      });

      it('redirects them to the backup domain', (done) => {
        render(props)
        setImmediate(() => {
          expect(global.window.location.replace.callCount).toBe(1)
          expect(global.window.location.replace.firstCall.args[0]).toBe(props.backupRedirect);
          done();
        }, 0);
      });

      describe('but no redirect url is supplied', () => {
        beforeEach(() => {
          props.backupRedirect = null;
        });

        it('redirects them to the login page', (done) => {
          render(props)
          setImmediate(() => {
            expect(global.window.location.replace.callCount).toBe(1)
            expect(global.window.location.replace.firstCall.args[0]).toBe(loginUrl);
            done()
          }, 0);
        });
      });
    });

    describe('user is not authenticated against backup domain', () => {
      beforeEach(() => {
        props.backupDomain = 'closed.backup.brandwatch.com';
        props.backupRedirect = 'https://my.brandwatch.com';
      });

      it('redirects them to the login page', (done) => {
        render(props)
        setImmediate(() => {
          expect(global.window.location.replace.callCount).toBe(1)
          expect(global.window.location.replace.firstCall.args[0]).toBe(loginUrl);
          done();
        }, 0);
      });
    });
  });
});
