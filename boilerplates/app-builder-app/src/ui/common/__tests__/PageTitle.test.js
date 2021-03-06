import React from 'react';
import { shallow } from 'enzyme';

import { configEnzymeAdapter } from 'testutils/helpers';

import PageTitle from 'ui/common/PageTitle';

configEnzymeAdapter();

describe('ui/common/PageTitle', () => {
  it('renders without crashing', () => {
    const component = shallow(<PageTitle titleId="APP_NAME.title" />);
    expect(component.exists()).toBe(true);
  });

  it('renders the help icon if helpId is provided', () => {
    const component = shallow(<PageTitle titleId="APP_NAME.title" helpId="APP_NAME.titletip" />);
    expect(component.find('OverlayTrigger').exists()).toBe(true);
  });

  it('does not render the help icon if helpId is not provided', () => {
    const component = shallow(<PageTitle titleId="APP_NAME.title" />);
    expect(component.find('OverlayTrigger').exists()).toBe(false);
  });
});
