import React from 'react';
import PropTypes from 'prop-types';
import {
  BrandMenu,
  FirstLevelMenuItem,
  LinkMenuItem,
} from '@entando/menu';
import { FormattedMessage } from 'react-intl';

import LinkMenu from 'ui/common/LinkMenu';

const BRAND_LOGO = <img src="/images/entando-logo.svg" alt="" />;

const AppShell = ({ className, children }) => (
  <div className={['AppShell', className].join(' ').trim()}>
    <BrandMenu brandLogo={BRAND_LOGO} title="Runtime Authoring Tool">
      <LinkMenuItem
        id="menu-dashboard"
        label={<FormattedMessage id="menu.dashboard" defaultMessage="Dashboard" />}
        to="/"
      />
      <FirstLevelMenuItem
        id="menu-APP_NAME"
        label={<FormattedMessage id="APP_NAME.menu" defaultMessage="UCASE_APP_NAME" />}
      >
        <LinkMenu />
      </FirstLevelMenuItem>
    </BrandMenu>
    {children}
  </div>
);

AppShell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

AppShell.defaultProps = {
  children: null,
  className: '',
};

export default AppShell;
