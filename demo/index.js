import React from 'react';
import { render } from 'react-dom';
import { DemoContent } from './DemoContent';
import BrandwatchReactAuth from '../';


render((
  <BrandwatchReactAuth
      audience="brandwatch.com"
      domain={ process.env.__BW_REACT_AUTH_DOMAIN__ }
      onCreateStore={ (/* store */) => {/* viziaauth store */} }>
    <DemoContent />
  </BrandwatchReactAuth>
), document.getElementById('root'));
