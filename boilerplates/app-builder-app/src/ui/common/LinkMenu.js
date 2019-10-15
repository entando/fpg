import React from 'react';
import { LinkMenuItem } from '@entando/menu';
import { FormattedMessage } from 'react-intl';

const LinkMenu = () => (
  <>
    <LinkMenuItem
      id="menu-SECTION_ID"
      label={<FormattedMessage id="APP_NAME.menu.SECTION_NAME" defaultMessage="SECTION_NAME" />}
      to='/use/const/here/imported/from/routes'
    />
  </>
);

export default LinkMenu;
