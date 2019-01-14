import React from 'react';
import 'tachyons';
import Routes from './components';
import withApollo from './withApollo';

import { GlobalStyle } from './styles';
// import './index.css'

const App = () => (
  <React.Fragment>
   <Routes />
   <GlobalStyle />
  </React.Fragment>
);

export default withApollo(App);