import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import {
  ROUTE_UCASE_APP_NAME,
} from 'app-init/routes';

import IntlProviderContainer from 'ui/locale/IntlProviderContainer';

import AppShell from 'ui/common/AppShell';
import ToastsContainer from 'ui/toast/ToastsContainer';

export const routesDir = [
  {
    path: ROUTE_UCASE_APP_NAME,
    component: <>app component</>,
  },
];

export const routes = routesDir.map(route => <Route exact key={route.path} {...route} />);

class App extends Component {
  componentDidMount() {
    const { setupLanguage, lang } = this.props;
    setupLanguage(lang);
  }

  render() {
    return (
      <IntlProviderContainer>
        <>
          <ToastsContainer />
          <AppShell>{routes}</AppShell>
        </>
      </IntlProviderContainer>
    );
  }
}

App.propTypes = {
  setupLanguage: PropTypes.func.isRequired,
  lang: PropTypes.string,
};

App.defaultProps = {
  lang: 'en',
};

export default App;
